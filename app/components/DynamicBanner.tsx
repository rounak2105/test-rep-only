"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { VolumeX, Volume2 } from "lucide-react"
import Image from "next/image"
import type { Show, Provider } from "../lib/api"
import { getLanguageName } from "../lib/utils"
import { Button } from "@/components/ui/button"

interface DynamicBannerProps {
  shows: Provider[]
}

interface FeaturedShow extends Show {
  providerName: string
}

// Helper function to extract YouTube video ID from various YouTube URL formats
const getYoutubeVideoId = (url: string): string | null => {
  if (!url) return null

  // Match patterns like: https://www.youtube.com/watch?v=VIDEO_ID
  // or https://youtu.be/VIDEO_ID or https://youtube.com/embed/VIDEO_ID
  const regExp = /^.*(youtu.be\/|v\/|e\/|u\/\w+\/|embed\/|v=)([^#&?]*).*/
  const match = url.match(regExp)

  return match && match[2].length === 11 ? match[2] : null
}

export default function DynamicBanner({ shows }: DynamicBannerProps) {
  const [featuredShows, setFeaturedShows] = useState<FeaturedShow[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [nextIndex, setNextIndex] = useState(1)
  const [isMuted, setIsMuted] = useState(true)
  const [isVisible, setIsVisible] = useState(true)
  const [isCurrentVideoLoaded, setIsCurrentVideoLoaded] = useState(false)
  const [isNextVideoLoaded, setIsNextVideoLoaded] = useState(false)
  const bannerRef = useRef<HTMLDivElement>(null)
  const currentVideoRef = useRef<HTMLIFrameElement>(null)
  const nextVideoRef = useRef<HTMLIFrameElement>(null)
  const loaderTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const rotationTimerRef = useRef<NodeJS.Timeout | null>(null)
  const youtubeApiReadyRef = useRef<boolean>(false)

  // Load YouTube API
  useEffect(() => {
    if (window.YT) {
      youtubeApiReadyRef.current = true
      return
    }

    // Create script tag for YouTube API
    const tag = document.createElement("script")
    tag.src = "https://www.youtube.com/iframe_api"
    const firstScriptTag = document.getElementsByTagName("script")[0]
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag)

    // Define the onYouTubeIframeAPIReady function
    window.onYouTubeIframeAPIReady = () => {
      youtubeApiReadyRef.current = true
    }

    return () => {
      window.onYouTubeIframeAPIReady = () => {}
    }
  }, [])

  useEffect(() => {
    // Get shows with trailer links from all providers combined
    const allShows: FeaturedShow[] = shows.flatMap((provider) =>
      provider.shows
        .filter((show) => show.posterUrl && show.trailerLink && getYoutubeVideoId(show.trailerLink))
        .map((show) => ({
          ...show,
          providerName: provider.providerName,
        })),
    )

    // If no shows with trailers, fall back to shows with just posters
    if (allShows.length === 0) {
      const fallbackShows = shows.flatMap((provider) =>
        provider.shows
          .filter((show) => show.posterUrl)
          .map((show) => ({
            ...show,
            providerName: provider.providerName,
          })),
      )
      const shuffled = [...fallbackShows].sort(() => Math.random() - 0.5)
      setFeaturedShows(shuffled.slice(0, 5))
    } else {
      const shuffled = [...allShows].sort(() => Math.random() - 0.5)
      setFeaturedShows(shuffled.slice(0, 5))
    }
  }, [shows])

  // Set up rotation timer and preloading
  useEffect(() => {
    if (featuredShows.length === 0) return

    // Clear any existing timeout
    if (loaderTimeoutRef.current) {
      clearTimeout(loaderTimeoutRef.current)
    }

    if (rotationTimerRef.current) {
      clearTimeout(rotationTimerRef.current)
    }

    // Set a timeout to force video loaded state after 3 seconds
    loaderTimeoutRef.current = setTimeout(() => {
      setIsCurrentVideoLoaded(true)
    }, 3000)

    // Calculate next index
    const nextIdx = (currentIndex + 1) % featuredShows.length
    setNextIndex(nextIdx)

    // Start rotation timer
    rotationTimerRef.current = setTimeout(() => {
      // Only rotate if we're still visible
      if (isVisible) {
        setCurrentIndex(nextIdx)
        setIsCurrentVideoLoaded(isNextVideoLoaded)
        setIsNextVideoLoaded(false)
      }
    }, 15000)

    return () => {
      if (loaderTimeoutRef.current) {
        clearTimeout(loaderTimeoutRef.current)
      }
      if (rotationTimerRef.current) {
        clearTimeout(rotationTimerRef.current)
      }
    }
  }, [currentIndex, featuredShows.length, isVisible, isNextVideoLoaded])

  // Set up intersection observer to detect when banner is out of view
  useEffect(() => {
    if (!bannerRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isInView = entry.isIntersecting
        setIsVisible(isInView)

        // Pause or play videos based on visibility
        if (!isInView) {
          // Pause both videos when out of view
          pauseVideo(currentVideoRef.current)
          pauseVideo(nextVideoRef.current)
        } else {
          // Resume current video when back in view
          playVideo(currentVideoRef.current)
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(bannerRef.current)

    return () => {
      if (bannerRef.current) {
        observer.unobserve(bannerRef.current)
      }
    }
  }, [])

  // Helper function to build YouTube src with API enabled
  const buildYouTubeSrc = (videoId: string) => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${videoId}&modestbranding=1&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}`
  }

  // Handle video load events
  const handleCurrentVideoLoad = () => {
    setIsCurrentVideoLoaded(true)
    if (loaderTimeoutRef.current) {
      clearTimeout(loaderTimeoutRef.current)
    }
  }

  const handleNextVideoLoad = () => {
    setIsNextVideoLoaded(true)
  }

  // YouTube postMessage API helpers
  const postMessageToVideo = (iframe: HTMLIFrameElement | null, action: string) => {
    if (!iframe) return

    try {
      iframe.contentWindow?.postMessage(
        JSON.stringify({
          event: "command",
          func: action,
          args: [],
        }),
        "*",
      )
    } catch (error) {
      console.error("Error posting message to YouTube iframe:", error)
    }
  }

  const pauseVideo = (iframe: HTMLIFrameElement | null) => {
    postMessageToVideo(iframe, "pauseVideo")
  }

  const playVideo = (iframe: HTMLIFrameElement | null) => {
    postMessageToVideo(iframe, "playVideo")
  }

  const muteVideo = (iframe: HTMLIFrameElement | null) => {
    postMessageToVideo(iframe, "mute")
  }

  const unmuteVideo = (iframe: HTMLIFrameElement | null) => {
    postMessageToVideo(iframe, "unMute")
  }

  // Toggle mute state
  const toggleMute = () => {
    const newMutedState = !isMuted
    setIsMuted(newMutedState)

    if (newMutedState) {
      muteVideo(currentVideoRef.current)
    } else {
      unmuteVideo(currentVideoRef.current)
    }
  }

  if (featuredShows.length === 0) return null

  const currentShow = featuredShows[currentIndex]
  const nextShow = featuredShows[nextIndex]

  if (!currentShow) return null

  const languageName = getLanguageName(currentShow.originalLanguage)
  const isReleased = new Date(currentShow.releaseDate) <= new Date()
  const formattedDate = new Date(currentShow.releaseDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  const currentVideoId = currentShow.trailerLink ? getYoutubeVideoId(currentShow.trailerLink) : null
  const nextVideoId = nextShow?.trailerLink ? getYoutubeVideoId(nextShow.trailerLink) : null

  return (
    <div ref={bannerRef} className="relative w-full h-[70vh] overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentShow.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {currentVideoId && isVisible ? (
            <div className="relative w-full h-full">
              {/* Placeholder image while video loads */}
              {!isCurrentVideoLoaded && (
                <div className="absolute inset-0 z-10">
                  <Image
                    src={
                      currentShow.posterUrl ||
                      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ai-brush-removebg-efek2otq%20(2)-xxLu4tq489nclUJ4RXPzTcv3os4nOi.png"
                    }
                    alt={currentShow.title}
                    fill
                    className="object-cover blur-[2px]"
                    priority
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
                  </div>
                </div>
              )}

              {/* Current YouTube iframe */}
              <div className="absolute inset-0 overflow-hidden">
                <iframe
                  ref={currentVideoRef}
                  src={buildYouTubeSrc(currentVideoId)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  className={`absolute w-full h-full border-0 transition-opacity duration-500 ${isCurrentVideoLoaded ? "opacity-100" : "opacity-0"}`}
                  style={{
                    transform: "scale(1.5)",
                    transformOrigin: "center center",
                  }}
                  onLoad={handleCurrentVideoLoad}
                  title={`${currentShow.title} trailer`}
                />
              </div>

              {/* Preload next video (hidden) */}
              {nextVideoId && (
                <div className="absolute inset-0 overflow-hidden opacity-0 pointer-events-none">
                  <iframe
                    ref={nextVideoRef}
                    src={buildYouTubeSrc(nextVideoId)}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    className="absolute w-full h-full border-0"
                    style={{
                      transform: "scale(1.5)",
                      transformOrigin: "center center",
                    }}
                    onLoad={handleNextVideoLoad}
                    title={`${nextShow?.title} trailer (preloading)`}
                  />
                </div>
              )}

              {/* Mute/unmute button */}
              {isCurrentVideoLoaded && (
                <Button
                  onClick={toggleMute}
                  className="absolute top-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 p-0"
                  size="icon"
                >
                  {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                </Button>
              )}
            </div>
          ) : (
            <div className="relative w-full h-full">
              <Image
                src={
                  currentShow.posterUrl ||
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ai-brush-removebg-efek2otq%20(2)-xxLu4tq489nclUJ4RXPzTcv3os4nOi.png"
                }
                alt={currentShow.title}
                fill
                className="object-cover blur-[2px]"
                priority
              />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-white text-4xl">🍿</div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white max-w-2xl drop-shadow-lg">{currentShow.title}</h1>

            <div className="space-y-1">
              <div className="flex items-center text-sm text-white/90 space-x-2">
                <span>{languageName}</span>
                <span>•</span>
                <span>{currentShow.showType.toUpperCase()}</span>
                <span>•</span>
                <span>{currentShow.providerName}</span>
              </div>
              <div className="text-sm text-white/80">
                {isReleased ? "Released on " : "Coming on "}
                {formattedDate}
              </div>
            </div>

            <p className="text-lg text-white/90 max-w-2xl line-clamp-3 drop-shadow mt-4">{currentShow.overview}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}


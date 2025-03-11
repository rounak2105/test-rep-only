"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Film, Tv2, Globe2 } from "lucide-react"
import type { Show, Provider } from "../lib/api"
import { getLanguageName } from "../lib/utils"

interface DynamicBannerProps {
  shows: Provider[]
}

interface FeaturedShow extends Show {
  providerName: string
}

export default function DynamicBanner({ shows }: DynamicBannerProps) {
  const [featuredShows, setFeaturedShows] = useState<FeaturedShow[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    // Get 5 random shows from all providers combined
    const allShows: FeaturedShow[] = shows.flatMap((provider) =>
      provider.shows
        .filter((show) => show.posterUrl)
        .map((show) => ({
          ...show,
          providerName: provider.providerName,
        })),
    )
    const shuffled = [...allShows].sort(() => Math.random() - 0.5)
    setFeaturedShows(shuffled.slice(0, 5))
  }, [shows])

  useEffect(() => {
    if (featuredShows.length === 0) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % featuredShows.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [featuredShows.length])

  if (featuredShows.length === 0) return null

  const currentShow = featuredShows[currentIndex]
  if (!currentShow) return null

  const languageName = getLanguageName(currentShow.originalLanguage)
  const isReleased = new Date(currentShow.releaseDate) <= new Date()
  const formattedDate = new Date(currentShow.releaseDate).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })

  return (
    <div className="relative w-full h-[42vh] overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={currentShow.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={
              currentShow.posterUrl ||
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ai-brush-removebg-efek2otq%20(2)-xxLu4tq489nclUJ4RXPzTcv3os4nOi.png"
            }
            alt={currentShow.title}
            fill
            className="object-cover object-[center_25%]"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/70 to-background/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 space-y-3">
            <div className="flex items-center space-x-2 mb-2">
              <div className="text-white text-3xl">🍿</div>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-white max-w-2xl drop-shadow-lg">{currentShow.title}</h1>

            <div className="space-y-1">
              <div className="flex items-center text-sm text-white/90 space-x-3">
                <div className="flex items-center space-x-1">
                  <Globe2 className="h-4 w-4" />
                  <span className="capitalize">{languageName}</span>
                </div>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  {currentShow.showType === "movie" ? (
                    <Film className="h-4 w-4" />
                  ) : (
                    <Tv2 className="h-4 w-4" />
                  )}
                  <span className="capitalize">{currentShow.showType}</span>
                </div>
                <span>•</span>
                <span>{currentShow.providerName}</span>
              </div>
              <div className="text-sm text-white/80">
                {isReleased ? "Released on " : "Coming on "}
                {formattedDate}
              </div>
            </div>

            <p className="text-base text-white/90 max-w-2xl line-clamp-2 drop-shadow mt-2">{currentShow.overview}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}


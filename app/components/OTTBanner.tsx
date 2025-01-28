import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import type { Content } from "../lib/api"

interface OTTBannerProps {
  platform: string
  contents: Content[]
}

export default function OTTBanner({ platform, contents }: OTTBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (contents.length === 0) return

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % contents.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [contents.length])

  if (contents.length === 0) {
    return null // Don't render anything if there's no content
  }

  return (
    <div className="relative w-full h-[70vh] overflow-hidden">
      <AnimatePresence initial={false}>
        <motion.div
          key={contents[currentIndex].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={
              contents[currentIndex].posterUrl ||
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-01-28%20at%2012.07.20-1I3OWVXLoc3ko7EtkM3TrrHiTM3waG.png"
            }
            alt={contents[currentIndex].title}
            fill
            className="object-cover blur-[2px]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16 space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-white text-2xl">🍿🥤😎</div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white max-w-2xl drop-shadow-lg">
              {contents[currentIndex].title}
            </h1>

            <div className="space-y-1">
              <div className="flex items-center text-sm text-white/90 space-x-2">
                <span>{platform}</span>
              </div>
              <div className="text-sm text-white/80">
                {new Date(contents[currentIndex].releaseDate) <= new Date() ? "Released on " : "Coming on "}
                {new Date(contents[currentIndex].releaseDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}


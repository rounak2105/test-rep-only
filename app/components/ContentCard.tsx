"use client"

import type React from "react"

import Image from "next/image"
import { motion } from "framer-motion"
import { Play } from "lucide-react"
import type { Show } from "../lib/api"
import { getLanguageName } from "../lib/utils"
import { Button } from "@/components/ui/button"

interface ContentCardProps {
  content: Show
  theme: "dark" | "light"
}

export default function ContentCard({ content, theme }: ContentCardProps) {
  const date = new Date(content.releaseDate)
  const formattedDate = `${date.getDate()} ${date.toLocaleString("default", { month: "short" })}`
  const languageName = getLanguageName(content.originalLanguage)

  const handleTrailerClick = (e: React.MouseEvent<HTMLButtonElement>, trailerLink: string) => {
    e.stopPropagation() // Prevent card click event from firing
    window.open(trailerLink, "_blank")
  }

  return (
    <motion.div
      className="relative h-[280px] min-w-[187px] cursor-pointer transition duration-200 ease-out md:h-[420px] md:min-w-[280px] group rounded-lg overflow-hidden shadow-md"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {content.trailerLink && (
        <Button
          onClick={(e) => handleTrailerClick(e, content.trailerLink!)}
          className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full w-14 h-14 p-0"
          size="icon"
        >
          <Play className="h-7 w-7" />
          <span className="sr-only">Watch Trailer</span>
        </Button>
      )}
      <Image
        src={
          content.posterUrl ||
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ai-brush-removebg-efek2otq%20(2)-xxLu4tq489nclUJ4RXPzTcv3os4nOi.png" ||
          "/placeholder.svg" ||
          "/placeholder.svg" ||
          "/placeholder.svg" ||
          "/placeholder.svg"
        }
        alt={content.title}
        fill
        className="object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.src =
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ai-brush-removebg-efek2otq%20(2)-xxLu4tq489nclUJ4RXPzTcv3os4nOi.png"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background opacity-100" />
      <div className="absolute bottom-0 left-0 right-0 p-4 transform transition-transform duration-200 group-hover:translate-y-[-10px]">
        <div className="text-sm font-medium text-primary-foreground mb-1">{formattedDate}</div>
        <h3 className="text-sm font-semibold text-foreground md:text-base">{content.title}</h3>
        <div className="text-xs text-muted-foreground">
          <span>{languageName}</span>
          <span className="mx-1">•</span>
          <span>{content.showType.toUpperCase()}</span>
        </div>
      </div>
    </motion.div>
  )
}


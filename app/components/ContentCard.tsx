"use client"

import React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Play, Film, Tv2, Search, TrendingUp } from "lucide-react"
import type { Show } from "../lib/api"
import { getLanguageName } from "../lib/utils"
import { Button } from "@/components/ui/button"
import { providerKeyMap } from "../lib/api" // provider map e.g. { "8": "Netflix", ... }

interface ContentCardProps {
  content: Show
  theme: "dark" | "light"
}

export default function ContentCard({ content, theme }: ContentCardProps) {
  if (!content.posterUrl) return null

  const date = new Date(content.releaseDate)
  const formattedDate = `${date.getDate()} ${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`
  const languageName = getLanguageName(content.originalLanguage)

  const handleTrailerClick = (e: React.MouseEvent<HTMLButtonElement>, trailerLink: string) => {
    e.stopPropagation() // Prevent card click event from firing
    window.open(trailerLink, "_blank")
  }

  const handleSearchClick = (e: React.MouseEvent<HTMLButtonElement>, content: Show) => {
    e.stopPropagation() // Prevent card click event from firing
    if (content.homepage) {
      window.open(content.homepage, "_blank")
    } else {
      let providerName = ""
      if (content.watchProviders) {
        const providerMap = new Map(
          Object.entries(providerKeyMap).map(([provider, id]) => [id, provider])
        );
        const providerId = content.watchProviders[0]
        providerName = providerMap.get(providerId as 0 | 8 | 119 | 122 | 220 | 2336 | 232 | 237 | 515 | 1898) || "null"
      }
      const query = encodeURIComponent(`${content.title} ${providerName} ${content.releaseDate}`)
      window.open(`https://www.google.com/search?q=${query}`, "_blank")
    }
  }

  return (
    <motion.div
      className="relative h-[280px] min-w-[187px] cursor-pointer transition duration-200 ease-out md:h-[420px] md:min-w-[280px] group rounded-lg overflow-hidden shadow-md"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      {(content.homepage || content.watchProviders) && (
        <Button
          onClick={(e) => handleSearchClick(e, content)}
          className="absolute top-2 left-2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 p-0"
          size="icon"
        >
          <Search className="h-5 w-5" />
          <span className="sr-only">Open Search</span>
        </Button>
      )}
      {content.trailerLink && (
        <Button
          onClick={(e) => handleTrailerClick(e, content.trailerLink!)}
          className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full w-10 h-10 p-0"
          size="icon"
        >
          <Play className="h-5 w-5" />
          <span className="sr-only">Watch Trailer</span>
        </Button>
      )}
      <Image
        src={content.posterUrl}
        alt={content.title}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background opacity-100" />
      <div className="absolute bottom-0 left-0 right-0 p-4 transform transition-transform duration-200 group-hover:translate-y-[-10px]">
        <div className="text-sm font-medium text-primary-foreground mb-1">{formattedDate}</div>
        <h3 className="text-sm font-semibold text-foreground md:text-base line-clamp-1">{content.title}</h3>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
          <div className="flex items-center">
            <Search className="h-3 w-3 mr-1" />
            <span className="capitalize">{languageName}</span>
          </div>
          <span>•</span>
          <div className="flex items-center">
            {content.showType === "movie" ? (
              <Film className="h-3 w-3 mr-1" />
            ) : (
              <Tv2 className="h-3 w-3 mr-1" />
            )}
            <span className="capitalize">{content.showType === "movie" ? "Movie" : "TV"}</span>
          </div>
          {content.popularity > 0 && (
            <>
              <span>•</span>
              <div className="flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-primary" />
                <span>{content.popularity.toFixed(1)}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}


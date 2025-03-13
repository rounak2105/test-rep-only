"use client"

import { motion } from "framer-motion"
import { Star, Calendar, Film, Globe2 } from "lucide-react"
import type { AIMovie } from "../lib/api"
import { languageMap } from "../lib/utils"

interface AIMovieCardProps {
  movie: AIMovie
}

export default function AIMovieCard({ movie }: AIMovieCardProps) {
  const formattedDate = new Date(movie.releaseDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const languageName = languageMap[movie.language.toLowerCase()] || movie.language

  return (
    <motion.div
      className="bg-background rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-200 hover:border-primary/40 hover:bg-background/60 backdrop-blur-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <h3 className="text-xl font-semibold text-primary line-clamp-2">{movie.title}</h3>
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted">
            <div className="flex items-center bg-primary/20 px-2 py-0.5 rounded-full">
              <Star className="w-3 h-3 text-yellow-400 mr-1 fill-current" />
              <span className="font-medium">{movie.imdbRating.toFixed(1)}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center">
              <Globe2 className="w-3 h-3 mr-1" />
              <span>{languageName}</span>
            </div>
          </div>
        </div>

        <p className="text-muted line-clamp-3 text-xs leading-relaxed">{movie.description}</p>

        <div className="pt-3 flex items-center justify-between border-t border-gray-100">
          <div className="flex items-center text-xs">
            <Film className="w-3 h-3 mr-1 text-primary" />
            <span className="text-primary font-medium capitalize">{movie.showType === "tv" ? "TV" : "Movie"}</span>
          </div>
          <div className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-xs font-medium">
            {movie.ottPlatform}
          </div>
        </div>
      </div>
    </motion.div>
  )
}


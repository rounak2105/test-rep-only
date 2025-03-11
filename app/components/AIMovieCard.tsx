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
      className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-border hover:border-primary"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-foreground">{movie.title}</h3>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-500 mr-1 fill-current" />
              <span>{movie.imdbRating.toFixed(1)}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center">
              <Globe2 className="w-4 h-4 mr-1" />
              <span>{languageName}</span>
            </div>
          </div>
        </div>

        <p className="text-muted-foreground line-clamp-3">{movie.description}</p>

        <div className="pt-4 flex items-center justify-between border-t border-border">
          <div className="flex items-center text-sm">
            <Film className="w-4 h-4 mr-1 text-primary" />
            <span className="text-primary font-medium">{movie.showType}</span>
          </div>
          <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
            {movie.ottPlatform}
          </div>
        </div>
      </div>
    </motion.div>
  )
}


"use client"

import type React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Play, Film, Globe2, TrendingUp } from "lucide-react"
import type { AIMovie } from "../lib/api"
import { getLanguageName } from "../lib/utils"
import { Button } from "@/components/ui/button"

interface AIMovieCardProps {
  movie: AIMovie
  theme: "dark" | "light"
  onClick?: () => void
}

export default function AIMovieCard({ movie, theme, onClick }: AIMovieCardProps) {
  if (!movie.poster_url) return null;

  const languageName = getLanguageName(movie.special_attribruite.split(', ')[2])

  return (
    <motion.div
      className="relative h-[280px] min-w-[187px] cursor-pointer transition duration-200 ease-out md:h-[420px] md:min-w-[280px] group rounded-lg overflow-hidden shadow-md"
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_url}`}
        alt={movie.title}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background opacity-100" />
      <div className="absolute bottom-0 left-0 right-0 p-4 transform transition-transform duration-200 group-hover:translate-y-[-10px]">
        <div className="text-sm font-medium text-primary-foreground mb-1">{movie.release_year}</div>
        <h3 className="text-sm font-semibold text-foreground md:text-base line-clamp-1">{movie.title}</h3>
        <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
          <div className="flex items-center">
            <Globe2 className="h-3 w-3 mr-1" />
            <span className="capitalize">{languageName}</span>
          </div>
          <span>•</span>
          <div className="flex items-center">
            <Film className="h-3 w-3 mr-1" />
            <span className="capitalize">Movie</span>
          </div>
          {movie.vote_average > 0 && (
            <>
              <span>•</span>
              <div className="flex items-center">
                <TrendingUp className="h-3 w-3 mr-1 text-primary" />
                <span>{(movie.vote_average * 10).toFixed(1)}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  )
}


"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Star } from "lucide-react"
import type { Movie } from "../lib/api"

interface MovieCardProps {
  movie: Movie
  theme: "dark" | "light"
}

export default function MovieCard({ movie, theme }: MovieCardProps) {
  return (
    <motion.div
      className={`relative h-64 min-w-[200px] cursor-pointer transition duration-200 ease-out md:h-72 md:min-w-[280px] group rounded-lg overflow-hidden ${
        theme === "light" ? "shadow-md" : ""
      }`}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Image
        src={movie.image}
        alt={movie.title}
        fill
        className={`object-cover ${theme === "light" ? "opacity-90" : ""}`}
      />
      <div
        className={`absolute inset-0 ${
          theme === "dark"
            ? "bg-gradient-to-b from-transparent via-black/50 to-black"
            : "bg-gradient-to-b from-transparent via-white/50 to-white/80"
        } opacity-100`}
      />
      <div className="absolute bottom-0 left-0 right-0 p-4 transform transition-transform duration-200 group-hover:translate-y-[-10px]">
        <div className="text-lg font-bold text-red-600 mb-1">
          {new Date(movie.releaseDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
        </div>
        <h3 className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-black"} mb-1`}>{movie.title}</h3>
        <div className="flex items-center space-x-2 mb-1">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className={`text-sm ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
            {movie.imdbRating.toFixed(1)}
          </span>
        </div>
        <div className={`text-xs ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
          <span>{movie.genre}</span>
          <span className="mx-1">•</span>
          <span>{movie.language}</span>
        </div>
      </div>
    </motion.div>
  )
}


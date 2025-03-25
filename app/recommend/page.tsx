"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles, ArrowLeft, Clapperboard, Star, Calendar, Globe2, Film, TrendingUp, ChevronLeft, ChevronRight, MapPin } from "lucide-react"
import { generateAIRecommendations, type AIMovie } from "../lib/api"
import Header from "../components/Header"
import AILoading from "../components/AILoading"
import { useTheme } from "../hooks/useTheme"
import Image from "next/image"
import AIMovieCard from "../components/AIMovieCard"

export default function RecommendPage() {
  const { theme } = useTheme()
  const [query, setQuery] = useState("")
  const [recommendations, setRecommendations] = useState<AIMovie[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const router = useRouter()

  const selectedMovie = recommendations[selectedIndex]

  // Auto-rotation effect
  useEffect(() => {
    if (recommendations.length === 0) return

    const timer = setInterval(() => {
      // Find next movie with a backdrop_path
      let nextIndex = (selectedIndex + 1) % recommendations.length;
      let attempts = 0;
      
      // Loop until we find a movie with backdrop_path or try all movies
      while (!recommendations[nextIndex].backdrop_path && attempts < recommendations.length) {
        nextIndex = (nextIndex + 1) % recommendations.length;
        attempts++;
      }
      
      setSelectedIndex(nextIndex);
    }, 5000);

    return () => clearInterval(timer);
  }, [recommendations.length, selectedIndex]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      const response = await generateAIRecommendations(query)
      if (response.data && Array.isArray(response.data) && response.data.length > 0) {
        setRecommendations(response.data)
        setSelectedIndex(0)
      } else {
        setError("No recommendations found. Please try a different query.")
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error)
      setError("AI_BREAK")
    } finally {
      setIsLoading(false)
    }
  }

  const renderErrorMessage = () => {
    if (error === "AI_BREAK") {
      return (
        <motion.div
          className="text-center p-8 bg-card rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Clapperboard className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Oops! Our AI is on a Movie Break</h2>
          <p className="text-lg text-muted-foreground mb-4">
            Your query was so intriguing that our AI couldn't resist watching it! 🍿🎬
          </p>
          <p className="text-muted-foreground">
            Don't worry, it'll be back soon with fresh recommendations. In the meantime, why not explore our curated
            lists?
          </p>
        </motion.div>
      )
    }
    return (
      <motion.div
        className="text-center text-red-500 p-4 rounded-lg bg-red-500/10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {error}
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Button
        onClick={() => router.push("/")}
        variant="ghost"
        className={`fixed top-24 left-4 z-40 group font-medium hover:bg-transparent ${
          theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
        } transition-colors duration-200`}
      >
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Home
      </Button>

      <div className="container mx-auto px-0 py-8 pt-16 md:pt-20">
        <motion.h1
          className="text-2xl md:text-3xl font-bold text-center text-foreground mb-6 md:mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          AI-Powered Movie Recommendations 🎬
        </motion.h1>
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-3 md:space-y-4 max-w-xl mx-auto mb-6 md:mb-8 px-4 md:px-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Input
            type="text"
            placeholder="Describe the type of movie you want to watch"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full h-9 md:h-10 text-xs md:text-sm bg-secondary text-secondary-foreground border border-accent focus:border-primary transition-colors"
          />
          <Button
            type="submit"
            className="w-full h-9 md:h-10 text-xs md:text-sm bg-[hsl(var(--ai-button))] text-white hover:bg-[hsl(var(--ai-button))/90] font-bold py-1.5 px-3 rounded-full transition-all duration-200 transform hover:scale-105"
            disabled={isLoading}
          >
            <Sparkles className="mr-1.5 h-3 w-3 md:h-3.5 md:w-3.5" />
            {isLoading ? "Getting Recommendations..." : "Get AI Recommendations"}
          </Button>
        </motion.form>

        {isLoading ? (
          <motion.div 
            className="flex flex-col items-center justify-center py-8 space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="relative h-12 w-12">
              <motion.div 
                className="absolute inset-0 rounded-full bg-[hsl(var(--ai-button))]"
                animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <Sparkles className="absolute inset-0 m-auto text-white h-6 w-6" />
            </div>
            <p className="text-sm text-muted-foreground animate-pulse">Finding perfect movies for you...</p>
          </motion.div>
        ) : error ? (
          renderErrorMessage()
        ) : recommendations.length > 0 ? (
          <div className="space-y-8">
            {/* Featured Movie */}
            {selectedMovie && selectedMovie.backdrop_path && (
              <motion.div
                key={selectedMovie.id}
                className="relative w-full h-[600px] overflow-hidden rounded-xl mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}`}
                  alt={selectedMovie.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
                  <div className="flex items-center space-x-3 mb-2 md:mb-3">
                    <div className="inline-flex items-center px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs md:text-sm">
                      <TrendingUp className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-1.5" />
                      <span className="font-medium">{selectedMovie.vote_average.toFixed(1)}</span>
                    </div>
                    <div className="inline-flex items-center px-2 py-0.5 md:px-3 md:py-1 rounded-full bg-primary/20 backdrop-blur-sm text-primary-foreground text-xs md:text-sm">
                      <span className="font-medium">{selectedMovie.special_attribruite.split(', ')[0]}</span>
                    </div>
                  </div>
                  <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 md:mb-4">{selectedMovie.title}</h2>
                  <div className="flex flex-wrap items-center text-xs md:text-sm text-white/90 gap-2 md:gap-3 mb-2 md:mb-4">
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-sm space-x-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{selectedMovie.release_year}</span>
                    </div>
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-sm space-x-1.5">
                      <Globe2 className="h-3.5 w-3.5" />
                      <span>{selectedMovie.special_attribruite.split(', ')[2]}</span>
                    </div>
                    <div className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-sm space-x-1.5">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{selectedMovie.special_attribruite.split(', ')[1]}</span>
                    </div>
                  </div>
                  <p className="text-white/90 text-sm md:text-lg max-w-3xl line-clamp-3 md:line-clamp-2">{selectedMovie.overview}</p>
                </div>
              </motion.div>
            )}

            {/* Recommendations Grid */}
            <div className="space-y-4">
              <h3 className="text-lg md:text-xl font-bold">More Recommendations</h3>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-5">
                {recommendations.map((movie, index) => (
                  <AIMovieCard
                    key={movie.id}
                    movie={movie}
                    theme="dark"
                    onClick={() => {
                      if (movie.backdrop_path) {
                        setSelectedIndex(index);
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}


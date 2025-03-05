"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { Sparkles, ArrowLeft, Clapperboard } from "lucide-react"
import { generateAIRecommendations, type AIMovie } from "../lib/api"
import Header from "../components/Header"
import AILoading from "../components/AILoading"
import AIMovieCard from "../components/AIMovieCard"

export default function RecommendPage() {
  const [query, setQuery] = useState("")
  const [recommendations, setRecommendations] = useState<AIMovie[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    try {
      const response = await generateAIRecommendations(query)
      if (response?.data?.movies) {
        setRecommendations(response.data.movies)
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
      <div className="container mx-auto px-4 py-8">
        <Button
          onClick={() => router.push("/")}
          variant="outline"
          className="mb-8 bg-secondary text-secondary-foreground hover:bg-secondary/90"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
        <motion.h1
          className="text-4xl font-bold text-center text-foreground mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          AI-Powered Movie Recommendations
        </motion.h1>
        <motion.form
          onSubmit={handleSubmit}
          className="space-y-4 max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Input
            type="text"
            placeholder="Describe the type of movie you want to watch"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-secondary text-secondary-foreground border-2 border-accent focus:border-primary transition-colors"
          />
          <Button
            type="submit"
            className="w-full bg-[hsl(var(--ai-button))] text-white hover:bg-[hsl(var(--ai-button))/90] font-bold py-2 px-4 rounded-full transition-all duration-200 transform hover:scale-105"
            disabled={isLoading}
          >
            <Sparkles className="mr-2 h-4 w-4" />
            {isLoading ? "Getting Recommendations..." : "Get AI Recommendations"}
          </Button>
        </motion.form>

        {isLoading ? (
          <AILoading />
        ) : error ? (
          renderErrorMessage()
        ) : recommendations.length > 0 ? (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-center mb-6">Recommended Movies:</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations.map((movie) => (
                <AIMovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </motion.div>
        ) : null}
      </div>
    </div>
  )
}


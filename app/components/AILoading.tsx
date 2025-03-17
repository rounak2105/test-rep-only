"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Sparkles, 
  Film, 
  Star, 
  Popcorn, 
  Clapperboard, 
  Search, 
  Brain, 
  Zap, 
  Heart, 
  Trophy,
  Lightbulb,
  Wand2,
  Video,
  PlayCircle,
  Clock,
  Sparkle
} from "lucide-react"

export default function AILoading() {
  const [loadingText, setLoadingText] = useState("Scanning through genres...")
  const [currentIcon, setCurrentIcon] = useState(0)

  const loadingStates = [
    {
      text: "Scanning through genres...",
      icon: Film,
      color: "from-blue-500 to-cyan-500"
    },
    {
      text: "Analyzing your preferences...",
      icon: Brain,
      color: "from-purple-500 to-pink-500"
    },
    {
      text: "Finding hidden gems...",
      icon: Search,
      color: "from-yellow-500 to-orange-500"
    },
    {
      text: "Checking ratings and reviews...",
      icon: Star,
      color: "from-amber-500 to-yellow-500"
    },
    {
      text: "Matching your taste...",
      icon: Heart,
      color: "from-red-500 to-rose-500"
    },
    {
      text: "Finding top-rated picks...",
      icon: Trophy,
      color: "from-green-500 to-emerald-500"
    },
    {
      text: "Discovering new favorites...",
      icon: Lightbulb,
      color: "from-indigo-500 to-purple-500"
    },
    {
      text: "Adding some magic...",
      icon: Wand2,
      color: "from-pink-500 to-rose-500"
    },
    {
      text: "Loading up the classics...",
      icon: Video,
      color: "from-orange-500 to-amber-500"
    },
    {
      text: "Preparing the perfect playlist...",
      icon: PlayCircle,
      color: "from-cyan-500 to-blue-500"
    },
    {
      text: "Almost ready...",
      icon: Clock,
      color: "from-emerald-500 to-teal-500"
    },
    {
      text: "Adding the final touches...",
      icon: Sparkle,
      color: "from-violet-500 to-purple-500"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % loadingStates.length)
    }, 2500)

    return () => clearInterval(interval)
  }, [])

  const CurrentIcon = loadingStates[currentIcon].icon

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm z-50">
      <div className="relative flex flex-col items-center">
        <motion.div
          key={currentIcon}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`w-16 h-16 mb-6 rounded-xl bg-gradient-to-br ${loadingStates[currentIcon].color} flex items-center justify-center shadow-lg`}
        >
          <CurrentIcon className="w-8 h-8 text-white" />
        </motion.div>
        <motion.div
          key={loadingStates[currentIcon].text}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-center space-y-2"
        >
          <h3 className="text-lg font-semibold text-foreground">
            {loadingStates[currentIcon].text}
          </h3>
          <p className="text-sm text-muted-foreground">
            Crafting personalized movie recommendations just for you
          </p>
        </motion.div>
        <div className="mt-8 flex space-x-1.5">
          {loadingStates.map((_, index) => (
            <div
              key={index}
              className={`h-1 rounded-full transition-all duration-300 ${
                index === currentIcon
                  ? "bg-primary w-4"
                  : "bg-primary/20 w-1.5"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}


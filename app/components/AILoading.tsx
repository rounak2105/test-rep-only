"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function AILoading() {
  const [loadingText, setLoadingText] = useState("🔍 Searching… Scanning every genre!")

  useEffect(() => {
    const texts = [
      "💡 Thinking… The perfect movie idea is coming!",
      "🎬 Rolling the film… Almost there!",
      "🍿 Fetching popcorn… Loading up the best picks!",
      "⏳ Buffering… Just like a suspenseful plot twist!",
      "🚀 Loading… As fast as a Hollywood chase scene!",
      "🎭 Dramatic pause… Unveiling the best options!",
      "🔥 Igniting the reel… Cinematic magic incoming!",
      "🌟 Almost there… A blockbuster awaits!",
    ]
    let currentIndex = 0

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % texts.length
      setLoadingText(texts[currentIndex])
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-50">
      <div className="relative w-20 h-20 mb-8">
        <div className="lds-hourglass"></div>
      </div>
      <motion.p
        key={loadingText}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="text-lg text-foreground font-medium"
      >
        {loadingText}
      </motion.p>
      <style jsx global>{`
        .lds-hourglass {
          display: inline-block;
          position: relative;
          width: 80px;
          height: 80px;
        }
        .lds-hourglass:after {
          content: " ";
          display: block;
          border-radius: 50%;
          width: 0;
          height: 0;
          margin: 6px;
          box-sizing: border-box;
          border: 26px solid #A259FF;
          border-color: #A259FF transparent #A259FF transparent;
          animation: lds-hourglass 1.2s infinite;
        }
        @keyframes lds-hourglass {
          0% {
            transform: rotate(0);
            animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
          }
          50% {
            transform: rotate(900deg);
            animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
          }
          100% {
            transform: rotate(1800deg);
          }
        }
      `}</style>
    </div>
  )
}


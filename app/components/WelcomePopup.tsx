"use client"

import { useState, useEffect } from 'react'
import { X, Sparkles, PlayCircle, Calendar, Tv2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(true)

  // Close popup when clicking outside
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md"
          onClick={handleOutsideClick}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 20 }}
            className="relative bg-gradient-to-b from-background to-background/95 rounded-2xl shadow-2xl max-w-lg w-full mx-4 p-8 border border-white/10"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-3 -right-3 bg-background rounded-full p-1.5 text-muted-foreground hover:text-foreground transition-colors border border-white/10 shadow-lg hover:scale-110"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Welcome to <span className="inline-flex items-center align-middle mx-1"><img src="/whattobinge.png" alt="WhatToBinge Logo" width={140} height={40} className="object-contain"/></span>!
                </h2>
              </div>

              <div className="space-y-4">
                <p className="text-muted-foreground leading-relaxed text-lg">
                  Discover the latest OTT releases and upcoming movies across all your streaming platforms.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
                    <PlayCircle className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">Latest Releases</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">Upcoming Content</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
                    <Tv2 className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium">All Platforms</span>
                  </div>
                </div>

                <p className="text-muted-foreground text-sm">
                  Stay informed about the freshest entertainment arriving each weekend.
                </p>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2.5 bg-[#A259FF] text-white rounded-lg hover:bg-primary/90 transition-all hover:scale-105 font-medium shadow-lg shadow-primary/20"
                >
                  Start Exploring
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 
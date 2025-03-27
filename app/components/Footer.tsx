"use client"

import { useEffect, useState } from "react"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      
      // Show footer when user is near the bottom (within 100px)
      setIsVisible(documentHeight - (scrollPosition + windowHeight) < 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <footer 
      className={`fixed bottom-0 left-0 right-0 bg-gradient-to-t from-background via-background/95 to-transparent py-8 transition-all duration-300 ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-8 mb-6 text-sm">
          <a href="/privacy" className="text-[#A259FF] hover:text-[#A259FF]/80 transition-colors hover:scale-105">
            Terms & Privacy Policy
          </a>
          <a href="/feedback" className="text-[#A259FF] hover:text-[#A259FF]/80 transition-colors hover:scale-105">
            Send us feedback
          </a>
          <a href="/about" className="text-[#A259FF] hover:text-[#A259FF]/80 transition-colors hover:scale-105">
            About
          </a>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          © {currentYear}, WhatToBinge Entertainment or its affiliates
        </div>
      </div>
    </footer>
  )
}


"use client"

import { useState, useEffect } from "react"

type Theme = "dark" | "light"

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>("dark")

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null
    if (storedTheme) {
      setTheme(storedTheme)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  return { theme, toggleTheme }
}


"use client"; // (if you're using Next.js 13+ and this is a client component)

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useFilters } from "@/app/context/FilterContext"
import { getGenreIds } from "@/app/lib/utils"

type FilterType = "language" | "genre" | "releaseDate"

interface QuickFilter {
  name: string
  type: FilterType
  value: string // The actual value to be used in filters
}

// Optional: If you want to map genre names to specific string filters
const genreNameToFilterMap: Record<string, string> = {
  "Adventure": "adventure",
  "Horror": "horror",
  "Comedy": "comedy",
  "Documentary": "documentary"
}

const quickFilters: QuickFilter[] = [
  // Languages
  { name: "Hindi", type: "language", value: "hi" },
  { name: "English", type: "language", value: "en" },
  { name: "Korean", type: "language", value: "ko" },
  { name: "Japanese", type: "language", value: "ja" },
  { name: "Kannada", type: "language", value: "kn" },
  // Genres
  { name: "Adventure", type: "genre", value: "Adventure" },
  { name: "Horror", type: "genre", value: "Horror" },
  { name: "Comedy", type: "genre", value: "Comedy" },
  { name: "Documentary", type: "genre", value: "Documentary" },
]

interface QuickFiltersProps {
  onFilterChange?: () => void;
  noPadding?: boolean;
}

export default function QuickFilters({ onFilterChange, noPadding }: QuickFiltersProps) {
  const { filters, setFilters } = useFilters()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleFilterClick = (filter: QuickFilter) => {
    setFilters((prev) => {
      const isSame =
        (filter.type === "language" && prev.language === filter.value) ||
        (filter.type === "genre" && prev.genre === filter.value)

      // If user is clicking the same filter that's already active, reset it
      if (isSame) {
        return {
          ...prev,
          language: "all",
          genre: "all",
        }
      }

      // Otherwise, apply the new filter
      if (filter.type === "language") {
        return {
          ...prev,
          language: filter.value,
          genre: "all",
        }
      } else {
        // filter.type === "genre"
        // Optionally, you can also check if genreIds exist, etc.
        const genreIds = getGenreIds(filter.name)
        if (genreIds.length > 0) {
          return {
            ...prev,
            language: "all",
            genre: filter.value,
          }
        }
        // Fallback (if no genre IDs found, though your logic may differ)
        return prev
      }
    })
    // Call onFilterChange after updating filters
    onFilterChange?.()
  }

  const isActive = (filter: QuickFilter): boolean => {
    if (filter.type === "language") {
      return filters.language === filter.value
    } else if (filter.type === "genre") {
      return filters.genre === filter.value
    }
    return false
  }

  return (
    <div className="relative w-full py-4 overflow-hidden">
      <div className="absolute -inset-1 bg-gradient-to-r from-[#A259FF]/5 via-[#A259FF]/0 to-[#A259FF]/5 z-0 blur-3xl opacity-70" />
      
      <div className={`z-10 relative ${noPadding ? '' : 'px-4'}`}>
        <div className="flex items-center mb-4">
          <div className="bg-[#A259FF] text-white rounded-full px-4 py-1 text-sm font-medium">
            Quick Filters
          </div>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide snap-x">
          {quickFilters.map((filter, index) => (
            <motion.div
              key={filter.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="snap-start"
            >
              <Button
                onClick={() => handleFilterClick(filter)}
                size="sm"
                className={`
                  relative rounded-full border shadow-sm px-4 py-1 h-auto text-sm font-medium transition-all duration-300
                  ${isActive(filter)
                    ? 'bg-[#A259FF] text-white border-transparent hover:bg-[#A259FF]/90 shadow-[#A259FF]/20 shadow-md'
                    : 'bg-background border-[#A259FF]/20 text-foreground hover:border-[#A259FF] hover:text-[#A259FF] hover:bg-[#A259FF]/5'
                  }
                `}
              >
                {filter.name}
                {mounted && isActive(filter) && (
                  <motion.span
                    className="absolute inset-0 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1, repeat: 0 }}
                  />
                )}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

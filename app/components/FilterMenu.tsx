"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { X, Filter, Search, Check } from "lucide-react"
import { languageMap, genreMap } from "../lib/utils"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Input } from "@/components/ui/input"

interface FilterMenuProps {
  filters: {
    genre: string
    language: string
  }
  setFilters: (filters: any) => void
  onClose: () => void
}

export default function FilterMenu({ filters, setFilters, onClose }: FilterMenuProps) {
  const [genreSearch, setGenreSearch] = useState("")
  const [languageSearch, setLanguageSearch] = useState("")
  const [tempFilters, setTempFilters] = useState(filters)

  const options = {
    genre: genreMap.map((g) => g.name),
    language: Object.values(languageMap),
  }

  const priorityLanguages = ['English', 'Hindi', 'Korean', 'Japanese'];
  const otherLanguages = options.language.filter(lang => !priorityLanguages.includes(lang));
  const sortedLanguages = [...priorityLanguages, ...otherLanguages.sort()];

  const filteredGenres = options.genre.filter(genre => 
    genre.toLowerCase().includes(genreSearch.toLowerCase())
  )

  const filteredLanguages = sortedLanguages.filter(language => 
    language.toLowerCase().includes(languageSearch.toLowerCase())
  )

  const handleApplyFilters = () => {
    setFilters(tempFilters)
    onClose()
  }

  const handleReset = () => {
    const resetFilters = { genre: "all", language: "all" }
    setTempFilters(resetFilters)
    setFilters(resetFilters)
    onClose()
  }

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
      />
      <motion.div
        key="filter-menu"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 20, stiffness: 100 }}
        onClick={(e) => e.stopPropagation()}
        className="fixed top-0 right-0 w-80 h-screen bg-black/95 backdrop-blur-md p-6 shadow-2xl z-50 border-l border-white/10"
      >
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold text-white">Filters</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block mb-3 text-sm font-medium text-gray-300">Genre</label>
            <Select value={tempFilters.genre} onValueChange={(value) => setTempFilters({ ...tempFilters, genre: value })}>
              <SelectTrigger className="w-full h-12 bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl transition-colors">
                <SelectValue placeholder="Explore all genres" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-white/10 max-h-[280px] p-0">
                <div className="sticky top-0 z-10 bg-zinc-900 pt-2 px-2 pb-2 border-b border-white/10">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search genres..."
                      value={genreSearch}
                      onChange={(e) => setGenreSearch(e.target.value)}
                      className="w-full pl-8 h-9 bg-white/5 border-white/10 text-white text-sm rounded-lg focus:ring-0 focus:border-white/20"
                    />
                  </div>
                </div>
                <div className="overflow-y-auto max-h-[200px] py-1">
                  <SelectItem value="all" className="text-gray-200 focus:bg-white/10 focus:text-white px-2">
                    All Genres
                  </SelectItem>
                  {filteredGenres.map((genre, index) => (
                    <SelectItem key={index} value={genre} className="text-gray-200 focus:bg-white/10 focus:text-white px-2">
                      {genre}
                    </SelectItem>
                  ))}
                </div>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block mb-3 text-sm font-medium text-gray-300">Language</label>
            <Select value={tempFilters.language} onValueChange={(value) => setTempFilters({ ...tempFilters, language: value })}>
              <SelectTrigger className="w-full h-12 bg-white/5 border-white/10 text-white hover:bg-white/10 rounded-xl transition-colors">
                <SelectValue placeholder="Choose language" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-white/10 max-h-[280px] p-0">
                <div className="sticky top-0 z-10 bg-zinc-900 pt-2 px-2 pb-2 border-b border-white/10">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      placeholder="Search languages..."
                      value={languageSearch}
                      onChange={(e) => setLanguageSearch(e.target.value)}
                      className="w-full pl-8 h-9 bg-white/5 border-white/10 text-white text-sm rounded-lg focus:ring-0 focus:border-white/20"
                    />
                  </div>
                </div>
                <div className="overflow-y-auto max-h-[200px] py-1">
                  <SelectItem value="all" className="text-gray-200 focus:bg-white/10 focus:text-white px-2">
                    All Languages
                  </SelectItem>
                  {filteredLanguages.map((language, index) => (
                    <SelectItem key={index} value={language} className="text-gray-200 focus:bg-white/10 focus:text-white px-2">
                      {language}
                    </SelectItem>
                  ))}
                </div>
              </SelectContent>
            </Select>
          </div>

          <div className="pt-4 space-y-3">
            <Button
              onClick={handleApplyFilters}
              className="w-full h-12 bg-[#A259FF] hover:bg-[#A259FF]/90 text-white rounded-xl transition-colors flex items-center justify-center space-x-2"
            >
              <Check className="h-5 w-5" />
              <span>Apply Filters</span>
            </Button>
            <Button
              onClick={handleReset}
              variant="ghost"
              className="w-full h-12 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl border border-white/10 transition-colors"
            >
              Reset Filters
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}


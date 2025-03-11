"use client"

import type { Filters } from "../lib/api"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FilterBarProps {
  filters: Filters
  setFilters: (filters: Filters) => void
  options: any
}

export default function FilterBar({ filters, setFilters, options }: FilterBarProps) {
  return (
    <div className="px-4 py-2 flex flex-wrap gap-4 items-center justify-center bg-black/50 backdrop-blur-sm">
      <Select value={filters.genre} onValueChange={(value) => setFilters({ ...filters, genre: value })}>
        <SelectTrigger className="w-[160px] bg-black/50 border-gray-700 text-white">
          <SelectValue placeholder="Genre" />
        </SelectTrigger>
        <SelectContent className="bg-black/90 border-gray-700">
          <SelectItem value="all">All Genres</SelectItem>
          {options.genre?.map((genre: string) => (
            <SelectItem key={genre} value={genre} className="text-white">
              {genre}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.country} onValueChange={(value) => setFilters({ ...filters, country: value })}>
        <SelectTrigger className="w-[160px] bg-black/50 border-gray-700 text-white">
          <SelectValue placeholder="Country" />
        </SelectTrigger>
        <SelectContent className="bg-black/90 border-gray-700">
          <SelectItem value="all">All Countries</SelectItem>
          {options.country?.map((country: string) => (
            <SelectItem key={country} value={country} className="text-white">
              {country}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.language} onValueChange={(value) => setFilters({ ...filters, language: value })}>
        <SelectTrigger className="w-[160px] bg-black/50 border-gray-700 text-white">
          <SelectValue placeholder="Language" />
        </SelectTrigger>
        <SelectContent className="bg-black/90 border-gray-700">
          <SelectItem value="all">All Languages</SelectItem>
          {options.language?.map((language: string) => (
            <SelectItem key={language} value={language} className="text-white">
              {language}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}


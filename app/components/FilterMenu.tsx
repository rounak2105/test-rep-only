import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { languageMap, genreMap } from "../lib/utils"

interface FilterMenuProps {
  filters: {
    genre: string
    language: string
    releaseDate: string
  }
  setFilters: (filters: any) => void
  onClose: () => void
  theme: "dark" | "light"
}

export default function FilterMenu({ filters, setFilters, onClose, theme }: FilterMenuProps) {
  const options = {
    genre: genreMap.map((g) => g.name),
    language: Object.values(languageMap),
    releaseDate: ["all", "upcoming7days", "upcoming14days", "upcoming30days", "past7days", "past14days", "past30days"],
  }

  return (
    <div
      className={`fixed top-16 right-0 w-64 h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-100"} p-4 shadow-lg z-40`}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className={`text-lg font-bold ${theme === "dark" ? "text-white" : "text-black"}`}>Filters</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-5 w-5" />
        </Button>
      </div>
      <div className="space-y-4">
        <div>
          <label className={`block mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Genre</label>
          <Select value={filters.genre} onValueChange={(value) => setFilters({ ...filters, genre: value })}>
            <SelectTrigger className={theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}>
              <SelectValue placeholder="Select genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genres</SelectItem>
              {options.genre.map((genre) => (
                <SelectItem key={genre} value={genre}>
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className={`block mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Language</label>
          <Select value={filters.language} onValueChange={(value) => setFilters({ ...filters, language: value })}>
            <SelectTrigger className={theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}>
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Languages</SelectItem>
              {options.language.map((language) => (
                <SelectItem key={language} value={language}>
                  {language}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className={`block mb-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>Release Date</label>
          <Select value={filters.releaseDate} onValueChange={(value) => setFilters({ ...filters, releaseDate: value })}>
            <SelectTrigger className={theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}>
              <SelectValue placeholder="Select release date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="upcoming7days">Upcoming in 7 days</SelectItem>
              <SelectItem value="upcoming14days">Upcoming in 14 days</SelectItem>
              <SelectItem value="upcoming30days">Upcoming in 30 days</SelectItem>
              <SelectItem value="past7days">Past 7 days</SelectItem>
              <SelectItem value="past14days">Past 14 days</SelectItem>
              <SelectItem value="past30days">Past 30 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}


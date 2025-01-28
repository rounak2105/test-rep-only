import { useState, useEffect } from "react"
import { fetchShows, type Provider } from "../lib/api"
import { getGenreIds, getLanguageCode } from "../lib/utils"

const CACHE_DURATION = 60000 // 1 minute in milliseconds

interface CachedData {
  data: { [key: string]: Provider[] }
  timestamp: number
}

let cachedShows: CachedData | null = null

export function useOptimizedFetch(
  showType?: "tv" | "movie",
  filters: { genre: string; language: string; releaseDate: string } = {
    genre: "all",
    language: "all",
    releaseDate: "all",
  },
) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [shows, setShows] = useState<Provider[]>([])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const apiFilters: { originalLanguage?: string; genreIds?: number[] } = {}
        if (filters?.language !== "all") {
          apiFilters.originalLanguage = getLanguageCode(filters.language)
        }
        if (filters?.genre !== "all") {
          apiFilters.genreIds = getGenreIds(filters.genre)
        }

        const cacheKey = JSON.stringify({ showType, filters: apiFilters })
        if (cachedShows && cachedShows.timestamp + CACHE_DURATION > Date.now() && cachedShows.data[cacheKey]) {
          setShows(cachedShows.data[cacheKey])
        } else {
          const data = await fetchShows(showType, 100, apiFilters)
          if (!cachedShows) {
            cachedShows = { data: {}, timestamp: Date.now() }
          }
          cachedShows.data[cacheKey] = data
          cachedShows.timestamp = Date.now()
          setShows(data)
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error("An error occurred while fetching data"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [showType, filters.genre, filters.language, filters.releaseDate])

  return { isLoading, error, shows }
}


"use client"

import { useState, useEffect } from "react"
import { fetchShows, type Provider } from "../lib/api"
import { getGenreIds, getLanguageCode } from "../lib/utils"

const CACHE_DURATION = 300000 // 5 minutes in milliseconds
const STALE_WHILE_REVALIDATE = 3600000 // 1 hour in milliseconds

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
      try {
        const apiFilters: { originalLanguage?: string; genreIds?: number[] } = {}
        if (filters?.language !== "all") {
          apiFilters.originalLanguage = getLanguageCode(filters.language)
        }
        if (filters?.genre !== "all") {
          apiFilters.genreIds = getGenreIds(filters.genre)
        }

        const cacheKey = JSON.stringify({ showType, filters: apiFilters })
        const now = Date.now()

        // If we have fresh cache, use it immediately
        if (cachedShows && cachedShows.timestamp + CACHE_DURATION > now && cachedShows.data[cacheKey]) {
          setShows(cachedShows.data[cacheKey])
          setIsLoading(false)
          return
        }

        // If we have stale cache, use it but revalidate in background
        if (cachedShows && cachedShows.timestamp + STALE_WHILE_REVALIDATE > now && cachedShows.data[cacheKey]) {
          setShows(cachedShows.data[cacheKey])
          setIsLoading(false)
          // Revalidate in background
          fetchData().catch(console.error)
          return
        }

        // No cache or stale cache, fetch new data
        setIsLoading(true)
        const data = await fetchShows(showType, 10, apiFilters)
        
        // Ensure unique show IDs by prefixing with provider key
        const processedData = data.map(provider => ({
          ...provider,
          shows: provider.shows.map(show => ({
            ...show,
            id: `${provider.providerKey}-${show.id}` // Create unique ID by combining provider key and show ID
          }))
        }))

        if (!cachedShows) {
          cachedShows = { data: {}, timestamp: now }
        }
        cachedShows.data[cacheKey] = processedData
        cachedShows.timestamp = now
        setShows(processedData)
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


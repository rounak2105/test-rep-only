"use client"

import { useState, useEffect, useRef } from "react"
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
  const currentShowTypeRef = useRef<string | null>(null)
  const currentFiltersRef = useRef<string | null>(null)

  useEffect(() => {
    const currentFiltersString = JSON.stringify(filters)
    
    // Skip if both showType and filters are the same
    if (currentShowTypeRef.current === showType && currentFiltersRef.current === currentFiltersString) {
      return
    }
    
    currentShowTypeRef.current = showType || null
    currentFiltersRef.current = currentFiltersString

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
        const data = await fetchShows(showType, 100, apiFilters)

        const uniqueIds = new Set()
        
        const filteredData = data.map(provider => ({
          ...provider,
          shows: provider.shows.filter(show => {
            if (uniqueIds.has(show.id)) {
              return false // Duplicate found, exclude this show
            } else {
              uniqueIds.add(show.id)
              return true // Unique show, include it
            }
          })
        }))

        if (!cachedShows) {
          cachedShows = { data: {}, timestamp: now }
        }
        cachedShows.data[cacheKey] = filteredData
        cachedShows.timestamp = now
        setShows(filteredData)
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


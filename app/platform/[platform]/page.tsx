"use client"

import { useState, useEffect, useRef } from "react"
import { useParams, useRouter } from "next/navigation"
import ContentCard from "../../components/ContentCard"
import { Button } from "@/components/ui/button"
import { useTheme } from "../../hooks/useTheme"
import Header from "../../components/Header"
import FilterMenu from "../../components/FilterMenu"
import DynamicBanner from "../../components/DynamicBanner"
import { ArrowLeft } from "lucide-react"
import LoadingSkeleton from "../../components/LoadingSkeleton"
import { fetchShowsByProvider, Show, providerKeyMap, ShowsResponse } from "@/app/lib/api"
import { getGenreIds, getLanguageCode } from "@/app/lib/utils"
import { useFilters } from "../../context/FilterContext"
import QuickFilters from "../../components/QuickFilters"

export default function PlatformPage() {
  const { theme } = useTheme()
  const [showFilter, setShowFilter] = useState(false)
  const { filters, setFilters } = useFilters()
  const [filterVersion, setFilterVersion] = useState(0)
  const params = useParams()
  const router = useRouter()
  const platformName = (() => {
    const normalizedKey = (params.platform as string).toLowerCase()
    const providerKey = providerKeyMap[normalizedKey as keyof typeof providerKeyMap]
    if (providerKey) {
      switch (normalizedKey) {
        case 'netflix':
          return 'Netflix'
        case 'amazonprimevideo':
          return 'Prime Video'
        case 'hotstar':
          return 'Disney+ Hotstar'
        case 'jiocinema':
          return 'JioCinema'
        case 'zee5':
          return 'ZEE5'
        case 'sonyliv':
          return 'SonyLIV'
        case 'mxplayer':
          return 'MX Player'
        case 'amazonminitv':
          return 'Amazon MiniTV'
        case 'watchmore':
          return 'Watch More'
        default:
          return (params.platform as string)
            .split("-")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
      }
    }
    return (params.platform as string)
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  })()

  // State for shows, loading, error, and pagination
  const [shows, setShows] = useState<Show[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [hasMore, setHasMore] = useState(true)
  const [offset, setOffset] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const observerRef = useRef<HTMLDivElement>(null)
  const observer = useRef<IntersectionObserver | null>(null)
  const currentPlatformRef = useRef<string | null>(null)

  // Handle filter changes
  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
    setFilterVersion(prev => prev + 1)
    setShowFilter(false)
  }

  // Initial load and platform/filter change handler
  useEffect(() => {
    const platform = params.platform as string
    console.log('Platform or filters changed:', platform, filters)
    
    // Skip if this is the same platform and no filter change
    if (currentPlatformRef.current === platform && filterVersion === 0) {
      return
    }
    
    currentPlatformRef.current = platform
    
    const loadShows = async () => {
      setIsLoading(true)
      try {
        console.log('Loading shows for platform:', platform)
        console.log('Current offset:', 0)
        console.log('Show type:', filters.showType)
        
        const normalizedPlatform = platform.toLowerCase()
        console.log('Normalized platform name:', normalizedPlatform)
        
        // Prepare filter parameters
        const filterParams: any = {
          limit: 100,
          offset: 0,
          watchProviders: [providerKeyMap[normalizedPlatform as keyof typeof providerKeyMap]]
        }

        // Add showType if it exists
        if (filters.showType) {
          filterParams.showType = filters.showType
        }

        // Only add filter parameters if they are not 'all'
        if (filters.genre !== 'all') {
          const genreIds = getGenreIds(filters.genre)
          if (genreIds.length > 0) {
            filterParams.genreIds = genreIds
          }
        }

        if (filters.language !== 'all') {
          filterParams.originalLanguage = getLanguageCode(filters.language)
        }

        if (filters.releaseDate !== 'all') {
          filterParams.releaseDate = filters.releaseDate
        }
        
        console.log('Filter params:', filterParams)
        const response = await fetchShowsByProvider(normalizedPlatform, 100, 0, filterParams)
        console.log('API Response:', response)
        
        if (!response || !response.shows || response.shows.length === 0) {
          console.log('No shows received')
          setHasMore(false)
          setIsLoading(false)
          return
        }

        console.log(`Received ${response.shows.length} shows`)
        console.log('Total count:', response.totalCount)
        setShows(response.shows)
        setTotalCount(response.totalCount)
        setOffset(1) // Set to 1 for next page
        setIsLoading(false)
      } catch (err) {
        console.error('Error loading shows:', err)
        setError("Failed to load shows. Please try again later.")
        setIsLoading(false)
      }
    }

    // Reset state when platform or filters change
    setShows([])
    setOffset(0)
    setHasMore(true)
    setError(null)
    setTotalCount(0)
    
    // Load initial shows
    loadShows()
  }, [params.platform, filterVersion, filters.showType])

  // Set up intersection observer for infinite scrolling
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 0.1,
    }

    const loadMoreShows = async () => {
      if (!hasMore || isLoading) return

      // Check if we've reached the total count
      const currentTotal = offset * 100 // Calculate based on offset only
      if (currentTotal >= totalCount) {
        console.log('Reached total count:', totalCount)
        setHasMore(false)
        return
      }

      setIsLoading(true)
      try {
        const platform = params.platform as string
        console.log('Loading more shows for platform:', platform)
        console.log('Current offset:', offset)
        console.log('Current total:', currentTotal)
        console.log('Total count:', totalCount)
        
        const normalizedPlatform = platform.toLowerCase()
        
        // Prepare filter parameters
        const filterParams: any = {
          limit: 100,
          offset: offset,
          watchProviders: [providerKeyMap[normalizedPlatform as keyof typeof providerKeyMap]]
        }

        // Only add filter parameters if they are not 'all'
        if (filters.genre !== 'all') {
          const genreIds = getGenreIds(filters.genre)
          if (genreIds.length > 0) {
            filterParams.genreIds = genreIds
          }
        }

        if (filters.language !== 'all') {
          filterParams.originalLanguage = getLanguageCode(filters.language)
        }

        if (filters.releaseDate !== 'all') {
          filterParams.releaseDate = filters.releaseDate
        }
        
        const response = await fetchShowsByProvider(normalizedPlatform, 100, offset, filterParams)
        
        if (!response || !response.shows || response.shows.length === 0) {
          console.log('No more shows received')
          setHasMore(false)
          setIsLoading(false)
          return
        }

        console.log(`Received ${response.shows.length} more shows`)
        setShows(prev => [...prev, ...response.shows])
        setOffset(prev => prev + 1) // Increment by 1 for next page
        setIsLoading(false)
      } catch (err) {
        console.error('Error loading more shows:', err)
        setError("Failed to load more shows. Please try again later.")
        setIsLoading(false)
      }
    }

    observer.current = new IntersectionObserver((entries) => {
      const target = entries[0]
      if (target.isIntersecting && hasMore && !isLoading) {
        loadMoreShows()
      }
    }, options)

    if (observerRef.current) {
      observer.current.observe(observerRef.current)
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [offset, hasMore, isLoading, params.platform, totalCount, filters])

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        showFilter={true}
        onFilterClick={() => setShowFilter(!showFilter)}
        hasActiveFilters={filters.genre !== "all" || filters.language !== "all" || filters.releaseDate !== "all"}
        onResetFilters={() => {
          setFilters({ genre: "all", language: "all", releaseDate: "all" });
          setFilterVersion(prev => prev + 1);
          setShowFilter(false);
        }}
      />
      <Button
        onClick={() => {
          setFilters({ genre: "all", language: "all", releaseDate: "all" });
          router.push("/");
        }}
        variant="ghost"
        className={`fixed top-24 left-1 z-40 group font-medium hover:bg-transparent ${
          theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
        } transition-colors duration-200`}
      >
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Home
      </Button>
      <div className="w-full pt-16 pb-32">
        {shows.length > 0 ? (
          <>
            <h1 className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-black"} mb-4 px-0`}>
              {platformName} Shows
            </h1>

            <DynamicBanner 
              shows={[{ 
                providerName: platformName, 
                providerKey: providerKeyMap[(params.platform as string).toLowerCase() as keyof typeof providerKeyMap] || 0,
                shows 
              }]} 
            />
            
            {/* Quick Filters */}
            <QuickFilters onFilterChange={() => setFilterVersion(prev => prev + 1)} noPadding />
            
            {showFilter && (
              <FilterMenu
                filters={filters}
                setFilters={handleFilterChange}
                onClose={() => setShowFilter(false)}
              />
            )}
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 md:gap-4 px-4 place-items-center">
              {shows
                .filter(show => show.posterUrl !== null)
                .map((show) => (
                  <div key={show.id} className="w-full flex items-center justify-center">
                    <div className="w-[187px] sm:w-[240px] lg:w-[280px]">
                      <ContentCard content={show} theme={theme} />
                    </div>
                  </div>
              ))}
            </div>
            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            )}
            {/* End of content indicator */}
            {!hasMore && shows.length > 0 && (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground">You've reached the end!</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  You've seen all {totalCount} shows available on {platformName}. Check back later for more content!
                </p>
              </div>
            )}
            {/* Intersection observer target */}
            <div ref={observerRef} className="h-10" />
          </>
        ) : isLoading ? (
          <LoadingSkeleton />
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 py-8 space-y-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
            </div>
            <div className="space-y-2 text-center">
              <h3 className="text-2xl font-semibold text-foreground">No Shows Found</h3>
              <p className="text-muted-foreground max-w-md text-base">
                Oops! Looks like we couldn't find any shows matching your current filters on {platformName}. Try adjusting your selections to discover more content!
              </p>
            </div>
            <Button
              onClick={() => handleFilterChange({ genre: "all", language: "all", releaseDate: "all" })}
              variant="outline"
              className="group hover:bg-primary/10 transition-colors"
            >
              Reset Filters
              <svg
                className="ml-2 h-4 w-4 transition-transform group-hover:rotate-90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}


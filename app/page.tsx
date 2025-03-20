"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import ContentRow from "./components/ContentRow"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { useTheme } from "./hooks/useTheme"
import Header from "./components/Header"
import FilterMenu from "./components/FilterMenu"
import DynamicBanner from "./components/DynamicBanner"
import type { Provider } from "./lib/api"
import { useOptimizedFetch } from "./hooks/useOptimizedFetch"
import { useFilters } from "./context/FilterContext"

const LoadingSkeleton = () => (
  <div className="w-full space-y-8">
    {/* Banner Skeleton */}
    <div className="relative w-full h-[42vh] bg-gray-200 dark:bg-gray-800 animate-pulse">
      <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-background to-transparent">
        <div className="absolute bottom-6 left-6 md:bottom-12 md:left-12 space-y-3">
          <div className="h-8 w-8 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
          <div className="h-8 md:h-12 w-64 md:w-96 bg-gray-300 dark:bg-gray-700 rounded"></div>
          <div className="space-y-1">
            <div className="h-4 w-48 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-36 bg-gray-300 dark:bg-gray-700 rounded"></div>
          </div>
          <div className="h-12 w-80 bg-gray-300 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    </div>

    {/* Content Rows Skeleton */}
    <div className="space-y-12">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-4 px-4">
          <h2 className="text-xl md:text-2xl h-7 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></h2>
          <div className="group relative md:-ml-2">
            <div className="flex items-center space-x-2.5 overflow-x-scroll scrollbar-hide md:space-x-4 md:p-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((j) => (
                <div
                  key={j}
                  className="flex-none w-[200px] h-[300px] bg-gray-200 dark:bg-gray-700 rounded animate-pulse"
                ></div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default function Home() {
  const { theme } = useTheme()
  const [showFilter, setShowFilter] = useState(false)
  const { filters, setFilters } = useFilters()
  const [filterVersion, setFilterVersion] = useState(0)
  const [filteredContents, setFilteredContents] = useState<Provider[]>([])
  const { isLoading, error, shows } = useOptimizedFetch(undefined, filters)
  const [isPageLoaded, setIsPageLoaded] = useState(false)

  // Reset filters when home page is mounted
  useEffect(() => {
    setFilters({ genre: "all", language: "all", releaseDate: "all" })
  }, [])

  useEffect(() => {
    if (!isLoading) {
      const filtered = shows
        .map((provider) => ({
          ...provider,
          shows: provider.shows.filter((show) => show.posterUrl !== null).slice(0, 10),
        }))
        .filter((provider) => provider.shows.length > 0)
      setFilteredContents(filtered)
      setIsPageLoaded(true)
    }
  }, [isLoading, shows])

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters)
    setFilterVersion(prev => prev + 1)
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Error: {error.message}
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header
        showFilter={true}
        onFilterClick={() => setShowFilter(!showFilter)}
      />
      {isLoading ? (
        <LoadingSkeleton />
      ) : (
        <>
          {isPageLoaded && <DynamicBanner shows={shows} />}
          {showFilter && (
            <FilterMenu
              filters={filters}
              setFilters={handleFilterChange}
              onClose={() => setShowFilter(false)}
            />
          )}
          <div className="space-y-12 pt-8">
            {isPageLoaded && filteredContents.length > 0 ? (
              filteredContents.map((provider) => (
                <div key={`provider-${provider.providerKey}`} className="space-y-4">
                  <div className="px-4">
                    <ContentRow 
                      title={provider.providerName} 
                      contents={provider.shows} 
                      theme={theme}
                    />
                    <div className="text-right mt-4">
                      <Link
                        href={`/platform/${provider.providerName.toLowerCase().replace(/\s+/g, "")}`}
                        passHref
                      >
                        <Button
                          variant="ghost"
                          className={`group font-medium hover:bg-transparent ${
                            theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
                          } transition-colors duration-200`}
                        >
                          Show All
                          <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : isPageLoaded ? (
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
                    Oops! Looks like we couldn't find any shows matching your current filters. Try adjusting your selections to discover more content!
                  </p>
                </div>
                <Button
                  onClick={() => setFilters({ genre: "all", language: "all", releaseDate: "all" })}
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
            ) : null}
          </div>
        </>
      )}
    </div>
  )
}


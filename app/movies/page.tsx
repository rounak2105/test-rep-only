"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import ContentRow from "../components/ContentRow"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import type { Provider } from "../lib/api"
import { useTheme } from "../hooks/useTheme"
import Header from "../components/Header"
import FilterMenu from "../components/FilterMenu"
import DynamicBanner from "../components/DynamicBanner"
import { useOptimizedFetch } from "../hooks/useOptimizedFetch"
import LoadingSkeleton from "../components/LoadingSkeleton"
import { useFilters } from "../context/FilterContext"

export default function MoviesPage() {
  const { theme } = useTheme()
  const [filteredContents, setFilteredContents] = useState<Provider[]>([])
  const { filters, setFilters } = useFilters()
  const [showFilter, setShowFilter] = useState(false)
  const [filterVersion, setFilterVersion] = useState(0)
  const { isLoading, error, shows } = useOptimizedFetch("movie", filters)
  const [isPageLoaded, setIsPageLoaded] = useState(false)

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
                      title={`${provider.providerName} Movies`} 
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
                  <h3 className="text-2xl font-semibold text-foreground">No Movies Found</h3>
                  <p className="text-muted-foreground max-w-md text-base">
                    Oops! Looks like we couldn't find any movies matching your current filters. Try adjusting your selections to discover more content!
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


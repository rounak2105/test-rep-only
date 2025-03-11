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
  const { theme, toggleTheme } = useTheme()
  const [filteredContents, setFilteredContents] = useState<Provider[]>([])
  const [filters, setFilters] = useState({
    genre: "all",
    language: "all",
    releaseDate: "all",
  })
  const [showFilter, setShowFilter] = useState(false)
  const { isLoading, error, shows } = useOptimizedFetch(undefined, filters)
  const [isPageLoaded, setIsPageLoaded] = useState(false)

  useEffect(() => {
    if (!isLoading) {
      const filtered = shows
        .map((provider) => ({
          ...provider,
          shows: provider.shows.slice(0, 10),
        }))
        .filter((provider) => provider.shows.length > 0)
      setFilteredContents(filtered)
      setIsPageLoaded(true)
    }
  }, [isLoading, shows])

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
              setFilters={setFilters}
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
                      providerKey={provider.providerKey}
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
            ) : (
              <div className="text-center text-foreground px-4 py-8">
                <p className="text-lg">
                  Oops! Looks like the stars didn't align for this one. No shows match your filter—time
                  to mix it up and try a new combo. The spotlight's waiting, just not here... yet! 🎭✨
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}


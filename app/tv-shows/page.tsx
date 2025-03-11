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

export default function TVShowsPage() {
  const { theme } = useTheme()
  const [filteredContents, setFilteredContents] = useState<Provider[]>([])
  const [filters, setFilters] = useState({
    genre: "all",
    language: "all",
    releaseDate: "all",
  })
  const [showFilter, setShowFilter] = useState(false)
  const { isLoading, error, shows } = useOptimizedFetch("tv", filters)
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error.message}</div>
  }

  return (
    <>
      <Header
        theme={theme}
        toggleTheme={undefined}
        showFilter={true}
        onFilterClick={() => setShowFilter(!showFilter)}
      />
      {isPageLoaded && <DynamicBanner shows={shows} />}
      {showFilter && (
        <FilterMenu filters={filters} setFilters={setFilters} onClose={() => setShowFilter(false)} theme={theme} />
      )}
      <div className="space-y-12 pt-8">
        {isPageLoaded && filteredContents.length > 0 ? (
          filteredContents.map((provider) => (
            <div key={`provider-${provider.providerKey}`} className="space-y-4">
              <ContentRow 
                title={`${provider.providerName} TV Shows`} 
                contents={provider.shows} 
                theme={theme}
                providerKey={provider.providerKey}
              />
              <div className="text-right">
                <Link href={`/platform/${provider.providerName.toLowerCase().replace(" ", "-")}`} passHref>
                  <Button
                    variant="outline"
                    className={`group ${theme === "dark" ? "hover:bg-gray-800" : "hover:bg-gray-200"}`}
                  >
                    Show All
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </div>
          ))
        ) : isPageLoaded ? (
          <div className="text-center text-foreground px-4 py-8">
            <p className="text-lg">
              Oops! Looks like the stars didn't align for this one. No shows match your filter—time to mix it up and try
              a new combo. The spotlight's waiting, just not here... yet! 🎭✨
            </p>
          </div>
        ) : null}
      </div>
    </>
  )
}


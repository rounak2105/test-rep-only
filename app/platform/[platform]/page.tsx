"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import ContentCard from "../../components/ContentCard"
import type { Provider, Show } from "../../lib/api"
import { Button } from "@/components/ui/button"
import { useTheme } from "../../hooks/useTheme"
import Header from "../../components/Header"
import FilterMenu from "../../components/FilterMenu"
import OTTBanner from "../../components/OTTBanner"
import { ArrowLeft } from "lucide-react"
import { useOptimizedFetch } from "../../hooks/useOptimizedFetch"

export default function PlatformPage() {
  const { theme } = useTheme()
  const [showFilter, setShowFilter] = useState(false)
  const [filters, setFilters] = useState({
    genre: "all",
    language: "all",
    releaseDate: "all",
  })
  const params = useParams()
  const router = useRouter()
  const platformName = (params.platform as string)
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ")

  const { isLoading, error, shows } = useOptimizedFetch(undefined, filters)

  // Normalize the platform name for comparison
  const normalizedPlatform = (params.platform as string).toLowerCase()

  const provider = shows.find((p) => {
    const normalizedProviderName = p.providerName.toLowerCase().replace(/\s+/g, "")
    return normalizedProviderName === normalizedPlatform
  })

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
    <div className="min-h-screen bg-background">
      <Header
        theme={theme}
        toggleTheme={undefined}
        showFilter={true}
        onFilterClick={() => setShowFilter(!showFilter)}
      />
      <div className="container mx-auto px-4 py-8">
        <Button
          onClick={() => router.push("/")}
          variant="outline"
          className="mb-8 bg-secondary text-secondary-foreground hover:bg-secondary/90"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
        {provider ? (
          <>
            <OTTBanner platform={provider.providerName} contents={provider.shows.slice(0, 3)} />
            <h1 className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-black"} mt-8 mb-4`}>
              {provider.providerName} Shows
            </h1>
            {showFilter && (
              <FilterMenu
                filters={filters}
                setFilters={setFilters}
                onClose={() => setShowFilter(false)}
                theme={theme}
              />
            )}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {provider.shows.map((show) => (
                <ContentCard key={show.id} content={show} theme={theme} />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center text-foreground">No content available for {platformName}</div>
        )}
      </div>
    </div>
  )
}


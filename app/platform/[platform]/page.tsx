"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import ContentCard from "../../components/ContentCard"
import { Button } from "@/components/ui/button"
import { useTheme } from "../../hooks/useTheme"
import Header from "../../components/Header"
import FilterMenu from "../../components/FilterMenu"
import DynamicBanner from "../../components/DynamicBanner"
import { ArrowLeft } from "lucide-react"
import { useOptimizedFetch } from "../../hooks/useOptimizedFetch"
import LoadingSkeleton from "../../components/LoadingSkeleton"

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
    return <LoadingSkeleton />
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">Error: {error.message}</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <Header
        showFilter={true}
        onFilterClick={() => setShowFilter(!showFilter)}
      />
      <Button
        onClick={() => router.push("/")}
        variant="ghost"
        className={`fixed top-24 left-4 z-40 group font-medium hover:bg-transparent ${
          theme === "dark" ? "text-gray-300 hover:text-white" : "text-gray-600 hover:text-black"
        } transition-colors duration-200`}
      >
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Home
      </Button>
      <div className="container mx-auto px-4 py-8">
        {provider ? (
          <>
            <DynamicBanner shows={[provider]} />
            <h1 className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-black"} mt-8 mb-4`}>
              {provider.providerName} Shows
            </h1>
            {showFilter && (
              <FilterMenu
                filters={filters}
                setFilters={setFilters}
                onClose={() => setShowFilter(false)}
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


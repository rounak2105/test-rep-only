"use client"
import Link from "next/link"
import Image from "next/image"
import { Sparkles, Filter, BookOpen, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AIRecommendButton } from "./AIRecommendButton"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState } from "react"

interface HeaderProps {
  showFilter?: boolean
  onFilterClick?: () => void
}

export default function Header({ showFilter = false, onFilterClick }: HeaderProps) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background shadow-md">
      <nav className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-12 h-12">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ai-brush-removebg-efek2otq%20(2)-xxLu4tq489nclUJ4RXPzTcv3os4nOi.png"
                alt="BingeIt Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/" ? "text-foreground" : "text-muted-foreground",
              )}
            >
              Home
            </Link>
            <Link
              href="/tv-shows"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/tv-shows" ? "text-foreground" : "text-muted-foreground",
              )}
            >
              TV Shows
            </Link>
            <Link
              href="/movies"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === "/movies" ? "text-foreground" : "text-muted-foreground",
              )}
            >
              Movies
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          {showFilter && (
            <Button variant="ghost" size="icon" onClick={onFilterClick} className="text-foreground hover:bg-secondary">
              <Filter className="h-5 w-5" />
              <span className="sr-only">Filter content</span>
            </Button>
          )}
          <div className="hidden md:block">
            <AIRecommendButton />
          </div>
          <div className="hidden md:block">
            <Link href="/blog" passHref>
              <Button variant="outline" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <BookOpen className="mr-2 h-4 w-4" />
                Blog
              </Button>
            </Link>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden bg-background py-2">
          <Link href="/" className="block px-4 py-2 hover:bg-secondary">
            Home
          </Link>
          <Link href="/tv-shows" className="block px-4 py-2 hover:bg-secondary">
            TV Shows
          </Link>
          <Link href="/movies" className="block px-4 py-2 hover:bg-secondary">
            Movies
          </Link>
          <Link href="/blog" className="block px-4 py-2 hover:bg-secondary">
            Blog
          </Link>
          <div className="px-4 py-2">
            <AIRecommendButton className="w-full" />
          </div>
        </div>
      )}
    </header>
  )
}


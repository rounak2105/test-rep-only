"use client"

import Link from "next/link"
import Image from "next/image"
import { Filter, BookOpen, Menu, Home, Tv, Film, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AIRecommendButton } from "./AIRecommendButton"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface HeaderProps {
  showFilter?: boolean
  onFilterClick?: () => void
  hasActiveFilters?: boolean
  onResetFilters?: () => void
}

export default function Header({ 
  showFilter = false, 
  onFilterClick, 
  hasActiveFilters = false,
  onResetFilters 
}: HeaderProps) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleFilterClick = () => {
    setIsMenuOpen(false)
    onFilterClick?.()
  }

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const isMenuButton = target.closest('[data-menu-button]');
      const isMenuContent = target.closest('[data-menu-content]');
      
      if (!isMenuButton && !isMenuContent && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background shadow-md">
        <nav className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative w-32 h-20">
                <Image
                  src="/whattobinge.png"
                  alt="What To Binge Logo"
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
              <Button variant="ghost" size="icon" onClick={handleFilterClick} className="text-foreground hover:bg-secondary">
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
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={(e) => {
                  e.stopPropagation();
                  setIsMenuOpen(!isMenuOpen);
                }}
                data-menu-button
                className="relative"
              >
                <motion.div
                  animate={{ rotate: isMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6" />
                </motion.div>
              </Button>
            </div>
          </div>
        </nav>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="md:hidden fixed inset-x-0 top-[4.5rem] bg-background/80 backdrop-blur-lg border-b border-border"
              data-menu-content
            >
              <div className="px-4 py-3 space-y-3">
                <Link 
                  href="/" 
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-secondary transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Home className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Home</span>
                </Link>
                <Link 
                  href="/tv-shows" 
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-secondary transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Tv className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">TV Shows</span>
                </Link>
                <Link 
                  href="/movies" 
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-secondary transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Film className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Movies</span>
                </Link>
                <Link 
                  href="/blog" 
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-secondary transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <BookOpen className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">Blog</span>
                </Link>
                <div className="pt-2 border-t border-border">
                  <AIRecommendButton className="w-full justify-center mt-2 bg-[#6D28D9] hover:bg-[#5B21B6] text-white" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
      <AnimatePresence>
        {hasActiveFilters && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 inset-x-0 z-50 flex justify-center px-4"
          >
            <div className="bg-[#A259FF] text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-3 w-fit">
              <span className="text-sm font-medium whitespace-nowrap">Filters on, magic unlocked!</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 hover:bg-white/10 flex items-center justify-center"
                onClick={onResetFilters}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}


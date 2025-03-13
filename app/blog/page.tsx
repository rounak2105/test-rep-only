"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Header from "../components/Header"
import { fetchAllBlogs, type BlogPost } from "../lib/api"
import { useTheme } from "../hooks/useTheme"

export default function BlogPage() {
  const { theme } = useTheme()
  const [searchTerm, setSearchTerm] = useState("")
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const allPosts = await fetchAllBlogs()
        setPosts(allPosts)
      } catch (error) {
        console.error("Error loading posts:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadPosts()
  }, [])

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the latest insights, reviews, and stories from the world of entertainment
          </p>
        </div>
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-secondary/50 text-secondary-foreground border-2 border-accent/50 focus:border-primary transition-all duration-200 rounded-full pl-12 pr-4 h-12"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Link href={`/blog/${post.blogId}`} key={post.blogId}>
              <article className="group relative bg-card text-card-foreground rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <div className="relative w-full aspect-[16/9]">
                  <Image
                    src={
                      post.imageUrl ||
                      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wmremove-transformed-removebg-preview%20copy-4Bes3yn4BzdWqY69Ps2hp1c9h0wBCg.png"
                    }
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    priority={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background/90" />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-200 line-clamp-2">
                    {post.title}
                  </h2>
                  <div className="flex justify-between items-center mb-4">
                    <span className="px-3 py-1 rounded-full text-sm bg-primary/10 text-primary font-medium">
                      {post.category}
                    </span>
                    <span className="text-sm text-muted-foreground">{formatDate(post.createdDate)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {post.description}
                  </p>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <span className="font-medium">By {post.author}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
        {filteredPosts.length === 0 && (
          <div className="text-center text-foreground px-4 py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
              <Search className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Posts Found</h3>
            <p className="text-lg text-muted-foreground max-w-md mx-auto">
              No blog posts found matching your search. Try different keywords or check back later for new content! 📚✨
            </p>
          </div>
        )}
      </div>
    </div>
  )
}


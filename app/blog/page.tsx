"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Header from "../components/Header"
import { fetchAllBlogs, type BlogPost } from "../lib/api"

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    const loadPosts = async () => {
      const allPosts = await fetchAllBlogs()
      setPosts(allPosts)
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="relative w-16 h-16">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ai-brush-removebg-efek2otq%20(2)-xxLu4tq489nclUJ4RXPzTcv3os4nOi.png"
              alt="BingeIt Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-4xl font-bold text-foreground">Blog</h1>
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
              <article className="bg-card text-card-foreground rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                <div className="relative h-48 w-full">
                  <Image
                    src={
                      post.imageUrl ||
                      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wmremove-transformed-removebg-preview%20copy-4Bes3yn4BzdWqY69Ps2hp1c9h0wBCg.png" ||
                      "/placeholder.svg" ||
                      "/placeholder.svg"
                    }
                    alt={post.title}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                  <div className="flex justify-between items-center mb-4">
                    <span className="px-2 py-1 rounded-full text-sm bg-secondary text-secondary-foreground">
                      {post.category}
                    </span>
                    <span className="text-sm text-muted-foreground">{formatDate(post.createdDate)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">By {post.author}</p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}


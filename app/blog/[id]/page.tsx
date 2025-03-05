"use client"

import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { fetchBlogById, type BlogPost } from "../../lib/api"
import BlogNotFound from "../../components/BlogNotFound"

export default function BlogPost() {
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await fetchBlogById(params.id as string)
        setPost(data)
      } catch (error) {
        console.error("Error fetching post:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPost()
  }, [params.id])

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>
  }

  if (!post) {
    return <BlogNotFound />
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-4xl">
      <Link href="/blog" passHref>
        <Button variant="ghost" className="mb-4 flex items-center">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Button>
      </Link>
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <div className="flex items-center text-muted-foreground mb-4">
        <span>{post.author}</span>
        <span className="mx-2">•</span>
        <span>{post.createdDate}</span>
        <span className="mx-2">•</span>
        <span className="bg-primary text-primary-foreground px-2 py-1 rounded-full text-sm">{post.category}</span>
      </div>
      <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
        <Image
          src={
            post.imageUrl ||
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wmremove-transformed-removebg-preview%20copy-BS27BeyqzuiM6yYWnFXEw5ymZC4ePX.png" ||
            "/placeholder.svg"
          }
          alt={post.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.body || post.description }}
      />
    </article>
  )
}


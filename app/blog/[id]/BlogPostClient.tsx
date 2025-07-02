"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Image from "next/image"
import { ArrowLeft, Calendar, User, Tag, Link2} from "lucide-react"
import { Button } from "@/components/ui/button"
import { fetchBlogById, type BlogPost } from "../../lib/api"
import BlogNotFound from "../../components/BlogNotFound"
import { useTheme } from "../../hooks/useTheme"
import { useToast } from "@/components/ui/use-toast"

export default function BlogPostClient() {
  const params = useParams()
  const router = useRouter()
  const { theme } = useTheme()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setIsLoading(true)
        setError(false)
        const data = await fetchBlogById(params.id as string)
        console.log('Blog content from API:', data.body);
        setPost(data)
      } catch (error) {
        console.error("Error fetching post:", error)
        setError(true)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPost()
  }, [params.id])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
          <div className="space-y-8">
            {/* Author and metadata section skeleton */}
            <div className="flex flex-wrap gap-4 items-center">
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>

            {/* Title section skeleton */}
            <div className="space-y-4">
              <div className="h-12 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-12 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>

            {/* Description section skeleton */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
              <div className="h-4 w-4/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
            </div>

            {/* Featured image section skeleton */}
            <div className="relative aspect-[16/9] w-full bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>

            {/* Content section skeleton */}
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !post) {
    return <BlogNotFound />
  }

  return (
    <div className="min-h-screen bg-background">
      <Button
        onClick={() => router.back()}
        variant="ghost"
        className="fixed top-24 left-4 z-40 group font-medium hover:bg-transparent text-muted-foreground hover:text-foreground transition-colors duration-200"
      >
        <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Back to Blog
      </Button>

      <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <div className="space-y-8">
          {/* Author and metadata section */}
          <div className="flex flex-wrap gap-4 items-center text-muted-foreground">
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              <span>{formatDate(post.createdDate)}</span>
            </div>
            <div className="flex items-center">
              <Tag className="mr-2 h-4 w-4" />
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {post.category}
              </span>
            </div>
          </div>

          {/* Title section */}
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
            {post.title}
          </h1>

          {/* Description section */}
          {post.description && (
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {post.description}
            </p>
          )}

          {/* Featured image section */}
          {post.imageUrl && (
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Content section */}
          <article className="prose dark:prose-invert prose-base max-w-none">
            <div 
              dangerouslySetInnerHTML={{ 
                __html: typeof post.body === 'string' ? post.body : post.description 
              }} 
            />
          </article>

          {/* Share buttons */}
          <div className="border-t border-border pt-8 mt-12">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Share this article</span>
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hover:text-primary"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    toast({
                      description: "Link copied to clipboard!",
                      duration: 2000,
                    });
                  }}
                >
                  <Link2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
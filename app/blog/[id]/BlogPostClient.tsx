"use client"

import { useParams, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import Image from "next/image"
import { ArrowLeft, Calendar, User, Tag, Share2, Clipboard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { fetchBlogById, type BlogPost } from "../../lib/api"
import BlogNotFound from "../../components/BlogNotFound"
import { useTheme } from "../../hooks/useTheme"
import { useToast } from "@/components/ui/use-toast"
import { useRef } from "react"

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

          {/* Floating Share Button */}
          <FloatingShareButton />
        </div>
      </div>
    </div>
  )
}

function FloatingShareButton() {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef(null)
  const { toast } = useToast()
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''

  // Official SVGs
  const WhatsAppIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(1.41 1.41) scale(2.81 2.81)" fill="none">
        <circle cx="45" cy="45" r="45" fill="#2AB540" />
        <path
          d="M16.138 44.738c-.002 5.106 1.332 10.091 3.869 14.485l-4.112 15.013 15.365-4.029c4.233 2.309 8.999 3.525 13.85 3.527h.012c15.973 0 28.976-12.999 28.983-28.974.003-7.742-3.01-15.022-8.481-20.498-5.472-5.476-12.749-8.494-20.502-8.497C29.146 15.765 16.145 28.762 16.138 44.738zm9.15 13.728l-.574-.911c-2.412-3.834-3.685-8.266-3.683-12.816.005-13.278 10.811-24.081 24.099-24.081 6.435.003 12.482 2.511 17.031 7.062 4.548 4.552 7.051 10.603 7.05 17.037 0 13.278-10.806 24.081-24.084 24.081h-.009c-4.323-.003-8.563-1.163-12.261-3.357l-.88-.522-9.118 2.391 2.429-9.884z"
          fill="#fff"
        />
        <path
          d="M37.878 32.624c-.543-1.206-1.113-1.23-1.63-1.251-.422-.018-.905-.017-1.388-.017s-1.268.181-1.931.906c-.664.725-2.535 2.477-2.535 6.039 0 3.563 2.595 7.006 2.957 7.49.362.483 5.01 8.028 12.37 10.931 6.118 2.412 7.362 1.933 8.69 1.812 1.328-.121 4.285-1.751 4.888-3.442.604-1.691.604-3.14.423-3.443-.181-.302-.664-.483-1.388-.845-.724-.362-4.285-2.114-4.948-2.356-.664-.241-1.147-.362-1.63.363-.483.724-1.87 2.355-2.292 2.838-.422.484-.845.544-1.569.182-.724-.363-3.057-1.127-5.824-3.594-2.153-1.92-3.606-4.29-4.029-5.015-.422-.724-.045-1.116.318-1.477.325-.324.724-.846 1.087-1.268.361-.423.482-.725.723-1.208.242-.483.121-.906-.06-1.269-.182-.362-1.589-3.943-2.233-5.375z"
          fill="#fff"
        />
      </g>
    </svg>
  );

  const FacebookIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(1.41 1.41) scale(2.81 2.81)" fill="none">
        <circle cx="45" cy="45" r="45" fill="#3C5A99" />
        <path
          d="M49.645 74.998V47.631h9.186l1.375-10.665H49.645v-6.809c0-3.088.857-5.192 5.285-5.192l5.648-.002v-9.539c-.977-.13-4.329-.42-8.23-.42-8.143 0-13.717 4.97-13.717 14.098v7.865h-9.209v10.665h9.209v27.367h11.749z"
          fill="#fff"
        />
      </g>
    </svg>
  );

  const RedditIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 256 256"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(1.41 1.41) scale(2.81 2.81)" fill="none">
        <circle cx="45" cy="45" r="45" fill="#FF4500" />
        <path
          d="M75.011 45c-.134-3.624-3.177-6.454-6.812-6.331-1.611.056-3.143.716-4.306 1.823-5.123-3.49-11.141-5.403-17.327-5.537l2.919-14.038 9.631 2.025c.268 2.472 2.483 4.262 4.955 3.993 2.472-.268 4.262-2.483 3.993-4.955s-2.483-4.262-4.955-3.993c-1.421.145-2.696.973-3.4 2.204L48.68 17.987c-.749-.168-1.499.302-1.667 1.063v.022l-3.322 15.615c-6.264.101-12.36 2.025-17.55 5.537-2.64-2.483-6.801-2.36-9.284.291-2.483 2.64-2.36 6.801.291 9.284.515.481 1.107.895 1.767 1.186a16.544 16.544 0 000 1.98c0 10.078 11.745 18.277 26.23 18.277s26.23-8.188 26.23-18.277a16.544 16.544 0 000-1.98c1.645-1.125 3.066-3.452 3.021-5.98zM30.011 49.508c0-2.483 2.025-4.508 4.508-4.508s4.508 2.025 4.508 4.508-2.025 4.508-4.508 4.508-4.508-2.013-4.508-4.508zm26.141 12.55v-.179c-3.199 2.405-7.114 3.635-11.119 3.468-4.005.168-7.919-1.063-11.119-3.468-.425-.515-.347-1.286.168-1.711.447-.369 1.085-.369 1.544 0 2.707 1.98 6.007 2.987 9.362 2.83 3.356.179 6.667-.783 9.407-2.74.492-.481 1.297-.47 1.779.022.47.492.459 1.297-.022 1.779zm-.615-7.718h-.224l.034-.168c-2.483 0-4.508-2.025-4.508-4.508s2.025-4.508 4.508-4.508 4.508 2.025 4.508 4.508c0 2.808-1.935 4.899-4.318 5z"
          fill="#fff"
        />
      </g>
    </svg>
  );


  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl)
    toast({ description: "Link copied to clipboard!", duration: 2000 })
    setOpen(false)
  }

  return (
    <div>
      <button
        ref={buttonRef}
        onClick={() => setOpen((v) => !v)}
        className="fixed z-50 bottom-6 right-6 bg-primary text-white rounded-full shadow-xl p-4 flex items-center justify-center hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        aria-label="Share"
      >
        <Share2 className="h-6 w-6" />
      </button>
      {open && (
        <div
          className="fixed z-50 bottom-24 right-6 bg-background border-2 border-primary rounded-2xl shadow-2xl p-3 flex flex-col space-y-2 min-w-[210px] animate-fade-in"
          style={{ boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.18)' }}
        >
          <span className="text-xs font-semibold text-muted-foreground px-2 pb-1">Share this article</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-accent/60 focus:bg-accent/60 text-foreground text-sm transition-colors"
          >
            <Clipboard className="h-4 w-4" /> Copy Link
          </button>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#25D366]/20 focus:bg-[#25D366]/20 text-foreground text-sm transition-colors"
            onClick={() => setOpen(false)}
          >
            <WhatsAppIcon /> WhatsApp
          </a>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#1877F3]/20 focus:bg-[#1877F3]/20 text-foreground text-sm transition-colors"
            onClick={() => setOpen(false)}
          >
            <FacebookIcon /> Facebook
          </a>
          <a
            href={`https://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#FF4500]/20 focus:bg-[#FF4500]/20 text-foreground text-sm transition-colors"
            onClick={() => setOpen(false)}
          >
            <RedditIcon /> Reddit
          </a>
        </div>
      )}
    </div>
  )
} 
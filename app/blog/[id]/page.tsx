import { Metadata } from "next"
import { fetchBlogById } from "../../lib/api"
import BlogPostClient from "./BlogPostClient"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  try {
    const post = await fetchBlogById(params.id)
    return {
      title: post.title,
      description: post.description,
      openGraph: {
        title: post.title,
        description: post.description,
        images: post.imageUrl ? [post.imageUrl] : [],
        type: "article",
      },
      twitter: {
        card: post.imageUrl ? "summary_large_image" : "summary",
        title: post.title,
        description: post.description,
        images: post.imageUrl ? [post.imageUrl] : [],
      },
    }
  } catch (error) {
    return {
      title: "Blog Post",
      description: "Read this blog post.",
    }
  }
}

export default function Page() {
  return <BlogPostClient />
}     
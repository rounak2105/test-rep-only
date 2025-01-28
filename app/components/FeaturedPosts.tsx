"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { fetchAllBlogs, type BlogPost } from "../lib/api"

export default function FeaturedPosts() {
  const [featuredPosts, setFeaturedPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    const loadPosts = async () => {
      const allPosts = await fetchAllBlogs()
      // Randomly select 3 posts
      const shuffled = [...allPosts].sort(() => 0.5 - Math.random())
      setFeaturedPosts(shuffled.slice(0, 3))
    }
    loadPosts()
  }, [])

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4 text-foreground">Featured Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredPosts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={`/blog/${post.id}`} className="block group">
              <div className="relative h-48 mb-2 overflow-hidden rounded-lg">
                <Image
                  src={
                    post.imageUrl ||
                    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wmremove-transformed-removebg-preview%20copy-BS27BeyqzuiM6yYWnFXEw5ymZC4ePX.png"
                  }
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {post.title}
              </h3>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}


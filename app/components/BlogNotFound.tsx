"use client"

import { motion } from "framer-motion"
import { FileQuestion } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function BlogNotFound() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
    >
      <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6">
        <FileQuestion className="w-12 h-12 text-primary" />
      </div>
      <h1 className="text-4xl font-bold mb-4">Blog Not Found</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-md">
        Oops! It seems like this blog post has vanished into thin air. Maybe it's taking a break to binge-watch some
        shows? 🎬
      </p>
      <Link href="/blog">
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Browse Other Posts</Button>
      </Link>
    </motion.div>
  )
}


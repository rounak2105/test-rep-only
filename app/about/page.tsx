"use client"

import { motion } from "framer-motion"
import { Film, Tv, Users, Star } from "lucide-react"
import Header from "../components/Header"

const features = [
  {
    icon: Film,
    title: "Extensive Movie Collection",
    description: "Access to thousands of movies across multiple streaming platforms.",
  },
  {
    icon: Tv,
    title: "TV Show Library",
    description: "Stay up to date with your favorite series and discover new shows.",
  },
  {
    icon: Star,
    title: "AI Recommendations",
    description: "Get personalized recommendations powered by advanced AI technology.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Join a community of entertainment enthusiasts and share your thoughts.",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-6">
              About BingeIt
            </h1>
            <p className="text-xl text-muted-foreground">
              Your ultimate destination for discovering and enjoying the best content across various streaming
              platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card p-6 rounded-xl border border-border hover:border-primary transition-colors"
              >
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="prose prose-invert max-w-none"
          >
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-muted-foreground mb-6">
              At BingeIt, we're passionate about making your entertainment experience seamless and enjoyable. Our
              mission is to simplify content discovery across multiple streaming platforms, helping you find the perfect
              show or movie for any moment.
            </p>
            <p className="text-lg text-muted-foreground mb-6">
              With our innovative AI-powered recommendation system, we help you find the perfect content tailored to
              your tastes. Whether you're in the mood for a thrilling action movie, a heartwarming romance, or a
              thought-provoking documentary, BingeIt has got you covered.
            </p>
            <div className="bg-card border border-border rounded-xl p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Join Our Community</h3>
              <p className="text-muted-foreground">
                Start your journey to endless entertainment today and become part of our growing community of
                entertainment enthusiasts!
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}


"use client"

import { motion } from "framer-motion"
import { Film, Tv, Users, Star, Sparkles, Heart, Globe, Shield } from "lucide-react"
import Header from "../components/Header"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const features = [
  {
    icon: Film,
    title: "Extensive Movie Collection",
    description: "Access to thousands of movies across multiple streaming platforms.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Tv,
    title: "TV Show Library",
    description: "Stay up to date with your favorite series and discover new shows.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Star,
    title: "AI Recommendations",
    description: "Get personalized recommendations powered by advanced AI technology.",
    color: "from-yellow-500 to-orange-500"
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Join a community of entertainment enthusiasts and share your thoughts.",
    color: "from-green-500 to-emerald-500"
  }
]

const values = [
  {
    icon: Sparkles,
    title: "Innovation",
    description: "We constantly push boundaries to bring you the best entertainment experience.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: Heart,
    title: "User First",
    description: "Your satisfaction and enjoyment are at the heart of everything we do.",
    color: "from-red-500 to-rose-500"
  },
  {
    icon: Globe,
    title: "Global Reach",
    description: "Access content from around the world, all in one place.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Shield,
    title: "Trust & Security",
    description: "Your privacy and security are our top priorities.",
    color: "from-green-500 to-emerald-500"
  }
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Star className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-3">
              About BingeIt
            </h1>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Your ultimate destination for discovering and enjoying the best content across various streaming
              platforms.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card p-5 rounded-lg border border-border hover:border-primary/50 transition-colors group"
              >
                <div className={`w-10 h-10 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="prose prose-invert max-w-none mb-10"
          >
            <h2 className="text-xl font-semibold text-foreground mb-3">Our Mission</h2>
            <p className="text-sm text-muted-foreground mb-4">
              At BingeIt, we're passionate about making your entertainment experience seamless and enjoyable. Our
              mission is to simplify content discovery across multiple streaming platforms, helping you find the perfect
              show or movie for any moment.
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              With our innovative AI-powered recommendation system, we help you find the perfect content tailored to
              your tastes. Whether you're in the mood for a thrilling action movie, a heartwarming romance, or a
              thought-provoking documentary, BingeIt has got you covered.
            </p>
          </motion.div>

          <div className="text-center mb-10">
            <h2 className="text-xl font-semibold text-foreground mb-4">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-card p-5 rounded-lg border border-border hover:border-primary/50 transition-colors"
                >
                  <div className={`w-10 h-10 bg-gradient-to-br ${value.color} rounded-lg flex items-center justify-center mb-3`}>
                    <value.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-card border border-border rounded-lg p-6 text-center"
          >
            <h3 className="text-lg font-semibold text-foreground mb-2">Join Our Community</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Start your journey to endless entertainment today and become part of our growing community of
              entertainment enthusiasts!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Get Started
              </Button>
              <Button variant="outline" size="sm">
                Learn More
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}


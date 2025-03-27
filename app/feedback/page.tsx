"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { MessageSquare, Send, Mail, ThumbsUp, Bug, Sparkles, BookOpen } from "lucide-react"
import Header from "../components/Header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { submitFeedback } from "@/app/lib/api"

const feedbackTypes = [
  {
    value: "general",
    label: "General Feedback",
    icon: ThumbsUp,
    description: "Share your thoughts about our service"
  },
  {
    value: "bug",
    label: "Bug Report",
    icon: Bug,
    description: "Report an issue or technical problem"
  },
  {
    value: "feature",
    label: "Feature Request",
    icon: Sparkles,
    description: "Suggest new features or improvements"
  },
  {
    value: "content",
    label: "Content Related",
    icon: BookOpen,
    description: "Feedback about our content or recommendations"
  }
]

export default function FeedbackPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      feedbackType: formData.get("feedbackType") as string,
      message: formData.get("message") as string,
    }

    try {
      await submitFeedback(data)
      setSubmitted(true)
    } catch (error) {
      console.error("Error submitting feedback:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Header />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md mx-auto px-4 -mt-20"
        >
          <div className="bg-card rounded-lg p-6 shadow-lg">
            <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4 bg-[#A259FF]/10 rounded-full">
              <MessageSquare className="w-6 h-6 text-[#A259FF]" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-3 text-center">Thank You!</h2>
            <p className="text-base text-muted-foreground mb-4 text-center">
              We appreciate your feedback to <span className="inline-flex items-center align-middle mx-1"><Image src="/whattobinge.png" alt="WhatToBinge Logo" width={100} height={25} className="object-contain" /></span>. We'll review it and use it to improve our service.
            </p>
            <Button 
              onClick={() => setSubmitted(false)} 
              className="w-full bg-[#A259FF] text-white hover:bg-[#A259FF]/90 flex items-center justify-center gap-2"
            >
              <Sparkles className="h-4 w-4" />
              Send Another Feedback
            </Button>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-6">
            <div className="w-12 h-12 flex items-center justify-center mx-auto mb-3">
              <Mail className="w-6 h-6 text-[#A259FF]" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              We'd Love to Hear From You
            </h1>
            <p className="text-base text-muted-foreground">
              Your feedback helps <span className="inline-flex items-center align-middle mx-0"><Image src="/whattobinge.png" alt="WhatToBinge Logo" width={100} height={25} className="object-contain" /></span> improve and provide a better experience for everyone.
            </p>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card border border-border hover:border-[#A259FF]/30 transition-colors rounded-lg p-6 space-y-5"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground" htmlFor="name">
                  Name
                </label>
                <Input 
                  name="name" 
                  id="name" 
                  placeholder="Your name" 
                  required 
                  className="bg-background border-accent/50 focus:border-[#A259FF] h-9" 
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground" htmlFor="email">
                  Email
                </label>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  className="bg-background border-accent/50 focus:border-[#A259FF] h-9"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Feedback Type</label>
              <Select name="feedbackType" defaultValue="general">
                <SelectTrigger className="bg-background border-accent/50 focus:border-[#A259FF] h-9">
                  <SelectValue placeholder="Select feedback type" />
                </SelectTrigger>
                <SelectContent className="bg-background border-accent/50">
                  {feedbackTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value} className="focus:bg-[#A259FF]/10 focus:text-[#A259FF]">
                      <div className="flex items-center gap-2">
                        <type.icon className="w-4 h-4" />
                        <span>{type.label}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground" htmlFor="message">
                Your Message
              </label>
              <Textarea
                name="message"
                id="message"
                placeholder="Tell us what you think..."
                required
                className="bg-background border-accent/50 focus:border-[#A259FF] min-h-[120px]"
              />
            </div>

            <Button
              type="submit"
              size="sm"
              className="w-full bg-[#A259FF] text-white hover:bg-[#A259FF]/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <motion.div 
                    className="mr-2 h-4 w-4 rounded-full border-2 border-t-transparent border-white"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  Sending...
                </>
              ) : (
                <>
                  Send Feedback
                  <Send className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </motion.form>
        </motion.div>
      </div>
    </div>
  )
}


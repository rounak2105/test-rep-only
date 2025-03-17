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
      const response = await fetch("https://bingeit-backend.onrender.com/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to submit feedback")
      }

      setSubmitted(true)
    } catch (error) {
      console.error("Error submitting feedback:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center"
          >
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Thank You!</h2>
              <p className="text-sm text-muted-foreground mb-6">
                We appreciate your feedback. We'll review it and use it to improve our service.
              </p>
              <Button 
                onClick={() => setSubmitted(false)} 
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Send Another Feedback
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-3">
              We'd Love to Hear From You
            </h1>
            <p className="text-base text-muted-foreground">
              Your feedback helps us improve and provide a better experience for everyone.
            </p>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card border border-border rounded-lg p-6 space-y-5"
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
                  className="bg-background border-accent/50 focus:border-primary h-9" 
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
                  className="bg-background border-accent/50 focus:border-primary h-9"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Feedback Type</label>
              <Select name="feedbackType" defaultValue="general">
                <SelectTrigger className="bg-background border-accent/50 focus:border-primary h-9">
                  <SelectValue placeholder="Select feedback type" />
                </SelectTrigger>
                <SelectContent>
                  {feedbackTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
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
                className="bg-background border-accent/50 focus:border-primary min-h-[120px]"
              />
            </div>

            <Button
              type="submit"
              size="sm"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Sending..."
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


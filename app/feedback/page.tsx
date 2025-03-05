"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MessageSquare, Send } from "lucide-react"
import Header from "../components/Header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
      // You might want to show an error message to the user here
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center"
          >
            <div className="bg-card border border-border rounded-xl p-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Thank You!</h2>
              <p className="text-muted-foreground">
                We appreciate your feedback. We'll review it and use it to improve our service.
              </p>
              <Button onClick={() => setSubmitted(false)} className="mt-6" variant="outline">
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
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-6">
              We'd Love to Hear From You
            </h1>
            <p className="text-xl text-muted-foreground">
              Your feedback helps us improve and provide a better experience for everyone.
            </p>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-card border border-border rounded-xl p-8 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="name">
                  Name
                </label>
                <Input name="name" id="name" placeholder="Your name" required className="bg-background" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="email">
                  Email
                </label>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  className="bg-background"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Feedback Type</label>
              <Select name="feedbackType" defaultValue="general">
                <SelectTrigger className="bg-background">
                  <SelectValue placeholder="Select feedback type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Feedback</SelectItem>
                  <SelectItem value="bug">Bug Report</SelectItem>
                  <SelectItem value="feature">Feature Request</SelectItem>
                  <SelectItem value="content">Content Related</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="message">
                Your Message
              </label>
              <Textarea
                name="message"
                id="message"
                placeholder="Tell us what you think..."
                required
                className="bg-background min-h-[150px]"
              />
            </div>

            <Button
              type="submit"
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


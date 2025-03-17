"use client"

import { motion } from "framer-motion"
import { Shield, Lock, Eye, Server, Mail, FileText } from "lucide-react"
import Header from "../components/Header"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const sections = [
  {
    icon: Shield,
    title: "Information We Collect",
    content:
      "We collect information you provide directly to us, such as when you create an account, use our services, or communicate with us. This may include your name, email address, and viewing preferences.",
  },
  {
    icon: Lock,
    title: "How We Use Your Information",
    content:
      "We use the information we collect to provide, maintain, and improve our services, to develop new features, and to protect BingeIt and our users.",
  },
  {
    icon: Eye,
    title: "Information Sharing",
    content:
      "We do not share your personal information with third parties except as described in this policy or with your consent.",
  },
  {
    icon: Server,
    title: "Data Security",
    content:
      "We implement appropriate technical and organizational measures to protect the security of your personal information.",
  },
]

export default function PrivacyPolicyPage() {
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
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              At BingeIt, we take your privacy seriously. This Privacy Policy outlines how we collect, use, and protect
              your personal information.
            </p>
          </div>

          <div className="space-y-6">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors group"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <section.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-foreground mb-2">{section.title}</h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">{section.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 bg-card border border-border rounded-lg p-6 text-center"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-lg font-semibold text-foreground mb-2">Have Questions?</h2>
            <p className="text-sm text-muted-foreground mb-4">
              For any questions or concerns about our privacy practices, please don't hesitate to reach out.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="outline" size="sm" className="group">
                <Mail className="mr-2 h-4 w-4" />
                Contact Support
              </Button>
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                Read Terms of Service
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}


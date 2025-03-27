"use client"

import { motion } from "framer-motion"
import { Shield, Lock, Eye, Server, Mail, FileText, Sparkles, ArrowRight } from "lucide-react"
import Header from "../components/Header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

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
      "We use the information we collect to provide, maintain, and improve our services, to develop new features, and to protect our users.",
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
            <div className="w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-[#A259FF]" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Privacy Policy
            </h1>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              At <span className="inline-flex items-center align-middle mx-0"><Image src="/whattobinge.png" alt="WhatToBinge Logo" width={100} height={25} className="object-contain" /></span>, we take your privacy seriously. This Privacy Policy outlines how we collect, use, and protect
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
                className="bg-card border border-border rounded-lg p-6 hover:border-[#A259FF]/50 transition-colors group"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 flex items-center justify-center">
                    <section.icon className="w-5 h-5 text-[#A259FF]" />
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
            <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4">
              <Mail className="w-6 h-6 text-[#A259FF]" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Need Help?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              If you have any questions about our Privacy Policy, please contact our support team.
            </p>
            <Link
              href="mailto:hello@whattobinge.com"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#A259FF] hover:text-[#A259FF]/90 transition-colors"
            >
              Contact Support
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}


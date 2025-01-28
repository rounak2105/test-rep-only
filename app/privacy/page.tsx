"use client"

import { motion } from "framer-motion"
import { Shield, Lock, Eye, Server } from "lucide-react"
import Header from "../components/Header"

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
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600 mb-6">
              Privacy Policy
            </h1>
            <p className="text-xl text-muted-foreground">
              At BingeIt, we take your privacy seriously. This Privacy Policy outlines how we collect, use, and protect
              your personal information.
            </p>
          </div>

          <div className="space-y-8">
            {sections.map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary transition-colors"
              >
                <div className="flex items-start space-x-4">
                  <section.icon className="w-6 h-6 text-primary mt-1" />
                  <div>
                    <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
                    <p className="text-muted-foreground">{section.content}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 bg-card border border-border rounded-xl p-8"
          >
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-muted-foreground">
              For any questions or concerns about our privacy practices, please contact us at{" "}
              <a href="mailto:privacy@bingeit.com" className="text-primary hover:underline">
                privacy@bingeit.com
              </a>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}


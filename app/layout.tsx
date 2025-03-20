import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { FilterProvider } from "./context/FilterContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "WhatToBinge? Your Next Obsession Starts Here",
  description: "Discover your next favorite movies and TV shows with What To Binge. Get personalized recommendations, explore trending content, and find the best entertainment across all major streaming platforms.",
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "WhatToBinge? Your Next Obsession Starts Here",
    description: "Discover your next favorite movies and TV shows with What To Binge",
    url: "https://whattobinge.com",
    siteName: "What To Binge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatToBinge? Your Next Obsession Starts Here",
    description: "Discover your next favorite movies and TV shows with What To Binge",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={inter.className}>
        <FilterProvider>
          <Header />
          <main className="flex-grow pt-16 px-4 md:px-8 pb-32">{children}</main>
          <Footer />
        </FilterProvider>
      </body>
    </html>
  )
}

import './globals.css'

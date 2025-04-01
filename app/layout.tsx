import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { FilterProvider } from "./context/FilterContext"
import Analytics from "./components/Analytics"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "WhatToBinge? Your Next Obsession Starts Here",
  description: "Discover your next favorite movies and TV shows with What To Binge. Get personalized recommendations, explore trending content, and find the best entertainment across all major streaming platforms.",
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon.ico", sizes: "any" }
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
    other: [
      {
        rel: "android-chrome",
        url: "/favicon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        rel: "android-chrome",
        url: "/favicon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  },
  manifest: "/favicon/site.webmanifest",
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
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon/favicon-16x16.png" />
        <link rel="icon" type="image/x-icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <Analytics />
        <FilterProvider>
          <Header />
          <main className="flex-grow pt-16 px-1 sm:px-2 lg:px-8 pb-32">{children}</main>
          <Footer />
        </FilterProvider>
      </body>
    </html>
  )
}

import './globals.css'

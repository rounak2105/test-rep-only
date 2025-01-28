"use client"

import { useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import ContentCard from "./ContentCard"
import type { Show } from "../lib/api"

interface ContentRowProps {
  title: string
  contents: Show[]
  theme: "dark" | "light"
}

export default function ContentRow({ title, contents, theme }: ContentRowProps) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [isMoved, setIsMoved] = useState(false)

  const handleClick = (direction: "left" | "right") => {
    setIsMoved(true)

    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current
      const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth

      rowRef.current.scrollTo({ left: scrollTo, behavior: "smooth" })
    }
  }

  return (
    <div className="space-y-2 md:space-y-4">
      <h2 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-black"} md:text-2xl`}>{title}</h2>
      <div className="group relative md:-ml-2">
        <ChevronLeft
          className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
            theme === "dark" ? "bg-black/30" : "bg-white/30"
          } rounded-full ${!isMoved && "hidden"}`}
          onClick={() => handleClick("left")}
        />

        <div
          ref={rowRef}
          className="flex items-center space-x-2.5 overflow-x-scroll scrollbar-hide md:space-x-4 md:p-4"
        >
          {contents.map((content) => (
            <ContentCard key={content.id} content={content} theme={theme} />
          ))}
        </div>

        <ChevronRight
          className={`absolute top-0 bottom-0 right-2 z-40 m-auto h-9 w-9 cursor-pointer opacity-0 transition hover:scale-125 group-hover:opacity-100 ${
            theme === "dark" ? "bg-black/30" : "bg-white/30"
          } rounded-full`}
          onClick={() => handleClick("right")}
        />
      </div>
    </div>
  )
}


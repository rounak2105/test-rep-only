import { Button } from "@/components/ui/button"
import { Sparkles } from "lucide-react"
import Link from "next/link"

interface AIRecommendButtonProps {
  className?: string
}

export function AIRecommendButton({ className = "" }: AIRecommendButtonProps) {
  return (
    <Link href="/recommend" passHref>
      <Button className={`bg-[#A259FF] text-white hover:bg-[#A259FF]/90 ${className}`}>
        <Sparkles className="mr-2 h-4 w-4" />
        AI Recommendations
      </Button>
    </Link>
  )
}


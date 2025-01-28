export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background border-t border-border mt-auto py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-6 mb-4 text-sm">
          <a href="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors">
            Terms & Privacy Policy
          </a>
          <a href="/feedback" className="text-blue-400 hover:text-blue-300 transition-colors">
            Send us feedback
          </a>
          <a href="/about" className="text-blue-400 hover:text-blue-300 transition-colors">
            About
          </a>
        </div>
        <div className="text-center text-sm text-muted-foreground">
          © {currentYear}, BingeIt Entertainment or its affiliates
        </div>
      </div>
    </footer>
  )
}


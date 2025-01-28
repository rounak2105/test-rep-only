import Header from "./components/Header"
import Footer from "./components/Footer"
import "./globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-background text-foreground">
        <Header />
        <main className="flex-grow pt-16 px-4 md:px-8 pb-16">{children}</main>
        <Footer />
      </body>
    </html>
  )
}


import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/services"
import { Portfolio } from "@/components/portfolio"
import { Stats } from "@/components/stats"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { Team } from "@/components/team"
import { AboutOptimized } from "@/components/about-optimized"
import GSAPMediaCarousel from "@/components/gsap-media-carousel"

export default function Home() {
  const mediaItems = [
    {
      id: "1",
      type: "image" as const,
      src: "/placeholder.svg?height=400&width=400",
      alt: "Tournoi ESports - Finale League of Legends",
    },
    {
      id: "2",
      type: "image" as const,
      src: "/placeholder.svg?height=400&width=400",
      alt: "Gaming Setup - Station Pro",
    },
    {
      id: "3",
      type: "image" as const,
      src: "/placeholder.svg?height=400&width=400",
      alt: "Équipe ESports - Champions",
    },
    {
      id: "4",
      type: "image" as const,
      src: "/placeholder.svg?height=400&width=400",
      alt: "Streaming Setup - Studio",
    },
    {
      id: "5",
      type: "image" as const,
      src: "/placeholder.svg?height=400&width=400",
      alt: "Tournoi Counter-Strike",
    },
    {
      id: "6",
      type: "image" as const,
      src: "/placeholder.svg?height=400&width=400",
      alt: "Gaming Arena - Événement",
    },
    {
      id: "7",
      type: "image" as const,
      src: "/placeholder.svg?height=400&width=400",
      alt: "Cérémonie de Remise des Prix",
    },
    {
      id: "8",
      type: "image" as const,
      src: "/placeholder.svg?height=400&width=400",
      alt: "Communauté Gaming",
    },
    {
      id: "9",
      type: "image" as const,
      src: "/placeholder.svg?height=400&width=400",
      alt: "Tournoi Mobile Gaming",
    },
    {
      id: "10",
      type: "image" as const,
      src: "/placeholder.svg?height=400&width=400",
      alt: "ESports Arena - Vue d'ensemble",
    },
  ]

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Header />
      <Hero />
      <Stats />
      <GSAPMediaCarousel items={mediaItems} />
      <Services />
      <AboutOptimized />
      <Team />
      <Portfolio />
      <Contact />
      <Footer />
    </div>
  )
}

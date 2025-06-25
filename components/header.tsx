"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { AnimatedMenu } from "@/components/animated-menu"
import { Menu, X, Sparkles, Zap } from "lucide-react"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isClient, setIsClient] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    setIsClient(true)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Track active section for mobile menu
      const sections = ["home", "stats-section", "services", "about-section", "team", "portfolio", "contact"]
      const scrollPosition = window.scrollY + 100

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("mousemove", handleMouseMove)
    handleScroll() // Check initial position

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const navItems = [
    { href: "#home", label: "Accueil", id: "home" },
    { href: "#stats-section", label: "Statistiques", id: "stats-section" },
    { href: "#services", label: "Services", id: "services" },
    { href: "#about-section", label: "À Propos", id: "about-section" },
    { href: "#team", label: "Équipe", id: "team" },
    { href: "#portfolio", label: "Portfolio", id: "portfolio" },
    { href: "#contact", label: "Contact", id: "contact" },
  ]

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border dark:shadow-2xl"
          : "bg-transparent"
      }`}
    >
      {/* Animated background particles - only render on client */}
      {isClient && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse transition-all duration-300"
            style={{
              left: `${(mousePosition.x / window.innerWidth) * 100}%`,
              top: `${(mousePosition.y / window.innerHeight) * 100}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
          <div
            className="absolute w-0.5 h-0.5 bg-secondary/40 rounded-full animate-ping"
            style={{
              left: `${((mousePosition.x + 100) / window.innerWidth) * 100}%`,
              top: `${((mousePosition.y + 50) / window.innerHeight) * 100}%`,
              animationDelay: "0.5s",
            }}
          />
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Enhanced Logo */}
          <Link href="#home" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 lg:w-12 lg:h-12 group-hover:scale-110 transition-transform duration-300">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full opacity-0 group-hover:opacity-20 animate-pulse" />
              <Image src="/logo.png" alt="North Events Logo" fill className="object-contain relative z-10" priority />
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-primary opacity-0 group-hover:opacity-100 animate-bounce transition-opacity duration-300" />
            </div>
            <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent group-hover:animate-pulse">
              North Events
            </span>
            <Zap className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 animate-bounce transition-all duration-300" />
          </Link>

          {/* Desktop Navigation with Animated Menu */}
          <div className="hidden lg:flex items-center">
            <AnimatedMenu />
          </div>

          {/* Enhanced Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <ThemeToggle />
            <Button className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-primary-foreground font-semibold px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg group relative overflow-hidden">
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
              <span className="relative">Devis Gratuit</span>
              <Sparkles className="ml-2 w-4 h-4 group-hover:animate-spin relative" />
            </Button>
          </div>

          {/* Enhanced Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              className="p-2 rounded-md text-foreground hover:text-primary transition-all duration-300 hover:bg-accent group"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="relative w-6 h-6">
                <Menu
                  size={24}
                  className={`absolute inset-0 transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-180 opacity-0" : "rotate-0 opacity-100"
                  } group-hover:scale-110`}
                />
                <X
                  size={24}
                  className={`absolute inset-0 transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-0 opacity-100" : "rotate-180 opacity-0"
                  } group-hover:scale-110`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Enhanced Mobile Menu with Active States */}
        <div
          className={`lg:hidden absolute top-full left-0 w-full bg-background/95 backdrop-blur-md shadow-lg border-t border-border transition-all duration-500 ${
            isMobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <nav className="px-4 py-6 space-y-4">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.id

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block transition-all duration-300 font-medium py-3 px-4 rounded-lg group relative overflow-hidden ${
                    isActive
                      ? "text-primary bg-primary/10 border-l-4 border-primary font-semibold"
                      : "text-foreground hover:text-primary hover:bg-accent"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300" />
                  <span className="relative flex items-center">
                    {item.label}
                    {isActive && <div className="ml-auto w-2 h-2 bg-primary rounded-full animate-pulse" />}
                  </span>
                </Link>
              )
            })}
            <Button className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold py-3 rounded-full mt-4 hover:shadow-lg transition-all duration-300 group relative overflow-hidden">
              <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative">Devis Gratuit</span>
            </Button>
          </nav>
        </div>
      </div>
    </header>
  )
}

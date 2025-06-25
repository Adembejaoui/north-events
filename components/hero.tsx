"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Star, Zap, Target, Trophy } from "lucide-react"
import Image from "next/image"

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true)
    setIsVisible(true)

    // Mouse tracking for parallax effects
    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroRef.current?.getBoundingClientRect()
      if (rect) {
        setMousePosition({
          x: (e.clientX - rect.left - rect.width / 2) / rect.width,
          y: (e.clientY - rect.top - rect.height / 2) / rect.height,
        })
      }
    }

    // Particle system
    const createParticles = () => {
      if (!particlesRef.current) return

      for (let i = 0; i < 50; i++) {
        const particle = document.createElement("div")
        particle.className = "absolute w-1 h-1 bg-primary/20 dark:bg-primary/30 rounded-full animate-float"
        particle.style.left = Math.random() * 100 + "%"
        particle.style.top = Math.random() * 100 + "%"
        particle.style.animationDelay = Math.random() * 3 + "s"
        particle.style.animationDuration = 3 + Math.random() * 4 + "s"
        particlesRef.current.appendChild(particle)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    createParticles()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const floatingIcons = [
    { Icon: Zap, delay: 0, position: { top: "20%", left: "10%" } },
    { Icon: Target, delay: 1, position: { top: "60%", right: "10%" } },
    { Icon: Trophy, delay: 2, position: { top: "18%", right: "25%" } },
    { Icon: Star, delay: 0.5, position: { bottom: "35%", left: "30%" } },
  ]

  return (
    <section ref={heroRef} id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Enhanced Background Gradient with Dark Mode Support */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary to-secondary/90 dark:from-primary/80 dark:via-primary/70 dark:to-secondary/80">
        <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent animate-pulse" />
      </div>

      {/* Animated Particles - only render on client */}
      {isClient && <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />}

      {/* Floating Gaming Icons */}
      {isClient &&
        floatingIcons.map(({ Icon, delay, position }, index) => (
          <div
            key={index}
            className={`absolute pointer-events-none transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{
              ...position,
              animationDelay: `${delay}s`,
              transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
            }}
          >
            <div className="w-16 h-16 bg-background/10 backdrop-blur-sm rounded-2xl flex items-center justify-center animate-bounce-in border border-border/20">
              <Icon className="w-8 h-8 text-primary-foreground/80 animate-pulse" />
            </div>
          </div>
        ))}

      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            animation: "grid-move 20s linear infinite",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Enhanced Content */}
          <div className="text-center lg:text-left">
            <div
              className={`flex items-center justify-center lg:justify-start mb-6 transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="flex items-center bg-background/20 backdrop-blur-sm rounded-full px-6 py-3 border border-border/30 hover:bg-background/30 transition-all duration-300 group">
                <Star className="w-5 h-5 text-yellow-300 mr-3 animate-spin group-hover:animate-pulse" />
                <span className="text-primary-foreground text-sm font-medium">Agence ESports #1 en Tunisie</span>
                <div className="ml-3 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </div>
            </div>

            <h1
              className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={
                isClient
                  ? {
                      transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 5}px)`,
                    }
                  : {}
              }
            >
              Créons des{" "}
              <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent animate-pulse">
                Expériences
              </span>{" "}
              ESports Épiques
            </h1>

            <p
              className={`text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto lg:mx-0 transition-all duration-1000 delay-400 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              North Events est l'agence ESports de référence en Tunisie. Nous organisons des tournois, événements
              gaming, streams professionnels et expériences immersives pour la communauté gaming.
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-1000 delay-600 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <Button
                size="lg"
                className="bg-background text-primary hover:bg-background/90 font-semibold my-10 px- py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                <span className="relative">Découvrir nos Services</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform relative" />
              </Button>

              
            </div>

            {/* Enhanced Stats with Animations */}
            <div
              className={`grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-primary-foreground/20 transition-all duration-1000 delay-800 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              {[
                { value: "200+", label: "Tournois Organisés", delay: 0 },
                { value: "10K+", label: "Gamers Participants", delay: 0.2 },
                { value: "5+", label: "Années ESports", delay: 0.4 },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="text-center group cursor-pointer"
                  style={{ animationDelay: `${stat.delay}s` }}
                >
                  <div className="text-3xl font-bold text-primary-foreground group-hover:scale-110 transition-transform duration-300 animate-bounce-in">
                    {stat.value}
                  </div>
                  <div className="text-primary-foreground/80 text-sm group-hover:text-primary-foreground transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Visual Element */}
          <div
            className={`relative transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={
              isClient
                ? {
                    transform: `translate(${mousePosition.x * -15}px, ${mousePosition.y * -10}px)`,
                  }
                : {}
            }
          >
            <div className="relative w-full h-96 lg:h-[500px] group">
              {/* Enhanced Background with Multiple Layers */}
              <div className="absolute inset-0 bg-background/10 backdrop-blur-sm rounded-3xl border border-border/20 flex items-center justify-center overflow-hidden group-hover:border-border/40 transition-all duration-500">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-purple-400/30 animate-pulse" />
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-foreground/50 to-transparent animate-scan-line" />
                </div>

                {/* Content */}
                <div className="text-center text-primary-foreground relative z-10">
                  <div className="w-32 h-32 mx-auto mb-6 bg-background/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-purple-400/30 animate-spin" />
                    <Image
                      src="/logo.png"
                      alt="North Events"
                      width={64}
                      height={64}
                      className="opacity-80 relative z-10 group-hover:animate-pulse"
                    />
                  </div>
                  <p className="text-2xl font-bold mb-2 group-hover:text-cyan-300 transition-colors duration-300">
                    Tournois ESports
                  </p>
                  <p className="text-primary-foreground/80 group-hover:text-primary-foreground transition-colors duration-300">
                    Gaming & Compétition
                  </p>

                  {/* Floating Elements */}
                  <div className="absolute top-4 right-4 w-4 h-4 bg-green-400 rounded-full animate-ping" />
                  <div className="absolute bottom-4 left-4 w-3 h-3 bg-yellow-400 rounded-full animate-bounce" />
                  <div className="absolute top-1/2 left-4 w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 -z-10" />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="flex flex-col items-center text-primary-foreground/60 hover:text-primary-foreground transition-colors duration-300 cursor-pointer group">
          <span className="text-sm mb-2 group-hover:animate-pulse">Scroll pour découvrir</span>
          <div className="w-6 h-10 border-2 border-primary-foreground/40 rounded-full flex justify-center group-hover:border-primary-foreground transition-colors duration-300">
            <div className="w-1 h-3 bg-primary-foreground/60 rounded-full mt-2 animate-bounce group-hover:bg-primary-foreground" />
          </div>
        </div>
      </div>
    </section>
  )
}

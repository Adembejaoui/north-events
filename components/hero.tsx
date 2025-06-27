"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Zap, Target, Trophy } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TextPlugin } from "gsap/TextPlugin"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, TextPlugin)
}

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isClient, setIsClient] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)
  const particlesRef = useRef<HTMLDivElement>(null)
  const floatingIconsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsClient(true)

    if (!heroRef.current) return

    const ctx = gsap.context(() => {
      // Initial setup - hide elements but keep them in correct position
      gsap.set([titleRef.current, subtitleRef.current, ctaRef.current, statsRef.current], {
        opacity: 0,
        y: 50, // Reduced initial offset
      })

      gsap.set(visualRef.current, {
        opacity: 0,
        scale: 0.9, // Less dramatic initial scale
        rotation: -5, // Reduced initial rotation
      })

      // Main timeline
      const tl = gsap.timeline({ delay: 0.5 })

      // Animate title with split text effect
      if (titleRef.current) {
        const titleText = titleRef.current.textContent || ""
        titleRef.current.innerHTML = titleText
          .split(" ")
          .map(
            (word) =>
              `<span class="word">${word
                .split("")
                .map((char) => `<span class="char">${char}</span>`)
                .join("")}</span>`,
          )
          .join(" ")

        tl.to(titleRef.current, {
          opacity: 1,
          duration: 0.1,
        }).fromTo(
          ".char",
          {
            opacity: 0,
            y: 100,
            rotationX: -90,
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.8,
            stagger: 0.02,
            ease: "back.out(1.7)",
          },
        )
      }

      // Animate subtitle
      tl.to(
        subtitleRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.5",
      )

      // Animate CTA buttons
      tl.to(
        ctaRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.3",
      )

      // Animate stats
      tl.to(
        statsRef.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.5",
      )

      // Animate visual element
      tl.to(
        visualRef.current,
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.5)",
        },
        "-=1",
      )

      // Floating animation for visual
      gsap.to(visualRef.current, {
        y: -20,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      })

      // Parallax effect on scroll - only when actually scrolling
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          // Only apply parallax when we've actually started scrolling
          if (progress > 0) {
            gsap.to(titleRef.current, {
              y: progress * -50, // Reduced movement for better UX
              opacity: Math.max(0.3, 1 - progress * 0.3), // Keep some opacity
              duration: 0.3,
            })
            gsap.to(visualRef.current, {
              y: progress * -75, // Reduced movement
              rotation: progress * 5, // Reduced rotation
              duration: 0.3,
            })
          }
        },
      })
    }, heroRef)

    // Mouse tracking for parallax effects
    const handleMouseMove = (e: MouseEvent) => {
      const rect = heroRef.current?.getBoundingClientRect()
      if (rect) {
        const x = (e.clientX - rect.left - rect.width / 2) / rect.width
        const y = (e.clientY - rect.top - rect.height / 2) / rect.height
        setMousePosition({ x, y })

        // Animate floating icons based on mouse position
        gsap.to(floatingIconsRef.current?.children || [], {
          x: x * 30,
          y: y * 20,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
        })
      }
    }

    // Particle system
    const createParticles = () => {
      if (!particlesRef.current) return

      for (let i = 0; i < 50; i++) {
        const particle = document.createElement("div")
        particle.className = "absolute w-1 h-1 bg-primary/20 dark:bg-primary/30 rounded-full"
        particle.style.left = Math.random() * 100 + "%"
        particle.style.top = Math.random() * 100 + "%"
        particlesRef.current.appendChild(particle)

        // Animate particles
        gsap.to(particle, {
          y: -100,
          opacity: 0,
          duration: 3 + Math.random() * 4,
          repeat: -1,
          delay: Math.random() * 3,
          ease: "power2.out",
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    createParticles()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      ctx.revert()
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
      {/* Enhanced Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary to-secondary/90 dark:from-primary/80 dark:via-primary/70 dark:to-secondary/80">
        <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent" />
      </div>

      {/* Animated Particles */}
      {isClient && <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />}

      {/* Floating Gaming Icons */}
      {isClient && (
        <div ref={floatingIconsRef} className="absolute inset-0 pointer-events-none">
          {floatingIcons.map(({ Icon, delay, position }, index) => (
            <div key={index} className="absolute" style={position}>
              <div className="w-16 h-16 bg-background/10 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-border/20">
                <Icon className="w-8 h-8 text-primary-foreground/80" />
              </div>
            </div>
          ))}
        </div>
      )}

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
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Enhanced Content */}
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <div className="flex items-center bg-background/20 backdrop-blur-sm rounded-full px-6 py-3 border border-border/30">
                <Star className="w-5 h-5 text-yellow-300 mr-3" />
                <span className="text-primary-foreground text-sm font-medium">Agence ESports #1 en Tunisie</span>
                <div className="ml-3 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </div>
            </div>

            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight"
            >
              Créons des{" "}
              <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-red-300 bg-clip-text text-transparent">
                Expériences
              </span>{" "}
              ESports Épiques
            </h1>

            <p ref={subtitleRef} className="text-xl text-primary-foreground/90 mb-8 pt-10 max-w-2xl mx-auto lg:mx-0">
              North Events est l'agence ESports de référence en Tunisie. Nous organisons des tournois, événements
              gaming, streams professionnels et expériences immersives pour la communauté gaming.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="#services">
                <Button
                  size="lg"
                  className="bg-background text-primary hover:bg-background/90 font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                  <span className="relative">Découvrir nos Services</span>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform relative" />
                </Button>
              </Link>
            </div>

            {/* Enhanced Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-primary-foreground/20">
              {[
                { value: "200+", label: "Tournois Organisés" },
                { value: "10K+", label: "Gamers Participants" },
                { value: "5+", label: "Années ESports" },
              ].map((stat, index) => (
                <div key={index} className="text-center group cursor-pointer">
                  <div className="text-3xl font-bold text-primary-foreground group-hover:scale-110 transition-transform duration-300">
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
          <div ref={visualRef} className="relative">
            <div className="relative w-full h-96 lg:h-[500px] group">
              <div className="absolute inset-0 bg-background/10 backdrop-blur-sm rounded-3xl border border-border/20 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-purple-400/30" />
                </div>

                <div className="text-center text-primary-foreground relative z-10">
                  <div className="w-32 h-32 mx-auto mb-6 bg-background/20 rounded-full flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-purple-400/30" />
                    <Image
                      src="/logo.png"
                      alt="North Events"
                      width={64}
                      height={64}
                      className="opacity-80 relative z-10"
                    />
                  </div>
                  <p className="text-2xl font-bold mb-2">Tournois ESports</p>
                  <p className="text-primary-foreground/80">Gaming & Compétition</p>

                  <div className="absolute top-4 right-4 w-4 h-4 bg-green-400 rounded-full animate-ping" />
                  <div className="absolute bottom-4 left-4 w-3 h-3 bg-yellow-400 rounded-full animate-bounce" />
                  <div className="absolute top-1/2 left-4 w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                </div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-3xl blur-xl -z-10" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"
import { Trophy, Users, Star, Zap } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function Stats() {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([headerRef.current], { opacity: 0, y: 50 })
      gsap.set(".stat-card", { opacity: 0, y: 100, scale: 0.8 })

      // Header animation
      ScrollTrigger.create({
        trigger: headerRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(headerRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          })
        },
      })

      // Stats animation with counter effect
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(".stat-card", {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)",
          })

          // Animate counters
          document.querySelectorAll(".counter").forEach((counter, index) => {
            const target = Number.parseInt(counter.getAttribute("data-target") || "0")
            const suffix = counter.getAttribute("data-suffix") || ""

            gsap.fromTo(
              counter,
              { textContent: 0 },
              {
                textContent: target,
                duration: 2,
                delay: index * 0.2,
                ease: "power2.out",
                snap: { textContent: 1 },
                onUpdate: function () {
                  counter.textContent = Math.ceil(this.targets()[0].textContent).toLocaleString() + suffix
                },
              },
            )
          })
        },
      })

      // Parallax background
      gsap.to(".stats-bg-1", {
        y: -50,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const stats = [
    {
      number: 200,
      suffix: "+",
      label: "Tournois Organisés",
      description: "Depuis notre création en 2019",
      icon: Trophy,
      color: "from-yellow-500 to-orange-500",
      particles: ["🏆", "⚡", "🎯"],
    },
    {
      number: 10000,
      suffix: "+",
      label: "Gamers Participants",
      description: "Communauté active et engagée",
      icon: Users,
      color: "from-blue-500 to-cyan-500",
      particles: ["👥", "🎮", "💎"],
    },
    {
      number: 95,
      suffix: "%",
      label: "Satisfaction Gamers",
      description: "Événements de qualité premium",
      icon: Star,
      color: "from-green-500 to-emerald-500",
      particles: ["⭐", "✨", "🚀"],
    },
    {
      number: 50,
      suffix: "+",
      label: "Streamers Partenaires",
      description: "Créateurs de contenu gaming",
      icon: Zap,
      color: "from-purple-500 to-pink-500",
      particles: ["⚡", "📺", "🔥"],
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="stats-section"
      className="py-20 bg-muted/50 dark:bg-muted/20 relative overflow-hidden transition-colors duration-300"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="stats-bg-1 absolute inset-0 bg-gradient-to-br from-primary via-transparent to-secondary" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">L'ESports en Chiffres</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Des statistiques qui témoignent de notre leadership dans l'écosystème ESports tunisien
          </p>
        </div>

        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            const isHovered = hoveredStat === index

            return (
              <div
                key={index}
                className="stat-card text-center p-8 bg-card rounded-2xl shadow-lg hover:shadow-2xl dark:shadow-2xl dark:hover:shadow-primary/10 transition-all duration-500 transform cursor-pointer relative overflow-hidden group border border-border/50"
                onMouseEnter={() => {
                  setHoveredStat(index)
                  gsap.to(`.stat-card:nth-child(${index + 1})`, {
                    scale: 1.05,
                    y: -10,
                    duration: 0.3,
                    ease: "power2.out",
                  })
                }}
                onMouseLeave={() => {
                  setHoveredStat(null)
                  gsap.to(`.stat-card:nth-child(${index + 1})`, {
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out",
                  })
                }}
              >
                {/* Animated Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-500`}
                />

                {/* Floating Particles */}
                {isHovered &&
                  stat.particles.map((particle, pIndex) => (
                    <div
                      key={pIndex}
                      className="absolute text-xl animate-bounce pointer-events-none z-20"
                      style={{
                        top: `${15 + pIndex * 20}%`,
                        left: `${10 + pIndex * 25}%`,
                        animationDelay: `${pIndex * 0.3}s`,
                        animationDuration: "1.5s",
                      }}
                    >
                      {particle}
                    </div>
                  ))}

                {/* Icon */}
                <div className="mb-6 relative">
                  <div
                    className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative overflow-hidden`}
                  >
                    <div className="absolute inset-0 bg-white/20 dark:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <IconComponent className="w-8 h-8 text-white relative z-10" />
                  </div>
                  <div
                    className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-r ${stat.color} blur-xl opacity-0 group-hover:opacity-50 dark:group-hover:opacity-30 transition-opacity duration-500 -z-10`}
                  />
                </div>

                {/* Counter */}
                <div className="mb-4 relative">
                  <div
                    className={`counter text-4xl lg:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}
                    data-target={stat.number}
                    data-suffix={stat.suffix}
                  >
                    0{stat.suffix}
                  </div>
                  <div
                    className={`h-1 bg-gradient-to-r ${stat.color} mx-auto mt-2 transition-all duration-500 ${
                      isHovered ? "w-full" : "w-0"
                    }`}
                  />
                </div>

                <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {stat.label}
                </h3>
                <p className="text-muted-foreground text-sm group-hover:text-foreground transition-colors duration-300">
                  {stat.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

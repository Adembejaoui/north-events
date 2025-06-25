"use client"

import { useEffect, useState, useRef } from "react"
import { Trophy, Users, Star, Zap } from "lucide-react"

export function Stats() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredStat, setHoveredStat] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
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
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-transparent to-secondary animate-pulse" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(13, 148, 136, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(20, 184, 166, 0.1) 0%, transparent 50%)`,
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl lg:text-4xl font-bold text-foreground mb-4 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            L'ESports en Chiffres
          </h2>
          <p
            className={`text-xl text-muted-foreground max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Des statistiques qui témoignent de notre leadership dans l'écosystème ESports tunisien
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            const isHovered = hoveredStat === index

            return (
              <div
                key={index}
                className={`text-center p-8 bg-card rounded-2xl shadow-lg hover:shadow-2xl dark:shadow-2xl dark:hover:shadow-primary/10 transition-all duration-500 transform cursor-pointer relative overflow-hidden group border border-border/50 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                } ${isHovered ? "scale-110 -translate-y-4" : "hover:-translate-y-2"}`}
                style={{ animationDelay: `${index * 0.2}s` }}
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
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
                    <div className="absolute inset-0 bg-white/20 dark:bg-white/10 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <IconComponent className="w-8 h-8 text-white relative z-10 group-hover:animate-spin" />
                  </div>
                  {/* Glow Effect */}
                  <div
                    className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-r ${stat.color} blur-xl opacity-0 group-hover:opacity-50 dark:group-hover:opacity-30 transition-opacity duration-500 -z-10`}
                  />
                </div>

                {/* Counter */}
                <div className="mb-4 relative">
                  <div
                    className={`text-4xl lg:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300`}
                  >
                    {isVisible ? <CountUp end={stat.number} suffix={stat.suffix} /> : `0${stat.suffix}`}
                  </div>
                  {/* Animated underline */}
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

                {/* Corner decoration */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div
                    className={`absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br ${stat.color} rounded-full opacity-0 group-hover:opacity-20 dark:group-hover:opacity-10 transition-opacity duration-500 animate-spin`}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function CountUp({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = end / steps
    const stepDuration = duration / steps

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [end])

  return (
    <span className="inline-block">
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

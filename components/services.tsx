"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, Monitor, Gamepad2, Users, Zap, Headphones, ArrowRight, CheckCircle, Star } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

export function Services() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set([headerRef.current, ctaRef.current], { opacity: 0, y: 50 })
      gsap.set(".service-card", { opacity: 0, y: 100, scale: 0.8 })

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

      // Cards stagger animation
      ScrollTrigger.create({
        trigger: cardsRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(".service-card", {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "back.out(1.7)",
          })
        },
      })

      // CTA animation
      ScrollTrigger.create({
        trigger: ctaRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(ctaRef.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
          })
        },
      })

      // Parallax background elements
      gsap.to(".bg-element-1", {
        y: -100,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      })

      gsap.to(".bg-element-2", {
        y: -150,
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

  const services = [
    {
      icon: Trophy,
      title: "Tournois ESports",
      description:
        "Organisation complète de tournois compétitifs pour tous les jeux populaires avec cashprize attractifs.",
      features: ["Gestion des brackets", "Streaming live", "Cashprize garantis"],
      color: "from-yellow-500 to-yellow-600",
      particles: ["⚡", "🏆", "💎"],
    },
    {
      icon: Monitor,
      title: "Événements Gaming",
      description: "LAN parties, conventions gaming et événements communautaires pour rassembler les passionnés.",
      features: ["Setup technique complet", "Animation gaming", "Expérience immersive"],
      color: "from-blue-500 to-blue-600",
      particles: ["🎮", "💻", "🔥"],
    },
    {
      icon: Gamepad2,
      title: "Compétitions Corporate",
      description: "Team building gaming et tournois d'entreprise pour renforcer la cohésion d'équipe.",
      features: ["Formats personnalisés", "Coaching inclus", "Récompenses sur mesure"],
      color: "from-green-500 to-green-600",
      particles: ["🎯", "⭐", "🚀"],
    },
    {
      icon: Users,
      title: "Community Management",
      description: "Gestion et animation de communautés gaming avec création de contenu et engagement.",
      features: ["Stratégie communautaire", "Création de contenu", "Modération professionnelle"],
      color: "from-purple-500 to-purple-600",
      particles: ["👥", "💬", "❤️"],
    },
    {
      icon: Zap,
      title: "Production Streaming",
      description: "Production professionnelle de streams avec overlay personnalisés et régie technique.",
      features: ["Régie streaming pro", "Overlays custom", "Multi-plateforme"],
      color: "from-red-500 to-red-600",
      particles: ["📺", "🎬", "✨"],
    },
    {
      icon: Headphones,
      title: "Coaching ESports",
      description: "Formation et coaching pour joueurs et équipes souhaitant progresser en compétition.",
      features: ["Coachs expérimentés", "Analyse de gameplay", "Stratégies avancées"],
      color: "from-indigo-500 to-indigo-600",
      particles: ["🎧", "📊", "🎓"],
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-20 bg-background relative overflow-hidden transition-colors duration-300"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="bg-element-1 absolute top-20 left-10 w-64 h-64 bg-primary rounded-full blur-3xl" />
        <div className="bg-element-2 absolute bottom-20 right-10 w-48 h-48 bg-secondary rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="inline-flex items-center bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-medium mb-6 border border-primary/20">
            <Gamepad2 className="w-5 h-5 mr-2" />
            Nos Services ESports
            <Star className="w-4 h-4 ml-2" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">L'Écosystème ESports Complet</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            De l'organisation de tournois à la production de contenu, nous maîtrisons tous les aspects de l'ESports pour
            offrir des expériences gaming exceptionnelles.
          </p>
        </div>

        {/* Enhanced Services Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon
            const isHovered = hoveredCard === index

            return (
              <Card
                key={index}
                className="service-card group hover:shadow-2xl dark:hover:shadow-primary/10 transition-all duration-500 transform border-0 shadow-lg dark:shadow-xl overflow-hidden relative cursor-pointer bg-card"
                onMouseEnter={() => {
                  setHoveredCard(index)
                  gsap.to(`.service-card:nth-child(${index + 1})`, {
                    scale: 1.05,
                    y: -10,
                    duration: 0.3,
                    ease: "power2.out",
                  })
                }}
                onMouseLeave={() => {
                  setHoveredCard(null)
                  gsap.to(`.service-card:nth-child(${index + 1})`, {
                    scale: 1,
                    y: 0,
                    duration: 0.3,
                    ease: "power2.out",
                  })
                }}
              >
                {/* Animated Background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-500`}
                />

                {/* Floating Particles */}
                {isHovered &&
                  service.particles.map((particle, pIndex) => (
                    <div
                      key={pIndex}
                      className="absolute text-2xl animate-bounce pointer-events-none z-20"
                      style={{
                        top: `${20 + pIndex * 25}%`,
                        right: `${10 + pIndex * 15}%`,
                        animationDelay: `${pIndex * 0.2}s`,
                        animationDuration: "2s",
                      }}
                    >
                      {particle}
                    </div>
                  ))}

                <CardContent className="p-8 relative z-10">
                  {/* Enhanced Icon */}
                  <div className="relative mb-6">
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center group-hover:scale-110 transition-all duration-500 relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-white/20 dark:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <IconComponent className="w-8 h-8 text-white relative z-10" />
                    </div>
                    <div
                      className={`absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} blur-xl opacity-0 group-hover:opacity-50 dark:group-hover:opacity-30 transition-opacity duration-500 -z-10`}
                    />
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed group-hover:text-foreground transition-colors duration-300">
                    {service.description}
                  </p>

                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-all duration-300"
                      >
                        <CheckCircle className="w-4 h-4 text-primary mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant="ghost"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 font-medium relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                    <span className="relative">En savoir plus</span>
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform relative" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Enhanced CTA Section */}
        <div
          ref={ctaRef}
          className="text-center bg-gradient-to-r from-primary to-secondary rounded-3xl p-12 text-primary-foreground relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent" />
          </div>

          <div className="relative z-10">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">Prêt à Dominer la Scène ESports ?</h3>
            <p className="text-xl mb-8 opacity-90">
              Contactez-nous pour organiser votre prochain tournoi ou événement gaming
            </p>
            <Button
              size="lg"
              className="bg-background text-primary hover:bg-background/90 font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
              <span className="relative">Lancer Votre Projet ESports</span>
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform relative" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

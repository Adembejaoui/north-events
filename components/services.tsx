"use client"

import { useEffect, useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, Monitor, Gamepad2, Users, Zap, Headphones, ArrowRight, CheckCircle, Star } from "lucide-react"

export function Services() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Stagger the animation of cards
            services.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, index])
              }, index * 200)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
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
        <div className="absolute top-20 left-10 w-64 h-64 bg-primary rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-10 w-48 h-48 bg-secondary rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-medium mb-6 animate-bounce-in border border-primary/20">
            <Gamepad2 className="w-5 h-5 mr-2 animate-spin" />
            Nos Services ESports
            <Star className="w-4 h-4 ml-2 animate-pulse" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 animate-fade-in">
            L'Écosystème ESports Complet
          </h2>
          <p
            className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            De l'organisation de tournois à la production de contenu, nous maîtrisons tous les aspects de l'ESports pour
            offrir des expériences gaming exceptionnelles.
          </p>
        </div>

        {/* Enhanced Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon
            const isVisible = visibleCards.includes(index)
            const isHovered = hoveredCard === index

            return (
              <Card
                key={index}
                className={`group hover:shadow-2xl dark:hover:shadow-primary/10 transition-all duration-500 transform border-0 shadow-lg dark:shadow-xl overflow-hidden relative cursor-pointer bg-card ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                } ${isHovered ? "scale-105 -translate-y-4" : "hover:-translate-y-2"}`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  animationDelay: `${index * 0.1}s`,
                  transform: isHovered ? "scale(1.05) translateY(-16px)" : undefined,
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
                      className="absolute text-2xl animate-bounce pointer-events-none"
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
                      <div className="absolute inset-0 bg-white/20 dark:bg-white/10 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <IconComponent className="w-8 h-8 text-white relative z-10 group-hover:animate-bounce" />
                    </div>
                    {/* Glow Effect */}
                    <div
                      className={`absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} blur-xl opacity-0 group-hover:opacity-50 dark:group-hover:opacity-30 transition-opacity duration-500 -z-10`}
                    />
                  </div>

                  {/* Enhanced Content */}
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed group-hover:text-foreground transition-colors duration-300">
                    {service.description}
                  </p>

                  {/* Enhanced Features */}
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center text-sm text-muted-foreground group-hover:text-foreground transition-all duration-300"
                        style={{
                          animationDelay: `${featureIndex * 0.1}s`,
                          transform: isHovered ? `translateX(${featureIndex * 2}px)` : undefined,
                        }}
                      >
                        <CheckCircle className="w-4 h-4 text-primary mr-3 flex-shrink-0 group-hover:animate-spin" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Enhanced CTA */}
                  <Button
                    variant="ghost"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 font-medium relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                    <span className="relative">En savoir plus</span>
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform relative" />
                  </Button>
                </CardContent>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden">
                  <div
                    className={`absolute top-0 right-0 w-0 h-0 border-l-[80px] border-l-transparent border-t-[80px] border-t-gradient-to-r ${service.color} opacity-0 group-hover:opacity-20 dark:group-hover:opacity-10 transition-opacity duration-500`}
                  />
                </div>
              </Card>
            )
          })}
        </div>

        {/* Enhanced CTA Section */}
        <div
          className="text-center bg-gradient-to-r from-primary to-secondary rounded-3xl p-12 text-primary-foreground relative overflow-hidden animate-fade-in"
          style={{ animationDelay: "1s" }}
        >
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse" />
            <div className="absolute top-0 left-0 w-full h-1 bg-white/50 animate-scan-line" />
          </div>

          <div className="relative z-10">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4 animate-bounce-in">Prêt à Dominer la Scène ESports ?</h3>
            <p className="text-xl mb-8 opacity-90 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              Contactez-nous pour organiser votre prochain tournoi ou événement gaming
            </p>
            <Button
              size="lg"
              className="bg-background text-primary hover:bg-background/90 font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group relative overflow-hidden animate-bounce-in"
              style={{ animationDelay: "0.4s" }}
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

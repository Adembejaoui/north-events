"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Award,
  Heart,
  Lightbulb,
  Shield,
  ArrowRight,
  Quote,
  ChevronLeft,
  ChevronRight,
  Play,
  Users,
  Trophy,
  Target,
  Gamepad2,
  Monitor,
} from "lucide-react"

export function About() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("about-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const values = [
    {
      icon: Heart,
      title: "Passion Gaming",
      description: "Nous vivons et respirons ESports, chaque projet est une nouvelle aventure gaming.",
      color: "from-red-500 to-pink-500",
    },
    {
      icon: Lightbulb,
      title: "Innovation Tech",
      description: "Nous intégrons les dernières technologies pour des expériences gaming révolutionnaires.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: Award,
      title: "Excellence Compétitive",
      description: "Nous visons la perfection dans chaque tournoi et événement ESports.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Shield,
      title: "Fair Play",
      description: "Nous promouvons l'intégrité et l'esprit sportif dans toutes nos compétitions.",
      color: "from-green-500 to-emerald-500",
    },
  ]

  const carouselSlides = [
    {
      title: "Notre Mission",
      subtitle: "Révolutionner l'ESports en Tunisie",
      description:
        "Créer un écosystème ESports dynamique qui connecte les joueurs, développe les talents et positionne la Tunisie sur la carte mondiale du gaming compétitif.",
      icon: Target,
      stats: { label: "Objectif", value: "Leader MENA" },
      color: "from-purple-600 to-blue-600",
    },
    {
      title: "Notre Vision",
      subtitle: "L'Avenir du Gaming Tunisien",
      description:
        "Faire de la Tunisie un hub ESports reconnu internationalement, où chaque gamer peut réaliser son potentiel et où l'innovation technologique rencontre la passion du jeu.",
      icon: Gamepad2,
      stats: { label: "Horizon", value: "2030" },
      color: "from-green-600 to-teal-600",
    },
    {
      title: "Notre Expertise",
      subtitle: "5 Ans d'Excellence ESports",
      description:
        "Une expertise complète couvrant l'organisation de tournois, la production streaming, le coaching professionnel et le développement communautaire.",
      icon: Trophy,
      stats: { label: "Expérience", value: "5+ Ans" },
      color: "from-orange-600 to-red-600",
    },
    {
      title: "Notre Technologie",
      subtitle: "Infrastructure Gaming Avancée",
      description:
        "Équipements de pointe, streaming 4K, serveurs dédiés et solutions techniques innovantes pour des expériences gaming sans compromis.",
      icon: Monitor,
      stats: { label: "Qualité", value: "4K/60fps" },
      color: "from-cyan-600 to-blue-600",
    },
    {
      title: "Notre Impact",
      subtitle: "Communauté Gaming Unie",
      description:
        "Plus de 10,000 gamers touchés, 200+ tournois organisés et une communauté ESports tunisienne plus forte et plus connectée que jamais.",
      icon: Users,
      stats: { label: "Communauté", value: "10K+ Gamers" },
      color: "from-pink-600 to-purple-600",
    },
  ]

  const achievements = [
    {
      year: "2019",
      title: "Création de North Events",
      description: "Lancement de la première agence ESports tunisienne",
    },
    {
      year: "2020",
      title: "Premier Tournoi National",
      description: "Organisation du plus grand tournoi Valorant de Tunisie",
    },
    { year: "2021", title: "Partenariat International", description: "Collaboration avec Riot Games MENA" },
    { year: "2022", title: "Expansion Régionale", description: "Ouverture vers les marchés maghrébins" },
    { year: "2023", title: "Innovation Streaming", description: "Lancement de notre studio de production 4K" },
    { year: "2024", title: "Leadership Confirmé", description: "Agence ESports #1 en Tunisie" },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length)
  }

  return (
    <section
      id="about-section"
      className="py-20 bg-muted/50 dark:bg-muted/20 overflow-hidden transition-colors duration-300"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className={`inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6 transition-all duration-1000 ${isVisible ? "animate-fade-in" : "opacity-0"}`}
          >
            <Heart className="w-4 h-4 mr-2" />À Propos de North Events
          </div>
          <h2
            className={`text-3xl lg:text-4xl font-bold text-foreground mb-4 transition-all duration-1000 delay-200 ${isVisible ? "animate-fade-in" : "opacity-0 translate-y-10"}`}
          >
            Pionniers de l'ESports en Tunisie
          </h2>
          <p
            className={`text-xl text-muted-foreground max-w-3xl mx-auto transition-all duration-1000 delay-400 ${isVisible ? "animate-fade-in" : "opacity-0 translate-y-10"}`}
          >
            Découvrez l'histoire, la vision et les valeurs qui font de North Events le leader incontesté de l'ESports
            tunisien.
          </p>
        </div>

        {/* Enhanced Carousel Section */}
        <div
          className={`mb-20 transition-all duration-1000 delay-600 ${isVisible ? "animate-fade-in" : "opacity-0 translate-y-10"}`}
        >
          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-2xl dark:shadow-primary/10">
              <div
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {carouselSlides.map((slide, index) => {
                  const IconComponent = slide.icon
                  return (
                    <div key={index} className="w-full flex-shrink-0">
                      <div
                        className={`relative h-96 lg:h-[500px] bg-gradient-to-br ${slide.color} flex items-center justify-center text-white overflow-hidden`}
                      >
                        {/* Animated Background Elements */}
                        <div className="absolute inset-0">
                          <div className="absolute top-10 left-10 w-32 h-32 bg-white/5 rounded-full animate-float" />
                          <div
                            className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-full animate-float"
                            style={{ animationDelay: "1s" }}
                          />
                          <div
                            className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/5 rounded-full animate-float"
                            style={{ animationDelay: "2s" }}
                          />
                        </div>

                        <div className="relative z-10 text-center max-w-4xl mx-auto px-8">
                          <div className="mb-8">
                            <div className="w-20 h-20 mx-auto mb-6 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center animate-pulse">
                              <IconComponent className="w-10 h-10 text-white" />
                            </div>
                            <Badge className="bg-white/20 text-white backdrop-blur-sm mb-4 animate-bounce">
                              {slide.stats.label}: {slide.stats.value}
                            </Badge>
                          </div>

                          <h3 className="text-4xl lg:text-5xl font-bold mb-4 animate-slide-in">{slide.title}</h3>
                          <p
                            className="text-xl lg:text-2xl mb-6 opacity-90 animate-slide-in"
                            style={{ animationDelay: "0.2s" }}
                          >
                            {slide.subtitle}
                          </p>
                          <p
                            className="text-lg leading-relaxed max-w-2xl mx-auto animate-slide-in"
                            style={{ animationDelay: "0.4s" }}
                          >
                            {slide.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Carousel Controls */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/20 backdrop-blur-sm hover:bg-background/30 rounded-full flex items-center justify-center transition-all duration-300 group"
            >
              <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/20 backdrop-blur-sm hover:bg-background/30 rounded-full flex items-center justify-center transition-all duration-300 group"
            >
              <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>

            {/* Carousel Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
              {carouselSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/75"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div
          className={`mb-20 transition-all duration-1000 delay-800 ${isVisible ? "animate-fade-in" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">Notre Parcours</h3>
            <p className="text-lg text-muted-foreground">Une évolution constante vers l'excellence ESports</p>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-secondary rounded-full"></div>

            <div className="space-y-12">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} group`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                    <Card className="p-6 hover:shadow-xl dark:hover:shadow-primary/10 transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg dark:shadow-xl group-hover:scale-105 bg-card">
                      <CardContent className="p-0">
                        <Badge className="bg-primary text-primary-foreground mb-3">{achievement.year}</Badge>
                        <h4 className="text-xl font-bold text-foreground mb-2">{achievement.title}</h4>
                        <p className="text-muted-foreground">{achievement.description}</p>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline Node */}
                  <div className="relative z-10 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg group-hover:scale-150 transition-transform duration-300"></div>

                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Values Section */}
        <div
          className={`mb-16 transition-all duration-1000 delay-1000 ${isVisible ? "animate-fade-in" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">Nos Valeurs Fondamentales</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Ces principes guident chacune de nos actions et définissent notre approche unique de l'ESports.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <Card
                  key={index}
                  className="text-center p-8 hover:shadow-2xl dark:hover:shadow-primary/10 transition-all duration-500 transform hover:-translate-y-4 border-0 shadow-lg dark:shadow-xl group overflow-hidden relative bg-card"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  {/* Animated Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-500`}
                  ></div>

                  <CardContent className="p-0 relative z-10">
                    <div
                      className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-r ${value.color} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {value.title}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Enhanced Testimonial */}
        <div
          className={`bg-card rounded-3xl p-12 shadow-xl dark:shadow-2xl border border-border relative overflow-hidden transition-all duration-1000 delay-1200 ${isVisible ? "animate-fade-in" : "opacity-0 translate-y-10"}`}
        >
          {/* Animated Background Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/5 rounded-full translate-y-12 -translate-x-12"></div>

          <div className="text-center max-w-4xl mx-auto relative z-10">
            <div className="mb-8">
              <Quote className="w-16 h-16 text-primary mx-auto mb-6 animate-pulse" />
              <div className="flex justify-center space-x-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Award
                    key={i}
                    className="w-6 h-6 text-yellow-400 animate-bounce"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
            </div>

            <blockquote className="text-2xl lg:text-3xl font-medium text-foreground mb-8 leading-relaxed">
              "North Events a organisé le meilleur tournoi Valorant de Tunisie. L'organisation était parfaite,
              l'ambiance électrisante et la production streaming de niveau international."
            </blockquote>

            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                <div className="font-semibold text-foreground">Fares "ProGamer" Khalil</div>
                <div className="text-primary">Champion Valorant MENA, Team Falcon</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-1400 ${isVisible ? "animate-fade-in" : "opacity-0 translate-y-10"}`}
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-secondary text-primary-foreground font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 group"
            >
              <Play className="mr-2 w-5 h-5" />
              Voir Notre Histoire
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-8 py-4 rounded-full transition-all duration-300 group"
            >
              <Users className="mr-2 w-5 h-5" />
              Rencontrer l'Équipe
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

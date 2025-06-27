"use client"

import { useState, useCallback, useMemo, lazy, Suspense, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ArrowRight, Quote, ChevronLeft, ChevronRight, Play, Users, Trophy, Award } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

// Lazy load components
const AchievementModal = lazy(() =>
  import("../components/achievement-modal").then((m) => ({ default: m.AchievementModal })),
)

// Import data
import { achievements } from "../data/achievements"
import { carouselSlides } from "../data/carousel-slides"
import { values } from "../data/values"

// Custom hooks
import { useKeyboard } from "../hooks/use-keyboard"

export function AboutOptimized() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [selectedAchievement, setSelectedAchievement] = useState<number | null>(null)

  // Refs for GSAP animations
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)
  const testimonialRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const achievementRefs = useRef<(HTMLDivElement | null)[]>([])
  const timelineNodesRef = useRef<(HTMLDivElement | null)[]>([])

  // Memoized handlers
  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length)
  }, [])

  const openModal = useCallback((index: number) => {
    setSelectedAchievement(index)
  }, [])

  const closeModal = useCallback(() => {
    setSelectedAchievement(null)
  }, [])

  // Keyboard support
  useKeyboard("Escape", closeModal, selectedAchievement !== null)

  // Memoized carousel auto-advance
  const carouselTimer = useMemo(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [nextSlide])

  // Cleanup timer on unmount
  useState(() => {
    return carouselTimer
  })

  // GSAP Animations
  useEffect(() => {
    if (typeof window === "undefined") return

    const ctx = gsap.context(() => {
      // Header animations
      if (headerRef.current) {
        const headerElements = headerRef.current.children
        gsap.fromTo(
          headerElements,
          {
            opacity: 0,
            y: 50,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }

      // Carousel animation
      if (carouselRef.current) {
        gsap.fromTo(
          carouselRef.current,
          {
            opacity: 0,
            y: 100,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: carouselRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }

      // Timeline achievements - alternating from sides
      achievementRefs.current.forEach((ref, index) => {
        if (ref) {
          const isEven = index % 2 === 0
          gsap.fromTo(
            ref,
            {
              opacity: 0,
              x: isEven ? -100 : 100,
              y: 50,
              scale: 0.8,
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ref,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            },
          )
        }
      })

      // Timeline nodes animation
      timelineNodesRef.current.forEach((ref, index) => {
        if (ref) {
          gsap.fromTo(
            ref,
            {
              scale: 0,
              opacity: 0,
            },
            {
              scale: 1,
              opacity: 1,
              duration: 0.6,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: ref,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
              delay: 0.2,
            },
          )
        }
      })

      // Values section animation
      if (valuesRef.current) {
        const valueCards = valuesRef.current.querySelectorAll(".value-card")
        gsap.fromTo(
          valueCards,
          {
            opacity: 0,
            y: 80,
            scale: 0.8,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: valuesRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }

      // Testimonial animation
      if (testimonialRef.current) {
        gsap.fromTo(
          testimonialRef.current,
          {
            opacity: 0,
            y: 100,
            scale: 0.95,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: testimonialRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }

      // CTA animation
      if (ctaRef.current) {
        const ctaButtons = ctaRef.current.querySelectorAll("button")
        gsap.fromTo(
          ctaButtons,
          {
            opacity: 0,
            y: 50,
            scale: 0.9,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        )
      }

      // Hover animations for achievement cards
      achievementRefs.current.forEach((ref) => {
        if (ref) {
          const card = ref.querySelector(".achievement-card")
          if (card) {
            card.addEventListener("mouseenter", () => {
              gsap.to(card, {
                y: -10,
                scale: 1.02,
                duration: 0.3,
                ease: "power2.out",
              })
            })

            card.addEventListener("mouseleave", () => {
              gsap.to(card, {
                y: 0,
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
              })
            })
          }
        }
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about-section"
      className="py-20 bg-muted/50 dark:bg-muted/20 transition-colors duration-300"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Heart className="w-4 h-4 mr-2" />À Propos de North Events
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Pionniers de l'ESports en Tunisie</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez l'histoire, la vision et les valeurs qui font de North Events le leader incontesté de l'ESports
            tunisien.
          </p>
        </div>

        {/* Enhanced Carousel Section */}
        <div ref={carouselRef} className="mb-20">
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
                        <div className="relative z-10 text-center max-w-4xl mx-auto px-8">
                          <div className="mb-8">
                            <div className="w-20 h-20 mx-auto mb-6 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                              <IconComponent className="w-10 h-10 text-white" />
                            </div>
                            <Badge className="bg-white/20 text-white backdrop-blur-sm mb-4">
                              {slide.stats.label}: {slide.stats.value}
                            </Badge>
                          </div>
                          <h3 className="text-4xl lg:text-5xl font-bold mb-4">{slide.title}</h3>
                          <p className="text-xl lg:text-2xl mb-6 opacity-90">{slide.subtitle}</p>
                          <p className="text-lg leading-relaxed max-w-2xl mx-auto">{slide.description}</p>
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
              aria-label="Slide précédent"
            >
              <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-background/20 backdrop-blur-sm hover:bg-background/30 rounded-full flex items-center justify-center transition-all duration-300 group"
              aria-label="Slide suivant"
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
                  aria-label={`Aller au slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div ref={timelineRef} className="mb-20">
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
                  key={achievement.year}
                  ref={(el) => {
                    achievementRefs.current[index] = el
                  }}
                  className={`flex items-center ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"} group`}
                >
                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                    <Card className="achievement-card p-6 border-0 shadow-lg dark:shadow-xl bg-card cursor-pointer">
                      <CardContent className="p-0">
                        <Badge className="bg-primary text-primary-foreground mb-3">{achievement.year}</Badge>
                        <h4 className="text-xl font-bold text-foreground mb-2">{achievement.title}</h4>
                        <p className="text-muted-foreground mb-4">{achievement.description}</p>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openModal(index)}
                          className="text-primary border-primary hover:bg-primary hover:text-white transition-all duration-300"
                        >
                          <Trophy className="w-4 h-4 mr-2" />
                          Voir plus
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                  {/* Timeline Node */}
                  <div
                    ref={(el) => {
                      timelineNodesRef.current[index] = el
                    }}
                    className="relative z-10 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg"
                  ></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div ref={valuesRef} className="mb-16">
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
                  key={value.title}
                  className="value-card text-center p-8 border-0 shadow-lg dark:shadow-xl group overflow-hidden relative bg-card cursor-pointer"
                >
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

        {/* Testimonial */}
        <div
          ref={testimonialRef}
          className="bg-card rounded-3xl p-12 shadow-xl dark:shadow-2xl border border-border relative overflow-hidden"
        >
          <div className="text-center max-w-4xl mx-auto relative z-10">
            <div className="mb-8">
              <Quote className="w-16 h-16 text-primary mx-auto mb-6" />
              <div className="flex justify-center space-x-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Award key={i} className="w-6 h-6 text-yellow-400" />
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
        <div ref={ctaRef} className="text-center mt-16">
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
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold px-8 py-4 rounded-full transition-all duration-300 group bg-transparent"
            >
              <Users className="mr-2 w-5 h-5" />
              Rencontrer l'Équipe
            </Button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedAchievement !== null && (
        <Suspense fallback={<div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm" />}>
          <AchievementModal achievementIndex={selectedAchievement} onClose={closeModal} />
        </Suspense>
      )}
    </section>
  )
}

"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, MapPin, ArrowRight, Play, Eye, Star } from "lucide-react"

export function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [visibleProjects, setVisibleProjects] = useState<number[]>([])
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Stagger project animations
          filteredProjects.forEach((_, index) => {
            setTimeout(() => {
              setVisibleProjects((prev) => [...prev, index])
            }, index * 150)
          })
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Reset visible projects when filter changes
  useEffect(() => {
    setVisibleProjects([])
    setTimeout(() => {
      filteredProjects.forEach((_, index) => {
        setTimeout(() => {
          setVisibleProjects((prev) => [...prev, index])
        }, index * 100)
      })
    }, 300)
  }, [activeFilter])

  const categories = [
    { id: "all", label: "Tous les Tournois", icon: Star },
    { id: "corporate", label: "Compétitions Pro", icon: Users },
    { id: "luxury", label: "Événements Premium", icon: Calendar },
    { id: "cultural", label: "Community Events", icon: MapPin },
  ]

  const projects = [
    {
      id: 1,
      title: "Valorant Champions Tunisia",
      category: "corporate",
      description: "Tournoi national Valorant avec 64 équipes, cashprize 50K TND et streaming live sur Twitch.",
      image: "/placeholder.svg?height=300&width=400",
      date: "Décembre 2024",
      guests: "500+",
      location: "Tunis",
      tags: ["Valorant", "Tournoi", "Streaming"],
      color: "from-red-500 to-pink-500",
      featured: true,
    },
    {
      id: 2,
      title: "FIFA Pro League Tunisia",
      category: "luxury",
      description: "Championnat FIFA professionnel avec les meilleurs joueurs tunisiens et production TV.",
      image: "/placeholder.svg?height=300&width=400",
      date: "Novembre 2024",
      guests: "200",
      location: "Sousse",
      tags: ["FIFA", "Pro League", "TV"],
      color: "from-blue-500 to-cyan-500",
      featured: false,
    },
    {
      id: 3,
      title: "Gaming Expo Tunisia",
      category: "cultural",
      description: "Convention gaming de 3 jours avec exposants, tournois multiples et meet & greet streamers.",
      image: "/placeholder.svg?height=300&width=400",
      date: "Octobre 2024",
      guests: "3000+",
      location: "Tunis",
      tags: ["Convention", "Multi-Gaming", "Expo"],
      color: "from-green-500 to-emerald-500",
      featured: true,
    },
    {
      id: 4,
      title: "League of Legends Academy",
      category: "corporate",
      description: "Tournoi universitaire LoL avec 32 équipes étudiantes et programme de coaching.",
      image: "/placeholder.svg?height=300&width=400",
      date: "Septembre 2024",
      guests: "400",
      location: "Sfax",
      tags: ["LoL", "Universitaire", "Coaching"],
      color: "from-purple-500 to-indigo-500",
      featured: false,
    },
    {
      id: 5,
      title: "Mobile Legends Championship",
      category: "luxury",
      description: "Premier tournoi Mobile Legends en Tunisie avec participation internationale.",
      image: "/placeholder.svg?height=300&width=400",
      date: "Août 2024",
      guests: "800",
      location: "Monastir",
      tags: ["Mobile", "International", "Championship"],
      color: "from-orange-500 to-red-500",
      featured: true,
    },
    {
      id: 6,
      title: "Streamers Battle Royale",
      category: "cultural",
      description: "Événement créateurs de contenu avec battle royale multi-jeux et audience live.",
      image: "/placeholder.svg?height=300&width=400",
      date: "Juillet 2024",
      guests: "150",
      location: "Hammamet",
      tags: ["Streamers", "Battle Royale", "Content"],
      color: "from-yellow-500 to-orange-500",
      featured: false,
    },
  ]

  const filteredProjects =
    activeFilter === "all" ? projects : projects.filter((project) => project.category === activeFilter)

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="py-20 bg-background relative overflow-hidden transition-colors duration-300"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 left-20 w-56 h-56 bg-secondary rounded-full blur-3xl animate-float"
          style={{ animationDelay: "3s" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-medium mb-6 animate-bounce-in border border-primary/20">
            <Calendar className="w-5 h-5 mr-2 animate-pulse" />
            Notre Portfolio
            <Star className="w-4 h-4 ml-2 animate-spin" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 animate-fade-in">
            Nos Tournois Légendaires
          </h2>
          <p
            className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Découvrez nos événements ESports les plus marquants qui ont façonné la scène gaming tunisienne.
          </p>
        </div>

        {/* Enhanced Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <Button
                key={category.id}
                variant={activeFilter === category.id ? "default" : "outline"}
                onClick={() => setActiveFilter(category.id)}
                className={`rounded-full px-6 py-3 transition-all duration-500 transform hover:scale-105 relative overflow-hidden group ${
                  activeFilter === category.id
                    ? "bg-primary hover:bg-secondary text-primary-foreground shadow-lg"
                    : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                } animate-bounce-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                <IconComponent className="w-4 h-4 mr-2 relative z-10 group-hover:animate-spin" />
                <span className="relative z-10">{category.label}</span>
              </Button>
            )
          })}
        </div>

        {/* Enhanced Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProjects.map((project, index) => {
            const isVisible = visibleProjects.includes(index)
            const isHovered = hoveredProject === index

            return (
              <Card
                key={project.id}
                className={`group overflow-hidden hover:shadow-2xl dark:hover:shadow-primary/10 transition-all duration-500 transform border-0 shadow-lg dark:shadow-xl relative cursor-pointer bg-card ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                } ${isHovered ? "scale-105 -translate-y-4" : "hover:-translate-y-2"} ${
                  project.featured ? "ring-2 ring-primary/20" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setHoveredProject(index)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                {/* Featured Badge */}
                {project.featured && (
                  <div className="absolute top-4 left-4 z-20">
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white animate-pulse">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                )}

                <div className="relative overflow-hidden">
                  <img
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Gradient Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-0 group-hover:opacity-60 transition-opacity duration-500`}
                  />

                  {/* Hover Actions */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="flex space-x-3">
                      <Button
                        size="sm"
                        className="bg-white/20 backdrop-blur-sm text-white hover:bg-white hover:text-gray-900 border-white/30"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Voir
                      </Button>
                      <Button
                        size="sm"
                        className="bg-white/20 backdrop-blur-sm text-white hover:bg-white hover:text-gray-900 border-white/30"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Vidéo
                      </Button>
                    </div>
                  </div>

                  {/* Animated Corner */}
                  <div className="absolute top-0 right-0 w-0 h-0 border-l-[60px] border-l-transparent border-t-[60px] border-t-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <CardContent className="p-6 relative">
                  {/* Animated Background */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-500`}
                  />

                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag, tagIndex) => (
                      <Badge
                        key={tagIndex}
                        variant="secondary"
                        className={`bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 transform hover:scale-105 ${
                          isHovered ? "animate-bounce" : ""
                        }`}
                        style={{ animationDelay: `${tagIndex * 0.1}s` }}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>

                  <p className="text-muted-foreground mb-4 leading-relaxed group-hover:text-foreground transition-colors duration-300">
                    {project.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    <div className="flex items-center group-hover:animate-pulse">
                      <Calendar className="w-4 h-4 mr-1" />
                      {project.date}
                    </div>
                    <div className="flex items-center group-hover:animate-pulse">
                      <Users className="w-4 h-4 mr-1" />
                      {project.guests}
                    </div>
                    <div className="flex items-center group-hover:animate-pulse">
                      <MapPin className="w-4 h-4 mr-1" />
                      {project.location}
                    </div>
                  </div>

                  {/* Progress Bar Animation */}
                  <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${project.color} transition-all duration-1000 ${
                        isHovered ? "w-full" : "w-0"
                      }`}
                    />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Enhanced CTA */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-secondary text-primary-foreground font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl group relative overflow-hidden animate-bounce-in"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
            <span className="relative">Voir Tous Nos Projets</span>
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform relative" />
          </Button>
        </div>
      </div>
    </section>
  )
}

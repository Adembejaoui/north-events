"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, MapPin, ArrowRight, Filter } from "lucide-react"

export function Portfolio() {
  const [activeFilter, setActiveFilter] = useState("all")

  const categories = [
    { id: "all", label: "Tous les Tournois" },
    { id: "corporate", label: "Compétitions Pro" },
    { id: "luxury", label: "Événements Premium" },
    { id: "cultural", label: "Community Events" },
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
    },
  ]

  const filteredProjects =
    activeFilter === "all" ? projects : projects.filter((project) => project.category === activeFilter)

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Calendar className="w-4 h-4 mr-2" />
            Notre Portfolio
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Nos Tournois Légendaires</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez nos événements ESports les plus marquants qui ont façonné la scène gaming tunisienne.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={activeFilter === category.id ? "default" : "outline"}
              onClick={() => setActiveFilter(category.id)}
              className={`rounded-full px-6 py-2 transition-all duration-300 ${
                activeFilter === category.id
                  ? "bg-brand-primary hover:bg-brand-secondary text-white"
                  : "border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white"
              }`}
            >
              <Filter className="w-4 h-4 mr-2" />
              {category.label}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button size="sm" className="bg-white text-brand-primary hover:bg-gray-100 font-medium">
                    Voir les Détails
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>

              <CardContent className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-brand-primary/10 text-brand-primary hover:bg-brand-primary hover:text-white transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-brand-primary transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-600 mb-4 leading-relaxed">{project.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {project.date}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {project.guests}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {project.location}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            className="bg-brand-primary hover:bg-brand-secondary text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 group"
          >
            Voir Tous Nos Projets
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  )
}

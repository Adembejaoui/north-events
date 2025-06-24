import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Linkedin, Twitter, Twitch, Youtube, Trophy, Star } from "lucide-react"

export function Team() {
  const teamMembers = [
    {
      name: "Marwen Bouaziz SHOG",
      role: "Fondateur & CEO",
      speciality: "CEO",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Pionnier de l'ESports en Tunisie avec 8 ans d'expérience. Ancien joueur pro devenu entrepreneur.",
      achievements: ["Champion MENA 2018", "500+ Tournois organisés", "Communauté 50K+"],
      games: ["League of Legends", "Valorant", "CS2"],
      social: {
        linkedin: "#",
        twitter: "#",
        twitch: "#",
      },
    },
    {
      name: "Mahdi Dakhli Supr6me",
      role: "Art Director & Brand Strategist",
      speciality: "Art Director & Brand Strategist",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Experte en production d'événements gaming avec une passion pour l'innovation technologique.",
      achievements: ["100+ Événements produits", "Certification Riot Games", "Award Best Event 2023"],
      games: ["Valorant", "Apex Legends", "Overwatch"],
      social: {
        linkedin: "#",
        twitter: "#",
        youtube: "#",
      },
    },
    {
      name: "Mehdi El Mihi Shadow ",
      role: "Production Manager",
      speciality: "Production Manager",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Réalisateur et streamer professionnel, spécialiste des productions live haute qualité.",
      achievements: ["1M+ Vues streams", "Partenaire Twitch", "Tech Innovation Award"],
      games: ["Fortnite", "Call of Duty", "FIFA"],
      social: {
        twitch: "#",
        youtube: "#",
        twitter: "#",
      },
    },
    {
      name: "Issa Bezrati IssaBez",
      role: "Head du Digital Marketing",
      speciality: "Head du Digital Marketing",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Experte en community management gaming avec une approche créative du contenu digital.",
      achievements: ["200K+ Followers gérés", "Viral Content Creator", "Social Media Expert"],
      games: ["Among Us", "Genshin Impact", "Mobile Legends"],
      social: {
        twitter: "#",
        linkedin: "#",
        twitch: "#",
      },
    },
    {
      name: "Moez Kallel Cata",
      role: "Directeur des tournois",
      speciality: "Directeur des tournois",
      image: "/placeholder.svg?height=300&width=300",
      bio: "Coach professionnel avec une expertise dans le développement de talents ESports.",
      achievements: ["10+ Équipes coachées", "Regional Champion", "Performance Analyst"],
      games: ["League of Legends", "Dota 2", "Rocket League"],
      social: {
        linkedin: "#",
        twitch: "#",
        youtube: "#",
      },
    },  
  ]

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "linkedin":
        return Linkedin
      case "twitter":
        return Twitter
      case "twitch":
        return Twitch
      case "youtube":
        return Youtube
      default:
        return Linkedin
    }
  }

  return (
    <section id="team" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Trophy className="w-4 h-4 mr-2" />
            Notre Équipe
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Les Experts Derrière Vos Succès</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une équipe passionnée de professionnels ESports, chacun expert dans son domaine, unis par la même vision :
            faire de la Tunisie une référence gaming.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className="group overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg"
            >
              <div className="relative">
                {/* Profile Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Social Links Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex justify-center space-x-2">
                      {Object.entries(member.social).map(([platform, url]) => {
                        const IconComponent = getSocialIcon(platform)
                        return (
                          <a
                            key={platform}
                            href={url}
                            className="w-8 h-8 bg-white/20 backdrop-blur-sm hover:bg-brand-primary rounded-full flex items-center justify-center transition-colors duration-200"
                          >
                            <IconComponent className="w-4 h-4 text-white" />
                          </a>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Speciality Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-brand-primary/90 text-white backdrop-blur-sm">
                    <Star className="w-3 h-3 mr-1" />
                    {member.speciality}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                {/* Basic Info */}
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-brand-primary font-medium">{member.role}</p>
                </div>

                {/* Bio */}
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.bio}</p>

                {/* Games */}
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-500 mb-2">JEUX SPÉCIALISÉS</p>
                  <div className="flex flex-wrap gap-1">
                    {member.games.map((game, gameIndex) => (
                      <Badge key={gameIndex} variant="secondary" className="text-xs">
                        {game}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Achievements */}
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-500 mb-2">RÉALISATIONS</p>
                  <ul className="space-y-1">
                    {member.achievements.slice(0, 2).map((achievement, achIndex) => (
                      <li key={achIndex} className="text-xs text-gray-600 flex items-center">
                        <Trophy className="w-3 h-3 text-brand-primary mr-1 flex-shrink-0" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact Button */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white transition-colors duration-200"
                >
                  Contacter {member.name.split(" ")[0]}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

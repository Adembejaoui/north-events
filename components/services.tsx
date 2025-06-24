import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, Monitor, Gamepad2, Users, Zap, Headphones, ArrowRight, CheckCircle } from "lucide-react"

export function Services() {
  const services = [
    {
      icon: Trophy,
      title: "Tournois ESports",
      description:
        "Organisation complète de tournois compétitifs pour tous les jeux populaires avec cashprize attractifs.",
      features: ["Gestion des brackets", "Streaming live", "Cashprize garantis"],
      color: "from-yellow-500 to-yellow-600",
    },
    {
      icon: Monitor,
      title: "Événements Gaming",
      description: "LAN parties, conventions gaming et événements communautaires pour rassembler les passionnés.",
      features: ["Setup technique complet", "Animation gaming", "Expérience immersive"],
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: Gamepad2,
      title: "Compétitions Corporate",
      description: "Team building gaming et tournois d'entreprise pour renforcer la cohésion d'équipe.",
      features: ["Formats personnalisés", "Coaching inclus", "Récompenses sur mesure"],
      color: "from-green-500 to-green-600",
    },
    {
      icon: Users,
      title: "Community Management",
      description: "Gestion et animation de communautés gaming avec création de contenu et engagement.",
      features: ["Stratégie communautaire", "Création de contenu", "Modération professionnelle"],
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Zap,
      title: "Production Streaming",
      description: "Production professionnelle de streams avec overlay personnalisés et régie technique.",
      features: ["Régie streaming pro", "Overlays custom", "Multi-plateforme"],
      color: "from-red-500 to-red-600",
    },
    {
      icon: Headphones,
      title: "Coaching ESports",
      description: "Formation et coaching pour joueurs et équipes souhaitant progresser en compétition.",
      features: ["Coachs expérimentés", "Analyse de gameplay", "Stratégies avancées"],
      color: "from-indigo-500 to-indigo-600",
    },
  ]

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Gamepad2 className="w-4 h-4 mr-2" />
            Nos Services ESports
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">L'Écosystème ESports Complet</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            De l'organisation de tournois à la production de contenu, nous maîtrisons tous les aspects de l'ESports pour
            offrir des expériences gaming exceptionnelles.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg overflow-hidden"
              >
                <CardContent className="p-8">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-brand-primary mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    variant="ghost"
                    className="w-full group-hover:bg-brand-primary group-hover:text-white transition-all duration-300 font-medium"
                  >
                    En savoir plus
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-brand-primary to-brand-secondary rounded-3xl p-12 text-white">
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">Prêt à Dominer la Scène ESports ?</h3>
          <p className="text-xl mb-8 opacity-90">
            Contactez-nous pour organiser votre prochain tournoi ou événement gaming
          </p>
          <Button
            size="lg"
            className="bg-white text-brand-primary hover:bg-gray-100 font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            Lancer Votre Projet ESports
          </Button>
        </div>
      </div>
    </section>
  )
}

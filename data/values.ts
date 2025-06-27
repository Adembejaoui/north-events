import { Heart, Lightbulb, Award, Shield } from "lucide-react"

export const values = [
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
] as const


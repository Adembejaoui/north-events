import { Target, Gamepad2, Trophy, Monitor, Users } from "lucide-react"

export const carouselSlides = [
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
] as const

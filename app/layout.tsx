import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
//import { AppWrapper } from "@/components/app-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "North Events - ESports Excellence en Tunisie",
  description:
    "Agence ESports leader en Tunisie. Organisation de tournois, événements gaming, streaming professionnel et coaching ESports.",
  keywords: "ESports, Tunisie, Tournois, Gaming, Valorant, League of Legends, Streaming",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js" async></script>
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}

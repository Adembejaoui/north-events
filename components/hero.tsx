"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Star } from "lucide-react"
import Image from "next/image"

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-gradient-from via-brand-primary to-brand-gradient-to opacity-95" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float" />
        <div
          className="absolute top-40 right-20 w-16 h-16 bg-white/5 rounded-full animate-float"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-40 left-20 w-24 h-24 bg-white/5 rounded-full animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left animate-fade-in">
            <div className="flex items-center justify-center lg:justify-start mb-6">
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Star className="w-4 h-4 text-yellow-300 mr-2" />
                <span className="text-white text-sm font-medium">Agence ESports #1 en Tunisie</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Créons des{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Expériences
              </span>{" "}
              ESports Épiques
            </h1>

            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto lg:mx-0">
              North Events est l'agence ESports de référence en Tunisie. Nous organisons des tournois, événements
              gaming, streams professionnels et expériences immersives pour la communauté gaming.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-white text-brand-primary hover:bg-gray-100 font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-105 group"
              >
                Découvrir nos Services
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-brand-primary font-semibold px-8 py-4 rounded-full transition-all duration-300 group"
              >
                <Play className="mr-2 w-5 h-5" />
                Voir notre Portfolio
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-3xl font-bold text-white">200+</div>
                <div className="text-white/80 text-sm">Tournois Organisés</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">10K+</div>
                <div className="text-white/80 text-sm">Gamers Participants</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white">5+</div>
                <div className="text-white/80 text-sm">Années ESports</div>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="relative w-full h-96 lg:h-[500px]">
              {/* Placeholder for event image */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-24 h-24 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                    <Image src="/logo.png" alt="North Events" width={48} height={48} className="opacity-80" />
                  </div>
                  <p className="text-lg font-medium">Tournois ESports</p>
                  <p className="text-white/80">Gaming & Compétition</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

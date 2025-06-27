"use client"
import { useState, useEffect, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Linkedin, Twitter, Twitch, Youtube, Trophy, Star, ChevronLeft, ChevronRight } from "lucide-react";

type TeamMember = {
  name: string;
  role: string;
  speciality: string;
  image: string;
  bio: string;
  achievements: string[];
  games: string[];
  social: {
    [key: string]: string;
  };
};

export function Team() {
  const teamMembers: TeamMember[] = [
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
      name: "Mehdi El Mihi Shadow",
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
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "linkedin":
        return Linkedin;
      case "twitter":
        return Twitter;
      case "twitch":
        return Twitch;
      case "youtube":
        return Youtube;
      default:
        return Linkedin;
    }
  };

  const getCardClass = (index: number) => {
    const offset = (index - currentIndex + teamMembers.length) % teamMembers.length;
    
    if (offset === 0) return "center";
    if (offset === 1) return "right-1";
    if (offset === 2) return "right-2";
    if (offset === teamMembers.length - 1) return "left-1";
    if (offset === teamMembers.length - 2) return "left-2";
    return "hidden";
  };

  const updateCarousel = useCallback((newIndex: number) => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentIndex((newIndex + teamMembers.length) % teamMembers.length);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  }, [isAnimating, teamMembers.length]);

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      updateCarousel(currentIndex + 1);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex, updateCarousel]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        updateCarousel(currentIndex - 1);
      } else if (e.key === "ArrowRight") {
        updateCarousel(currentIndex + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, updateCarousel]);

  return (
    <section id="team" className="py-20 bg-muted/50 dark:bg-muted/20 transition-colors duration-300 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Trophy className="w-4 h-4 mr-2" />
            Notre Équipe
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Les Experts Derrière Vos Succès</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Une équipe passionnée de professionnels ESports, chacun expert dans son domaine, unis par la même vision :
            faire de la Tunisie une référence gaming.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="carousel-container">
            <button 
              className="nav-arrow left" 
              onClick={() => updateCarousel(currentIndex - 1)}
              aria-label="Previous team member"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div className="carousel-track">
              {teamMembers.map((member, index) => (
                <div 
                  key={index}
                  className={`card ${getCardClass(index)}`}
                  onClick={() => updateCarousel(index)}
                >
                  <div className="relative h-full w-full">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                </div>
              ))}
            </div>
            
            <button 
              className="nav-arrow right" 
              onClick={() => updateCarousel(currentIndex + 1)}
              aria-label="Next team member"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Member Info */}
          <div className="member-info">
            <h2 className="member-name">{teamMembers[currentIndex].name}</h2>
            <p className="member-role">{teamMembers[currentIndex].role}</p>
          </div>

          {/* Dots Navigation */}
          <div className="dots">
            {teamMembers.map((_, index) => (
              <div 
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => updateCarousel(index)}
                aria-label={`Go to team member ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
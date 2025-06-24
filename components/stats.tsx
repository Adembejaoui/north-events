"use client"

import { useEffect, useState } from "react"

export function Stats() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("stats-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const stats = [
    { number: 200, suffix: "+", label: "Tournois Organisés", description: "Depuis notre création en 2019" },
    { number: 10000, suffix: "+", label: "Gamers Participants", description: "Communauté active et engagée" },
    { number: 95, suffix: "%", label: "Satisfaction Gamers", description: "Événements de qualité premium" },
    { number: 50, suffix: "+", label: "Streamers Partenaires", description: "Créateurs de contenu gaming" },
  ]

  return (
    <section id="stats-section" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">L'ESports en Chiffres</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Des statistiques qui témoignent de notre leadership dans l'écosystème ESports tunisien
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="mb-4">
                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                  {isVisible ? <CountUp end={stat.number} suffix={stat.suffix} /> : `0${stat.suffix}`}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{stat.label}</h3>
              <p className="text-gray-600 text-sm">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CountUp({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = end / steps
    const stepDuration = duration / steps

    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [end])

  return (
    <>
      {count}
      {suffix}
    </>
  )
}

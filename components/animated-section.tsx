"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: "fadeUp" | "fadeIn" | "slideLeft" | "slideRight" | "scale"
  delay?: number
  duration?: number
  stagger?: number
}

export function AnimatedSection({
  children,
  className = "",
  animation = "fadeUp",
  delay = 0,
  duration = 1,
  stagger = 0,
}: AnimatedSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = sectionRef.current
    if (!element) return

    const ctx = gsap.context(() => {
      let fromVars: any = {}
      let toVars: any = {}

      switch (animation) {
        case "fadeUp":
          fromVars = { opacity: 0, y: 50 }
          toVars = { opacity: 1, y: 0 }
          break
        case "fadeIn":
          fromVars = { opacity: 0 }
          toVars = { opacity: 1 }
          break
        case "slideLeft":
          fromVars = { opacity: 0, x: -50 }
          toVars = { opacity: 1, x: 0 }
          break
        case "slideRight":
          fromVars = { opacity: 0, x: 50 }
          toVars = { opacity: 1, x: 0 }
          break
        case "scale":
          fromVars = { opacity: 0, scale: 0.8 }
          toVars = { opacity: 1, scale: 1 }
          break
      }

      gsap.set(element, fromVars)

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })

      if (stagger > 0) {
        const children = element.children
        timeline.to(children, {
          ...toVars,
          duration,
          delay,
          stagger,
          ease: "power3.out",
        })
      } else {
        timeline.to(element, {
          ...toVars,
          duration,
          delay,
          ease: "power3.out",
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [animation, delay, duration, stagger])

  return (
    <div ref={sectionRef} className={className}>
      {children}
    </div>
  )
}

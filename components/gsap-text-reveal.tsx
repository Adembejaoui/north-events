"use client"

import { useEffect, useRef, type ReactNode } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface GSAPTextRevealProps {
  children: ReactNode
  className?: string
  splitBy?: "words" | "chars" | "lines"
  stagger?: number
  duration?: number
}

export function GSAPTextReveal({
  children,
  className = "",
  splitBy = "words",
  stagger = 0.1,
  duration = 0.8,
}: GSAPTextRevealProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = textRef.current
    if (!element) return

    const ctx = gsap.context(() => {
      const text = element.textContent || ""
      let splitText: string[] = []

      switch (splitBy) {
        case "words":
          splitText = text.split(" ")
          break
        case "chars":
          splitText = text.split("")
          break
        case "lines":
          splitText = text.split("\n")
          break
      }

      // Clear the original text and create spans for each part
      element.innerHTML = ""
      const spans = splitText.map((part) => {
        const span = document.createElement("span")
        span.textContent = part + (splitBy === "words" ? " " : "")
        span.style.display = "inline-block"
        element.appendChild(span)
        return span
      })

      // Set initial state
      gsap.set(spans, {
        opacity: 0,
        y: 20,
        rotationX: -90,
      })

      // Animate on scroll
      gsap.to(spans, {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration,
        stagger,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      })
    }, textRef)

    return () => ctx.revert()
  }, [splitBy, stagger, duration])

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  )
}

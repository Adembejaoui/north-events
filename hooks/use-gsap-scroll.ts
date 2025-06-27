"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export function useGSAPScroll() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth scroll setup
      gsap.registerPlugin(ScrollTrigger)

      // Refresh ScrollTrigger when images load
      ScrollTrigger.addEventListener("refresh", () => {
        ScrollTrigger.refresh()
      })

      // Create smooth scroll behavior
      gsap.to(window, {
        scrollTo: { y: 0, autoKill: false },
        duration: 0,
      })
    }, containerRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return containerRef
}

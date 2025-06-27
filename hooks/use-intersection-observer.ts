"use client"

import { useEffect, useState, useRef } from "react"

export function useIntersectionObserver(threshold = 0.1) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // Stop observing once visible
        }
      },
      { threshold },
    )

    const element = ref.current
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [threshold])

  return { isVisible, ref }
}

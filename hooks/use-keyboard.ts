"use client"

import { useEffect } from "react"

export function useKeyboard(key: string, callback: () => void, enabled = true) {
  useEffect(() => {
    if (!enabled) return

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === key) {
        callback()
      }
    }

    document.addEventListener("keydown", handleKeyPress)
    return () => document.removeEventListener("keydown", handleKeyPress)
  }, [key, callback, enabled])
}

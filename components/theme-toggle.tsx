"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Switch } from "@/components/ui/switch"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  // Show a neutral state during SSR and initial hydration
  if (!mounted) {
    return (
      <div className="flex items-center space-x-2">
        <Sun className="h-[1.2rem] w-[1.2rem] text-muted-foreground scale-100 rotate-0" />
        <Switch
          checked={false}
          onCheckedChange={() => {}}
          aria-label="Toggle theme"
          className="hover:scale-110"
          disabled
        />
        <Moon className="h-[1.2rem] w-[1.2rem] text-muted-foreground scale-75 rotate-12" />
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-2">
      <Sun
        className={`h-[1.2rem] w-[1.2rem] transition-all duration-300 ease-out ${
          theme === "dark" ? "text-[#A1A1AA] scale-75 rotate-12" : "text-foreground scale-100 rotate-0"
        }`}
      />
      <Switch
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
        aria-label="Toggle theme"
        className="transition-all duration-200 hover:scale-110"
      />
      <Moon
        className={`h-[1.2rem] w-[1.2rem] transition-all duration-300 ease-out ${
          theme === "light" ? "text-[#A1A1AA] scale-75 rotate-12" : "text-foreground scale-100 rotate-0"
        }`}
      />
    </div>
  )
}

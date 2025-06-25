"use client"

import type * as React from "react"
import { motion, type Variants } from "framer-motion"
import { Home, Gamepad2, Users, Trophy, Mail, BarChart3 } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

interface MenuItem {
  icon: React.ReactNode
  label: string
  href: string
  gradient: string
  iconColor: string
  id: string
}

const menuItems: MenuItem[] = [
  {
    icon: <Home className="h-5 w-5" />,
    label: "Accueil",
    href: "#home",
    id: "home",
    gradient: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
    iconColor: "text-blue-500",
  },
  {
    icon: <Gamepad2 className="h-5 w-5" />,
    label: "Services",
    href: "#services",
    id: "services",
    gradient: "radial-gradient(circle, rgba(249,115,22,0.15) 0%, rgba(234,88,12,0.06) 50%, rgba(194,65,12,0) 100%)",
    iconColor: "text-orange-500",
  },
  {
    icon: <Users className="h-5 w-5" />,
    label: "À Propos",
    href: "#about-section",
    id: "about-section",
    gradient: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(147,51,234,0.06) 50%, rgba(126,34,206,0) 100%)",
    iconColor: "text-purple-500",
  },
  {
    icon: <Users className="h-5 w-5" />,
    label: "Équipe",
    href: "#team",
    id: "team",
    gradient: "radial-gradient(circle, rgba(59,130,246,0.15) 0%, rgba(37,99,235,0.06) 50%, rgba(29,78,216,0) 100%)",
    iconColor: "text-blue-500",
  },
  {
    icon: <Trophy className="h-5 w-5" />,
    label: "Portfolio",
    href: "#portfolio",
    id: "portfolio",
    gradient: "radial-gradient(circle, rgba(168,85,247,0.15) 0%, rgba(147,51,234,0.06) 50%, rgba(126,34,206,0) 100%)",
    iconColor: "text-purple-500",
  },
  {
    icon: <Mail className="h-5 w-5" />,
    label: "Contact",
    href: "#contact",
    id: "contact",
    gradient: "radial-gradient(circle, rgba(239,68,68,0.15) 0%, rgba(220,38,38,0.06) 50%, rgba(185,28,28,0) 100%)",
    iconColor: "text-red-500",
  },
]

const itemVariants: Variants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
}

const backVariants: Variants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
}

const glowVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.5, type: "spring" as const, stiffness: 300, damping: 25 },
    },
  },
}

const activeGlowVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  active: {
    opacity: 0.6,
    scale: 1.2,
    transition: {
      opacity: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
      scale: { duration: 0.3, type: "spring" as const, stiffness: 200, damping: 20 },
    },
  },
}

const sharedTransition = {
  type: "spring" as const,
  stiffness: 100,
  damping: 20,
  duration: 0.5,
}

export function AnimatedMenu() {
  const { theme } = useTheme()
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      const sections = menuItems.map((item) => item.id)
      const scrollPosition = window.scrollY + 100 // Offset for header height

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i])
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isDarkTheme = theme === "dark"

  return (
    <motion.nav className="p-2 rounded-2xl relative overflow-hidden" initial="initial" whileHover="hover">
      <ul className="flex items-center gap-2 relative z-10">
        {menuItems.map((item, index) => {
          const isActive = activeSection === item.id

          return (
            <motion.li key={item.label} className="relative">
              <motion.div
                className="block rounded-xl overflow-visible group relative"
                style={{ perspective: "600px" }}
                whileHover="hover"
                initial="initial"
              >
                {/* Active Section Glow - Always visible when active */}
                <motion.div
                  className="absolute inset-0 z-0 pointer-events-none"
                  variants={activeGlowVariants}
                  animate={isActive ? "active" : "initial"}
                  style={{
                    background: item.gradient,
                    borderRadius: "16px",
                  }}
                />

                {/* Hover Glow - Only on hover */}
                <motion.div
                  className="absolute inset-0 z-0 pointer-events-none"
                  variants={glowVariants}
                  style={{
                    background: item.gradient,
                    opacity: 0,
                    borderRadius: "16px",
                  }}
                />

                {/* Active Section Indicator - Animated underline */}
                {isActive && (
                  <motion.div
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full"
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: "80%", opacity: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                )}

                {/* Active Section Top Indicator */}
                {isActive && (
                  <motion.div
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2, delay: 0.1 }}
                  />
                )}

                <motion.a
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 relative z-10 bg-transparent transition-colors rounded-xl ${
                    isActive ? "text-primary font-semibold" : "text-muted-foreground group-hover:text-foreground"
                  }`}
                  variants={itemVariants}
                  transition={sharedTransition}
                  style={{ transformStyle: "preserve-3d", transformOrigin: "center bottom" }}
                >
                  <span
                    className={`transition-colors duration-300 ${
                      isActive ? `${item.iconColor} scale-110` : `text-foreground group-hover:${item.iconColor}`
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </motion.a>

                <motion.a
                  href={item.href}
                  className={`flex items-center gap-2 px-4 py-2 absolute inset-0 z-10 bg-transparent transition-colors rounded-xl ${
                    isActive ? "text-primary font-semibold" : "text-muted-foreground group-hover:text-foreground"
                  }`}
                  variants={backVariants}
                  transition={sharedTransition}
                  style={{ transformStyle: "preserve-3d", transformOrigin: "center top", rotateX: 90 }}
                >
                  <span
                    className={`transition-colors duration-300 ${
                      isActive ? `${item.iconColor} scale-110` : `text-foreground group-hover:${item.iconColor}`
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </motion.a>
              </motion.div>
            </motion.li>
          )
        })}
      </ul>
    </motion.nav>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"

export function LoadingScreen({ onLoadingComplete }: { onLoadingComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [showCharacter, setShowCharacter] = useState(false)
  const [isAiming, setIsAiming] = useState(false)
  const [isShooting, setIsShooting] = useState(false)
  const [screenHit, setScreenHit] = useState(false)
  const [bullets, setBullets] = useState<Array<{ id: number; x: number; y: number }>>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Fast loading sequence
    const startSequence = async () => {
      // Character appears
      setTimeout(() => setShowCharacter(true), 200)

      // Character aims
      setTimeout(() => setIsAiming(true), 800)

      // Character shoots
      setTimeout(() => {
        setIsShooting(true)
        // Create bullet
        const newBullet = { id: Date.now(), x: 25, y: 50 }
        setBullets([newBullet])

        // Bullet travels and hits screen
        setTimeout(() => {
          setScreenHit(true)
          setBullets([])
          setTimeout(() => setScreenHit(false), 300)
        }, 600)

        setTimeout(() => setIsShooting(false), 200)
      }, 1200)

      // Progress animation
      let currentProgress = 0
      const progressInterval = setInterval(() => {
        currentProgress += 20
        setProgress(currentProgress)
        if (currentProgress >= 100) {
          clearInterval(progressInterval)
          setTimeout(() => {
            onLoadingComplete()
          }, 500)
        }
      }, 300)
    }

    startSequence()
  }, [onLoadingComplete])

  // Animate bullets
  useEffect(() => {
    if (bullets.length > 0) {
      const interval = setInterval(() => {
        setBullets((prevBullets) =>
          prevBullets
            .map((bullet) => ({
              ...bullet,
              x: bullet.x + 8,
            }))
            .filter((bullet) => bullet.x < 95),
        )
      }, 50)
      return () => clearInterval(interval)
    }
  }, [bullets])

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-hidden">
      {/* Screen Hit Effect */}
      {screenHit && (
        <>
          <div className="absolute inset-0 bg-red-500/40 animate-pulse pointer-events-none"></div>
          <div className="absolute inset-0 bg-gradient-radial from-red-400/60 via-orange-400/30 to-transparent pointer-events-none animate-ping"></div>
          {/* Crack effects */}
          <div className="absolute top-1/3 right-1/4 w-32 h-1 bg-white/80 rotate-45 animate-pulse"></div>
          <div className="absolute top-1/3 right-1/4 w-24 h-1 bg-white/60 -rotate-45 animate-pulse"></div>
          <div className="absolute top-2/3 left-1/2 w-20 h-1 bg-white/70 rotate-12 animate-pulse"></div>
        </>
      )}

      {/* Character Container */}
      <div className="absolute left-0 top-0 w-full h-full">
        {/* Jett Character */}
        <div
          className={`absolute left-8 top-1/2 transform -translate-y-1/2 transition-all duration-700 ${
            showCharacter ? "translate-x-0 opacity-100 scale-100" : "-translate-x-32 opacity-0 scale-75"
          }`}
        >
          {/* Character Sprite Container */}
          <div className="relative w-64 h-80">
            {/* Character Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg blur-xl animate-pulse"></div>

            {/* Main Character Body */}
            <div className="relative w-full h-full">
              {/* Character Silhouette/Body */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                {/* Legs */}
                <div className="w-16 h-32 bg-gradient-to-b from-slate-700 to-slate-800 rounded-t-lg relative">
                  {/* Leg details */}
                  <div className="absolute top-4 left-2 w-2 h-20 bg-cyan-400/30 rounded"></div>
                  <div className="absolute top-4 right-2 w-2 h-20 bg-cyan-400/30 rounded"></div>
                </div>

                {/* Torso */}
                <div className="w-20 h-40 bg-gradient-to-b from-slate-600 to-slate-700 rounded-lg relative -mt-8">
                  {/* Chest armor details */}
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-12 h-6 bg-cyan-400/40 rounded"></div>
                  <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-cyan-300/60 rounded"></div>

                  {/* Arms */}
                  <div className="absolute top-6 -left-6 w-6 h-24 bg-slate-700 rounded-lg transform -rotate-12"></div>
                  <div
                    className={`absolute top-6 -right-6 w-6 h-24 bg-slate-700 rounded-lg transform transition-transform duration-300 ${
                      isAiming ? "rotate-45" : "rotate-12"
                    }`}
                  ></div>
                </div>

                {/* Head */}
                <div className="w-16 h-16 bg-gradient-to-b from-slate-500 to-slate-600 rounded-full relative -mt-4">
                  {/* Helmet/Hair */}
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-18 h-12 bg-gradient-to-b from-white to-cyan-200 rounded-t-full"></div>
                  {/* Face/Visor */}
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-10 h-6 bg-gradient-to-r from-cyan-400 to-blue-400 rounded opacity-80 animate-pulse"></div>
                  {/* Eyes glow */}
                  <div className="absolute top-5 left-4 w-1 h-1 bg-cyan-300 rounded-full animate-pulse"></div>
                  <div className="absolute top-5 right-4 w-1 h-1 bg-cyan-300 rounded-full animate-pulse"></div>
                </div>

                {/* Weapon */}
                <div
                  className={`absolute top-16 -right-8 w-20 h-3 bg-gradient-to-r from-gray-600 to-gray-800 rounded transform transition-all duration-300 ${
                    isAiming ? "rotate-12 scale-110" : "rotate-6"
                  }`}
                >
                  {/* Weapon details */}
                  <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-6 h-1 bg-gray-900 rounded"></div>
                  <div className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-2 bg-gray-700 rounded"></div>

                  {/* Muzzle Flash */}
                  {isShooting && (
                    <div className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gradient-radial from-yellow-400 via-orange-500 to-red-500 rounded-full animate-ping opacity-80"></div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Character Info */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
            <div className="text-cyan-400 font-bold text-lg font-mono animate-pulse">JETT</div>
            <div className="text-cyan-300 text-sm font-mono">DUELIST</div>
          </div>
        </div>

        {/* Bullets */}
        {bullets.map((bullet) => (
          <div
            key={bullet.id}
            className="absolute w-2 h-1 bg-yellow-400 rounded-full shadow-lg animate-pulse"
            style={{
              left: `${bullet.x}%`,
              top: `${bullet.y}%`,
              boxShadow: "0 0 10px #fbbf24, 0 0 20px #f59e0b",
            }}
          >
            <div className="absolute inset-0 bg-white/50 rounded-full animate-ping"></div>
          </div>
        ))}
      </div>

      {/* HUD Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top HUD */}
        <div className="absolute top-8 left-8 right-8 flex justify-between items-start">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative w-12 h-12">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-lg opacity-30 animate-pulse"></div>
              <div className="relative w-full h-full bg-black/60 backdrop-blur-sm rounded-lg flex items-center justify-center border border-cyan-400/40">
                <Image src="/logo.png" alt="North Events" width={24} height={24} className="opacity-90" />
              </div>
            </div>
            <div>
              <h1 className="text-cyan-400 font-bold text-xl font-mono">NORTH EVENTS</h1>
              <p className="text-cyan-300/80 text-sm font-mono">INITIALIZING...</p>
            </div>
          </div>

          {/* Status */}
          <div className="text-right">
            <div className="text-cyan-400 font-mono text-lg font-bold">{progress}%</div>
            <div className="text-cyan-300/80 font-mono text-sm">LOADING</div>
          </div>
        </div>

        {/* Crosshair */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative w-8 h-8">
            <div className="absolute top-1/2 left-0 w-3 h-0.5 bg-cyan-400 transform -translate-y-1/2 animate-pulse"></div>
            <div className="absolute top-1/2 right-0 w-3 h-0.5 bg-cyan-400 transform -translate-y-1/2 animate-pulse"></div>
            <div className="absolute top-0 left-1/2 w-0.5 h-3 bg-cyan-400 transform -translate-x-1/2 animate-pulse"></div>
            <div className="absolute bottom-0 left-1/2 w-0.5 h-3 bg-cyan-400 transform -translate-x-1/2 animate-pulse"></div>
            <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-cyan-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>

        {/* Bottom Progress */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-96">
          <div className="text-center mb-4">
            <div className="text-cyan-400 font-mono text-sm animate-pulse">
              {progress < 100 ? "AGENT PREPARING FOR COMBAT..." : "READY FOR ACTION!"}
            </div>
          </div>

          <div className="h-3 bg-black/60 border border-cyan-400/40 relative overflow-hidden rounded">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-cyan-400 transition-all duration-500 relative rounded"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse rounded"></div>
              <div className="absolute right-0 top-0 w-4 h-full bg-white/50 animate-pulse rounded"></div>
            </div>
          </div>
        </div>

        {/* Side Elements */}
        <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
          <div className="space-y-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-3 h-12 border border-cyan-400/40 transition-all duration-300 ${
                  i < Math.floor(progress / 20) ? "bg-cyan-400" : "bg-cyan-400/10"
                }`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Scan Lines Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent animate-pulse"></div>
      </div>
    </div>
  )
}

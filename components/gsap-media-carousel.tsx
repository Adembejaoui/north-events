"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react"

interface MediaItem {
  id: string
  type: "image" | "video"
  src: string
  alt?: string
  poster?: string
}

interface GSAPMediaCarouselProps {
  items: MediaItem[]
  className?: string
}

export default function GSAPMediaCarousel({ items, className = "" }: GSAPMediaCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const boxesRef = useRef<HTMLDivElement>(null)
  const dragProxyRef = useRef<HTMLDivElement>(null)
  const nextButtonRef = useRef<HTMLButtonElement>(null)
  const prevButtonRef = useRef<HTMLButtonElement>(null)
  const animationRef = useRef<{
    LOOP_HEAD?: any
    PLAYHEAD?: { position: number }
    SCRUB?: any
    boxes?: HTMLElement[]
    draggable?: any
  }>({})
  const animationFrameRef = useRef<number | null>(null)

  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return

    const loadGSAP = async () => {
      try {
        const { gsap } = await import("gsap")
        const { ScrollTrigger } = await import("gsap/ScrollTrigger")
        const { Draggable } = await import("gsap/Draggable")

        gsap.registerPlugin(ScrollTrigger, Draggable)

        // Initial visibility setup
        gsap.set(containerRef.current, { opacity: 1, visibility: "visible" })

        const boxes = gsap.utils.toArray(".media-box") as HTMLElement[]
        if (boxes.length === 0) return

        animationRef.current.boxes = boxes

        // Initialize boxes
        gsap.set(".media-box", {
          yPercent: -50,
          display: "block",
          opacity: 1,
          visibility: "visible"
        })

        gsap.set("button", {
          z: 200,
          opacity: 1
        })

        const STAGGER = 0.1
        const DURATION = 1
        const OFFSET = 0

        const LOOP = gsap.timeline({
          paused: true,
          repeat: -1,
          ease: "none",
        })

        const SHIFTS = [...boxes, ...boxes, ...boxes]

        SHIFTS.forEach((BOX, index) => {
          const BOX_TL = gsap
            .timeline()
            .set(BOX, {
              xPercent: 200,
              rotateY: -50,
              opacity: 0,
              scale: 0.5,
            })
            .to(BOX, { opacity: 1, scale: 1, duration: 0.1 }, 0)
            .to(BOX, { opacity: 0, scale: 0.5, duration: 0.1 }, 0.9)
            .fromTo(
              BOX,
              { xPercent: 250 },
              { xPercent: -350, duration: 1, immediateRender: false, ease: "power1.inOut" },
              0,
            )
            .fromTo(
              BOX, 
              { rotateY: -50 }, 
              { rotateY: 50, immediateRender: false, duration: 1, ease: "power4.inOut" }, 
              0
            )
            .to(
              BOX, 
              { z: 100, scale: 1.25, duration: 0.1, repeat: 1, yoyo: true }, 
              0.4
            )
            .fromTo(
              BOX,
              { zIndex: 1 },
              { zIndex: boxes.length, repeat: 1, yoyo: true, ease: "none", duration: 0.5, immediateRender: false },
              0,
            )
          LOOP.add(BOX_TL, index * STAGGER)
        })

        const CYCLE_DURATION = STAGGER * boxes.length
        const START_TIME = CYCLE_DURATION + DURATION * 0.5 + OFFSET

        const LOOP_HEAD = gsap.fromTo(
          LOOP,
          { totalTime: START_TIME },
          { 
            totalTime: `+=${CYCLE_DURATION}`, 
            duration: 1, 
            ease: "none", 
            repeat: -1, 
            paused: true 
          },
        )

        const PLAYHEAD = { position: 0 }
        const POSITION_WRAP = gsap.utils.wrap(0, LOOP_HEAD.duration())

        const SCRUB = gsap.to(PLAYHEAD, {
          position: 0,
          onUpdate: () => {
            LOOP_HEAD.totalTime(POSITION_WRAP(PLAYHEAD.position))
          },
          paused: true,
          duration: 0.25,
          ease: "power3",
        })

        animationRef.current.LOOP_HEAD = LOOP_HEAD
        animationRef.current.PLAYHEAD = PLAYHEAD
        animationRef.current.SCRUB = SCRUB

        // Start the animation
        SCRUB.play()

        // Entrance animation
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 80%",
          onEnter: () => {
            gsap.fromTo(
              containerRef.current,
              { opacity: 0, y: 50 },
              { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
            )
          },
        })

        const SNAP = gsap.utils.snap(1 / boxes.length)

        const scrollToPosition = (position: number) => {
          const SNAP_POS = SNAP(position)
          PLAYHEAD.position = SNAP_POS
          SCRUB.invalidate().restart()
        }

        const NEXT = () => scrollToPosition(PLAYHEAD.position + 1 / boxes.length)
        const PREV = () => scrollToPosition(PLAYHEAD.position - 1 / boxes.length)

        const handleKeyDown = (event: KeyboardEvent) => {
          if (event.code === "ArrowLeft" || event.code === "KeyA") PREV()
          if (event.code === "ArrowRight" || event.code === "KeyD") NEXT()
        }

        // Drag handling
        let isDragging = false
        let dragStartTime = 0
        const DRAG_THRESHOLD = 150 // ms

        const handleBoxClick = (e: Event) => {
          if (isDragging || Date.now() - dragStartTime < DRAG_THRESHOLD) {
            return
          }

          const BOX = (e.target as HTMLElement).closest(".media-box") as HTMLElement
          if (BOX) {
            const TARGET = boxes.indexOf(BOX)
            if (TARGET === -1) return

            const CURRENT = Math.floor(boxes.length * PLAYHEAD.position) % boxes.length
            let BUMP = TARGET - CURRENT

            if (BUMP > boxes.length / 2) {
              BUMP -= boxes.length
            } else if (BUMP < -boxes.length / 2) {
              BUMP += boxes.length
            }

            scrollToPosition(PLAYHEAD.position + BUMP * (1 / boxes.length))
          }
        }

        // Smooth wheel handling
        const handleWheel = (e: WheelEvent) => {
          e.preventDefault()
          const delta = Math.sign(e.deltaY) * 0.5
          gsap.to(PLAYHEAD, {
            position: PLAYHEAD.position + delta * (1 / boxes.length),
            duration: 0.5,
            ease: "power2.out",
            onUpdate: () => {
              LOOP_HEAD.totalTime(POSITION_WRAP(PLAYHEAD.position))
            }
          })
        }

        document.addEventListener("keydown", handleKeyDown)
        boxesRef.current?.addEventListener("click", handleBoxClick)
        boxesRef.current?.addEventListener("wheel", handleWheel, { passive: false })
        nextButtonRef.current?.addEventListener("click", NEXT)
        prevButtonRef.current?.addEventListener("click", PREV)

        // Draggable setup
        if (dragProxyRef.current && boxesRef.current) {
          let startOffset = 0
          let lastDragTime = 0
          let lastDragX = 0
          let velocity = 0
          const DRAG_SENSITIVITY = 0.003
          const MOMENTUM_DECAY = 0.95

          const updateMomentum = () => {
            if (!isDragging) {
              const now = Date.now()
              const elapsed = now - lastDragTime
              
              if (elapsed < 100 && Math.abs(velocity) > 0.001) {
                PLAYHEAD.position += velocity
                velocity *= MOMENTUM_DECAY
                LOOP_HEAD.totalTime(POSITION_WRAP(PLAYHEAD.position))
                animationFrameRef.current = requestAnimationFrame(updateMomentum)
              } else {
                scrollToPosition(PLAYHEAD.position)
                velocity = 0
              }
            }
          }

          const draggable = Draggable.create(dragProxyRef.current, {
            type: "x",
            trigger: boxesRef.current,
            allowContextMenu: true,
            dragClickables: false,
            onPress() {
              startOffset = PLAYHEAD.position
              isDragging = true
              dragStartTime = Date.now()
              lastDragTime = Date.now()
              lastDragX = this.x
              velocity = 0
              if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current)
                animationFrameRef.current = null
              }
            },
            onDrag() {
              const now = Date.now()
              const deltaTime = now - lastDragTime
              const deltaX = this.x - lastDragX
              
              if (deltaTime > 0) {
                velocity = -deltaX * DRAG_SENSITIVITY * (8 / deltaTime)
              }
              
              PLAYHEAD.position = startOffset + (this.startX - this.x) * DRAG_SENSITIVITY
              LOOP_HEAD.totalTime(POSITION_WRAP(PLAYHEAD.position))
              
              lastDragTime = now
              lastDragX = this.x
            },
            onDragEnd() {
              isDragging = false
              animationFrameRef.current = requestAnimationFrame(updateMomentum)
            },
            onRelease() {
              setTimeout(() => {
                isDragging = false
              }, 50)
            },
          })

          animationRef.current.draggable = draggable

          // Touch support
          const handleTouchStart = (e: TouchEvent) => {
            if (e.touches.length === 1) {
              isDragging = false
              dragStartTime = Date.now()
            }
          }

          const handleTouchMove = (e: TouchEvent) => {
            if (e.touches.length === 1) {
              isDragging = true
            }
          }

          boxesRef.current.addEventListener("touchstart", handleTouchStart, { passive: true })
          boxesRef.current.addEventListener("touchmove", handleTouchMove, { passive: true })
        }

        return () => {
          document.removeEventListener("keydown", handleKeyDown)
          boxesRef.current?.removeEventListener("click", handleBoxClick)
          boxesRef.current?.removeEventListener("wheel", handleWheel)
          nextButtonRef.current?.removeEventListener("click", NEXT)
          prevButtonRef.current?.removeEventListener("click", PREV)
          ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
          if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current)
          }
        }
      } catch (error) {
        console.error("Error loading GSAP:", error)
      }
    }

    loadGSAP()
  }, [items])

  return (
    <section className={`py-16 bg-muted/30 dark:bg-muted/10 ${className}`}>
      {/* Section Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="text-center">
          <div className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <ArrowUpDown className="w-4 h-4 mr-2" />
            Galerie ESports
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Nos Moments Gaming Épiques</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Découvrez les moments forts de nos tournois et événements ESports à travers cette galerie interactive
          </p>
        </div>
      </div>

      <div 
        ref={containerRef} 
        className="media-carousel"
        style={{ opacity: 0 }} // Initial hidden state
      >
        <style jsx>{`
          .media-carousel {
            --bg: hsl(var(--background));
            --min-size: 200px;
            position: relative;
            width: 100%;
            overflow: hidden;
          }
          
          .media-boxes {
            height: 60vh;
            max-height: 500px;
            min-height: 400px;
            width: 100%;
            position: relative;
            transform-style: preserve-3d;
            perspective: 800px;
            touch-action: pan-y pinch-zoom;
            background: var(--bg);
            cursor: grab;
          }
          
          .media-boxes:active {
            cursor: grabbing;
          }
          
          .media-box {
            transform-style: preserve-3d;
            position: absolute;
            top: 50%;
            left: 50%;
            height: 20vmin;
            width: 20vmin;
            min-height: var(--min-size);
            min-width: var(--min-size);
            display: none;
            cursor: pointer;
            user-select: none;
            -webkit-user-select: none;
            opacity: 1;
            visibility: visible;
          }
          
          .media-box:hover {
            z-index: 10;
          }
          
          .media-box:after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            height: 100%;
            width: 100%;
            background-image: var(--bg-image);
            background-size: cover;
            transform: translate(-50%, -50%) rotate(180deg) translate(0, -100%) translate(0, -0.5vmin);
            opacity: 0.75;
            pointer-events: none;
          }
          
          .media-box:before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            height: 100%;
            width: 100%;
            background: linear-gradient(var(--bg) 50%, transparent);
            transform: translate(-50%, -50%) rotate(180deg) translate(0, -100%) translate(0, -0.5vmin) scale(1.01);
            z-index: 2;
            pointer-events: none;
          }
          
          @supports(-webkit-box-reflect: below) {
            .media-box {
              -webkit-box-reflect: below 0.5vmin linear-gradient(transparent 0 50%, white 100%);
            }
            
            .media-box:after,
            .media-box:before {
              display: none;
            }
          }
          
          .media-content {
            position: absolute;
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
            object-fit: cover;
            border-radius: 8px;
            pointer-events: none;
          }
          
          .controls {
            position: absolute;
            top: calc(50% + clamp(100px, 15vmin, 150px));
            left: 50%;
            transform: translate(-50%, -50%) scale(1.2);
            display: flex;
            justify-content: space-between;
            min-width: var(--min-size);
            height: 44px;
            width: 20vmin;
            z-index: 300;
          }
          
          .control-button {
            height: 48px;
            width: 48px;
            border-radius: 50%;
            position: absolute;
            top: 0%;
            outline: transparent;
            cursor: pointer;
            background: none;
            appearance: none;
            border: 0;
            transition: transform 0.1s;
            transform: translate(0, calc(var(--y, 0)));
          }
          
          .control-button:before {
            border: 2px solid hsl(var(--foreground));
            background: linear-gradient(hsla(var(--foreground), 0.65), hsl(var(--background))) hsl(var(--background));
            content: '';
            box-sizing: border-box;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            height: 80%;
            width: 80%;
            border-radius: 50%;
          }
          
          .control-button:active:before {
            background: linear-gradient(hsl(var(--background)), hsla(var(--foreground), 0.65)) hsl(var(--background));
          }
          
          .control-button:nth-of-type(1) {
            right: 100%;
          }
          
          .control-button:nth-of-type(2) {
            left: 100%;
          }
          
          .control-button:hover {
            --y: -5%;
          }
          
          .control-icon {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(0deg) translate(2%, 0);
            height: 30%;
            color: hsl(var(--foreground));
          }
          
          .control-button:nth-of-type(1) .control-icon {
            transform: translate(-50%, -50%) rotate(180deg) translate(2%, 0);
          }
          
          .scroll-icon {
            height: 30px;
            position: absolute;
            top: 1rem;
            right: 1rem;
            color: hsl(var(--foreground));
            animation: action 4s infinite;
          }
          
          @keyframes action {
            0%, 25%, 50%, 100% {
              transform: translate(0, 0);
            }
            12.5%, 37.5% {
              transform: translate(0, 25%);
            }
          }
          
          .drag-proxy {
            visibility: hidden;
            position: absolute;
            pointer-events: none;
          }
          
          .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border-width: 0;
          }
        `}</style>

        <div ref={boxesRef} className="media-boxes">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="media-box"
              style={{ "--bg-image": `url(${item.src})` } as React.CSSProperties}
            >
              <span className="sr-only">{index + 1}</span>
              {item.type === "image" ? (
                <Image
                  src={item.src || "/placeholder.svg"}
                  alt={item.alt || `Media item ${index + 1}`}
                  fill
                  className="media-content"
                  sizes="20vmin"
                  draggable={false}
                  priority={index < 3}
                />
              ) : (
                <video
                  src={item.src}
                  poster={item.poster}
                  className="media-content"
                  muted
                  loop
                  playsInline
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => e.currentTarget.pause()}
                />
              )}
            </div>
          ))}
        </div>

        <div className="controls">
          <button ref={nextButtonRef} className="control-button">
            <span className="sr-only">Previous item</span>
            <ChevronLeft className="control-icon" />
          </button>
          <button ref={prevButtonRef} className="control-button">
            <span className="sr-only">Next item</span>
            <ChevronRight className="control-icon" />
          </button>
        </div>

        <div ref={dragProxyRef} className="drag-proxy" />
      </div>
    </section>
  )
}
"use client"

import type React from "react"

import { useEffect, useState } from "react"

interface Bubble {
  id: number
  size: number
  color: string
  left: number
  top: number
  animationDuration: number
  animationDelay: number
  animationType: string
  name: string
}

export default function Component() {
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [hoveredBubble, setHoveredBubble] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const colors = [
    "rgba(59, 130, 246, 0.4)", // Blue
    "rgba(147, 51, 234, 0.4)", // Purple
    "rgba(236, 72, 153, 0.4)", // Pink
    "rgba(34, 197, 94, 0.4)", // Green
    "rgba(251, 191, 36, 0.4)", // Yellow
    "rgba(239, 68, 68, 0.4)", // Red
    "rgba(20, 184, 166, 0.4)", // Teal
    "rgba(168, 85, 247, 0.4)", // Violet
    "rgba(99, 102, 241, 0.4)", // Indigo
    "rgba(245, 101, 101, 0.4)", // Rose
  ]

  const bubbleNames = [
    "Sparkle",
    "Glimmer",
    "Shimmer",
    "Twinkle",
    "Glow",
    "Radiance",
    "Luminous",
    "Brilliant",
    "Dazzle",
    "Gleam",
    "Flash",
    "Beam",
    "Ray",
    "Aurora",
    "Prism",
    "Crystal",
    "Diamond",
    "Pearl",
    "Opal",
    "Sapphire",
    "Ruby",
    "Emerald",
    "Topaz",
    "Amethyst",
    "Quartz",
    "Nebula",
    "Stardust",
    "Comet",
    "Galaxy",
    "Cosmos",
    "Orbit",
    "Solar",
    "Lunar",
    "Mystic",
    "Enchant",
    "Magic",
    "Wonder",
    "Dream",
    "Fantasy",
    "Whisper",
    "Echo",
    "Breeze",
    "Zephyr",
    "Mist",
    "Cloud",
    "Sky",
    "Ocean",
    "River",
    "Stream",
    "Dewdrop",
  ]

  const animationTypes = ["float-vertical", "float-horizontal", "float-diagonal", "float-circular", "float-figure8"]

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY })
  }

  useEffect(() => {
    const generateBubbles = () => {
      const newBubbles: Bubble[] = []
      const bubbleCount = 35

      for (let i = 0; i < bubbleCount; i++) {
        newBubbles.push({
          id: i,
          size: Math.random() * 100 + 30, // 30px to 130px
          color: colors[Math.floor(Math.random() * colors.length)],
          left: Math.random() * 90 + 5, // 5% to 95%
          top: Math.random() * 90 + 5, // 5% to 95%
          animationDuration: Math.random() * 15 + 10, // 10s to 25s
          animationDelay: Math.random() * 5 + 1, // 1s to 6s delay to prevent immediate start
          animationType: animationTypes[Math.floor(Math.random() * animationTypes.length)],
          name: bubbleNames[Math.floor(Math.random() * bubbleNames.length)],
        })
      }
      setBubbles(newBubbles)
    }

    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      generateBubbles()
      setIsLoaded(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-black overflow-hidden relative cursor-none" onMouseMove={handleMouseMove}>
      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-gray-900/10 via-black/20 to-black pointer-events-none" />

      {/* Title */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent select-none">
          Bubbles
        </h1>
      </div>

      {/* Bubbles */}
      {isLoaded &&
        bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className={`absolute rounded-full bubble ${bubble.animationType} cursor-pointer hover:scale-110 transition-transform duration-300`}
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              backgroundColor: bubble.color,
              left: `${bubble.left}%`,
              top: `${bubble.top}%`,
              animationDuration: `${bubble.animationDuration}s`,
              animationDelay: `${bubble.animationDelay}s`,
              boxShadow: `0 0 ${bubble.size / 3}px ${bubble.color}, inset 0 0 ${bubble.size / 4}px rgba(255, 255, 255, 0.1)`,
            }}
            onMouseEnter={() => setHoveredBubble(bubble.id)}
            onMouseLeave={() => setHoveredBubble(null)}
          />
        ))}

      {/* Tooltip */}
      {hoveredBubble !== null && (
        <div
          className="fixed pointer-events-none z-20 bg-white/90 backdrop-blur-sm text-black px-3 py-2 rounded-lg shadow-lg text-sm font-medium"
          style={{
            left: mousePosition.x + 15,
            top: mousePosition.y - 35,
            transform: "translateX(-50%)",
          }}
        >
          {bubbles.find((b) => b.id === hoveredBubble)?.name}
        </div>
      )}

      <style jsx>{`
        .bubble {
          backdrop-filter: blur(1px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
          animation-fill-mode: both;
          will-change: transform;
          transform: translate3d(0, 0, 0);
        }

        .bubble:hover {
          box-shadow: 0 0 30px currentColor, inset 0 0 15px rgba(255, 255, 255, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        @keyframes float-vertical {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(0, -50px, 0) scale(1.05);
          }
        }

        @keyframes float-horizontal {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          50% {
            transform: translate3d(40px, 0, 0) scale(0.95);
          }
        }

        @keyframes float-diagonal {
          0%, 100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          25% {
            transform: translate3d(30px, -30px, 0) scale(1.1);
          }
          50% {
            transform: translate3d(60px, 0, 0) scale(0.9);
          }
          75% {
            transform: translate3d(30px, 30px, 0) scale(1.05);
          }
        }

        @keyframes float-circular {
          0% {
            transform: rotate(0deg) translate3d(40px, 0, 0) rotate(0deg) scale(1);
          }
          25% {
            transform: rotate(90deg) translate3d(40px, 0, 0) rotate(-90deg) scale(1.1);
          }
          50% {
            transform: rotate(180deg) translate3d(40px, 0, 0) rotate(-180deg) scale(0.9);
          }
          75% {
            transform: rotate(270deg) translate3d(40px, 0, 0) rotate(-270deg) scale(1.05);
          }
          100% {
            transform: rotate(360deg) translate3d(40px, 0, 0) rotate(-360deg) scale(1);
          }
        }

        @keyframes float-figure8 {
          0% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          12.5% {
            transform: translate3d(20px, -15px, 0) scale(1.05);
          }
          25% {
            transform: translate3d(0, -30px, 0) scale(0.95);
          }
          37.5% {
            transform: translate3d(-20px, -15px, 0) scale(1.1);
          }
          50% {
            transform: translate3d(0, 0, 0) scale(1);
          }
          62.5% {
            transform: translate3d(20px, 15px, 0) scale(0.9);
          }
          75% {
            transform: translate3d(0, 30px, 0) scale(1.05);
          }
          87.5% {
            transform: translate3d(-20px, 15px, 0) scale(1.1);
          }
          100% {
            transform: translate3d(0, 0, 0) scale(1);
          }
        }

        .float-vertical {
          animation-name: float-vertical;
        }

        .float-horizontal {
          animation-name: float-horizontal;
        }

        .float-diagonal {
          animation-name: float-diagonal;
        }

        .float-circular {
          animation-name: float-circular;
        }

        .float-figure8 {
          animation-name: float-figure8;
        }

        /* Radial gradient background */
        .bg-gradient-radial {
          background: radial-gradient(circle at center, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  )
}

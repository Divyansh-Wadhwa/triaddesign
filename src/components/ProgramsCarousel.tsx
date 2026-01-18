"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const slides = [
  {
    title: "Quantum Computing Workshop — IIT Hyderabad (200+ Students)",
    subtitle: "Hands-on sessions on qubits, entanglement and algorithms",
    bg: "linear-gradient(135deg,#0f172a,#003366)",
  },
  {
    title: "AI & Machine Learning Bootcamp — Intensive Program",
    subtitle: "End-to-end projects with mentors and industry case-studies",
    bg: "linear-gradient(135deg,#001219,#005f73)",
  },
  {
    title: "Hands-on Python Training — Engineering Colleges Across India",
    subtitle: "Practical labs, coding challenges and hackathons",
    bg: "linear-gradient(135deg,#0f172a,#6b21a8)",
  },
  {
    title: "Emerging Tech Talks — National & International Institutions",
    subtitle: "Keynotes from academia and industry leaders",
    bg: "linear-gradient(135deg,#02111b,#004d61)",
  },
]

export function ProgramsCarousel() {
  const [index, setIndex] = useState(0)
  const timeoutRef = useRef<number | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const touchStartX = useRef<number | null>(null)
  const touchDelta = useRef(0)

  useEffect(() => {
    const play = () => {
      timeoutRef.current = window.setTimeout(() => setIndex((i) => (i + 1) % slides.length), 4000)
    }
    play()
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    }
  }, [index])

  const goTo = (i: number) => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current)
    setIndex(i % slides.length)
  }

  // Basic swipe handling
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const onPointerDown = (e: PointerEvent) => {
      touchStartX.current = e.clientX
      touchDelta.current = 0
      (e.target as Element).setPointerCapture((e as any).pointerId)
    }
    const onPointerMove = (e: PointerEvent) => {
      if (touchStartX.current == null) return
      touchDelta.current = e.clientX - (touchStartX.current || 0)
    }
    const onPointerUp = () => {
      if (touchDelta.current > 50) setIndex((i) => (i - 1 + slides.length) % slides.length)
      else if (touchDelta.current < -50) setIndex((i) => (i + 1) % slides.length)
      touchStartX.current = null
      touchDelta.current = 0
    }

    el.addEventListener("pointerdown", onPointerDown)
    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerup", onPointerUp)

    return () => {
      el.removeEventListener("pointerdown", onPointerDown)
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("pointerup", onPointerUp)
    }
  }, [])

  return (
    <section className="w-full overflow-hidden bg-transparent">
      <div ref={containerRef} className="w-full">
        <div className="w-full relative" style={{ paddingTop: '56.25%' /* 16:9 */ }}>
          <AnimatePresence initial={false} mode="wait">
            {slides.map((s, i) =>
              i === index ? (
                <motion.div
                  key={i}
                  className="absolute inset-0 flex items-end"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.6 }}
                  style={{ background: s.bg }}
                >
                  <div className="absolute inset-0" style={{ mixBlendMode: 'normal' }} />
                  <div className="absolute left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="p-6 md:p-10 lg:p-12 max-w-4xl text-white z-10">
                    <h3 className="text-xl md:text-2xl lg:text-3xl font-bold">{s.title}</h3>
                    <p className="mt-2 text-sm md:text-base opacity-90">{s.subtitle}</p>
                  </div>
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={`w-3 h-3 rounded-full ${i === index ? 'bg-white' : 'bg-white/40'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProgramsCarousel

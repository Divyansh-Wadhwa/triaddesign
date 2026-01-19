"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Pyramid3D } from "./Pyramid3D"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen pt-12 overflow-hidden flex items-center">
      {/* Neutral hero background: subtle vignette + faint texture */}
      <div className="hero-vignette absolute inset-0 pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
        <div className="flex flex-col items-center justify-center relative w-full">

          {/* Centered Pyramid wrapper */}
          <div className="w-full flex justify-center">
            <div className="relative w-full max-w-[980px]">
              {/* Pyramid centered and slightly lowered with soft shadow */}
              <div className="relative z-10 flex justify-center translate-y-20 md:translate-y-28 lg:translate-y-36">
                <div className="w-full max-w-[720px] md:max-w-[820px]">
                  <Pyramid3D />
                </div>
              </div>

              {/* Headline: large single-line centered above the pyramid */}
              <motion.h1
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.12 }}
                className="pop-text absolute left-1/2 transform -translate-x-1/2 font-extrabold text-center text-[#0f172a] leading-tight z-30 whitespace-nowrap"
                style={{ top: '6%', fontSize: 'clamp(36px, 6.5vw, 80px)' }}
              >
                <span className="text-[#07121a]">Think.</span>{' '}
                <span className="text-[#07121a]">Train.</span>{' '}
                <span className="text-[#00B8D6]">Transform.</span>
              </motion.h1>
              {/* Subtitle: positioned below headline (absolute) so it sits above the pyramid */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.22 }}
                className="absolute left-1/2 transform -translate-x-1/2 text-center text-[#475569] z-40 px-4 whitespace-nowrap overflow-hidden"
                style={{
                  top: '20%',
                  fontSize: 'clamp(25px, 1.1vw, 18px)',
                  fontWeight: 500,
                  letterSpacing: '0.2px',
                  textShadow: '0 6px 18px rgba(15,23,42,0.03)'
                }}
              >
                Building future-ready minds for the age of Intelligence.
              </motion.p>

              {/* CTAs: kept below the pyramid in normal flow, with stronger contrast and higher z-index */}
              <div className="mt-8 md:mt-12 lg:mt-16 flex flex-col items-center text-center z-30">
                <div className="flex gap-6 items-center">
                  <Button size="lg" className="bg-[#07121a] hover:bg-[#0b1b26] text-white px-8 py-4 rounded-full text-lg font-semibold shadow-md flex items-center gap-3" asChild>
                    <Link href="#courses" className="flex items-center gap-3">
                      <span>Explore Programs</span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </Link>
                  </Button>

                  <Button size="lg" variant="ghost" className="bg-white border border-[#E6EEF0] text-[#0b3340] px-8 py-4 rounded-full text-lg font-semibold shadow-sm flex items-center gap-3" asChild>
                    <Link href="#contact" className="flex items-center gap-3">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M10 8l6 4-6 4V8z" fill="currentColor" />
                      </svg>
                      <span>Watch Demo</span>
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* bottom gradient removed to avoid visible white strip; section now fills viewport */}
    </section>
  )
}

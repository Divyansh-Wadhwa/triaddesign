"use client"

import React, { useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

// navbar 3D tilt uses simple DOM transforms (no R3F hooks)

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#programs", label: "Programs" },
  { href: "#courses", label: "Courses" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "/admin", label: "Admin" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-4 left-0 right-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="bg-white/95 backdrop-blur-sm rounded-[48px] border border-[#E5E7EB] shadow-sm">
            {/* Capsule content: three columns (logo, centered links, actions) */}
            <div className="grid grid-cols-3 items-center h-16 px-4 md:px-6">
              {/* Left: logo */}
              <div className="flex items-center">
                <Link href="/" className="flex items-center gap-3">
                  <img src="/logo.svg" alt="TRIAD Academy" className="h-10 w-auto" />
                  <div className="leading-tight hidden sm:block">
                    <div className="text-base font-bold text-[#1F242B]">TRIAD Academy</div>
                  </div>
                </Link>
              </div>

              {/* Center: nav links (centered) */}
              <div className="flex items-center justify-center">
                <nav className="hidden md:flex items-center gap-8">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-[#1F242B] hover:text-[#00B3C6] transition-colors font-medium text-sm tracking-wide"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Right: actions (CTA + mobile toggle) */}
              <div className="flex items-center justify-end gap-4">
                <div className="hidden md:flex items-center gap-4">
                  <Button className="bg-[#00B3C6] hover:bg-[#009DAD] text-white px-3 py-1 rounded-full text-sm">Get Started</Button>
                </div>

                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="md:hidden p-2 text-[#1F242B]"
                >
                  {isOpen ? <X size={20} /> : <Menu size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-[#E5E7EB]"
          >
            <div className="px-6 py-4 space-y-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-[#1F242B] hover:text-[#00B3C6] transition-colors font-medium py-2"
                >
                  {link.label}
                </Link>
              ))}
              <Button className="w-full bg-[#00B3C6] hover:bg-[#009DAD] text-white rounded-full">
                Get Started
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

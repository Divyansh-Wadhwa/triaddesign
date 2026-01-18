"use client"

import React, { useState, useRef } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ShoppingCart, User } from "lucide-react"
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
  const navInnerRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number | null>(null)

  const handlePointerMove = (e: React.PointerEvent) => {
    const el = navInnerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    const rotY = x * 6 // degrees
    const rotX = -y * 6
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`
      el.style.transition = 'transform 120ms linear'
    })
  }

  const handlePointerLeave = () => {
    const el = navInnerRef.current
    if (!el) return
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => {
      el.style.transform = 'none'
      el.style.transition = 'transform 300ms ease'
    })
  }

  return (
    <motion.nav
      initial={{ y: -120 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg border-b border-[#E5E7EB] rounded-b-3xl overflow-hidden shadow-sm"
    >
      {/* Top thin utility bar */}
      <div className="hidden md:flex items-center justify-between px-6 lg:px-8 h-6 bg-gray-100 text-xs text-gray-600">
        <div className="flex items-center gap-3">
          <span className="font-medium">Customer Care</span>
          <a href="tel:+10124189284903" className="text-[#6B21A8]">+10124189284903</a>
        </div>
        <div className="flex items-center gap-6 text-sm">
          <a href="#" className="hover:text-[#00B3C6]">Stores</a>
          <a href="#" className="hover:text-[#00B3C6]">Support</a>
          <a href="#" className="hover:text-[#00B3C6]">Privacy & Policy</a>
          <a href="#" className="hover:text-[#00B3C6]">Newsletter</a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={navInnerRef} className="grid grid-cols-3 items-center h-24 transform-gpu">
          {/* Left: logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3">
              <img src="/logo.svg" alt="TRIAD Academy" className="h-12 w-auto" />
              <div className="leading-tight hidden sm:block">
                <div className="text-lg font-bold text-[#1F242B]">TRIAD Academy</div>
              </div>
            </Link>
          </div>

          {/* Center: nav links (centered) */}
          <div className="flex items-center justify-center">
            <nav className="hidden md:flex items-center gap-10">
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

          {/* Right: actions */}
          <div className="flex items-center justify-end gap-4">
            <div className="hidden md:flex items-center gap-4">
              <button aria-label="cart" className="text-[#1F242B] hover:text-[#00B3C6]"><ShoppingCart size={20} /></button>
              <button aria-label="account" className="text-[#1F242B] hover:text-[#00B3C6]"><User size={20} /></button>
              <Button className="bg-[#00B3C6] hover:bg-[#009DAD] text-white px-5 py-2 rounded-full">Get Started</Button>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-[#1F242B]"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
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

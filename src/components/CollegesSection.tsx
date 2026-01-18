"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Marquee from "react-fast-marquee"
import { collegeLogoMap } from "@/lib/collegeLogos"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CollegesSection() {
  const logos = Object.values(collegeLogoMap)

  return (
    <section className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1F242B]">
            Shaping Futures <span className="text-[#00B3C6]">Across Institutions</span>
          </h2>
          <p className="mt-4 text-lg text-[#6B7280]">
            Programs, Workshops, and Collaborations That Inspire Learning
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <p className="text-center text-sm font-medium text-[#6B7280] mb-8 uppercase tracking-wider">
            Trusted By Institutions
          </p>

          <Marquee speed={40} gradient gradientColor="#FFFFFF" gradientWidth={100} className="py-2">
            {logos.map((src, i) => (
              <div
                key={src + i}
                className="mx-8 px-6 py-4 bg-[#F8FAFB] rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center"
              >
                <img src={src} alt={`Institution logo ${i + 1}`} className="h-14 w-auto object-contain" />
              </div>
            ))}
          </Marquee>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center bg-gradient-to-r from-[#00B3C6]/10 via-[#003366]/5 to-[#00B3C6]/10 rounded-3xl p-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-[#1F242B] mb-4">
            Bring TRIAD Academy to Your Campus
          </h3>
          <Button 
            size="lg"
            className="bg-[#00B3C6] hover:bg-[#009DAD] text-white px-8 py-6 text-lg rounded-full"
            asChild
          >
            <Link href="#contact">Partner With Us</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

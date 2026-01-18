"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Pyramid3D } from "./Pyramid3D"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen pt-20 overflow-hidden quantum-grid">
      <div className="gradient-mesh absolute inset-0 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-12 md:pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <motion.h1 
              className="pop-text text-5xl md:text-6xl lg:text-7xl font-bold text-[#1F242B] leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="text-[#00B8D6]">Think.</span>{" "}
              <span className="text-[#979a9f]">Train.</span>{" "}
              <br className="hidden md:block" />
              <span className="text-[#063f50]">Transform.</span>
            </motion.h1>
            
            <motion.p 
              className="mt-6 text-lg md:text-xl text-[#6B7280] max-w-xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Building future-ready minds for the age of Intelligence.
            </motion.p>
            
            <motion.div 
              className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Button 
                size="lg"
                className="bg-[#00B3C6] hover:bg-[#009DAD] text-white px-8 py-6 text-lg rounded-full cyan-glow"
                asChild
              >
                <Link href="#courses">Explore Programs</Link>
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-[#00B3C6] text-[#00B3C6] hover:bg-[#00B3C6]/10 px-8 py-6 text-lg rounded-full"
                asChild
              >
                <Link href="#contact">Contact Us</Link>
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#00B3C6]/10 to-transparent rounded-full blur-3xl" />
            <Pyramid3D />
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F8FAFB] to-transparent pointer-events-none" />
    </section>
  )
}

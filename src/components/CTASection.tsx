"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CTASection() {
  return (
    <section id="contact" className="py-24 md:py-32 bg-[#1F242B] relative overflow-hidden">
      <div className="absolute inset-0 quantum-grid opacity-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00B3C6]/20 rounded-full blur-3xl" />
      
      <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-8">
            <img
              src="/logo.svg"
              alt="TRIAD Academy"
              className="h-24 mx-auto animate-pulse-glow rounded-xl"
            />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Join the Future.
          </h2>
          
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            Begin your journey into Programming, AI, and Quantum Technologies.
          </p>
          
          <Button 
            size="lg"
            className="bg-[#00B3C6] hover:bg-[#009DAD] text-white px-10 py-7 text-xl rounded-full cyan-glow"
            asChild
          >
            <Link href="#courses">Start Learning</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

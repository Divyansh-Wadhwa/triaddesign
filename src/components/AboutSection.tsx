"use client"

import { motion } from "framer-motion"
import { Canvas, useFrame } from "@react-three/fiber"
import { useRef, useMemo } from "react"
import { Environment, Float } from "@react-three/drei"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

function QuantumMesh() {
  const ref = useRef<any>(null)
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.1
      ref.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial 
          color="#00B3C6" 
          wireframe 
          emissive="#00B3C6"
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  )
}

export function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1F242B] leading-tight">
              Where Technology Meets{" "}
              <span className="text-[#00B3C6]">Intelligence</span>
            </h2>
            
            <p className="mt-6 text-lg text-[#6B7280] leading-relaxed">
              TRIAD Academy is a technology-driven education and research organisation 
              dedicated to developing future-ready talent in programming, artificial 
              intelligence, quantum computing, and emerging technologies.
            </p>
            
            <Link 
              href="#programs"
              className="inline-flex items-center gap-2 mt-8 text-[#00B3C6] font-semibold hover:gap-4 transition-all"
            >
              Learn More <ArrowRight size={20} />
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-[400px] relative"
          >
            <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 5, 5]} intensity={1} />
              <pointLight position={[-5, -5, -5]} intensity={0.5} color="#00B3C6" />
              <QuantumMesh />
              <Environment preset="city" />
            </Canvas>
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-white via-transparent to-white" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

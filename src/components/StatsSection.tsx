"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { supabase, type Stat } from "@/lib/supabase"
import { Users, Building2, FolderKanban, Presentation } from "lucide-react"

const iconMap: Record<string, any> = {
  students: Users,
  colleges: Building2,
  projects: FolderKanban,
  workshops: Presentation,
}

function AnimatedCounter({ value, duration = 2 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  useEffect(() => {
    if (!isInView) return
    
    let startTime: number
    let animationFrame: number
    
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      
      setCount(Math.floor(progress * value))
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }
    
    animationFrame = requestAnimationFrame(animate)
    
    return () => cancelAnimationFrame(animationFrame)
  }, [value, duration, isInView])
  
  return <span ref={ref}>{count.toLocaleString()}+</span>
}

export function StatsSection() {
  const [stats, setStats] = useState<Stat[]>([])
  
  useEffect(() => {
    async function fetchStats() {
      const { data } = await supabase.from("stats").select("*")
      if (data) setStats(data)
    }
    fetchStats()
  }, [])

  return (
    <section className="py-24 md:py-32 bg-[#F8FAFB]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1F242B]">
            Our Growing <span className="text-[#00B3C6]">Universe</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = iconMap[stat.key] || Users
            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 text-center border-b-4 border-[#00B3C6] hover-lift"
              >
                <Icon className="w-10 h-10 mx-auto mb-4 text-[#00B3C6]" />
                <div className="text-4xl md:text-5xl font-bold text-[#1F242B] mb-2">
                  <AnimatedCounter value={stat.value} />
                </div>
                <p className="text-[#6B7280] font-medium">{stat.label}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

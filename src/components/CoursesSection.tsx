"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { supabase, type Course } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code2, Coffee, Cpu, Database, Brain, Atom } from "lucide-react"
import Link from "next/link"

const iconMap: Record<string, any> = {
  python: Code2,
  java: Coffee,
  cpp: Cpu,
  algorithm: Database,
  ai: Brain,
  quantum: Atom,
}

export function CoursesSection() {
  const [courses, setCourses] = useState<Course[]>([])
  
  useEffect(() => {
    async function fetchCourses() {
      const { data } = await supabase.from("courses").select("*").order("created_at")
      if (data) setCourses(data)
    }
    fetchCourses()
  }, [])

  return (
    <section id="courses" className="py-24 md:py-32 bg-[#F8FAFB]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1F242B]">
            Explore Our <span className="text-[#00B3C6]">Programs</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => {
            const Icon = iconMap[course.icon] || Code2
            return (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-[#E5E7EB] hover:border-[#00B3C6] hover-lift group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#00B3C6]/20 to-[#003366]/10 rounded-xl flex items-center justify-center mb-6">
                  <Icon className="w-7 h-7 text-[#00B3C6]" />
                </div>
                
                <h3 className="text-xl font-bold text-[#1F242B] mb-2">
                  {course.title}
                </h3>
                
                <div className="flex items-center gap-2 text-sm text-[#6B7280] mb-3">
                  <span className="bg-[#00B3C6]/10 text-[#00B3C6] px-3 py-1 rounded-full font-medium">
                    {course.duration}
                  </span>
                </div>
                
                <p className="text-[#6B7280] mb-4">{course.description}</p>
                
                <div className="text-xs text-[#00B3C6] font-medium mb-6">
                  {course.tag}
                </div>
                
                <Button 
                  variant="ghost" 
                  className="w-full justify-between text-[#00B3C6] hover:bg-[#00B3C6]/10 group/btn"
                >
                  View Details
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

"use client"

import { motion } from "framer-motion"
import { BookOpen, Briefcase, Rocket, Users, FlaskConical, Award } from "lucide-react"

const features = [
  {
    icon: BookOpen,
    title: "Structured Learning",
    description: "Step-by-step curriculum designed for mastery"
  },
  {
    icon: Briefcase,
    title: "Industry Projects",
    description: "Real-world projects with industry partners"
  },
  {
    icon: Rocket,
    title: "Future Tech Curriculum",
    description: "Stay ahead with cutting-edge technologies"
  },
  {
    icon: Users,
    title: "Personal Mentorship",
    description: "One-on-one guidance from industry experts"
  },
  {
    icon: FlaskConical,
    title: "Research-Driven Methods",
    description: "Learning backed by scientific research"
  },
  {
    icon: Award,
    title: "Skill + Certification",
    description: "Industry-recognized certifications"
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1F242B]">
            The <span className="text-[#00B3C6]">TRIAD</span> Edge
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-8 border border-[#E5E7EB] hover:border-[#00B3C6] hover-lift group"
            >
              <div className="w-14 h-14 bg-[#00B3C6]/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#00B3C6]/20 transition-colors">
                <feature.icon className="w-7 h-7 text-[#00B3C6]" />
              </div>
              <h3 className="text-xl font-bold text-[#1F242B] mb-3">
                {feature.title}
              </h3>
              <p className="text-[#6B7280]">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

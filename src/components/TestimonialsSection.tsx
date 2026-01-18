"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import { supabase, type Testimonial } from "@/lib/supabase"
import { Quote } from "lucide-react"
import "swiper/css"
import "swiper/css/pagination"

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  
  useEffect(() => {
    async function fetchTestimonials() {
      const { data } = await supabase.from("testimonials").select("*").order("created_at")
      if (data) setTestimonials(data)
    }
    fetchTestimonials()
  }, [])

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1F242B]">
            Voices of <span className="text-[#00B3C6]">Transformation</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={32}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-16"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id}>
                <div className="bg-[#F8FAFB] rounded-2xl p-8 h-full relative">
                  <Quote className="absolute top-6 right-6 w-8 h-8 text-[#00B3C6]/20" />
                  
                  <div className="flex items-center gap-4 mb-6">
                    <img 
                      src={testimonial.avatar_url} 
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-[#00B3C6]"
                    />
                    <div>
                      <h4 className="font-bold text-[#1F242B]">{testimonial.name}</h4>
                      <p className="text-sm text-[#6B7280]">{testimonial.college}</p>
                    </div>
                  </div>
                  
                  <p className="text-[#6B7280] leading-relaxed italic">
                    "{testimonial.feedback}"
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  )
}

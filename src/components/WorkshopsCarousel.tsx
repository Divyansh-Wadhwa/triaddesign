"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, EffectFade } from "swiper/modules"
import { supabase, type Workshop } from "@/lib/supabase"
import { ProgramsCarousel } from "@/components/ProgramsCarousel"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/effect-fade"

export function WorkshopsCarousel() {
  const [workshops, setWorkshops] = useState<Workshop[]>([])
  
  useEffect(() => {
    async function fetchWorkshops() {
      const { data } = await supabase.from("workshops").select("*").order("created_at")
      if (data) setWorkshops(data)
    }
    fetchWorkshops()
  }, [])

  return (
    <section id="programs" className="py-24 md:py-32 bg-[#F8FAFB]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#1F242B]">
            Our Journey <span className="text-[#00B3C6]">So Far</span>
          </h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
            {/* Insert the ProgramsCarousel (full-width 16:9) under the heading */}
            <ProgramsCarousel />

            {/* Keep workshops swiper below (optional) */}
            <div className="mt-8">
              <Swiper
                modules={[Autoplay, Pagination, EffectFade]}
                spaceBetween={0}
                slidesPerView={1}
                effect="fade"
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                className="rounded-2xl overflow-hidden shadow-2xl"
              >
                {workshops.map((workshop) => (
                  <SwiperSlide key={workshop.id}>
                    <div className="relative aspect-video">
                      <img 
                        src={workshop.image_url} 
                        alt={workshop.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-8 md:p-12">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                          {workshop.title}
                        </h3>
                        <p className="text-white/80 text-lg">{workshop.description}</p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
        </motion.div>
      </div>
    </section>
  )
}

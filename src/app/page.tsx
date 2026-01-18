import { Navbar } from "@/components/Navbar"
import { HeroSection } from "@/components/HeroSection"
import { AboutSection } from "@/components/AboutSection"
import { WorkshopsCarousel } from "@/components/WorkshopsCarousel"
import { CollegesSection } from "@/components/CollegesSection"
import { StatsSection } from "@/components/StatsSection"
import { FeaturesSection } from "@/components/FeaturesSection"
import { CoursesSection } from "@/components/CoursesSection"
import { TestimonialsSection } from "@/components/TestimonialsSection"
import { CTASection } from "@/components/CTASection"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F8FAFB]">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <WorkshopsCarousel />
      <CollegesSection />
      <StatsSection />
      <FeaturesSection />
      <CoursesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  )
}

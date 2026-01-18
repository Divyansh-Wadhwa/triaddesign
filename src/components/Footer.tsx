"use client"

import Link from "next/link"
import { Github, Linkedin, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white border-t border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
              <Link href="/" className="inline-block mb-6">
                <img
                  src="/logo.svg"
                  alt="TRIAD Academy"
                  className="h-12 w-auto"
                />
              </Link>
            <p className="text-[#6B7280] mb-4">Think. Train. Transform.</p>
            <p className="text-sm text-[#6B7280]">
              Building future-ready minds for the age of Intelligence.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-[#1F242B] mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {["About", "Programs", "Courses", "Testimonials", "Contact"].map((link) => (
                <li key={link}>
                  <Link 
                    href={`#${link.toLowerCase()}`}
                    className="text-[#6B7280] hover:text-[#00B3C6] transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-[#1F242B] mb-6">Programs</h4>
            <ul className="space-y-3">
              {["Python", "Java", "AI/ML", "Data Science", "Quantum Computing", "DSA"].map((program) => (
                <li key={program}>
                  <Link 
                    href="#courses"
                    className="text-[#6B7280] hover:text-[#00B3C6] transition-colors"
                  >
                    {program}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-[#1F242B] mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-[#6B7280]">
                <Mail className="w-5 h-5 text-[#00B3C6]" />
                contact@triadacademy.com
              </li>
              <li className="flex items-center gap-3 text-[#6B7280]">
                <Phone className="w-5 h-5 text-[#00B3C6]" />
                +91 9876543210
              </li>
              <li className="flex items-start gap-3 text-[#6B7280]">
                <MapPin className="w-5 h-5 text-[#00B3C6] flex-shrink-0" />
                Hyderabad, India
              </li>
            </ul>
            
            <div className="flex gap-4 mt-6">
              {[Twitter, Linkedin, Instagram, Github].map((Icon, i) => (
                <a 
                  key={i}
                  href="#"
                  className="w-10 h-10 bg-[#F8FAFB] rounded-full flex items-center justify-center text-[#6B7280] hover:bg-[#00B3C6] hover:text-white transition-colors"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="border-t border-[#00B3C6]/20 mt-12 pt-8 text-center text-sm text-[#6B7280]">
          <p>&copy; {new Date().getFullYear()} TRIAD Academy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

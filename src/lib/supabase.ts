import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Course = {
  id: string
  title: string
  icon: string
  duration: string
  description: string
  tag: string
  created_at: string
}

export type College = {
  id: string
  name: string
  logo_url: string
  created_at: string
}

export type Workshop = {
  id: string
  title: string
  description: string
  image_url: string
  created_at: string
}

export type Testimonial = {
  id: string
  name: string
  college: string
  feedback: string
  avatar_url: string
  created_at: string
}

export type Stat = {
  id: string
  key: string
  value: number
  label: string
}

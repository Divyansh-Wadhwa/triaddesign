import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in environment')
  process.exit(1)
}

const supabase = createClient(url, key)

async function run() {
  try {
    const { data: workshops, error: wErr } = await supabase.from('workshops').select('*')
    if (wErr) console.error('workshops error:', wErr.message)
    else console.log('workshops count:', (workshops || []).length)

    const { data: testimonials, error: tErr } = await supabase.from('testimonials').select('*')
    if (tErr) console.error('testimonials error:', tErr.message)
    else console.log('testimonials count:', (testimonials || []).length)

    const { data: courses, error: cErr } = await supabase.from('courses').select('*')
    if (cErr) console.error('courses error:', cErr.message)
    else console.log('courses count:', (courses || []).length)

  } catch (err) {
    console.error('unexpected error', err)
  }
}

run()

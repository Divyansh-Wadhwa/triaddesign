#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase env vars. Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Local mapping (kept in sync with src/lib/collegeLogos.ts)
const collegeLogoMap = {
  chitkara: '/logos/chitkara.svg',
  griet: '/logos/GRIET.svg',
  mgit: '/logos/MGIT.svg',
  snist: '/logos/SNIST.svg',
  srm: '/logos/SRM.svg',
  woxen: '/logos/WOXEN.svg',
}

async function main() {
  const { data: colleges, error } = await supabase.from('colleges').select('id, name, logo_url')
  if (error) throw error
  if (!colleges || colleges.length === 0) {
    console.log('No colleges found; nothing to do.')
    return
  }

  const updates = []
  for (const c of colleges) {
    const normalized = (c.name || '').toLowerCase().trim()
    const mapped = collegeLogoMap[normalized]
    if (mapped && c.logo_url !== mapped) {
      updates.push({ id: c.id, logo_url: mapped })
    }
  }

  console.log(`Found ${colleges.length} colleges, ${updates.length} to update.`)

  for (const u of updates) {
    const { error: upErr } = await supabase.from('colleges').update({ logo_url: u.logo_url }).eq('id', u.id)
    if (upErr) console.error(`Failed updating ${u.id}:`, upErr)
    else console.log(`Updated college ${u.id} -> ${u.logo_url}`)
  }
}

main().catch((err) => { console.error(err); process.exit(1) })

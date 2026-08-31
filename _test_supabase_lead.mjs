import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qlcuqmtpvncxbrvijnzt.supabase.co'
const supabaseAnonKey = 'sb_publishable_jmJzgy2ONFm-73ULQvupRg_lVe2N27L'

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testLeadInsertion() {
  console.log('=== TESTING SUPABASE LIVE LEADS TABLE ===')
  console.log('Connecting to:', supabaseUrl)

  const testPayload = {
    name: 'Kizen Launch Test (No Select)',
    phone: '+91 76969 63377',
    email: 'test@kizeneducation.com',
    programme: 'ACCA (Global Finance)',
    source: 'launch_automated_test',
  }

  console.log('Inserting test lead without select():', testPayload)

  // Standard website insert without reading back
  const { data, error } = await supabase
    .from('leads')
    .insert([testPayload])

  if (error) {
    console.error('❌ Insert Error:', error)
  } else {
    console.log('✅ Lead Insert Succeeded without error!')
  }
}

testLeadInsertion().catch(err => {
  console.error('Fatal Error:', err)
})


import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lwhxacuxkwbdptyjwgds.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3aHhhY3V4a3diZHB0eWp3Z2RzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwNjAyMTUsImV4cCI6MjA2NjYzNjIxNX0.BdWVpSkdeDvXbRJ0bL8g0inAnceBHIz8e0WZeoi4sWw'

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
})

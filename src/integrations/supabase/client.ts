
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ejkmuatuqxznhtwuxpmj.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqa211YXR1cXh6bmh0d3V4cG1qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUzNDUxMDksImV4cCI6MjA1MDkyMTEwOX0.8zlb6D5cJlPmYJoMzYtTfB4Jv9x8hJvUO5HvD3UY6cc'

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
})

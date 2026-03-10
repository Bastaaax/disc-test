import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const isValidUrl = (url) =>
  typeof url === 'string' &&
  (url.startsWith('https://') || url.startsWith('http://')) &&
  !url.includes('YOUR_') &&
  !url.includes('xxxx')

export const supabase =
  isValidUrl(supabaseUrl) && supabaseAnonKey && !String(supabaseAnonKey).includes('xxxx')
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null

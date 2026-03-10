import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const isValidUrl = (url) =>
  typeof url === 'string' &&
  (url.startsWith('https://') || url.startsWith('http://')) &&
  !url.includes('YOUR_') &&
  !url.includes('xxxx')

const hasValidConfig = isValidUrl(supabaseUrl) && supabaseAnonKey && !String(supabaseAnonKey).includes('xxxx')
export const supabase = hasValidConfig
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

if (!hasValidConfig && typeof window !== 'undefined') {
  console.warn(
    '[DISC] Supabase non configuré : ajoute VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY dans .env (en local) ou dans les variables d’environnement Vercel.'
  )
}

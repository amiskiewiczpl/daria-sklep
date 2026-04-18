const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY for Rosna admin.')
}

export const adminEnv = {
  appEnv: import.meta.env.VITE_APP_ENV || 'local',
  siteUrl: import.meta.env.VITE_ADMIN_SITE_URL || 'http://localhost:5174',
  basePath: import.meta.env.VITE_ADMIN_BASE_PATH || '/',
  supabaseUrl,
  supabaseAnonKey,
}

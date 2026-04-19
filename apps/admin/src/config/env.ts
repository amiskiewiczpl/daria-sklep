const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const adminEnv = {
  appEnv: import.meta.env.VITE_APP_ENV || 'local',
  siteUrl: import.meta.env.VITE_ADMIN_SITE_URL || 'http://localhost:5174',
  basePath: import.meta.env.VITE_ADMIN_BASE_PATH || '/',
  supabaseUrl: supabaseUrl || '',
  supabaseAnonKey: supabaseAnonKey || '',
  isSupabaseConfigured: Boolean(supabaseUrl && supabaseAnonKey),
}

export const adminEnvError = adminEnv.isSupabaseConfigured
  ? ''
  : 'Brakuje VITE_SUPABASE_URL albo VITE_SUPABASE_ANON_KEY w konfiguracji hostingu admina.'

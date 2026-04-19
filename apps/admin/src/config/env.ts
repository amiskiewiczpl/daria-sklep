const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const normalizedSupabaseAnonKey = supabaseAnonKey || ''
const isForbiddenBrowserKey =
  Boolean(normalizedSupabaseAnonKey) &&
  (normalizedSupabaseAnonKey.startsWith('sb_secret_') ||
    normalizedSupabaseAnonKey.toLowerCase().includes('service_role'))

const hasSupabaseConfig = Boolean(supabaseUrl && supabaseAnonKey && !isForbiddenBrowserKey)

export const adminEnv = {
  appEnv: import.meta.env.VITE_APP_ENV || 'local',
  siteUrl: import.meta.env.VITE_ADMIN_SITE_URL || 'http://localhost:5174',
  basePath: import.meta.env.VITE_ADMIN_BASE_PATH || '/',
  supabaseUrl: supabaseUrl || '',
  supabaseAnonKey: normalizedSupabaseAnonKey,
  isSupabaseConfigured: hasSupabaseConfig,
  isForbiddenBrowserKey,
}

export const adminEnvError = adminEnv.isSupabaseConfigured
  ? ''
  : adminEnv.isForbiddenBrowserKey
    ? 'W VITE_SUPABASE_ANON_KEY ustawiono sekretny klucz Supabase. Wklej publiczny klucz anon/publishable z Supabase Project Settings -> API.'
    : 'Brakuje VITE_SUPABASE_URL albo VITE_SUPABASE_ANON_KEY w konfiguracji hostingu admina.'

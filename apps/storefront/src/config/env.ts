const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const storefrontEnv = {
  appEnv: import.meta.env.VITE_APP_ENV || 'local',
  siteUrl: import.meta.env.VITE_STOREFRONT_SITE_URL || 'http://localhost:5173',
  basePath: import.meta.env.VITE_STOREFRONT_BASE_PATH || '/',
  supabaseUrl,
  supabaseAnonKey,
  isSupabaseConfigured: Boolean(supabaseUrl && supabaseAnonKey),
}

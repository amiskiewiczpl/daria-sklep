/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ENV?: 'local' | 'staging' | 'production'
  readonly VITE_SUPABASE_URL?: string
  readonly VITE_SUPABASE_ANON_KEY?: string
  readonly VITE_ADMIN_BASE_PATH?: string
  readonly VITE_ADMIN_SITE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

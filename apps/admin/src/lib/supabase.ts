import { createClient } from '@supabase/supabase-js'
import { adminEnv } from '../config/env'

export const supabase = createClient(
  adminEnv.supabaseUrl || 'https://missing-supabase-url.supabase.co',
  adminEnv.supabaseAnonKey || 'missing-supabase-anon-key',
)

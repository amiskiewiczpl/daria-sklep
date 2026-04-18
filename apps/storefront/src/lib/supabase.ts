import { createClient } from '@supabase/supabase-js'
import { storefrontEnv } from '../config/env'

export const isSupabaseConfigured = storefrontEnv.isSupabaseConfigured

export const supabase = isSupabaseConfigured
  ? createClient(storefrontEnv.supabaseUrl as string, storefrontEnv.supabaseAnonKey as string)
  : null

import { createClient } from '@supabase/supabase-js'
import { adminEnv } from '../config/env'

export const supabase = createClient(adminEnv.supabaseUrl, adminEnv.supabaseAnonKey)

import type { Session, User } from '@supabase/supabase-js'

export type AdminRole = 'admin' | 'editor' | 'seller'

export interface AdminProfile {
  id: string
  email: string
  role: AdminRole
  fullName: string | null
  avatarUrl: string | null
  isActive: boolean
}

export interface AuthState {
  session: Session | null
  user: User | null
  profile: AdminProfile | null
  loading: boolean
  profileLoading: boolean
  error: string
  isAuthenticated: boolean
  canAccessAdmin: boolean
}

export interface AuthContextValue extends AuthState {
  signIn: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

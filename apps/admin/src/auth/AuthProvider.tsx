import { Session } from '@supabase/supabase-js'
import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { AdminProfile, AuthContextValue } from './types'

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)

const adminRoles = new Set(['admin', 'editor', 'seller'])

const mapProfile = (row: {
  id: string
  email: string
  role: string
  full_name: string | null
  avatar_url: string | null
  is_active: boolean
}): AdminProfile => ({
  id: row.id,
  email: row.email,
  role: row.role as AdminProfile['role'],
  fullName: row.full_name,
  avatarUrl: row.avatar_url,
  isActive: row.is_active,
})

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<AdminProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [profileLoading, setProfileLoading] = useState(false)
  const [error, setError] = useState('')

  const loadProfile = useCallback(async (nextSession: Session | null) => {
    setProfile(null)
    setError('')

    if (!nextSession?.user) {
      return
    }

    setProfileLoading(true)

    const { data, error: profileError } = await supabase
      .from('admin_profiles')
      .select('id, email, role, full_name, avatar_url, is_active')
      .eq('id', nextSession.user.id)
      .eq('is_active', true)
      .single()

    if (profileError || !data) {
      setError('To konto nie ma dostępu do panelu Rosna.')
      setProfile(null)
      await supabase.auth.signOut()
      setProfileLoading(false)
      return
    }

    const nextProfile = mapProfile(data)

    if (!adminRoles.has(nextProfile.role)) {
      setError('Rola użytkownika nie pozwala na dostęp do panelu.')
      setProfile(null)
      await supabase.auth.signOut()
      setProfileLoading(false)
      return
    }

    setProfile(nextProfile)
    setProfileLoading(false)
  }, [])

  useEffect(() => {
    let mounted = true

    supabase.auth.getSession().then(async ({ data }) => {
      if (!mounted) {
        return
      }

      setSession(data.session)
      await loadProfile(data.session)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!mounted) {
        return
      }

      setSession(nextSession)
      loadProfile(nextSession).finally(() => setLoading(false))
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [loadProfile])

  const signIn = useCallback(async (email: string, password: string) => {
    setError('')
    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password })

    if (signInError) {
      setError(signInError.message)
      return { ok: false, error: signInError.message }
    }

    setSession(data.session)
    await loadProfile(data.session)
    return { ok: true }
  }, [loadProfile])

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
    setSession(null)
    setProfile(null)
  }, [])

  const refreshProfile = useCallback(async () => {
    await loadProfile(session)
  }, [loadProfile, session])

  const value = useMemo<AuthContextValue>(() => {
    const isAuthenticated = Boolean(session?.user)
    const canAccessAdmin = Boolean(isAuthenticated && profile?.isActive && adminRoles.has(profile.role))

    return {
      session,
      user: session?.user ?? null,
      profile,
      loading,
      profileLoading,
      error,
      isAuthenticated,
      canAccessAdmin,
      signIn,
      signOut,
      refreshProfile,
    }
  }, [error, loading, profile, profileLoading, refreshProfile, session, signIn, signOut])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

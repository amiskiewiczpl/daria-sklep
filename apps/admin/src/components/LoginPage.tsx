import { FormEvent, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth'

interface LoginLocationState {
  from?: { pathname: string }
  denied?: boolean
  error?: string
}

const LoginPage = () => {
  const { signIn, isAuthenticated, canAccessAdmin, loading, profileLoading, error } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const state = location.state as LoginLocationState | null
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const redirectTo = state?.from?.pathname ?? '/admin'

  if (!loading && !profileLoading && isAuthenticated && canAccessAdmin) {
    return <Navigate to={redirectTo} replace />
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setSubmitting(true)
    setFormError('')

    const result = await signIn(email, password)

    if (!result.ok) {
      setFormError(result.error ?? 'Nie udało się zalogować.')
      setSubmitting(false)
      return
    }

    navigate(redirectTo, { replace: true })
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-background px-5 py-12">
      <form onSubmit={handleSubmit} className="admin-card w-full max-w-md space-y-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase text-brand-accent">Rosna Admin</p>
          <h1 className="mt-3 text-3xl font-semibold">Logowanie sprzedawcy</h1>
          <p className="mt-3 text-sm leading-6 text-brand-muted">
            Dostęp tylko dla aktywnych profili z rolą admin, editor lub seller.
          </p>
        </div>

        <div>
          <label className="admin-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="admin-input"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
          />
        </div>

        <div>
          <label className="admin-label" htmlFor="password">
            Hasło
          </label>
          <input
            id="password"
            className="admin-input"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
        </div>

        {state?.denied ? (
          <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
            {state.error || 'Brak dostępu do panelu.'}
          </p>
        ) : null}
        {formError || error ? (
          <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{formError || error}</p>
        ) : null}

        <button type="submit" className="admin-button w-full" disabled={submitting || loading || profileLoading}>
          {submitting ? 'Logowanie...' : 'Zaloguj'}
        </button>
      </form>
    </main>
  )
}

export default LoginPage

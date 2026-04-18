import { FormEvent, useState } from 'react'
import { supabase } from '../lib/supabase'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })

    if (signInError) {
      setError(signInError.message)
    }

    setLoading(false)
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-background px-5 py-12">
      <form onSubmit={handleSubmit} className="admin-card w-full max-w-md space-y-6">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase text-brand-accent">Rosna Admin</p>
          <h1 className="mt-3 text-3xl font-semibold">Logowanie sprzedawcy</h1>
          <p className="mt-3 text-sm leading-6 text-brand-muted">Dostęp tylko dla kont przypisanych w tabeli admin_profiles.</p>
        </div>

        <div>
          <label className="admin-label" htmlFor="email">Email</label>
          <input id="email" className="admin-input" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </div>

        <div>
          <label className="admin-label" htmlFor="password">Hasło</label>
          <input id="password" className="admin-input" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </div>

        {error ? <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}

        <button type="submit" className="admin-button w-full" disabled={loading}>
          {loading ? 'Logowanie...' : 'Zaloguj'}
        </button>
      </form>
    </main>
  )
}

export default LoginPage

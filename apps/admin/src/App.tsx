import Dashboard from './components/Dashboard'
import LoginPage from './components/LoginPage'
import { useAdminSession } from './hooks/useAdminSession'

const App = () => {
  const { session, loading } = useAdminSession()

  if (loading) {
    return <main className="flex min-h-screen items-center justify-center bg-brand-background text-brand-muted">Ładowanie panelu...</main>
  }

  return session ? <Dashboard /> : <LoginPage />
}

export default App

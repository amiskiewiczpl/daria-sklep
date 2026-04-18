import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from './useAuth'

const FullPageState = ({ children }: { children: string }) => (
  <main className="flex min-h-screen items-center justify-center bg-brand-background px-5 text-center text-brand-muted">
    <div className="admin-card max-w-md">{children}</div>
  </main>
)

const ProtectedRoute = () => {
  const { loading, profileLoading, isAuthenticated, canAccessAdmin, error } = useAuth()
  const location = useLocation()

  if (loading || profileLoading) {
    return <FullPageState>Ładowanie sesji...</FullPageState>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }

  if (!canAccessAdmin) {
    return <Navigate to="/login" replace state={{ denied: true, error }} />
  }

  return <Outlet />
}

export default ProtectedRoute

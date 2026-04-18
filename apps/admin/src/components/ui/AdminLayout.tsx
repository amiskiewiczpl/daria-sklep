import { Outlet } from 'react-router-dom'
import { useAuth } from '../../auth'
import Sidebar, { AdminNavItem } from './Sidebar'
import Topbar from './Topbar'

const navItems: AdminNavItem[] = [
  { label: 'Dashboard', to: '/admin' },
  { label: 'Produkty', to: '/admin/products' },
  { label: 'Homepage', to: '/admin/homepage' },
  { label: 'Media', to: '/admin/media' },
  { label: 'Ustawienia', to: '/admin/settings' },
]

const AdminLayout = () => {
  const { profile, signOut } = useAuth()

  return (
    <div className="min-h-screen bg-brand-background text-brand">
      <Sidebar navItems={navItems} profile={profile} onSignOut={signOut} />

      <div className="lg:pl-72">
        <Topbar navItems={navItems} profile={profile} onSignOut={signOut} />

        <main className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          <div className="mx-auto w-full max-w-[1320px]">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout

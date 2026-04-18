import { NavLink } from 'react-router-dom'
import { AdminNavItem } from './Sidebar'
import { SecondaryButton } from './buttons'

interface TopbarProps {
  navItems: AdminNavItem[]
  profile?: { email?: string | null } | null
  onSignOut: () => void
}

const Topbar = ({ navItems, profile, onSignOut }: TopbarProps) => (
  <header className="sticky top-0 z-10 border-b border-brand-border bg-white/95 backdrop-blur">
    <div className="flex min-h-20 flex-col gap-4 px-5 py-4 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">
      <div className="lg:hidden">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-accent">Rosna</p>
        <h1 className="mt-1 text-xl font-semibold">Panel sprzedawcy</h1>
      </div>

      <nav className="flex gap-2 overflow-x-auto lg:hidden">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/admin'}
            className={({ isActive }) => (isActive ? 'admin-button min-w-fit' : 'admin-button-secondary min-w-fit')}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="hidden lg:block">
        <p className="text-sm text-brand-muted">Zalogowano jako {profile?.email}</p>
      </div>
      <SecondaryButton className="w-fit lg:ml-auto" type="button" onClick={onSignOut}>
        Wyloguj
      </SecondaryButton>
    </div>
  </header>
)

export default Topbar

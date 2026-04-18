import { NavLink } from 'react-router-dom'
import { SecondaryButton } from './buttons'

export interface AdminNavItem {
  label: string
  to: string
}

interface SidebarProps {
  navItems: AdminNavItem[]
  profile?: { email?: string | null; role?: string | null } | null
  onSignOut: () => void
}

const Sidebar = ({ navItems, profile, onSignOut }: SidebarProps) => (
  <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 border-r border-brand-border bg-white px-5 py-6 lg:block">
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-accent">Rosna</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight">Panel sprzedawcy</h1>
      <p className="mt-3 break-words text-sm leading-6 text-brand-muted">{profile?.email}</p>
    </div>

    <nav className="mt-10 grid gap-2">
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/admin'}
          className={({ isActive }) =>
            `rounded-lg px-4 py-3 text-sm font-semibold transition ${
              isActive ? 'bg-brand text-white' : 'text-brand-muted hover:bg-brand-background hover:text-brand'
            }`
          }
        >
          {item.label}
        </NavLink>
      ))}
    </nav>

    <div className="absolute bottom-6 left-5 right-5">
      <p className="mb-3 rounded-lg border border-brand-border bg-brand-background px-4 py-3 text-xs uppercase tracking-[0.12em] text-brand-muted">
        Rola: {profile?.role ?? '-'}
      </p>
      <SecondaryButton className="w-full" type="button" onClick={onSignOut}>
        Wyloguj
      </SecondaryButton>
    </div>
  </aside>
)

export default Sidebar

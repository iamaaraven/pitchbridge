import { Link, NavLink, Outlet } from 'react-router-dom'
import type { Role } from '../types'

interface LayoutProps {
  role: Role
  displayName: string
  onRoleChange: (role: Role) => void
  onNameChange: (name: string) => void
}

export function Layout({ role, displayName, onRoleChange, onNameChange }: LayoutProps) {
  return (
    <div className="app-shell">
      <header className="site-header">
        <div className="header-inner">
          <Link to="/" className="brand">
            <span className="brand-mark" aria-hidden="true" />
            <span className="brand-text">
              Pitch<span>Bridge</span>
            </span>
          </Link>

          <nav className="nav-links" aria-label="Main">
            <NavLink to="/browse">Browse</NavLink>
            <NavLink to="/submit">Submit idea</NavLink>
          </nav>

          <div className="header-controls">
            <label className="name-field">
              <span className="sr-only">Display name</span>
              <input
                type="text"
                placeholder="Your name"
                value={displayName}
                onChange={(e) => onNameChange(e.target.value)}
                maxLength={60}
              />
            </label>
            <div className="role-toggle" role="group" aria-label="Role">
              <button
                type="button"
                className={role === 'creator' ? 'active' : ''}
                onClick={() => onRoleChange('creator')}
              >
                Creator
              </button>
              <button
                type="button"
                className={role === 'funder' ? 'active' : ''}
                onClick={() => onRoleChange('funder')}
              >
                Funder
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <p>
            <strong>PitchBridge</strong> — demo marketplace. Funding interest is stored
            locally and is <em>not</em> real money or a securities offering.
          </p>
          <p className="footer-meta">Built for exploration · Client-side only</p>
        </div>
      </footer>
    </div>
  )
}

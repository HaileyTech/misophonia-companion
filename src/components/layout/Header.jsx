
import { Link, NavLink } from 'react-router-dom'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Sound Relief', path: '/sound-relief' },
  { label: 'Journal', path: '/journal' },
  { label: 'Learn', path: '/learn' },
  { label: 'Find Support', path: '/find-support' },
]

function Header() {
  return (
    <header className="bg-white">
      <div className="page-container flex flex-col items-center justify-between gap-5 py-5 md:flex-row">

        {/* Logo */}
        <Link to="/" className="shrink-0">
          <img
            src="/images/misophonia-logo.png"
            alt="Misophonia Companion"
            className="h-auto w-56"
          />
        </Link>

        {/* Main Navigation */}
        <nav aria-label="Main navigation">
          <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {navLinks.map(({ label, path }) => (
              <li key={path}>
                <NavLink
                  to={path}
                  end={path === '/'}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors
                    hover:text-sage
                    ${
                      isActive
                        ? 'text-sage underline underline-offset-4'
                        : 'text-charcoal'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

      </div>
    </header>
  )
}

export default Header

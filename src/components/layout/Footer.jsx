import { Link } from 'react-router-dom'

const footerLinks = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Privacy', path: '/privacy' },
  { label: 'Disclaimer', path: '/disclaimer' },
  { label: 'Sources', path: '/sources' },
]

function Footer() {
  return (
    <footer className="mt-12">
      <div className="mx-auto w-full max-w-[1280px] px-6 sm:px-10">
        <div className="border-t border-secondary/70 py-8 text-center">

          {/* Footer Navigation */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center justify-center gap-1 text-sm">
              {footerLinks.map(({ label, path }, index) => (
                <li key={path} className="flex items-center gap-1">
                  {index > 0 && (
                    <span aria-hidden="true">·</span>
                  )}

                  <Link
                    to={path}
                    className="hover:text-sage hover:underline"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Copyright */}
          <p className="mt-1 text-xs">
            © 2026 Misophonia Companion
          </p>

        </div>
      </div>
    </footer>
  )
}

export default Footer

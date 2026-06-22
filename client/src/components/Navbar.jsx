import { Link, useLocation } from 'react-router-dom'
import { Link2, BarChart3, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const navLinks = [
  { path: '/', label: 'Home', icon: Link2 },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
]

export default function Navbar() {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

  return (
    <nav className="bg-card/80 border-b border-border sticky top-0 z-50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg btn-primary flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300 ease-smooth">
              <Link2 className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-text tracking-tight group-hover:text-primary transition-colors duration-300 ease-smooth">
              Shortly
            </span>
          </Link>

          <div className="flex items-center gap-1">
            {navLinks.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ease-smooth ${
                  location.pathname === path
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : 'text-text-secondary hover:text-text hover:bg-surface'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
            <div className="w-px h-6 bg-border mx-2" />
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-text-secondary hover:text-text hover:bg-surface transition-all duration-300 ease-smooth"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center animate-fade-in">
        <div className="text-8xl font-extrabold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent mb-4 animate-fade-in-up">
          404
        </div>
        <h2 className="text-xl font-semibold text-text mb-2">Page not found</h2>
        <p className="text-text-secondary mb-6 text-sm max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-medium text-sm"
        >
          <Home className="w-4 h-4" />
          Go home
        </Link>
      </div>
    </div>
  )
}

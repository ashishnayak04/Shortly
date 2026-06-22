import { useState } from 'react'
import { Link } from 'react-router-dom'
import { BarChart3, Zap, Shield, QrCode, ExternalLink } from 'lucide-react'
import UrlForm from '../components/UrlForm'
import ResultCard from '../components/ResultCard'
import { useUrls } from '../hooks/useUrls'

const features = [
  { icon: Zap, title: 'Lightning Fast', desc: 'Shorten URLs instantly with our high-speed engine' },
  { icon: Shield, title: 'Reliable & Secure', desc: 'Enterprise-grade security with 99.9% uptime' },
  { icon: QrCode, title: 'QR Codes', desc: 'Auto-generated QR codes for every shortened link' },
  { icon: BarChart3, title: 'Analytics', desc: 'Track clicks, views, and engagement metrics' },
]

export default function Home() {
  const { urls, creating, createUrl } = useUrls()
  const [createdUrl, setCreatedUrl] = useState(null)

  const handleCreate = async (data) => {
    const result = await createUrl(data)
    if (result) setCreatedUrl(result.url)
  }

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden">
        {/* Subtle gradient decoration */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/[0.04] rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 relative">
          <div className="text-center mb-12">
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/8 text-primary text-sm font-semibold mb-6 border border-primary/10 animate-fade-in-up"
              style={{ animationDelay: '0ms' }}
            >
              <Zap className="w-4 h-4" />
              The modern URL shortener
            </div>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text mb-4 tracking-tight animate-fade-in-up"
              style={{ animationDelay: '80ms' }}
            >
              Shorten URLs.{' '}
              <span className="bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
                Simplify sharing.
              </span>
            </h1>
            <p
              className="text-text-secondary text-lg max-w-2xl mx-auto animate-fade-in-up"
              style={{ animationDelay: '160ms' }}
            >
              Create short, memorable links with custom aliases, QR codes, and powerful analytics.
              All in one place.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <UrlForm onSubmit={handleCreate} creating={creating} />
          </div>

          {createdUrl && (
            <div className="max-w-2xl mx-auto mt-6">
              <ResultCard url={createdUrl} />
            </div>
          )}

          {urls.length > 0 && (
            <div className="max-w-2xl mx-auto mt-8 text-center animate-fade-in-up" style={{ animationDelay: '350ms' }}>
              <Link
                to="/analytics"
                className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors duration-300 ease-smooth font-medium group"
              >
                View all links and analytics
                <ExternalLink className="w-3.5 h-3.5 transition-transform duration-300 ease-smooth group-hover:translate-x-0.5" />
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map(({ icon: Icon, title, desc }, i) => (
            <div
              key={title}
              className="card rounded-2xl p-5 text-center hover:border-primary/30 transition-all duration-500 ease-smooth group animate-slide-up"
              style={{ animationDelay: `${200 + i * 100}ms` }}
            >
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 ease-smooth shadow-sm">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-text font-semibold text-sm mb-1">{title}</h3>
              <p className="text-text-secondary text-xs">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

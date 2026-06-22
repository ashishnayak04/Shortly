import { useState } from 'react'
import { Link2, Hash, Sparkles } from 'lucide-react'
import ExpirationSelector from './ExpirationSelector'
import LoadingSpinner from './LoadingSpinner'
import { getExpirationDate } from '../utils/helpers'

export default function UrlForm({ onSubmit, creating }) {
  const [longUrl, setLongUrl] = useState('')
  const [customAlias, setCustomAlias] = useState('')
  const [expirationType, setExpirationType] = useState('never')
  const [customDate, setCustomDate] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!longUrl.trim()) return

    const expiresAt = expirationType === 'custom'
      ? customDate
      : getExpirationDate(expirationType)

    await onSubmit({
      longUrl: longUrl.trim(),
      customAlias: customAlias.trim() || undefined,
      expiresAt: expiresAt?.toISOString() || null,
    })

    setLongUrl('')
    setCustomAlias('')
    setExpirationType('never')
    setCustomDate(null)
  }

  return (
    <form onSubmit={handleSubmit} className="card rounded-2xl p-6 sm:p-8 space-y-6 animate-fade-in-up" style={{ animationDelay: '240ms' }}>
      <div className="text-center mb-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 text-primary text-xs font-semibold mb-3 tracking-wide">
          <Sparkles className="w-3 h-3" />
          Shorten your links in seconds
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-text">
          Paste your long URL below
        </h2>
        <p className="text-text-secondary text-sm mt-1">
          Create short, memorable links in one click
        </p>
      </div>

      <div className="relative">
        <Link2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary" />
        <input
          type="url"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="https://example.com/very-long-url-that-needs-shortening"
          className="input-field w-full pl-12 pr-4 py-3.5 rounded-xl text-sm"
          required
        />
      </div>

      <div className="relative">
        <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-text-secondary" />
        <input
          type="text"
          value={customAlias}
          onChange={(e) => setCustomAlias(e.target.value)}
          placeholder="Custom alias (optional) — e.g. my-link"
          className="input-field w-full pl-12 pr-4 py-3 rounded-xl text-sm"
          maxLength={20}
        />
      </div>

      <ExpirationSelector
        value={customDate}
        onChange={(val) => {
          if (val === 'never' || val === '1day' || val === '7days' || val === '30days') {
            setExpirationType(val)
            setCustomDate(null)
          } else {
            setExpirationType('custom')
            setCustomDate(val)
          }
        }}
      />

      <button
        type="submit"
        disabled={creating || !longUrl.trim()}
        className="w-full
    h-12
    rounded-xl
    bg-blue-600
    hover:bg-blue-500
    active:scale-[0.98]
    transition-all
    duration-200
    text-white
    font-semibold
    text-sm
    flex
    items-center
    justify-center
    gap-2
    disabled:bg-slate-700
    disabled:text-slate-400
    disabled:cursor-not-allowed"
      >
        {creating ? (
          <>
            <LoadingSpinner size={18} />
            Creating...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            Shorten URL
          </>
        )}
      </button>
    </form>
  )
}

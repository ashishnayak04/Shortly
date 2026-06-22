import { useState } from 'react'
import { ExternalLink, Copy, Check, Trash2, Search, Eye } from 'lucide-react'
import { copyToClipboard, formatDate } from '../utils/helpers'
import toast from 'react-hot-toast'

export default function UrlTable({ urls, onDelete, onViewStats, loading }) {
  const [copiedId, setCopiedId] = useState(null)
  const [search, setSearch] = useState('')

  const filtered = urls.filter(
    (u) =>
      u.longUrl.toLowerCase().includes(search.toLowerCase()) ||
      u.shortCode.toLowerCase().includes(search.toLowerCase())
  )

  const handleCopy = async (shortUrl, id) => {
    await copyToClipboard(shortUrl)
    setCopiedId(id)
    toast.success('Copied!')
    setTimeout(() => setCopiedId(null), 2000)
  }

  if (loading) {
    return (
      <div className="card rounded-2xl p-8 text-center animate-fade-in">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-surface rounded w-1/3 mx-auto"></div>
          <div className="h-3 bg-surface rounded w-1/4 mx-auto"></div>
        </div>
      </div>
    )
  }

  if (urls.length === 0) {
    return (
      <div className="card rounded-2xl p-8 text-center animate-fade-in">
        <Search className="w-8 h-8 text-text-secondary/40 mx-auto mb-3" />
        <p className="text-text-secondary text-sm">No URLs created yet. Shorten your first link above!</p>
      </div>
    )
  }

  return (
    <div className="card rounded-2xl overflow-hidden animate-fade-in-up">
      <div className="p-4 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search URLs..."
            className="input-field w-full pl-10 pr-4 py-2 rounded-lg text-sm"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-surface/50">
              <th className="text-left px-4 py-3 text-text-secondary text-xs font-medium uppercase tracking-wider">Original URL</th>
              <th className="text-left px-4 py-3 text-text-secondary text-xs font-medium uppercase tracking-wider">Short URL</th>
              <th className="text-center px-4 py-3 text-text-secondary text-xs font-medium uppercase tracking-wider">Clicks</th>
              <th className="text-left px-4 py-3 text-text-secondary text-xs font-medium uppercase tracking-wider hidden md:table-cell">Created</th>
              <th className="text-left px-4 py-3 text-text-secondary text-xs font-medium uppercase tracking-wider hidden lg:table-cell">Expires</th>
              <th className="text-right px-4 py-3 text-text-secondary text-xs font-medium uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
              {filtered.map((url, i) => (
              <tr key={url.id || url.shortCode} className="hover:bg-surface/50 transition-colors duration-300 ease-smooth animate-fade-in" style={{ animationDelay: `${i * 30}ms` }}>
                <td className="px-4 py-3.5">
                  <p className="text-text truncate max-w-[200px] sm:max-w-[300px]" title={url.longUrl}>
                    {url.longUrl}
                  </p>
                </td>
                <td className="px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-medium text-xs">{url.shortUrl}</span>
                    <button
                      onClick={() => handleCopy(url.shortUrl, url.id || url.shortCode)}
                      className="p-1 rounded hover:bg-surface transition-colors duration-200 ease-smooth"
                    >
                      {copiedId === (url.id || url.shortCode) ? (
                        <Check className="w-3 h-3 text-success" />
                      ) : (
                        <Copy className="w-3 h-3 text-text-secondary" />
                      )}
                    </button>
                    <a
                      href={url.shortUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1 rounded hover:bg-surface transition-colors duration-200 ease-smooth"
                    >
                      <ExternalLink className="w-3 h-3 text-text-secondary" />
                    </a>
                  </div>
                </td>
                <td className="px-4 py-3.5 text-center">
                  <span className="text-text font-semibold text-xs bg-surface px-2 py-0.5 rounded-full">{url.clicks}</span>
                </td>
                <td className="px-4 py-3.5 text-text-secondary text-xs hidden md:table-cell">
                  {formatDate(url.createdAt)}
                </td>
                <td className="px-4 py-3.5 text-xs hidden lg:table-cell">
                  {url.expiresAt ? (
                    <span className="text-amber">{formatDate(url.expiresAt)}</span>
                  ) : (
                    <span className="text-text-secondary">Never</span>
                  )}
                </td>
                <td className="px-4 py-3.5 text-right">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onViewStats?.(url.shortCode)}
                      className="p-1.5 rounded-lg hover:bg-surface text-text-secondary hover:text-primary transition-all duration-300 ease-smooth"
                      title="View stats"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onDelete(url.shortCode)}
                      className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-text-secondary hover:text-error transition-all duration-300 ease-smooth"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

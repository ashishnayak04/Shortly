import { MousePointerClick, Calendar, Clock, Globe, Link as LinkIcon, QrCode } from 'lucide-react'
import { formatDate } from '../utils/helpers'

export default function StatsCard({ url }) {
  const stats = [
    { label: 'Total Clicks', value: url.clicks, icon: MousePointerClick, color: 'text-primary' },
    { label: 'Created', value: formatDate(url.createdAt), icon: Calendar, color: 'text-success' },
    { label: 'Last Visited', value: formatDate(url.lastVisited), icon: Clock, color: 'text-secondary' },
    { label: 'Expires', value: url.expiresAt ? formatDate(url.expiresAt) : 'Never', icon: Globe, color: url.expiresAt ? 'text-amber' : 'text-text-secondary' },
  ]

  return (
    <div className="card rounded-2xl p-5 animate-fade-in-up">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-primary truncate">{url.shortUrl}</h4>
          <p className="text-xs text-text-secondary truncate mt-0.5">{url.longUrl}</p>
        </div>
        {url.qrCode && (
          <div className="ml-3 flex-shrink-0">
            <img src={url.qrCode} alt="QR" className="w-10 h-10 rounded-lg border border-border" />
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-surface rounded-xl p-3 border border-border">
            <div className="flex items-center gap-1.5 mb-1">
              <Icon className={`w-3 h-3 ${color}`} />
              <span className="text-[10px] text-text-secondary uppercase tracking-wider font-medium">{label}</span>
            </div>
            <p className={`text-sm font-semibold ${label === 'Expires' && url.expiresAt ? 'text-amber' : 'text-text'}`}>
              {value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

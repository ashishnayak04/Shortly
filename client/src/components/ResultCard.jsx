import { useState } from 'react'
import { Copy, Check, Download, ExternalLink, QrCode } from 'lucide-react'
import { copyToClipboard, formatDate } from '../utils/helpers'
import toast from 'react-hot-toast'

export default function ResultCard({ url }) {
  const [copiedShort, setCopiedShort] = useState(false)
  const [copiedLong, setCopiedLong] = useState(false)

  const handleCopyShort = async () => {
    await copyToClipboard(url.shortUrl)
    setCopiedShort(true)
    toast.success('Copied to clipboard!')
    setTimeout(() => setCopiedShort(false), 2000)
  }

  const handleCopyLong = async () => {
    await copyToClipboard(url.longUrl)
    setCopiedLong(true)
    toast.success('Original URL copied!')
    setTimeout(() => setCopiedLong(false), 2000)
  }

  const handleDownloadQR = () => {
    const link = document.createElement('a')
    link.href = url.qrCode
    link.download = `shortly-qr-${url.shortCode}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    toast.success('QR code downloaded!')
  }

  return (
    <div
      className="card rounded-2xl p-6 sm:p-8 animate-slide-up w-full max-w-full overflow-hidden"
      style={{ animationDelay: '100ms' }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center">
            <QrCode className="w-4 h-4 text-success" />
          </div>
          <h3 className="text-lg font-semibold text-text">Your shortened URL</h3>
        </div>
      </div>

      <div className="flex items-center gap-2 bg-surface rounded-xl p-3 w-full max-w-full">
        <a
          href={url.shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-primary text-sm font-medium truncate hover:underline min-w-0"
        >
          {url.shortUrl}
        </a>
        <button
          onClick={handleCopyShort}
          className="btn-primary p-2 rounded-lg transition-all duration-300 ease-smooth flex-shrink-0"
          title="Copy to clipboard"
        >
          {copiedShort ? (
            <Check className="w-4 h-4 text-white" />
          ) : (
            <Copy className="w-4 h-4 text-white" />
          )}
        </button>
        <a
          href={url.shortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-lg bg-surface border border-border text-text-secondary hover:text-text hover:border-primary/30 transition-all duration-300 ease-smooth flex-shrink-0"
          title="Open in new tab"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 mt-6 w-full max-w-full">
        {url.qrCode && (
          <div className="flex flex-col items-center gap-3 flex-shrink-0">
            <div className="card rounded-xl p-3 animate-scale-in">
              <img
                src={url.qrCode}
                alt={`QR code for ${url.shortCode}`}
                className="w-32 h-32 sm:w-40 sm:h-40"
              />
            </div>
            <button
              onClick={handleDownloadQR}
              className="flex items-center gap-2 text-xs text-text-secondary hover:text-primary transition-colors duration-300 ease-smooth"
            >
              <Download className="w-3.5 h-3.5" />
              Download QR
            </button>
          </div>
        )}

        <div className="flex-1 min-w-0 w-full">
          <div className="bg-surface rounded-xl p-4 border border-border space-y-3 w-full max-w-full">
            <div>
              <div className="flex items-center justify-between gap-2 mb-1">
                <span className="text-text-secondary text-xs font-medium">Original URL</span>
                <button
                  onClick={handleCopyLong}
                  className="p-1 rounded hover:bg-border/50 transition-colors duration-200 ease-smooth flex-shrink-0"
                  title="Copy original URL"
                >
                  {copiedLong ? (
                    <Check className="w-3.5 h-3.5 text-success" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-text-secondary" />
                  )}
                </button>
              </div>
              <p
                className="text-text text-xs leading-relaxed line-clamp-3 hover:line-clamp-none transition-all duration-200 ease-smooth"
                style={{
                  wordBreak: 'break-all',
                  overflowWrap: 'anywhere',
                  maxWidth: '100%',
                }}
                title={url.longUrl}
              >
                {url.longUrl}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
              <div>
                <span className="text-text-secondary text-xs font-medium">Clicks</span>
                <p className="text-text font-semibold mt-0.5">{url.clicks}</p>
              </div>
              <div>
                <span className="text-text-secondary text-xs font-medium">Created</span>
                <p className="text-text text-xs mt-0.5">{formatDate(url.createdAt)}</p>
              </div>
            </div>
            {url.expiresAt && (
              <div className="pt-3 border-t border-border">
                <span className="text-text-secondary text-xs font-medium">Expires</span>
                <p className="text-amber text-xs mt-0.5">{formatDate(url.expiresAt)}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

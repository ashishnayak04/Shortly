import { useState, useEffect, useCallback } from 'react'
import { BarChart3, Trash2, ArrowLeft, RefreshCw } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getAllUrls, deleteUrl, getUrlStats } from '../services/api'
import StatsCard from '../components/StatsCard'
import UrlTable from '../components/UrlTable'
import LoadingSpinner from '../components/LoadingSpinner'
import toast from 'react-hot-toast'

export default function Analytics() {
  const [urls, setUrls] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedStats, setSelectedStats] = useState(null)
  const [statsLoading, setStatsLoading] = useState(false)

  const fetchUrls = useCallback(async () => {
    try {
      const data = await getAllUrls()
      setUrls(data.urls)
    } catch {
      toast.error('Failed to fetch URLs')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUrls()
  }, [fetchUrls])

  const handleDelete = async (shortCode) => {
    try {
      await deleteUrl(shortCode)
      setUrls((prev) => prev.filter((u) => u.shortCode !== shortCode))
      toast.success('URL deleted')
      if (selectedStats?.shortCode === shortCode) {
        setSelectedStats(null)
      }
    } catch {
      toast.error('Delete failed')
    }
  }

  const handleViewStats = async (shortCode) => {
    setStatsLoading(true)
    try {
      const stats = await getUrlStats(shortCode)
      setSelectedStats(stats)
    } catch {
      toast.error('Failed to load stats')
    } finally {
      setStatsLoading(false)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <Link
              to="/"
              className="p-2 rounded-lg card text-text-secondary hover:text-text transition-colors duration-300 ease-smooth"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              <h1 className="text-xl sm:text-2xl font-bold text-text">Analytics</h1>
            </div>
          </div>
          <p className="text-text-secondary text-sm ml-11">
            Track performance of all your shortened URLs
          </p>
        </div>
        <button
          onClick={fetchUrls}
          className="p-2 rounded-lg card text-text-secondary hover:text-primary transition-colors duration-300 ease-smooth"
          title="Refresh"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      {selectedStats && (
        <div className="mb-6 relative">
          <button
            onClick={() => setSelectedStats(null)}
            className="absolute top-3 right-3 p-1.5 rounded-lg text-text-secondary hover:text-text hover:bg-surface transition-colors duration-300 ease-smooth z-10"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          {statsLoading ? (
            <div className="card rounded-2xl p-8 text-center">
              <LoadingSpinner className="mx-auto" />
            </div>
          ) : (
            <StatsCard url={selectedStats} />
          )}
        </div>
      )}

      <UrlTable
        urls={urls}
        onDelete={handleDelete}
        onViewStats={handleViewStats}
        loading={loading}
      />
    </div>
  )
}

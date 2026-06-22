import { useState, useEffect, useCallback } from 'react'
import { getAllUrls, createShortUrl, deleteUrl } from '../services/api'
import toast from 'react-hot-toast'

export function useUrls() {
  const [urls, setUrls] = useState([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)

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

  const createUrl = async (urlData) => {
    setCreating(true)
    try {
      const data = await createShortUrl(urlData)
      setUrls((prev) => [data.url, ...prev])
      toast.success('Short URL created successfully!')
      return data
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to create short URL'
      toast.error(message)
      throw error
    } finally {
      setCreating(false)
    }
  }

  const removeUrl = async (shortCode) => {
    try {
      await deleteUrl(shortCode)
      setUrls((prev) => prev.filter((u) => u.shortCode !== shortCode))
      toast.success('URL deleted successfully')
    } catch {
      toast.error('Failed to delete URL')
    }
  }

  return { urls, loading, creating, createUrl, removeUrl, refresh: fetchUrls }
}

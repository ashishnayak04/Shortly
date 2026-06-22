import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const createShortUrl = async (data) => {
  const response = await api.post('/urls', data)
  return response.data
}

export const getAllUrls = async () => {
  const response = await api.get('/urls')
  return response.data
}

export const getUrlStats = async (shortCode) => {
  const response = await api.get(`/urls/${shortCode}/stats`)
  return response.data
}

export const deleteUrl = async (shortCode) => {
  const response = await api.delete(`/urls/${shortCode}`)
  return response.data
}

export default api

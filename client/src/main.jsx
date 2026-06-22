import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import App from './App.jsx'
import './index.css'

function ThemedToaster() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <Toaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: isDark ? '#1E293B' : '#FFFFFF',
          color: isDark ? '#F1F5F9' : '#111827',
          border: isDark ? '1px solid #334155' : '1px solid #E5E7EB',
          boxShadow: isDark ? '0 4px 12px rgba(0, 0, 0, 0.3)' : '0 4px 12px rgba(0, 0, 0, 0.08)',
          fontSize: '14px',
        },
        success: { iconTheme: { primary: isDark ? '#4ADE80' : '#16A34A', secondary: isDark ? '#0F172A' : '#FFFFFF' } },
        error: { iconTheme: { primary: isDark ? '#F87171' : '#DC2626', secondary: isDark ? '#0F172A' : '#FFFFFF' } },
      }}
    />
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
        <ThemedToaster />
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)

export const formatDate = (dateString) => {
  if (!dateString) return 'Never'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const textarea = document.createElement('textarea')
    textarea.value = text
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    return true
  }
}

export const getExpirationDate = (option) => {
  const now = new Date()
  switch (option) {
    case '1day':
      return new Date(now.getTime() + 24 * 60 * 60 * 1000)
    case '7days':
      return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)
    case '30days':
      return new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
    case 'never':
    default:
      return null
  }
}

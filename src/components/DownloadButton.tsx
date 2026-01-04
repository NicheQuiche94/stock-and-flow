'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'

interface DownloadButtonProps {
  resourceId: string
  resourceTitle: string
  children: React.ReactNode
  className?: string
}

export default function DownloadButton({ 
  resourceId, 
  resourceTitle,
  children,
  className = ''
}: DownloadButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleDownload = async () => {
    setLoading(true)
    
    try {
      // Record the download
      await fetch('/api/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resourceId }),
      })

      // For now, just show an alert - later this will trigger actual file download
      alert(`Download started for: ${resourceTitle}\n\nNote: File storage will be set up next.`)
    } catch (error) {
      console.error('Download error:', error)
    }
    
    setLoading(false)
  }

  return (
    <button 
      onClick={handleDownload}
      disabled={loading}
      className={className}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <Loader2 className="animate-spin" size={18} />
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  )
}
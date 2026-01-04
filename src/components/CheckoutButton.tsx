'use client'

import { useState } from 'react'
import { Loader2 } from 'lucide-react'

interface CheckoutButtonProps {
  type: 'resource' | 'consulting'
  itemId: string
  itemName: string
  price: number
  children: React.ReactNode
  className?: string
}

export default function CheckoutButton({ 
  type, 
  itemId, 
  itemName, 
  price, 
  children,
  className = ''
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleCheckout = async () => {
    setLoading(true)
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, itemId, itemName, price }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else {
        console.error('No checkout URL returned')
        setLoading(false)
      }
    } catch (error) {
      console.error('Checkout error:', error)
      setLoading(false)
    }
  }

  return (
    <button 
      onClick={handleCheckout}
      disabled={loading}
      className={className}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <Loader2 className="animate-spin" size={18} />
          Processing...
        </span>
      ) : (
        children
      )}
    </button>
  )
}
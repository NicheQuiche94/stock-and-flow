'use client'

import { useState } from 'react'
import { CheckCircle2, ArrowRight, Loader2 } from 'lucide-react'

const packages = [
  { 
    id: 'day',
    hours: 8, 
    price: 495, 
    label: '1 Day',
    description: 'Full day on-site or remote',
  },
  { 
    id: 'week',
    hours: 40, 
    price: 1995, 
    label: '5 Days',
    description: 'Ideal for bigger projects',
    popular: true,
    savings: 480
  },
  { 
    id: 'month',
    hours: 160, 
    price: 4995, 
    label: 'Monthly',
    description: 'Store launch support',
    savings: 2205
  },
]

interface ConsultingPackagesProps {
  discount: number
}

export default function ConsultingPackages({ discount }: ConsultingPackagesProps) {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const applyDiscount = (price: number) => {
    return price * (1 - discount / 100)
  }

  const handlePurchase = async () => {
    if (!selectedPackage) return
    
    const pkg = packages.find(p => p.id === selectedPackage)
    if (!pkg) return

    setLoading(true)
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'consulting',
          itemId: pkg.id,
          itemName: `Consulting: ${pkg.label}`,
          price: Math.round(applyDiscount(pkg.price)),
        }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      }
    } catch (error) {
      console.error('Checkout error:', error)
    }
    
    setLoading(false)
  }

  return (
    <div>
      <h2 className="font-display text-xl text-dark-900 mb-6">Book More Time</h2>
      <div className="grid sm:grid-cols-3 gap-4">
        {packages.map((pkg) => {
          const discountedPrice = applyDiscount(pkg.price)
          const isSelected = selectedPackage === pkg.id
          
          return (
            <div 
              key={pkg.id}
              onClick={() => setSelectedPackage(pkg.id)}
              className={`relative bg-white border-2 rounded-lg p-6 cursor-pointer transition-all ${
                isSelected 
                  ? 'border-bronze-400 shadow-lg' 
                  : 'border-beige-200 hover:border-beige-300'
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-bronze-400 text-white text-xs px-3 py-1 rounded-full">
                  Popular
                </span>
              )}
              
              <p className="font-display text-2xl text-dark-900 mb-1">{pkg.label}</p>
              <p className="text-dark-500 text-sm mb-4">{pkg.description}</p>
              
              <div className="mb-4">
                {discount > 0 && (
                  <p className="text-dark-400 text-sm line-through">£{pkg.price}</p>
                )}
                <p className="font-display text-2xl text-dark-900">
                  £{Math.round(discountedPrice)}
                </p>
              </div>
              
              {pkg.savings && (
                <p className="text-bronze-400 text-sm">
                  Save £{pkg.savings + (discount > 0 ? Math.round(pkg.price * discount / 100) : 0)}
                </p>
              )}
              
              {isSelected && (
                <div className="absolute top-4 right-4">
                  <CheckCircle2 className="text-bronze-400" size={24} />
                </div>
              )}
            </div>
          )
        })}
      </div>
      
      <p className="text-dark-500 text-sm mt-4">
        Need hourly support? Contact us for ad-hoc hours at £75/hr.
      </p>
      
      {selectedPackage && (
        <div className="mt-6 p-4 bg-beige-100 rounded-lg flex items-center justify-between">
          <div>
            <p className="text-dark-900 font-medium">
              Selected: {packages.find(p => p.id === selectedPackage)?.label}
            </p>
            {discount > 0 && (
              <p className="text-dark-500 text-sm">Your {discount}% loyalty discount has been applied</p>
            )}
          </div>
          <button 
            onClick={handlePurchase}
            disabled={loading}
            className="flex items-center gap-2 bg-bronze-400 hover:bg-bronze-500 disabled:bg-bronze-300 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Processing...
              </>
            ) : (
              <>
                Purchase
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  )
}
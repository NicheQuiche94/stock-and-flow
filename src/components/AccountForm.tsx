'use client'

import { useState } from 'react'
import Link from 'next/link'
import { User, Bell, Save, LogOut, CheckCircle2 } from 'lucide-react'

interface AccountFormProps {
  email: string
  clerkId: string
  initialData: {
    name: string
    phone: string
    businessName: string
    location: string
    newsletterOptedIn: boolean
    productUpdatesOptedIn: boolean
    weeklyTipsOptedIn: boolean
  }
}

export default function AccountForm({ email, clerkId, initialData }: AccountFormProps) {
  const [name, setName] = useState(initialData.name)
  const [phone, setPhone] = useState(initialData.phone)
  const [businessName, setBusinessName] = useState(initialData.businessName)
  const [location, setLocation] = useState(initialData.location)
  const [newsletter, setNewsletter] = useState(initialData.newsletterOptedIn)
  const [productUpdates, setProductUpdates] = useState(initialData.productUpdatesOptedIn)
  const [tips, setTips] = useState(initialData.weeklyTipsOptedIn)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    
    try {
      const response = await fetch('/api/user/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clerkId,
          name,
          phone,
          business_name: businessName,
          location,
          newsletter_opted_in: newsletter,
          product_updates_opted_in: productUpdates,
          weekly_tips_opted_in: tips,
        }),
      })

      if (response.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 3000)
      }
    } catch (error) {
      console.error('Error saving:', error)
    }
    
    setSaving(false)
  }

  return (
    <>
      {/* Success Message */}
      {saved && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
          <CheckCircle2 className="text-green-600" size={20} />
          <p className="text-green-800">Your changes have been saved.</p>
        </div>
      )}

      {/* Profile Section */}
      <div className="bg-white border border-beige-200 rounded-lg p-6 mb-8">
        <h2 className="font-display text-xl text-dark-900 mb-6 flex items-center gap-2">
          <User size={20} className="text-bronze-400" />
          Profile Information
        </h2>
        
        <div className="space-y-6">
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-2">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-beige-50 border border-beige-200 rounded-lg text-dark-900"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full px-4 py-3 bg-beige-100 border border-beige-200 rounded-lg text-dark-500 cursor-not-allowed"
              />
              <p className="text-xs text-dark-400 mt-1">Managed by your login provider</p>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-dark-700 mb-2">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-3 bg-beige-50 border border-beige-200 rounded-lg text-dark-900"
              placeholder="+44 7123 456789"
            />
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-2">Business Name</label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full px-4 py-3 bg-beige-50 border border-beige-200 rounded-lg text-dark-900"
                placeholder="Your shop name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-700 mb-2">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-3 bg-beige-50 border border-beige-200 rounded-lg text-dark-900"
                placeholder="City or town"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Email Preferences */}
      <div className="bg-white border border-beige-200 rounded-lg p-6 mb-8">
        <h2 className="font-display text-xl text-dark-900 mb-6 flex items-center gap-2">
          <Bell size={20} className="text-bronze-400" />
          Email Preferences
        </h2>
        
        <div className="space-y-4">
          <label className="flex items-start gap-4 cursor-pointer">
            <input
              type="checkbox"
              checked={newsletter}
              onChange={(e) => setNewsletter(e.target.checked)}
              className="w-5 h-5 mt-0.5 rounded border-beige-300 text-bronze-400 focus:ring-bronze-400"
            />
            <div>
              <p className="text-dark-900 font-medium">Monthly Newsletter</p>
              <p className="text-dark-500 text-sm">Retail insights, industry trends, and tips from our team</p>
            </div>
          </label>
          
          <label className="flex items-start gap-4 cursor-pointer">
            <input
              type="checkbox"
              checked={productUpdates}
              onChange={(e) => setProductUpdates(e.target.checked)}
              className="w-5 h-5 mt-0.5 rounded border-beige-300 text-bronze-400 focus:ring-bronze-400"
            />
            <div>
              <p className="text-dark-900 font-medium">Product Updates</p>
              <p className="text-dark-500 text-sm">New resources, templates, and guides when they launch</p>
            </div>
          </label>
          
          <label className="flex items-start gap-4 cursor-pointer">
            <input
              type="checkbox"
              checked={tips}
              onChange={(e) => setTips(e.target.checked)}
              className="w-5 h-5 mt-0.5 rounded border-beige-300 text-bronze-400 focus:ring-bronze-400"
            />
            <div>
              <p className="text-dark-900 font-medium">Weekly Tips</p>
              <p className="text-dark-500 text-sm">Quick, actionable retail tips delivered every Tuesday</p>
            </div>
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button 
          onClick={handleSave}
          disabled={saving}
          className="flex items-center justify-center gap-2 bg-bronze-400 hover:bg-bronze-500 disabled:bg-bronze-300 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <Save size={20} />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
        
        <Link 
          href="/"
          className="flex items-center justify-center gap-2 bg-white border border-beige-200 hover:bg-beige-50 text-dark-700 px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <LogOut size={20} />
          Back to Site
        </Link>
      </div>
    </>
  )
}
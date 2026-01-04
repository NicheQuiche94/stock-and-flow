'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Lock, Mail, ArrowRight, Shield } from 'lucide-react'

export default function AdminLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    window.location.href = '/admin/dashboard'
  }

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center px-6 py-32">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-bronze-400/20 rounded-full mb-6">
            <Shield className="text-bronze-400" size={32} />
          </div>
          <h1 className="font-display text-3xl text-beige-50 mb-2">Admin Portal</h1>
          <p className="text-beige-400">Sign in to manage Stock & Flow</p>
        </div>

        <div className="bg-dark-800 border border-dark-700 rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-beige-300 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400" size={20} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-beige-50 placeholder-dark-400"
                  placeholder="admin@stockandflow.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-beige-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 bg-dark-700 border border-dark-600 rounded-lg text-beige-50 placeholder-dark-400"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-400 hover:text-beige-300"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-bronze-400 hover:bg-bronze-500 text-white py-4 rounded-lg font-medium transition-colors"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
              {!isLoading && <ArrowRight size={18} />}
            </button>
          </form>
        </div>

        <p className="text-center text-dark-500 text-sm mt-8">
          <Link href="/" className="text-bronze-400 hover:underline">Back to main site</Link>
        </p>
      </div>
    </div>
  )
}
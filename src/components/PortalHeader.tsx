'use client'

import Link from 'next/link'
import { UserButton } from '@clerk/nextjs'
import clsx from 'clsx'

interface PortalHeaderProps {
  user: {
    name: string
    tier: string
  }
  activePage: 'dashboard' | 'resources' | 'consulting' | 'account'
}

const navItems = [
  { href: '/portal/dashboard', label: 'Dashboard', key: 'dashboard' },
  { href: '/portal/resources', label: 'Resources', key: 'resources' },
  { href: '/portal/consulting', label: 'Consulting', key: 'consulting' },
  { href: '/portal/account', label: 'Account', key: 'account' },
]

export default function PortalHeader({ user, activePage }: PortalHeaderProps) {
  return (
    <header className="bg-white border-b border-beige-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="font-display text-xl text-dark-900 tracking-tight">
            Stock<span className="text-bronze-400">&</span>Flow
          </Link>

          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={clsx(
                    'text-sm font-medium transition-colors',
                    activePage === item.key
                      ? 'text-bronze-400'
                      : 'text-dark-500 hover:text-dark-900'
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-dark-900">{user.name}</p>
                <p className="text-xs text-dark-500">{user.tier} Member</p>
              </div>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: 'w-10 h-10',
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
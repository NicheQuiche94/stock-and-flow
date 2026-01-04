'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Menu, X, User } from 'lucide-react'
import clsx from 'clsx'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/consulting', label: 'Consulting' },
  { href: '/resources', label: 'Resources' },
  { href: '/contact', label: 'Contact' },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled 
          ? 'bg-beige-50/95 backdrop-blur-md shadow-sm py-4' 
          : 'bg-transparent py-6'
      )}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <span className={clsx(
              "font-display text-2xl tracking-tight transition-colors duration-300",
              isScrolled ? "text-dark-900" : "text-beige-50"
            )}>
              Stock<span className="text-bronze-400">&</span>Flow
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-12">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={clsx(
                      'relative py-2 text-sm font-medium tracking-wide transition-colors duration-300',
                      isScrolled
                        ? pathname === link.href
                          ? 'text-bronze-400'
                          : 'text-dark-600 hover:text-dark-900'
                        : pathname === link.href
                          ? 'text-bronze-400'
                          : 'text-beige-200 hover:text-beige-50'
                    )}
                  >
                    {link.label}
                    {pathname === link.href && (
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-bronze-400" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Auth Buttons */}
            <SignedOut>
              <Link
                href="/sign-in"
                className={clsx(
                  "flex items-center gap-2 px-5 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 rounded",
                  isScrolled
                    ? "bg-dark-900 text-beige-50 hover:bg-dark-800"
                    : "bg-beige-50 text-dark-900 hover:bg-white"
                )}
              >
                <User size={16} />
                Client Portal
              </Link>
            </SignedOut>
            
            <SignedIn>
              <div className="flex items-center gap-4">
                <Link
                  href="/portal/dashboard"
                  className={clsx(
                    "text-sm font-medium transition-colors duration-300",
                    isScrolled
                      ? "text-dark-600 hover:text-dark-900"
                      : "text-beige-200 hover:text-beige-50"
                  )}
                >
                  Dashboard
                </Link>
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: 'w-9 h-9',
                    },
                  }}
                />
              </div>
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={clsx(
              "lg:hidden p-2 transition-colors",
              isScrolled ? "text-dark-900" : "text-beige-50"
            )}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={clsx(
            'lg:hidden overflow-hidden transition-all duration-500 ease-out',
            isOpen ? 'max-h-[500px] opacity-100 mt-6' : 'max-h-0 opacity-0'
          )}
        >
          <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4 border border-beige-200">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={clsx(
                  'block py-3 px-4 text-base font-medium rounded-lg transition-colors duration-300',
                  pathname === link.href
                    ? 'bg-beige-100 text-bronze-400'
                    : 'text-dark-700 hover:bg-beige-50'
                )}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="pt-4 border-t border-beige-200">
              <SignedOut>
                <Link
                  href="/sign-in"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 bg-dark-900 text-beige-50 py-4 px-6 rounded-lg font-medium"
                >
                  <User size={18} />
                  Client Portal
                </Link>
              </SignedOut>
              
              <SignedIn>
                <div className="flex items-center justify-between">
                  <Link
                    href="/portal/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 text-dark-700 font-medium"
                  >
                    Go to Dashboard
                  </Link>
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
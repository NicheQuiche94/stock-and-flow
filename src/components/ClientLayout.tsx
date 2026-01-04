'use client'

import { usePathname } from 'next/navigation'
import Navigation from './Navigation'
import Footer from './Footer'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  
  const isAdmin = pathname.startsWith('/admin')
  const isPortal = pathname.startsWith('/portal')
  const hideMainNav = isAdmin || isPortal

  return (
    <>
      {!hideMainNav && <Navigation />}
      <main className={hideMainNav ? '' : 'min-h-screen'}>
        {children}
      </main>
      {!hideMainNav && <Footer />}
    </>
  )
}
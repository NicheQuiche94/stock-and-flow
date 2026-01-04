import type { Metadata } from 'next'
import { Merriweather, Work_Sans } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import ClientLayout from '@/components/ClientLayout'

const merriweather = Merriweather({ 
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-merriweather',
  display: 'swap',
})

const workSans = Work_Sans({ 
  subsets: ['latin'],
  variable: '--font-work-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Stock & Flow | Retail Consulting for Independent UK Retailers',
  description: 'Holistic retail advisory for family-run UK high street retailers. Hands-on consulting from real retail experience.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${merriweather.variable} ${workSans.variable}`}>
        <body className="font-body antialiased">
          <ClientLayout>{children}</ClientLayout>
        </body>
      </html>
    </ClerkProvider>
  )
}
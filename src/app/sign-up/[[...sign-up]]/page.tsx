import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-beige-50 flex items-center justify-center px-6 py-32">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="inline-block mb-8">
            <span className="font-display text-2xl text-dark-900 tracking-tight">
              Stock<span className="text-bronze-400">&</span>Flow
            </span>
          </Link>
          <h1 className="font-display text-3xl text-dark-900 mb-2">Create an account</h1>
          <p className="text-dark-500">Get access to resources and consulting</p>
        </div>

        <SignUp 
          appearance={{
            elements: {
              rootBox: 'w-full',
              card: 'bg-white border border-beige-200 shadow-none rounded-lg',
              headerTitle: 'hidden',
              headerSubtitle: 'hidden',
              socialButtonsBlockButton: 'bg-beige-50 border border-beige-200 hover:bg-beige-100',
              formButtonPrimary: 'bg-bronze-400 hover:bg-bronze-500',
              footerActionLink: 'text-bronze-400 hover:text-bronze-500',
              formFieldInput: 'bg-beige-50 border-beige-200 focus:ring-bronze-400 focus:border-bronze-400',
            },
          }}
        />
      </div>
    </div>
  )
}
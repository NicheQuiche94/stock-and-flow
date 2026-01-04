import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Shield } from 'lucide-react'
import PortalHeader from '@/components/PortalHeader'
import { getOrCreateUser } from '@/lib/user'
import AccountForm from '@/components/AccountForm'

export default async function PortalAccount() {
  const clerkUser = await currentUser()
  
  if (!clerkUser) {
    redirect('/sign-in')
  }

  const email = clerkUser.emailAddresses[0]?.emailAddress || ''
  const name = clerkUser.firstName || email.split('@')[0]
  
  const dbUser = await getOrCreateUser(clerkUser.id, email, name)

  const user = {
    name: dbUser?.name || name,
    email: email,
    tier: dbUser?.tier || 'Bronze',
    discount: dbUser?.discount_percent || 0,
  }

  const accountData = {
    name: dbUser?.name || '',
    phone: dbUser?.phone || '',
    businessName: dbUser?.business_name || '',
    location: dbUser?.location || '',
    newsletterOptedIn: dbUser?.newsletter_opted_in ?? true,
    productUpdatesOptedIn: dbUser?.product_updates_opted_in ?? true,
    weeklyTipsOptedIn: dbUser?.weekly_tips_opted_in ?? false,
  }

  return (
    <div className="min-h-screen bg-beige-50">
      <PortalHeader user={user} activePage="account" />

      <main className="max-w-3xl mx-auto px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="font-display text-3xl text-dark-900 mb-2">Account Settings</h1>
          <p className="text-dark-500">Manage your profile and preferences</p>
        </div>

        <AccountForm 
          email={email} 
          initialData={accountData}
          clerkId={clerkUser.id}
        />

        {/* Membership */}
        <div className="bg-dark-900 rounded-lg p-6 mb-8">
          <h2 className="font-display text-xl text-beige-50 mb-4 flex items-center gap-2">
            <Shield size={20} className="text-bronze-400" />
            Membership
          </h2>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="text-beige-50 font-medium">{user.tier} Member</p>
              <p className="text-beige-400 text-sm">
                {user.discount > 0 
                  ? `${user.discount}% loyalty discount on all purchases`
                  : 'Complete 10 consulting hours to unlock 5% discount'
                }
              </p>
            </div>
            <Link href="/portal/consulting" className="text-bronze-400 text-sm hover:underline">
              View benefits →
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
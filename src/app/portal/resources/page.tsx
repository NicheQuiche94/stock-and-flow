import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { 
  Download,
  FileText,
  BookOpen,
  ShoppingBag
} from 'lucide-react'
import PortalHeader from '@/components/PortalHeader'
import { getOrCreateUser } from '@/lib/user'
import { supabaseAdmin } from '@/lib/supabase'

export default async function PortalResources() {
  const clerkUser = await currentUser()
  
  if (!clerkUser) {
    redirect('/sign-in')
  }

  const email = clerkUser.emailAddresses[0]?.emailAddress || ''
  const name = clerkUser.firstName || email.split('@')[0]
  
  const dbUser = await getOrCreateUser(clerkUser.id, email, name)

  const user = {
    name: dbUser?.name || name,
    tier: dbUser?.tier || 'Bronze',
  }

  // Get purchased resources
  const { data: purchases } = await supabaseAdmin
    .from('purchases')
    .select(`
      *,
      resource:resources(*)
    `)
    .eq('user_id', dbUser?.id || '')
    .order('purchased_at', { ascending: false })

  // Get free downloads
  const { data: downloads } = await supabaseAdmin
    .from('downloads')
    .select(`
      *,
      resource:resources(*)
    `)
    .eq('user_id', dbUser?.id || '')
    .order('downloaded_at', { ascending: false })

  return (
    <div className="min-h-screen bg-beige-50">
      <PortalHeader user={user} activePage="resources" />

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl text-dark-900 mb-2">My Resources</h1>
            <p className="text-dark-500">Download your purchased and free resources</p>
          </div>
          <Link 
            href="/resources" 
            className="inline-flex items-center gap-2 bg-bronze-400 hover:bg-bronze-500 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <ShoppingBag size={20} />
            Browse More
          </Link>
        </div>

        {/* Bulk Buy Banner */}
        <div className="bg-dark-900 rounded-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-beige-50 font-display text-lg mb-1">Bulk Buy Discount</h3>
              <p className="text-beige-400 text-sm">Buy 3+ resources and save 10%. Buy 5+ and save 15%.</p>
            </div>
            <Link 
              href="/resources" 
              className="text-bronze-400 font-medium hover:underline text-sm"
            >
              View all resources →
            </Link>
          </div>
        </div>

        {/* Purchased Resources */}
        <div className="mb-12">
          <h2 className="font-display text-xl text-dark-900 mb-6 flex items-center gap-2">
            <BookOpen size={24} className="text-bronze-400" />
            Purchased Resources
          </h2>
          
          {purchases && purchases.length > 0 ? (
            <div className="bg-white border border-beige-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-dark-500 text-sm border-b border-beige-200 bg-beige-50">
                    <th className="px-6 py-4 font-medium">Resource</th>
                    <th className="px-6 py-4 font-medium hidden sm:table-cell">Purchased</th>
                    <th className="px-6 py-4 font-medium hidden sm:table-cell">Price</th>
                    <th className="px-6 py-4 font-medium text-right">Download</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {purchases.map((purchase: any) => (
                    <tr key={purchase.id} className="border-b border-beige-100 last:border-0">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-bronze-100 rounded-lg flex items-center justify-center">
                            <BookOpen className="text-bronze-400" size={20} />
                          </div>
                          <div>
                            <p className="text-dark-900 font-medium">{purchase.resource?.title}</p>
                            <p className="text-dark-400 text-xs sm:hidden">
                              {new Date(purchase.purchased_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-dark-500 hidden sm:table-cell">
                        {new Date(purchase.purchased_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-dark-900 hidden sm:table-cell">
                        £{purchase.amount_paid}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="inline-flex items-center gap-2 text-bronze-400 hover:text-bronze-500 font-medium">
                          <Download size={18} />
                          <span className="hidden sm:inline">Download</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-white border border-beige-200 rounded-lg p-12 text-center">
              <BookOpen className="text-beige-300 mx-auto mb-4" size={48} />
              <p className="text-dark-500 mb-4">No purchased resources yet</p>
              <Link href="/resources" className="text-bronze-400 font-medium hover:underline">
                Browse our premium resources
              </Link>
            </div>
          )}
        </div>

        {/* Free Downloads */}
        <div>
          <h2 className="font-display text-xl text-dark-900 mb-6 flex items-center gap-2">
            <FileText size={24} className="text-dark-400" />
            Free Downloads
          </h2>
          
          {downloads && downloads.length > 0 ? (
            <div className="bg-white border border-beige-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-dark-500 text-sm border-b border-beige-200 bg-beige-50">
                    <th className="px-6 py-4 font-medium">Resource</th>
                    <th className="px-6 py-4 font-medium hidden sm:table-cell">Downloaded</th>
                    <th className="px-6 py-4 font-medium text-right">Download</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {downloads.map((download: any) => (
                    <tr key={download.id} className="border-b border-beige-100 last:border-0">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-beige-100 rounded-lg flex items-center justify-center">
                            <FileText className="text-dark-400" size={20} />
                          </div>
                          <div>
                            <p className="text-dark-900 font-medium">{download.resource?.title}</p>
                            <p className="text-dark-400 text-xs sm:hidden">
                              {new Date(download.downloaded_at).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-dark-500 hidden sm:table-cell">
                        {new Date(download.downloaded_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="inline-flex items-center gap-2 text-dark-600 hover:text-dark-900 font-medium">
                          <Download size={18} />
                          <span className="hidden sm:inline">Download</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-white border border-beige-200 rounded-lg p-12 text-center">
              <FileText className="text-beige-300 mx-auto mb-4" size={48} />
              <p className="text-dark-500 mb-4">No free downloads yet</p>
              <Link href="/resources" className="text-bronze-400 font-medium hover:underline">
                Browse our free resources
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
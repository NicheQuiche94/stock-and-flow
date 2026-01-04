import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { 
  Clock,
  Calendar,
  Award
} from 'lucide-react'
import PortalHeader from '@/components/PortalHeader'
import { getOrCreateUser } from '@/lib/user'
import { supabaseAdmin } from '@/lib/supabase'
import ConsultingPackages from '@/components/ConsultingPackages'

export default async function PortalConsulting() {
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
    totalHours: dbUser?.total_hours || 0,
    discount: dbUser?.discount_percent || 0,
  }

  // Get remaining hours from packages
  const { data: packages } = await supabaseAdmin
    .from('consulting_packages')
    .select('hours_remaining')
    .eq('user_id', dbUser?.id || '')
  
  const hoursRemaining = packages?.reduce((sum: number, pkg: any) => sum + pkg.hours_remaining, 0) || 0

  // Get upcoming sessions
  const { data: upcomingSessions } = await supabaseAdmin
    .from('consulting_sessions')
    .select('*')
    .eq('user_id', dbUser?.id || '')
    .eq('status', 'scheduled')
    .order('scheduled_date', { ascending: true })

  // Get past sessions
  const { data: pastSessions } = await supabaseAdmin
    .from('consulting_sessions')
    .select('*')
    .eq('user_id', dbUser?.id || '')
    .eq('status', 'completed')
    .order('scheduled_date', { ascending: false })
    .limit(10)

  return (
    <div className="min-h-screen bg-beige-50">
      <PortalHeader user={user} activePage="consulting" />

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="font-display text-3xl text-dark-900 mb-2">Consulting</h1>
          <p className="text-dark-500">Book sessions and manage your consulting hours</p>
        </div>

        {/* Stats Row */}
        <div className="grid sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white border border-beige-200 rounded-lg p-6">
            <Clock className="text-bronze-400 mb-3" size={24} />
            <p className="text-3xl font-display text-dark-900 mb-1">{user.totalHours}</p>
            <p className="text-dark-500 text-sm">Total Hours Completed</p>
          </div>
          <div className="bg-white border border-beige-200 rounded-lg p-6">
            <Calendar className="text-bronze-400 mb-3" size={24} />
            <p className="text-3xl font-display text-dark-900 mb-1">{hoursRemaining}</p>
            <p className="text-dark-500 text-sm">Hours Remaining</p>
          </div>
          <div className="bg-white border border-beige-200 rounded-lg p-6">
            <Award className="text-bronze-400 mb-3" size={24} />
            <p className="text-3xl font-display text-dark-900 mb-1">{user.discount}%</p>
            <p className="text-dark-500 text-sm">Your Loyalty Discount</p>
          </div>
        </div>

        {/* Loyalty Progress */}
        <div className="bg-dark-900 rounded-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h3 className="text-beige-50 font-display text-lg mb-1">Loyalty Progress</h3>
              <p className="text-beige-400 text-sm">
                {user.discount < 25 
                  ? `Complete ${10 - (user.totalHours % 10)} more hours to unlock ${user.discount > 0 ? 'another' : 'your first'} 5% discount (up to 25% max)`
                  : 'You have reached the maximum 25% discount!'
                }
              </p>
            </div>
            <div className="flex items-center gap-4">
              {[5, 10, 15, 20, 25].map((discount) => (
                <div 
                  key={discount}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    user.discount >= discount 
                      ? 'bg-bronze-400 text-white' 
                      : 'bg-dark-700 text-dark-400'
                  }`}
                >
                  {discount}%
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Book More Hours - Client Component */}
          <div className="lg:col-span-2">
            <ConsultingPackages discount={user.discount} />
          </div>

          {/* Upcoming Sessions */}
          <div>
            <h2 className="font-display text-xl text-dark-900 mb-6">Upcoming Sessions</h2>
            {upcomingSessions && upcomingSessions.length > 0 ? (
              <div className="space-y-4">
                {upcomingSessions.map((session: any) => (
                  <div key={session.id} className="bg-white border border-beige-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <p className="text-dark-900 font-medium">{session.title}</p>
                      <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-700">
                        {session.status}
                      </span>
                    </div>
                    <p className="text-dark-500 text-sm">
                      {session.scheduled_date} at {session.scheduled_time}
                    </p>
                    <p className="text-bronze-400 text-sm">
                      {session.duration_hours} hour{session.duration_hours > 1 ? 's' : ''}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white border border-beige-200 rounded-lg p-8 text-center">
                <Calendar className="text-beige-300 mx-auto mb-4" size={48} />
                <p className="text-dark-500 mb-4">No upcoming sessions</p>
              </div>
            )}
            
            <Link 
              href="/contact" 
              className="block text-center p-4 mt-4 border-2 border-dashed border-beige-300 rounded-lg text-dark-500 hover:border-bronze-400 hover:text-bronze-400 transition-colors"
            >
              + Schedule a session
            </Link>
          </div>
        </div>

        {/* Session History */}
        <div>
          <h2 className="font-display text-xl text-dark-900 mb-6">Session History</h2>
          {pastSessions && pastSessions.length > 0 ? (
            <div className="bg-white border border-beige-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-dark-500 text-sm border-b border-beige-200 bg-beige-50">
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Topic</th>
                    <th className="px-6 py-4 font-medium hidden md:table-cell">Notes</th>
                    <th className="px-6 py-4 font-medium text-right">Hours</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {pastSessions.map((session: any) => (
                    <tr key={session.id} className="border-b border-beige-100 last:border-0">
                      <td className="px-6 py-4 text-dark-500">{session.scheduled_date}</td>
                      <td className="px-6 py-4 text-dark-900 font-medium">{session.title}</td>
                      <td className="px-6 py-4 text-dark-500 hidden md:table-cell">{session.notes || '-'}</td>
                      <td className="px-6 py-4 text-dark-900 text-right">{session.duration_hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="bg-white border border-beige-200 rounded-lg p-12 text-center">
              <Clock className="text-beige-300 mx-auto mb-4" size={48} />
              <p className="text-dark-500 mb-4">No consulting sessions yet</p>
              <p className="text-dark-400 text-sm">Purchase hours above and schedule your first session</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
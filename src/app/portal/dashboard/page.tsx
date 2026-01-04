import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { 
  FileText, 
  Clock,
  ChevronRight,
  BookOpen,
  Award,
  TrendingUp,
  Calendar
} from 'lucide-react'
import PortalHeader from '@/components/PortalHeader'
import { getOrCreateUser } from '@/lib/user'
import { supabaseAdmin } from '@/lib/supabase'

export default async function PortalDashboard() {
  const clerkUser = await currentUser()
  
  if (!clerkUser) {
    redirect('/sign-in')
  }

  // Get or create user in database
  const email = clerkUser.emailAddresses[0]?.emailAddress || ''
  const name = clerkUser.firstName || email.split('@')[0]
  
  const dbUser = await getOrCreateUser(clerkUser.id, email, name)

  if (!dbUser) {
    // Handle error - for now just use defaults
    console.error('Failed to get/create user')
  }

  const user = {
    name: dbUser?.name || name,
    email: dbUser?.email || email,
    business: dbUser?.business_name || 'Your Business',
    tier: dbUser?.tier || 'Bronze',
    totalHours: dbUser?.total_hours || 0,
    discount: dbUser?.discount_percent || 0,
  }

  // Get user's purchased resources count
  const { count: resourceCount } = await supabaseAdmin
    .from('purchases')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', dbUser?.id || '')

  // Get upcoming sessions
  const { data: upcomingSessions } = await supabaseAdmin
    .from('consulting_sessions')
    .select('*')
    .eq('user_id', dbUser?.id || '')
    .eq('status', 'scheduled')
    .order('scheduled_date', { ascending: true })
    .limit(3)

  // Get recent resources
  const { data: recentPurchases } = await supabaseAdmin
    .from('purchases')
    .select(`
      *,
      resource:resources(*)
    `)
    .eq('user_id', dbUser?.id || '')
    .order('purchased_at', { ascending: false })
    .limit(3)

  const progressToNextTier = ((user.totalHours % 10) / 10) * 100
  const hoursToNextDiscount = 10 - (user.totalHours % 10)

  // Calculate savings
  const totalSavings = Math.round(user.totalHours * 150 * (user.discount / 100))

  return (
    <div className="min-h-screen bg-beige-50">
      <PortalHeader user={user} activePage="dashboard" />

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="font-display text-3xl text-dark-900 mb-2">Welcome back, {user.name}</h1>
          <p className="text-dark-500">{user.business}</p>
        </div>

        {/* Loyalty Card */}
        <div className="bg-dark-900 rounded-lg p-6 lg:p-8 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-bronze-400 rounded-full flex items-center justify-center">
                <Award className="text-white" size={32} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-beige-50 font-display text-xl">{user.tier} Member</span>
                  {user.discount > 0 && (
                    <span className="bg-bronze-400 text-white text-xs px-2 py-1 rounded-full">{user.discount}% discount</span>
                  )}
                </div>
                <p className="text-beige-400 text-sm">{user.totalHours} consulting hours completed</p>
              </div>
            </div>
            
            <div className="lg:text-right">
              <p className="text-beige-400 text-sm mb-2">
                {user.discount < 25 
                  ? `${hoursToNextDiscount} hours until ${user.discount > 0 ? 'next' : 'first'} 5% discount`
                  : 'Maximum discount reached!'
                }
              </p>
              <div className="w-full lg:w-48 h-2 bg-dark-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-bronze-400 rounded-full transition-all"
                  style={{ width: `${progressToNextTier}%` }}
                />
              </div>
              <p className="text-beige-500 text-xs mt-2">
                {user.tier === 'Bronze' && 'Next tier: Silver at 10 hours'}
                {user.tier === 'Silver' && 'Next tier: Gold at 30 hours'}
                {user.tier === 'Gold' && 'You have reached the top tier!'}
              </p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Quick Stats */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white border border-beige-200 rounded-lg p-6">
              <BookOpen className="text-bronze-400 mb-4" size={24} />
              <p className="text-3xl font-display text-dark-900 mb-1">{resourceCount || 0}</p>
              <p className="text-dark-500 text-sm">Resources Owned</p>
              <Link href="/portal/resources" className="inline-flex items-center gap-1 text-bronze-400 text-sm mt-4 hover:underline">
                View all <ChevronRight size={16} />
              </Link>
            </div>

            <div className="bg-white border border-beige-200 rounded-lg p-6">
              <Clock className="text-bronze-400 mb-4" size={24} />
              <p className="text-3xl font-display text-dark-900 mb-1">{user.totalHours}</p>
              <p className="text-dark-500 text-sm">Consulting Hours</p>
              <Link href="/portal/consulting" className="inline-flex items-center gap-1 text-bronze-400 text-sm mt-4 hover:underline">
                Book more <ChevronRight size={16} />
              </Link>
            </div>

            <div className="bg-white border border-beige-200 rounded-lg p-6">
              <TrendingUp className="text-bronze-400 mb-4" size={24} />
              <p className="text-3xl font-display text-dark-900 mb-1">£{totalSavings}</p>
              <p className="text-dark-500 text-sm">Loyalty Savings</p>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Sessions */}
            <div className="bg-white border border-beige-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl text-dark-900">Upcoming Sessions</h2>
                <Link href="/portal/consulting" className="text-bronze-400 text-sm hover:underline">View all</Link>
              </div>
              
              {upcomingSessions && upcomingSessions.length > 0 ? (
                <div className="space-y-4">
                  {upcomingSessions.map((session: any) => (
                    <div key={session.id} className="flex items-center justify-between p-4 bg-beige-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-bronze-100 rounded-lg flex items-center justify-center">
                          <Calendar className="text-bronze-400" size={24} />
                        </div>
                        <div>
                          <p className="text-dark-900 font-medium">{session.title}</p>
                          <p className="text-dark-500 text-sm">{session.scheduled_date} at {session.scheduled_time}</p>
                        </div>
                      </div>
                      <span className="text-bronze-400 text-sm font-medium">{session.duration_hours} hour{session.duration_hours > 1 ? 's' : ''}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="text-beige-300 mx-auto mb-4" size={48} />
                  <p className="text-dark-500 mb-4">No upcoming sessions</p>
                  <Link href="/portal/consulting" className="text-bronze-400 font-medium hover:underline">
                    Book your first session
                  </Link>
                </div>
              )}
            </div>

            {/* Recent Resources */}
            <div className="bg-white border border-beige-200 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl text-dark-900">Your Resources</h2>
                <Link href="/resources" className="text-bronze-400 text-sm hover:underline">Browse resources</Link>
              </div>
              
              {recentPurchases && recentPurchases.length > 0 ? (
                <div className="space-y-4">
                  {recentPurchases.map((purchase: any) => (
                    <div key={purchase.id} className="flex items-center justify-between p-4 bg-beige-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-bronze-100 rounded-lg flex items-center justify-center">
                          <FileText className="text-bronze-400" size={20} />
                        </div>
                        <div>
                          <p className="text-dark-900 font-medium">{purchase.resource?.title}</p>
                          <p className="text-dark-400 text-sm">Purchased {new Date(purchase.purchased_at).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="text-beige-300 mx-auto mb-4" size={48} />
                  <p className="text-dark-500 mb-4">No resources yet</p>
                  <Link href="/resources" className="text-bronze-400 font-medium hover:underline">
                    Browse our resources
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
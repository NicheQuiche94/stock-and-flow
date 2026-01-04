import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { supabaseAdmin } from '@/lib/supabase'
import { getOrCreateUser } from '@/lib/user'

export async function POST(request: NextRequest) {
  try {
    const clerkUser = await currentUser()
    
    if (!clerkUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { resourceId } = body

    // Get or create user
    const email = clerkUser.emailAddresses[0]?.emailAddress || ''
    const name = clerkUser.firstName || email.split('@')[0]
    const dbUser = await getOrCreateUser(clerkUser.id, email, name)

    if (!dbUser) {
      return NextResponse.json({ error: 'Failed to get user' }, { status: 500 })
    }

    // Record download (upsert to avoid duplicates)
    const { error } = await supabaseAdmin
      .from('downloads')
      .upsert({
        user_id: dbUser.id,
        resource_id: resourceId,
        downloaded_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id,resource_id',
      })

    if (error) {
      console.error('Download record error:', error)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json({ error: 'Download failed' }, { status: 500 })
  }
}
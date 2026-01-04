import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { stripe } from '@/lib/stripe'
import { getOrCreateUser } from '@/lib/user'

export async function POST(request: NextRequest) {
  try {
    console.log('Checkout started')
    
    const clerkUser = await currentUser()
    console.log('Clerk user:', clerkUser?.id)
    
    if (!clerkUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    console.log('Request body:', body)
    
    const { type, itemId, itemName, price } = body

    const email = clerkUser.emailAddresses[0]?.emailAddress || ''
    const name = clerkUser.firstName || email.split('@')[0]
    const dbUser = await getOrCreateUser(clerkUser.id, email, name)
    console.log('DB user:', dbUser?.id)

    if (!dbUser) {
      return NextResponse.json({ error: 'Failed to get user' }, { status: 500 })
    }

    console.log('Creating Stripe session...')
    console.log('APP_URL:', process.env.NEXT_PUBLIC_APP_URL)
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: 'gbp',
            product_data: {
              name: itemName,
            },
            unit_amount: price * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/portal/dashboard?success=true&type=${type}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/${type === 'resource' ? 'resources' : 'portal/consulting'}?cancelled=true`,
      metadata: {
        userId: dbUser.id,
        clerkId: clerkUser.id,
        type: type,
        itemId: itemId,
      },
    })

    console.log('Session created:', session.id)
    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: String(error) }, { status: 500 })
  }
}
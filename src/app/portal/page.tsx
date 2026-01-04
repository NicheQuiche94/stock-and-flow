import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'

export default async function PortalPage() {
  const { userId } = await auth()
  
  if (userId) {
    redirect('/portal/dashboard')
  } else {
    redirect('/sign-in')
  }
}
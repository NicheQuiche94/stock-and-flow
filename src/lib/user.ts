import { supabaseAdmin } from './supabase'
import { User } from './types'

export async function getOrCreateUser(clerkId: string, email: string, name?: string): Promise<User | null> {
  const { data: existingUser } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('clerk_id', clerkId)
    .single()

  if (existingUser) {
    return existingUser as User
  }

  const { data: newUser, error: createError } = await supabaseAdmin
    .from('users')
    .insert({
      clerk_id: clerkId,
      email: email,
      name: name || null,
    })
    .select()
    .single()

  if (createError) {
    console.error('Error creating user:', createError)
    return null
  }

  return newUser as User
}

export async function getUserByClerkId(clerkId: string): Promise<User | null> {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('*')
    .eq('clerk_id', clerkId)
    .single()

  if (error) {
    return null
  }

  return data as User
}

export async function updateUser(clerkId: string, updates: Partial<User>): Promise<User | null> {
  const { data, error } = await supabaseAdmin
    .from('users')
    .update(updates)
    .eq('clerk_id', clerkId)
    .select()
    .single()

  if (error) {
    console.error('Error updating user:', error)
    return null
  }

  return data as User
}

export async function isUserAdmin(clerkId: string): Promise<boolean> {
  const { data, error } = await supabaseAdmin
    .from('users')
    .select('is_admin')
    .eq('clerk_id', clerkId)
    .single()

  if (error || !data) {
    return false
  }

  return data.is_admin === true
}

export function calculateTierAndDiscount(totalHours: number): { tier: 'Bronze' | 'Silver' | 'Gold', discount: number } {
  let tier: 'Bronze' | 'Silver' | 'Gold' = 'Bronze'
  let discount = 0

  if (totalHours >= 30) {
    tier = 'Gold'
  } else if (totalHours >= 10) {
    tier = 'Silver'
  }

  // 5% discount for every 10 hours, max 25%
  discount = Math.min(Math.floor(totalHours / 10) * 5, 25)

  return { tier, discount }
}
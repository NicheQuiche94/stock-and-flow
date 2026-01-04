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
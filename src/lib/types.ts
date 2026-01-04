export interface User {
  id: string
  clerk_id: string
  email: string
  name: string | null
  business_name: string | null
  location: string | null
  phone: string | null
  tier: 'Bronze' | 'Silver' | 'Gold'
  total_hours: number
  discount_percent: number
  newsletter_opted_in: boolean
  product_updates_opted_in: boolean
  weekly_tips_opted_in: boolean
  is_admin: boolean
  created_at: string
  updated_at: string
}

export interface Resource {
  id: string
  title: string
  description: string | null
  category: string
  price: number
  file_url: string | null
  is_active: boolean
  is_popular: boolean
  created_at: string
}

export interface Purchase {
  id: string
  user_id: string
  resource_id: string
  amount_paid: number
  stripe_payment_id: string | null
  purchased_at: string
}

export interface Download {
  id: string
  user_id: string
  resource_id: string
  downloaded_at: string
}

export interface ConsultingPackage {
  id: string
  user_id: string
  hours_purchased: number
  hours_remaining: number
  amount_paid: number
  stripe_payment_id: string | null
  purchased_at: string
}

export interface ConsultingSession {
  id: string
  user_id: string
  title: string
  scheduled_date: string | null
  scheduled_time: string | null
  duration_hours: number
  notes: string | null
  status: 'scheduled' | 'completed' | 'cancelled'
  created_at: string
}
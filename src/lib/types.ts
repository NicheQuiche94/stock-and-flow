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
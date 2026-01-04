'use client'

import Link from 'next/link'
import { 
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  BarChart3,
  LogOut,
  TrendingUp,
  DollarSign,
  Eye,
  Calendar
} from 'lucide-react'

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, active: false },
  { href: '/admin/users', label: 'Users', icon: Users, active: false },
  { href: '/admin/products', label: 'Products', icon: Package, active: false },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart, active: false },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3, active: true },
]

const topProducts = [
  { name: 'Store Operations Manual Template', sales: 23, revenue: 2231 },
  { name: 'Visual Merchandising Playbook', sales: 18, revenue: 2286 },
  { name: 'Customer Service Training Guide', sales: 15, revenue: 1305 },
  { name: 'New Starter Induction Guide', sales: 12, revenue: 804 },
]

const monthlyData = [
  { month: 'Sep', revenue: 820 },
  { month: 'Oct', revenue: 1340 },
  { month: 'Nov', revenue: 1890 },
  { month: 'Dec', revenue: 2450 },
  { month: 'Jan', revenue: 3120 },
]

export default function AdminAnalytics() {
  const maxRevenue = Math.max(...monthlyData.map(d => d.revenue))

  return (
    <div className="min-h-screen bg-dark-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-dark-800 border-r border-dark-700 flex flex-col">
        <div className="p-6 border-b border-dark-700">
          <Link href="/" className="block">
            <span className="font-display text-lg text-beige-50">Stock<span className="text-bronze-400">&</span>Flow</span>
            <span className="block text-xs text-dark-400 mt-1">Admin Panel</span>
          </Link>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    item.active 
                      ? 'bg-bronze-400 text-white' 
                      : 'text-dark-300 hover:bg-dark-700 hover:text-beige-50'
                  }`}
                >
                  <item.icon size={20} />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-dark-700">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-3 text-dark-400 hover:text-beige-50 rounded-lg hover:bg-dark-700">
            <LogOut size={20} />
            Sign Out
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-3xl text-beige-50 mb-2">Analytics</h1>
            <p className="text-dark-400">Track your performance</p>
          </div>
          <div className="flex items-center gap-2 bg-dark-800 border border-dark-700 rounded-lg px-4 py-2">
            <Calendar size={18} className="text-dark-400" />
            <select className="bg-transparent text-beige-50 text-sm border-none focus:ring-0">
              <option>Last 30 days</option>
              <option>Last 90 days</option>
              <option>All time</option>
            </select>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Revenue', value: '£4,520', change: '+18.2%', icon: DollarSign },
            { label: 'Total Orders', value: '42', change: '+23.1%', icon: ShoppingCart },
            { label: 'Total Users', value: '84', change: '+12.4%', icon: Users },
            { label: 'Page Views', value: '2.4K', change: '+8.7%', icon: Eye },
          ].map((stat, index) => (
            <div key={index} className="bg-dark-800 border border-dark-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className="text-bronze-400" size={24} />
                <span className="text-green-400 text-sm flex items-center gap-1">
                  <TrendingUp size={16} /> {stat.change}
                </span>
              </div>
              <p className="text-2xl font-display text-beige-50 mb-1">{stat.value}</p>
              <p className="text-dark-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Revenue Chart */}
          <div className="bg-dark-800 border border-dark-700 rounded-lg p-6">
            <h2 className="font-display text-xl text-beige-50 mb-6">Revenue</h2>
            <div className="flex items-end justify-between gap-4 h-48">
              {monthlyData.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div 
                    className="w-full bg-bronze-400 rounded-t transition-all hover:bg-bronze-500"
                    style={{ height: `${(data.revenue / maxRevenue) * 100}%` }}
                  />
                  <span className="text-dark-400 text-xs">{data.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="bg-dark-800 border border-dark-700 rounded-lg p-6">
            <h2 className="font-display text-xl text-beige-50 mb-6">Top Products</h2>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-bronze-400/20 rounded text-bronze-400 text-sm flex items-center justify-center">
                      {index + 1}
                    </span>
                    <span className="text-beige-50 text-sm">{product.name}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-beige-50 text-sm">£{product.revenue}</p>
                    <p className="text-dark-400 text-xs">{product.sales} sales</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
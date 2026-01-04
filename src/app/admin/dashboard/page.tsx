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
  Eye
} from 'lucide-react'

const stats = [
  { label: 'Total Revenue', value: '£4,520', change: '+12.5%', icon: DollarSign },
  { label: 'Total Users', value: '84', change: '+8.2%', icon: Users },
  { label: 'Total Orders', value: '42', change: '+23.1%', icon: ShoppingCart },
  { label: 'Page Views', value: '2.4K', change: '+5.7%', icon: Eye },
]

const recentOrders = [
  { id: 'ORD-001', customer: 'Sarah Mitchell', product: 'Operations Manual', amount: 97, status: 'completed' },
  { id: 'ORD-002', customer: 'James Chen', product: 'Training Guide', amount: 87, status: 'completed' },
  { id: 'ORD-003', customer: 'Emma Wilson', product: 'Merchandising Playbook', amount: 127, status: 'pending' },
]

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, active: true },
  { href: '/admin/users', label: 'Users', icon: Users, active: false },
  { href: '/admin/products', label: 'Products', icon: Package, active: false },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart, active: false },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3, active: false },
]

export default function AdminDashboard() {
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
        <div className="mb-8">
          <h1 className="font-display text-3xl text-beige-50 mb-2">Dashboard</h1>
          <p className="text-dark-400">Welcome back, Admin</p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-dark-800 border border-dark-700 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-bronze-400/20 rounded-lg flex items-center justify-center">
                  <stat.icon className="text-bronze-400" size={20} />
                </div>
                <span className="text-green-400 text-sm flex items-center gap-1">
                  <TrendingUp size={16} />
                  {stat.change}
                </span>
              </div>
              <p className="text-2xl font-display text-beige-50 mb-1">{stat.value}</p>
              <p className="text-dark-400 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Recent Orders */}
        <div className="bg-dark-800 border border-dark-700 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-xl text-beige-50">Recent Orders</h2>
            <Link href="/admin/orders" className="text-bronze-400 text-sm hover:underline">View All</Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-dark-400 text-sm border-b border-dark-700">
                  <th className="pb-4 font-medium">Order ID</th>
                  <th className="pb-4 font-medium">Customer</th>
                  <th className="pb-4 font-medium">Product</th>
                  <th className="pb-4 font-medium">Amount</th>
                  <th className="pb-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {recentOrders.map((order) => (
                  <tr key={order.id} className="border-b border-dark-700">
                    <td className="py-4 text-dark-300">{order.id}</td>
                    <td className="py-4 text-beige-50">{order.customer}</td>
                    <td className="py-4 text-dark-300">{order.product}</td>
                    <td className="py-4 text-beige-50">£{order.amount}</td>
                    <td className="py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status === 'completed' 
                          ? 'bg-green-900/30 text-green-400' 
                          : 'bg-yellow-900/30 text-yellow-400'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
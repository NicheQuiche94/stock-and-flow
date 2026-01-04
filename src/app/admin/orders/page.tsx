'use client'

import Link from 'next/link'
import { 
  LayoutDashboard,
  Users,
  Package,
  ShoppingCart,
  BarChart3,
  LogOut,
  Search,
  MoreVertical,
  Download
} from 'lucide-react'

const orders = [
  { id: 'ORD-001', customer: 'Sarah Mitchell', email: 'sarah@example.com', product: 'Operations Manual', amount: 97, status: 'completed', date: '2024-01-18' },
  { id: 'ORD-002', customer: 'James Chen', email: 'james@example.com', product: 'Training Guide', amount: 87, status: 'completed', date: '2024-01-18' },
  { id: 'ORD-003', customer: 'Emma Wilson', email: 'emma@example.com', product: 'Merchandising Playbook', amount: 127, status: 'pending', date: '2024-01-17' },
  { id: 'ORD-004', customer: 'Michael Brown', email: 'michael@example.com', product: 'Operations Manual', amount: 97, status: 'completed', date: '2024-01-17' },
]

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, active: false },
  { href: '/admin/users', label: 'Users', icon: Users, active: false },
  { href: '/admin/products', label: 'Products', icon: Package, active: false },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart, active: true },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3, active: false },
]

export default function AdminOrders() {
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
            <h1 className="font-display text-3xl text-beige-50 mb-2">Orders</h1>
            <p className="text-dark-400">View and manage orders</p>
          </div>
          <button className="flex items-center gap-2 bg-dark-700 hover:bg-dark-600 text-beige-50 px-6 py-3 rounded-lg font-medium transition-colors">
            <Download size={20} />
            Export CSV
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400" size={20} />
            <input
              type="text"
              placeholder="Search orders..."
              className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-beige-50 placeholder-dark-400"
            />
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-dark-800 border border-dark-700 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-left text-dark-400 text-sm border-b border-dark-700">
                <th className="px-6 py-4 font-medium">Order ID</th>
                <th className="px-6 py-4 font-medium">Customer</th>
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Amount</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-dark-700 hover:bg-dark-700/50">
                  <td className="px-6 py-4 text-bronze-400 font-medium">{order.id}</td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-beige-50 font-medium">{order.customer}</p>
                      <p className="text-dark-400 text-xs">{order.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-dark-300">{order.product}</td>
                  <td className="px-6 py-4 text-beige-50">£{order.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === 'completed' 
                        ? 'bg-green-900/30 text-green-400' 
                        : 'bg-yellow-900/30 text-yellow-400'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-dark-400">{order.date}</td>
                  <td className="px-6 py-4">
                    <button className="text-dark-400 hover:text-beige-50">
                      <MoreVertical size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
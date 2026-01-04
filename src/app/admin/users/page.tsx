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
  MoreVertical
} from 'lucide-react'

const users = [
  { id: 1, name: 'Sarah Mitchell', email: 'sarah@example.com', orders: 3, spent: 311, joined: '2024-01-15' },
  { id: 2, name: 'James Chen', email: 'james@example.com', orders: 2, spent: 184, joined: '2024-01-10' },
  { id: 3, name: 'Emma Wilson', email: 'emma@example.com', orders: 5, spent: 522, joined: '2023-12-20' },
  { id: 4, name: 'Michael Brown', email: 'michael@example.com', orders: 1, spent: 97, joined: '2024-01-18' },
]

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, active: false },
  { href: '/admin/users', label: 'Users', icon: Users, active: true },
  { href: '/admin/products', label: 'Products', icon: Package, active: false },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart, active: false },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3, active: false },
]

export default function AdminUsers() {
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
            <h1 className="font-display text-3xl text-beige-50 mb-2">Users</h1>
            <p className="text-dark-400">Manage your customers</p>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400" size={20} />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-beige-50 placeholder-dark-400"
            />
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-dark-800 border border-dark-700 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-left text-dark-400 text-sm border-b border-dark-700">
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium">Orders</th>
                <th className="px-6 py-4 font-medium">Total Spent</th>
                <th className="px-6 py-4 font-medium">Joined</th>
                <th className="px-6 py-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {users.map((user) => (
                <tr key={user.id} className="border-b border-dark-700 hover:bg-dark-700/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-bronze-400/20 rounded-full flex items-center justify-center">
                        <span className="text-bronze-400 font-medium">{user.name.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-beige-50 font-medium">{user.name}</p>
                        <p className="text-dark-400">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-dark-300">{user.orders}</td>
                  <td className="px-6 py-4 text-beige-50">£{user.spent}</td>
                  <td className="px-6 py-4 text-dark-400">{user.joined}</td>
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
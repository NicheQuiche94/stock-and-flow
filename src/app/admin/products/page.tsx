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
  Plus
} from 'lucide-react'

const products = [
  { id: 1, title: 'Store Operations Manual Template', category: 'Operations', price: 97, sales: 23, status: 'active' },
  { id: 2, title: 'Staff Rota Template Pack', category: 'Templates', price: 0, sales: 67, status: 'active' },
  { id: 3, title: 'New Starter Induction Guide', category: 'Training', price: 67, sales: 12, status: 'active' },
  { id: 4, title: 'Visual Merchandising Playbook', category: 'Merchandising', price: 127, sales: 18, status: 'active' },
  { id: 5, title: 'Daily Checklist Bundle', category: 'Templates', price: 0, sales: 89, status: 'active' },
]

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard, active: false },
  { href: '/admin/users', label: 'Users', icon: Users, active: false },
  { href: '/admin/products', label: 'Products', icon: Package, active: true },
  { href: '/admin/orders', label: 'Orders', icon: ShoppingCart, active: false },
  { href: '/admin/analytics', label: 'Analytics', icon: BarChart3, active: false },
]

export default function AdminProducts() {
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
            <h1 className="font-display text-3xl text-beige-50 mb-2">Products</h1>
            <p className="text-dark-400">Manage your resources</p>
          </div>
          <button className="flex items-center gap-2 bg-bronze-400 hover:bg-bronze-500 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            <Plus size={20} />
            Add Product
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-12 pr-4 py-3 bg-dark-800 border border-dark-700 rounded-lg text-beige-50 placeholder-dark-400"
            />
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-dark-800 border border-dark-700 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-left text-dark-400 text-sm border-b border-dark-700">
                <th className="px-6 py-4 font-medium">Product</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price</th>
                <th className="px-6 py-4 font-medium">Sales</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {products.map((product) => (
                <tr key={product.id} className="border-b border-dark-700 hover:bg-dark-700/50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-bronze-400/20 rounded-lg flex items-center justify-center">
                        <Package className="text-bronze-400" size={20} />
                      </div>
                      <span className="text-beige-50 font-medium">{product.title}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-dark-300">{product.category}</td>
                  <td className="px-6 py-4 text-beige-50">
                    {product.price === 0 ? <span className="text-green-400">Free</span> : `£${product.price}`}
                  </td>
                  <td className="px-6 py-4 text-dark-300">{product.sales}</td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-900/30 text-green-400">
                      {product.status}
                    </span>
                  </td>
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
import { useState, useEffect } from 'react'
import { Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Package, ShoppingCart, Users, Settings, LogOut, BarChart3, AlertCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { PRODUCTS } from '../data/products'
import { formatPrice } from '../lib/utils'

function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
    } else {
      onLogin()
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-luxury-gradient flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-cream-50 border border-[rgba(180,132,61,0.12)] p-8">
        <div className="text-center mb-8">
          <div className="font-display text-2xl text-brown-100 mb-1">ZARAM</div>
          <div className="font-body text-[9px] tracking-[0.3em] uppercase text-champagne-500">Admin Dashboard</div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                 placeholder="Admin email" required className="input-luxury" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
                 placeholder="Password" required className="input-luxury" />
          {error && (
            <div className="flex items-center gap-2 text-blush-300 font-body text-xs">
              <AlertCircle size={14} /> {error}
            </div>
          )}
          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
        <div className="mt-6 pt-4 border-t border-[rgba(180,132,61,0.1)] text-center">
          <Link to="/" className="font-body text-xs text-brown-50 hover:text-brown-100">← Back to Website</Link>
        </div>
      </div>
    </div>
  )
}

function AdminLayout({ children, user, onLogout }) {
  const navItems = [
    { to: '/admin', icon: BarChart3, label: 'Overview', end: true },
    { to: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
    { to: '/admin/products', icon: Package, label: 'Products' },
    { to: '/admin/customers', icon: Users, label: 'Customers' },
    { to: '/admin/settings', icon: Settings, label: 'Settings' },
  ]
  return (
    <div className="min-h-screen bg-cream-200/30 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-brown-200 flex flex-col shrink-0">
        <div className="p-5 border-b border-cream-100/10">
          <div className="font-display text-lg text-cream-100">ZARAM</div>
          <div className="font-body text-[9px] tracking-widest uppercase text-champagne-400">Admin</div>
        </div>
        <nav className="flex-1 py-4">
          {navItems.map(({ to, icon: Icon, label, end }) => (
            <Link key={to} to={to}
                  className="flex items-center gap-3 px-5 py-3 font-body text-sm text-cream-200/70 hover:text-cream-100 hover:bg-cream-100/5 transition-colors">
              <Icon size={16} />
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-cream-100/10">
          <button onClick={onLogout} className="flex items-center gap-2 font-body text-sm text-cream-200/50 hover:text-cream-100 transition-colors">
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>
      {/* Main */}
      <main className="flex-1 overflow-auto p-6 md:p-8">
        {children}
      </main>
    </div>
  )
}

function AdminOverview() {
  const stats = [
    { label: 'Total Products', value: PRODUCTS.length, sub: 'Demo data' },
    { label: 'Pending Orders', value: 0, sub: 'Connect Supabase' },
    { label: 'Total Customers', value: 0, sub: 'Connect Supabase' },
    { label: 'Revenue (Month)', value: '—', sub: 'Connect Supabase' },
  ]
  return (
    <div>
      <h1 className="font-display text-3xl text-brown-100 mb-2">Dashboard</h1>
      <p className="font-body text-sm text-brown-50 mb-8">Welcome to Zaram Admin. Connect your Supabase database to see live data.</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map(({ label, value, sub }) => (
          <div key={label} className="bg-cream-50 border border-[rgba(180,132,61,0.1)] p-5">
            <p className="font-body text-xs tracking-wider uppercase text-champagne-500 mb-1">{label}</p>
            <p className="font-display text-3xl text-brown-100">{value}</p>
            <p className="font-body text-xs text-brown-50 mt-1">{sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-blush-100/60 border border-blush-200/40 p-5 mb-8">
        <div className="flex items-start gap-3">
          <AlertCircle size={18} className="text-champagne-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-body font-medium text-sm text-brown-100 mb-1">Setup Required</p>
            <p className="font-body text-sm text-brown-50">
              Add your Supabase credentials to <code className="text-champagne-500">.env</code> to unlock
              order management, product editing and customer data. See the README for full setup instructions.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="font-display text-xl text-brown-100 mb-4">Products Overview</h2>
        <div className="bg-cream-50 border border-[rgba(180,132,61,0.1)] overflow-x-auto">
          <table className="w-full font-body text-sm">
            <thead>
              <tr className="border-b border-[rgba(180,132,61,0.1)]">
                {['Name', 'Collection', 'Price', 'Stock', 'Status'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs tracking-wider uppercase text-champagne-500 font-normal">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PRODUCTS.map((p) => (
                <tr key={p.id} className="border-b border-[rgba(180,132,61,0.05)] hover:bg-cream-200/30 transition-colors">
                  <td className="px-4 py-3 text-brown-100 font-medium">{p.name}</td>
                  <td className="px-4 py-3 text-brown-50">{p.collection}</td>
                  <td className="px-4 py-3 text-brown-100">{formatPrice(p.price)}</td>
                  <td className="px-4 py-3 text-brown-50">{p.sizes.reduce((n, s) => n + s.stock, 0)} units</td>
                  <td className="px-4 py-3">
                    <span className="inline-block px-2 py-0.5 text-[10px] tracking-wider uppercase bg-champagne-100/60 border border-champagne-400/30 text-champagne-500">
                      {p.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default function Admin() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user || null)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })
    return () => subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  if (loading) return <div className="min-h-screen bg-luxury-gradient flex items-center justify-center">
    <div className="font-display text-2xl text-brown-100">Loading…</div>
  </div>

  if (!user) return <AdminLogin onLogin={() => {}} />

  return (
    <AdminLayout user={user} onLogout={handleLogout}>
      <Routes>
        <Route index element={<AdminOverview />} />
        <Route path="orders" element={
          <div>
            <h1 className="font-display text-3xl text-brown-100 mb-4">Orders</h1>
            <p className="font-body text-sm text-brown-50">Order management will appear here once Supabase is connected and orders are submitted.</p>
          </div>
        } />
        <Route path="products" element={
          <div>
            <h1 className="font-display text-3xl text-brown-100 mb-4">Products</h1>
            <p className="font-body text-sm text-brown-50">Manage your fragrance catalogue from Supabase once connected.</p>
          </div>
        } />
        <Route path="customers" element={
          <div>
            <h1 className="font-display text-3xl text-brown-100 mb-4">Customers</h1>
            <p className="font-body text-sm text-brown-50">Customer data will appear here once Supabase is connected.</p>
          </div>
        } />
        <Route path="settings" element={
          <div>
            <h1 className="font-display text-3xl text-brown-100 mb-4">Settings</h1>
            <p className="font-body text-sm text-brown-50">Site settings and configuration managed from <code>src/config/site.js</code>.</p>
          </div>
        } />
      </Routes>
    </AdminLayout>
  )
}

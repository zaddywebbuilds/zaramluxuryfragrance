import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Heart, ShoppingBag, Menu, X, MessageCircle } from 'lucide-react'
import { siteConfig } from '../../config/site'
import { useCartStore, useWishlistStore, useUIStore } from '../../store/useStore'
import { buildWhatsAppUrl, buildScentConsultWhatsAppMessage } from '../../lib/utils'

const navLinks = [
  { to: '/', label: 'Home', end: true },
  { to: '/shop', label: 'Shop' },
  { to: '/shop?sort=bestsellers', label: 'Bestsellers' },
  { to: '/our-story', label: 'Our Story' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { openCart, itemCount } = useCartStore()
  const { openWishlist, items: wishItems } = useWishlistStore()
  const { openSearch, openMobileMenu, closeMobileMenu, mobileMenuOpen } = useUIStore()

  const cartCount = useCartStore((s) => s.items.reduce((n, i) => n + i.quantity, 0))

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={`fixed top-8 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-cream-100/95 backdrop-blur-md shadow-luxury border-b border-[rgba(180,132,61,0.12)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none">
            <span className="font-display text-xl font-semibold text-brown-100 tracking-wide">
              ZARAM
            </span>
            <span className="font-body text-[9px] tracking-[0.3em] uppercase text-champagne-500">
              Luxury Fragrance
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `font-body text-sm tracking-wider uppercase transition-colors duration-200 ${
                    isActive
                      ? 'text-champagne-500'
                      : scrolled
                      ? 'text-brown-100 hover:text-champagne-500'
                      : 'text-brown-100 hover:text-champagne-500'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            {/* Find Your Scent CTA — desktop only */}
            <Link
              to="/shop"
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2 border border-champagne-400 text-champagne-500 font-body text-xs tracking-widest uppercase transition-all duration-300 hover:bg-champagne-400 hover:text-brown-200"
            >
              Find Your Scent
            </Link>

            <button onClick={openSearch} aria-label="Search" className="btn-ghost p-2">
              <Search size={18} />
            </button>
            <button onClick={openWishlist} aria-label="Wishlist" className="btn-ghost p-2 relative">
              <Heart size={18} />
              {wishItems.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-blush-300 text-brown-100 text-[9px] font-bold flex items-center justify-center rounded-full">
                  {wishItems.length}
                </span>
              )}
            </button>
            <button onClick={openCart} aria-label="Cart" className="btn-ghost p-2 relative">
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-brown-100 text-cream-100 text-[9px] font-bold flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={openMobileMenu}
              aria-label="Menu"
              className="md:hidden btn-ghost p-2"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 bg-brown-200/80 z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.35 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-cream-100 z-[70] flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-[rgba(180,132,61,0.15)]">
                <div>
                  <div className="font-display text-xl font-semibold text-brown-100">ZARAM</div>
                  <div className="font-body text-[9px] tracking-[0.3em] uppercase text-champagne-500">
                    Luxury Fragrance
                  </div>
                </div>
                <button onClick={closeMobileMenu} aria-label="Close menu" className="p-2 text-brown-50 hover:text-brown-100">
                  <X size={22} />
                </button>
              </div>

              <nav className="flex-1 flex flex-col px-6 py-8 gap-2">
                {navLinks.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    end={l.end}
                    onClick={closeMobileMenu}
                    className={({ isActive }) =>
                      `font-display text-3xl py-2 transition-colors duration-200 border-b border-[rgba(180,132,61,0.08)] ${
                        isActive ? 'text-champagne-500' : 'text-brown-100 hover:text-champagne-500'
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}
              </nav>

              <div className="px-6 pb-10 space-y-4">
                <p className="font-body text-xs tracking-widest uppercase text-brown-50">
                  "Your presence arrives before you speak."
                </p>
                <a
                  href={buildWhatsAppUrl(siteConfig.whatsapp, buildScentConsultWhatsAppMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp w-full"
                >
                  <MessageCircle size={16} />
                  Scent Concierge on WhatsApp
                </a>
                <div className="flex gap-4">
                  <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer"
                     className="font-body text-xs tracking-widest uppercase text-brown-50 hover:text-brown-100">
                    Instagram
                  </a>
                  <a href={siteConfig.tiktok} target="_blank" rel="noopener noreferrer"
                     className="font-body text-xs tracking-widest uppercase text-brown-50 hover:text-brown-100">
                    TikTok
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

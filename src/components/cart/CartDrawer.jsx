import { AnimatePresence, motion } from 'framer-motion'
import { X, Minus, Plus, Trash2, ShoppingBag, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCartStore } from '../../store/useStore'
import { formatPrice } from '../../lib/utils'
import { siteConfig } from '../../config/site'

export default function CartDrawer() {
  const { isOpen, closeCart, items, removeItem, updateQuantity, clearCart } = useCartStore()
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0)

  const freeDeliveryThreshold = siteConfig.freeDeliveryThreshold
  const progress = freeDeliveryThreshold > 0
    ? Math.min((subtotal / freeDeliveryThreshold) * 100, 100)
    : 0
  const remaining = freeDeliveryThreshold - subtotal

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeCart}
            className="overlay-dark"
          />
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-cream-100 z-50 flex flex-col shadow-luxury-hover"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[rgba(180,132,61,0.12)]">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} className="text-brown-100" />
                <h2 className="font-display text-xl text-brown-100">Your Bag</h2>
                {items.length > 0 && (
                  <span className="font-body text-xs text-brown-50">
                    ({items.reduce((n, i) => n + i.quantity, 0)} item{items.reduce((n, i) => n + i.quantity, 0) !== 1 ? 's' : ''})
                  </span>
                )}
              </div>
              <button onClick={closeCart} aria-label="Close cart" className="p-2 text-brown-50 hover:text-brown-100 transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Free delivery bar */}
            {freeDeliveryThreshold > 0 && items.length > 0 && (
              <div className="px-6 py-3 bg-cream-200/60 border-b border-[rgba(180,132,61,0.08)]">
                <div className="flex justify-between font-body text-xs text-brown-50 mb-1.5">
                  {remaining > 0 ? (
                    <span>Add <strong className="text-champagne-500">{formatPrice(remaining)}</strong> for free delivery</span>
                  ) : (
                    <span className="text-champagne-500 font-medium">You qualify for free delivery! 🎉</span>
                  )}
                </div>
                <div className="h-1 bg-cream-300 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-champagne-400 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <ShoppingBag size={40} className="text-champagne-200 mb-4" />
                  <h3 className="font-display text-2xl text-brown-100 mb-2">Your bag is empty</h3>
                  <p className="font-body text-sm text-brown-50 mb-6">
                    Discover fragrances that feel unmistakably yours.
                  </p>
                  <Link to="/shop" onClick={closeCart} className="btn-primary">
                    Shop the Collection
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.key} className="flex gap-4">
                    <Link to={`/product/${item.slug}`} onClick={closeCart} className="shrink-0">
                      <img src={item.image} alt={item.name} className="w-20 h-24 object-cover" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <Link to={`/product/${item.slug}`} onClick={closeCart}
                                className="font-body font-medium text-sm text-brown-100 hover:text-champagne-500 transition-colors line-clamp-1">
                            {item.name}
                          </Link>
                          <p className="font-body text-xs text-brown-50 mt-0.5">{item.size}ml</p>
                        </div>
                        <button onClick={() => removeItem(item.key)} aria-label="Remove item"
                                className="text-brown-50/50 hover:text-brown-100 transition-colors shrink-0">
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center gap-2 border border-[rgba(180,132,61,0.22)]">
                          <button onClick={() => updateQuantity(item.key, item.quantity - 1)}
                                  aria-label="Decrease" className="w-7 h-7 flex items-center justify-center text-brown-50 hover:text-brown-100 transition-colors">
                            <Minus size={12} />
                          </button>
                          <span className="font-body text-sm text-brown-100 w-5 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.key, item.quantity + 1)}
                                  aria-label="Increase" className="w-7 h-7 flex items-center justify-center text-brown-50 hover:text-brown-100 transition-colors">
                            <Plus size={12} />
                          </button>
                        </div>
                        <span className="font-body font-medium text-brown-100">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-[rgba(180,132,61,0.12)] px-6 py-5 space-y-4">
                <div className="flex justify-between font-body text-sm">
                  <span className="text-brown-50">Subtotal</span>
                  <span className="font-medium text-brown-100">{formatPrice(subtotal)}</span>
                </div>
                <p className="font-body text-xs text-brown-50/70">
                  Delivery fee and final total confirmed after order submission.
                </p>
                <Link
                  to="/checkout"
                  onClick={closeCart}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  Submit Order Request
                  <ChevronRight size={16} />
                </Link>
                <button onClick={closeCart} className="btn-ghost w-full text-center text-xs">
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

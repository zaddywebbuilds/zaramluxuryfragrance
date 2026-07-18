import { AnimatePresence, motion } from 'framer-motion'
import { X, Heart, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useWishlistStore, useCartStore } from '../../store/useStore'
import { formatPrice } from '../../lib/utils'

export default function WishlistDrawer() {
  const { isOpen, closeWishlist, items, remove } = useWishlistStore()
  const { addItem } = useCartStore()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeWishlist}
            className="overlay-dark"
          />
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-cream-100 z-50 flex flex-col shadow-luxury-hover"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-[rgba(180,132,61,0.12)]">
              <div className="flex items-center gap-2">
                <Heart size={18} className="text-blush-300" />
                <h2 className="font-display text-xl text-brown-100">Your Wishlist</h2>
              </div>
              <button onClick={closeWishlist} aria-label="Close" className="p-2 text-brown-50 hover:text-brown-100 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-16">
                  <Heart size={40} className="text-blush-200 mb-4" />
                  <h3 className="font-display text-2xl text-brown-100 mb-2">Nothing saved yet</h3>
                  <p className="font-body text-sm text-brown-50 mb-6">
                    Save fragrances you love and revisit them anytime.
                  </p>
                  <Link to="/shop" onClick={closeWishlist} className="btn-primary">
                    Explore Fragrances
                  </Link>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-[rgba(180,132,61,0.08)]">
                    <Link to={`/product/${item.slug}`} onClick={closeWishlist} className="shrink-0">
                      <img src={item.image} alt={item.name} className="w-18 h-20 object-cover" style={{width:'72px',height:'80px'}} />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between">
                        <Link to={`/product/${item.slug}`} onClick={closeWishlist}
                              className="font-body font-medium text-sm text-brown-100 hover:text-champagne-500 transition-colors">
                          {item.name}
                        </Link>
                        <button onClick={() => remove(item.id)} aria-label="Remove"
                                className="text-brown-50/40 hover:text-brown-100 transition-colors">
                          <X size={14} />
                        </button>
                      </div>
                      <p className="font-body text-xs text-brown-50 mt-0.5">{item.scentFamily}</p>
                      <p className="font-body font-medium text-sm text-champagne-500 mt-1">
                        {formatPrice(item.price)}
                      </p>
                      <button
                        onClick={() => { /* quick add at default size */ closeWishlist() }}
                        className="mt-2 inline-flex items-center gap-1.5 font-body text-xs text-brown-50 hover:text-champagne-500 transition-colors"
                      >
                        <ShoppingBag size={12} /> Add to Bag
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

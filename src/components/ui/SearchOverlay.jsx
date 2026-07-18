import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, X } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useUIStore } from '../../store/useStore'
import { PRODUCTS } from '../../data/products'
import { formatPrice } from '../../lib/utils'

export default function SearchOverlay() {
  const { searchOpen, closeSearch } = useUIStore()
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  const results = query.length > 1
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.scent_family.toLowerCase().includes(query.toLowerCase()) ||
        p.occasions.some((o) => o.toLowerCase().includes(query.toLowerCase())) ||
        p.top_notes.some((n) => n.toLowerCase().includes(query.toLowerCase()))
      ).slice(0, 5)
    : []

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
      setQuery('')
    }
  }, [searchOpen])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') closeSearch() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [closeSearch])

  return (
    <AnimatePresence>
      {searchOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeSearch}
            className="overlay-dark"
          />
          <motion.div
            initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.25 }}
            className="fixed top-0 left-0 right-0 z-50 bg-cream-100 shadow-luxury-hover"
          >
            <div className="max-w-3xl mx-auto px-4 py-6">
              <div className="flex items-center gap-4 border-b-2 border-champagne-400 pb-3">
                <Search size={20} className="text-champagne-500 shrink-0" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search fragrances, scents, occasions…"
                  className="flex-1 bg-transparent font-body text-lg text-brown-100 placeholder:text-brown-50/40 outline-none"
                />
                <button onClick={closeSearch} aria-label="Close search" className="text-brown-50 hover:text-brown-100 transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Results */}
              {results.length > 0 && (
                <ul className="mt-4 space-y-1">
                  {results.map((p) => (
                    <li key={p.id}>
                      <Link
                        to={`/product/${p.slug}`}
                        onClick={closeSearch}
                        className="flex items-center gap-4 px-3 py-3 hover:bg-cream-200 transition-colors rounded"
                      >
                        <img src={p.images[0]} alt={p.name} className="w-12 h-12 object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="font-body font-medium text-brown-100 truncate">{p.name}</p>
                          <p className="font-body text-xs text-brown-50">{p.scent_family}</p>
                        </div>
                        <span className="font-body font-medium text-champagne-500 shrink-0">
                          {formatPrice(p.price)}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}

              {query.length > 1 && results.length === 0 && (
                <p className="mt-6 text-center font-body text-brown-50">
                  No fragrances found for "{query}". Try oud, vanilla, fresh, or gift.
                </p>
              )}

              {query.length === 0 && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {['Oud', 'Vanilla', 'Fresh', 'Date Night', 'Gift', 'Unisex', 'Office'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setQuery(t)}
                      className="px-4 py-1.5 border border-[rgba(180,132,61,0.22)] font-body text-xs text-brown-50 hover:border-champagne-400 hover:text-champagne-500 transition-colors"
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

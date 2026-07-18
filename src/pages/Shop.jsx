import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X, ChevronDown } from 'lucide-react'
import ProductCard from '../components/product/ProductCard'
import { PRODUCTS } from '../data/products'
import { siteConfig } from '../config/site'
import { useStaggerReveal } from '../hooks/useScrollAnimation'

const GENDER_FILTERS = ['All', 'Feminine', 'Masculine', 'Unisex']
const SCENT_FAMILIES = ['All', 'Oud & Spice', 'Oud & Oriental', 'Floral & Warm', 'Floral & Dark', 'Clean & Musky', 'Fresh & Aquatic', 'Gourmand & Sweet', 'Oriental & Amber']
const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'bestsellers', label: 'Bestselling' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
]

export default function Shop() {
  const [searchParams] = useSearchParams()
  const [filterOpen, setFilterOpen] = useState(false)
  const [gender, setGender] = useState('All')
  const [scentFamily, setScentFamily] = useState('All')
  const [priceRange, setPriceRange] = useState(null)
  const [sort, setSort] = useState(searchParams.get('sort') || 'featured')
  const [showNew, setShowNew] = useState(searchParams.get('filter') === 'new')
  const [showBestsellers, setShowBestsellers] = useState(searchParams.get('sort') === 'bestsellers')
  const [showGifts, setShowGifts] = useState(searchParams.get('filter') === 'gifts')

  const filtered = useMemo(() => {
    let products = [...PRODUCTS]

    if (gender !== 'All') products = products.filter((p) => p.gender === gender.toLowerCase())
    if (scentFamily !== 'All') products = products.filter((p) => p.scent_family === scentFamily)
    if (priceRange) {
      const r = siteConfig.priceRanges.find((r) => r.label === priceRange)
      if (r) products = products.filter((p) => p.price >= r.min && p.price <= r.max)
    }
    if (showNew) products = products.filter((p) => p.is_new_arrival)
    if (showBestsellers) products = products.filter((p) => p.is_bestseller)
    if (showGifts) products = products.filter((p) => p.gift_available)

    switch (sort) {
      case 'bestsellers': return [...products].sort((a, b) => (b.is_bestseller ? 1 : 0) - (a.is_bestseller ? 1 : 0))
      case 'price-asc': return [...products].sort((a, b) => a.price - b.price)
      case 'price-desc': return [...products].sort((a, b) => b.price - a.price)
      case 'rating': return [...products].sort((a, b) => b.rating - a.rating)
      default: return products
    }
  }, [gender, scentFamily, priceRange, sort, showNew, showBestsellers, showGifts])

  const activeFiltersCount = [
    gender !== 'All', scentFamily !== 'All', priceRange, showNew, showBestsellers, showGifts
  ].filter(Boolean).length

  const clearAll = () => {
    setGender('All'); setScentFamily('All'); setPriceRange(null)
    setShowNew(false); setShowBestsellers(false); setShowGifts(false)
  }

  return (
    <>
      {/* Header */}
      <section className="pt-28 pb-12 bg-luxury-gradient">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="section-label">The Collection</p>
            <h1 className="font-display text-5xl md:text-6xl text-brown-100 mb-4">
              Find the Scent<br />That Feels Like You.
            </h1>
            <p className="font-body text-base text-brown-50 max-w-xl mx-auto">
              Explore fragrances by personality, occasion, scent family and price.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Controls bar */}
          <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setFilterOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 border border-[rgba(180,132,61,0.22)] font-body text-sm text-brown-100 hover:border-champagne-400 transition-colors"
              >
                <SlidersHorizontal size={15} />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="w-5 h-5 bg-champagne-400 text-brown-200 text-[10px] font-bold rounded-full flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>
              {activeFiltersCount > 0 && (
                <button onClick={clearAll} className="font-body text-xs text-brown-50 hover:text-champagne-500 transition-colors flex items-center gap-1">
                  <X size={12} /> Clear all
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className="font-body text-sm text-brown-50">{filtered.length} fragrance{filtered.length !== 1 ? 's' : ''}</span>
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="appearance-none input-luxury pr-8 py-2 text-xs"
                >
                  {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-brown-50 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Filter chips */}
          <div className="flex gap-2 flex-wrap mb-8">
            {GENDER_FILTERS.map((g) => (
              <button key={g} onClick={() => setGender(g)}
                      className={`px-3 py-1.5 font-body text-xs border transition-colors ${gender === g ? 'border-brown-100 bg-brown-100 text-cream-100' : 'border-[rgba(180,132,61,0.2)] text-brown-50 hover:border-champagne-400'}`}>
                {g}
              </button>
            ))}
            <div className="w-px bg-[rgba(180,132,61,0.2)] mx-1" />
            {[
              { label: 'New Arrivals', active: showNew, toggle: () => setShowNew(!showNew) },
              { label: 'Bestsellers', active: showBestsellers, toggle: () => setShowBestsellers(!showBestsellers) },
              { label: 'Gift Sets', active: showGifts, toggle: () => setShowGifts(!showGifts) },
            ].map(({ label, active, toggle }) => (
              <button key={label} onClick={toggle}
                      className={`px-3 py-1.5 font-body text-xs border transition-colors ${active ? 'border-champagne-400 bg-champagne-100/60 text-brown-100' : 'border-[rgba(180,132,61,0.2)] text-brown-50 hover:border-champagne-400'}`}>
                {label}
              </button>
            ))}
          </div>

          {/* Price ranges */}
          <div className="flex gap-2 flex-wrap mb-10">
            {siteConfig.priceRanges.map((r) => (
              <button key={r.label} onClick={() => setPriceRange(priceRange === r.label ? null : r.label)}
                      className={`px-3 py-1.5 font-body text-xs border transition-colors ${priceRange === r.label ? 'border-brown-100 bg-brown-100 text-cream-100' : 'border-[rgba(180,132,61,0.2)] text-brown-50 hover:border-champagne-400'}`}>
                {r.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="w-16 h-16 border border-[rgba(180,132,61,0.2)] flex items-center justify-center mb-5">
                <SlidersHorizontal size={24} className="text-champagne-200" />
              </div>
              <h3 className="font-display text-2xl text-brown-100 mb-2">No fragrances found</h3>
              <p className="font-body text-sm text-brown-50 mb-5">
                Try adjusting your filters or exploring a different category.
              </p>
              <button onClick={clearAll} className="btn-secondary">Clear Filters</button>
            </div>
          )}
        </div>
      </section>

      {/* Filter drawer */}
      {filterOpen && (
        <>
          <div className="overlay-dark" onClick={() => setFilterOpen(false)} />
          <motion.div
            initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed left-0 top-0 bottom-0 w-full max-w-xs bg-cream-100 z-50 overflow-y-auto"
          >
            <div className="flex items-center justify-between px-5 py-5 border-b border-[rgba(180,132,61,0.12)]">
              <h2 className="font-display text-xl text-brown-100">Filters</h2>
              <button onClick={() => setFilterOpen(false)} className="p-2 text-brown-50 hover:text-brown-100"><X size={18} /></button>
            </div>
            <div className="p-5 space-y-7">
              {/* Gender */}
              <div>
                <p className="font-body text-xs tracking-widest uppercase text-champagne-500 mb-3">Gender</p>
                <div className="flex flex-col gap-2">
                  {GENDER_FILTERS.map((g) => (
                    <label key={g} className="flex items-center gap-2.5 cursor-pointer">
                      <input type="radio" name="gender" value={g} checked={gender === g}
                             onChange={() => setGender(g)} className="accent-champagne-400" />
                      <span className="font-body text-sm text-brown-100">{g}</span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Scent Family */}
              <div>
                <p className="font-body text-xs tracking-widest uppercase text-champagne-500 mb-3">Scent Family</p>
                <div className="flex flex-col gap-2">
                  {SCENT_FAMILIES.map((f) => (
                    <label key={f} className="flex items-center gap-2.5 cursor-pointer">
                      <input type="radio" name="scentFamily" value={f} checked={scentFamily === f}
                             onChange={() => setScentFamily(f)} className="accent-champagne-400" />
                      <span className="font-body text-sm text-brown-100">{f}</span>
                    </label>
                  ))}
                </div>
              </div>
              {/* Price */}
              <div>
                <p className="font-body text-xs tracking-widest uppercase text-champagne-500 mb-3">Price Range</p>
                <div className="flex flex-col gap-2">
                  {siteConfig.priceRanges.map((r) => (
                    <label key={r.label} className="flex items-center gap-2.5 cursor-pointer">
                      <input type="radio" name="price" value={r.label}
                             checked={priceRange === r.label}
                             onChange={() => setPriceRange(priceRange === r.label ? null : r.label)}
                             className="accent-champagne-400" />
                      <span className="font-body text-sm text-brown-100">{r.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="px-5 pb-6 flex gap-3">
              <button onClick={() => { clearAll(); setFilterOpen(false) }} className="btn-secondary flex-1 text-sm">Clear</button>
              <button onClick={() => setFilterOpen(false)} className="btn-primary flex-1 text-sm">Apply</button>
            </div>
          </motion.div>
        </>
      )}
    </>
  )
}

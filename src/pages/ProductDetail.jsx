import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag, MessageCircle, Share2, ChevronDown, Star, Package, ArrowLeft } from 'lucide-react'
import { PRODUCTS, NIGERIAN_STATES } from '../data/products'
import { useCartStore, useWishlistStore, useRecentlyViewedStore } from '../store/useStore'
import { formatPrice, buildWhatsAppUrl, buildProductWhatsAppMessage } from '../lib/utils'
import { siteConfig } from '../config/site'
import ProductCard from '../components/product/ProductCard'

const PERSONALITY_LABELS = {
  freshToWarm: ['Fresh', 'Warm'],
  subtleToPowerful: ['Subtle', 'Powerful'],
  dayToNight: ['Day', 'Night'],
  familiarToDistinctive: ['Familiar', 'Distinctive'],
  lightToIntense: ['Light', 'Intense'],
  casualToFormal: ['Casual', 'Formal'],
}

function PersonalityBar({ label, value, keys }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-body text-xs text-brown-50 w-20 text-right shrink-0">{keys[0]}</span>
      <div className="flex-1 h-1 bg-cream-300 relative">
        <div className="absolute left-0 top-0 h-full bg-champagne-400 transition-all duration-700"
             style={{ width: `${(value / 5) * 100}%` }} />
        <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-champagne-500 border-2 border-cream-100 rounded-full transition-all duration-700"
             style={{ left: `calc(${(value / 5) * 100}% - 6px)` }} />
      </div>
      <span className="font-body text-xs text-brown-50 w-20 shrink-0">{keys[1]}</span>
    </div>
  )
}

export default function ProductDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const product = PRODUCTS.find((p) => p.slug === slug)

  const [selectedSize, setSelectedSize] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const [giftWrap, setGiftWrap] = useState(false)
  const [giftMessage, setGiftMessage] = useState('')
  const [selectedState, setSelectedState] = useState('')
  const [deliveryFee, setDeliveryFee] = useState(null)
  const [activeNote, setActiveNote] = useState(null)
  const [notesExpanded, setNotesExpanded] = useState(false)

  const { addItem } = useCartStore()
  const { toggle, isWishlisted } = useWishlistStore()
  const { add: addRecentlyViewed } = useRecentlyViewedStore()

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes.find((s) => s.ml === product.defaultSize) || product.sizes[0])
      addRecentlyViewed(product)
    }
  }, [product])

  useEffect(() => {
    if (selectedState) {
      const zone = selectedState.toLowerCase().includes('lagos')
        ? siteConfig.deliveryZones[0]
        : siteConfig.deliveryZones[5]
      setDeliveryFee(zone)
    }
  }, [selectedState])

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-cream-100 pt-24">
        <h1 className="font-display text-3xl text-brown-100 mb-4">Fragrance Not Found</h1>
        <p className="font-body text-brown-50 mb-6">This fragrance may have been removed or the link may be incorrect.</p>
        <Link to="/shop" className="btn-primary">Browse the Collection</Link>
      </div>
    )
  }

  const handleAddToCart = () => {
    if (!selectedSize) return
    addItem(product, selectedSize.ml, quantity)
  }

  const whatsappUrl = buildWhatsAppUrl(
    siteConfig.whatsapp,
    buildProductWhatsAppMessage(product, selectedSize?.ml || product.defaultSize)
  )

  const related = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.scent_family === product.scent_family || p.gender === product.gender)
  ).slice(0, 4)

  return (
    <div className="bg-cream-100 pt-24">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
        <nav className="flex items-center gap-2 font-body text-xs text-brown-50">
          <Link to="/" className="hover:text-champagne-500 transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-champagne-500 transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-brown-100">{product.name}</span>
        </nav>
      </div>

      {/* Main product section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20">
          {/* Gallery */}
          <div className="space-y-3">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="aspect-[4/5] overflow-hidden bg-cream-200"
            >
              <img
                src={product.images[activeImage]}
                alt={`${product.name} — image ${activeImage + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="flex gap-2">
              {product.images.map((img, i) => (
                <button key={i} onClick={() => setActiveImage(i)}
                        className={`w-16 h-20 overflow-hidden border-2 transition-colors ${i === activeImage ? 'border-champagne-400' : 'border-transparent hover:border-champagne-200'}`}>
                  <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div>
            {/* Badges */}
            <div className="flex gap-2 mb-4">
              {product.is_bestseller && <span className="badge-bestseller">Bestseller</span>}
              {product.is_new_arrival && <span className="badge-new">New</span>}
            </div>

            <p className="font-body text-xs tracking-widest uppercase text-champagne-500 mb-2">
              {product.brand} · {product.collection}
            </p>
            <h1 className="font-display text-4xl md:text-5xl text-brown-100 leading-tight mb-3">
              {product.name}
            </h1>
            <p className="font-body text-base text-brown-50 italic mb-4">{product.tagline}</p>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-5">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} size={13} className={s <= Math.round(product.rating) ? 'fill-champagne-400 text-champagne-400' : 'text-cream-300'} />
                ))}
              </div>
              <span className="font-body text-sm text-brown-50">{product.rating} ({product.review_count} reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <span className="font-display text-4xl text-brown-100">
                {formatPrice(selectedSize?.price || product.price)}
              </span>
              <span className="font-body text-sm text-brown-50 ml-2">{selectedSize?.ml || product.defaultSize}ml</span>
            </div>

            {/* Size selector */}
            <div className="mb-6">
              <p className="font-body text-xs tracking-widest uppercase text-brown-50 mb-3">Select Size</p>
              <div className="flex gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s.ml}
                    onClick={() => setSelectedSize(s)}
                    className={`px-4 py-2.5 font-body text-sm border transition-all duration-200 ${
                      selectedSize?.ml === s.ml
                        ? 'border-brown-100 bg-brown-100 text-cream-100'
                        : 'border-[rgba(180,132,61,0.25)] text-brown-100 hover:border-brown-100'
                    }`}
                  >
                    <span className="block">{s.ml}ml</span>
                    <span className="block text-xs opacity-70">{formatPrice(s.price)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <p className="font-body text-xs tracking-widest uppercase text-brown-50">Qty</p>
              <div className="flex items-center border border-[rgba(180,132,61,0.22)]">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 flex items-center justify-center text-brown-50 hover:text-brown-100 transition-colors">–</button>
                <span className="w-10 text-center font-body text-sm text-brown-100">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 flex items-center justify-center text-brown-50 hover:text-brown-100 transition-colors">+</button>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 mb-6">
              <button onClick={handleAddToCart} className="btn-primary gap-2">
                <ShoppingBag size={16} />
                Add to Bag — {formatPrice((selectedSize?.price || product.price) * quantity)}
              </button>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn-whatsapp gap-2 justify-center">
                <MessageCircle size={16} />
                Order Through WhatsApp
              </a>
              <button onClick={() => toggle(product)}
                      className="btn-secondary gap-2">
                <Heart size={15} className={isWishlisted(product.id) ? 'fill-blush-300 text-blush-300' : ''} />
                {isWishlisted(product.id) ? 'Saved to Wishlist' : 'Save to Wishlist'}
              </button>
            </div>

            {/* Gift wrap */}
            <div className="border border-[rgba(180,132,61,0.15)] p-4 mb-6 space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" checked={giftWrap} onChange={(e) => setGiftWrap(e.target.checked)} className="accent-champagne-400" />
                <span className="font-body text-sm text-brown-100 flex items-center gap-2">
                  <Package size={14} className="text-champagne-500" /> Add Gift Wrapping & Premium Bag
                </span>
              </label>
              {giftWrap && (
                <textarea
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value)}
                  placeholder="Add a personal message for the recipient…"
                  rows={3}
                  className="input-luxury resize-none text-sm"
                />
              )}
            </div>

            {/* Delivery estimator */}
            <div className="border-t border-[rgba(180,132,61,0.1)] pt-6">
              <p className="font-body text-xs tracking-widest uppercase text-brown-50 mb-3">Estimate Delivery</p>
              <div className="relative">
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="input-luxury appearance-none pr-8"
                >
                  <option value="">Select your state</option>
                  {NIGERIAN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-brown-50 pointer-events-none" />
              </div>
              {deliveryFee && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 p-3 bg-cream-200/60 font-body text-sm text-brown-100">
                  <strong className="text-champagne-500">{deliveryFee.zone}:</strong> approx {formatPrice(deliveryFee.fee)} · {deliveryFee.days}
                  <p className="text-xs text-brown-50 mt-0.5">Final delivery fee confirmed after order submission.</p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Description + Notes */}
      <section className="border-t border-[rgba(180,132,61,0.1)] bg-cream-50 py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Description */}
            <div>
              <h2 className="font-display text-3xl text-brown-100 mb-4">About {product.name}</h2>
              <div className="divider-gold" />
              <p className="font-body text-base text-brown-50 leading-relaxed mt-4 mb-6">{product.description}</p>
              <p className="font-body text-sm text-brown-100 italic border-l-2 border-champagne-400 pl-4">
                "{product.emotional_description}"
              </p>

              {/* Details */}
              <div className="mt-8 space-y-3">
                {[
                  ['Concentration', product.concentration],
                  ['Longevity', product.longevity],
                  ['Projection', product.projection],
                  ['Occasions', product.occasions.join(', ')],
                  ['Gender', product.gender.charAt(0).toUpperCase() + product.gender.slice(1)],
                  ['SKU', product.sku],
                ].map(([label, value]) => (
                  <div key={label} className="flex gap-4 border-b border-[rgba(180,132,61,0.08)] pb-3">
                    <span className="font-body text-xs tracking-widest uppercase text-champagne-500 w-28 shrink-0">{label}</span>
                    <span className="font-body text-sm text-brown-100">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Fragrance pyramid */}
            <div>
              <h2 className="font-display text-3xl text-brown-100 mb-4">Fragrance Notes</h2>
              <div className="divider-gold" />
              <div className="mt-6 space-y-6">
                {[
                  { tier: 'Top Notes', notes: product.top_notes, desc: 'The first impression — what you smell in the first 15–30 minutes.' },
                  { tier: 'Heart Notes', notes: product.heart_notes, desc: 'The soul of the fragrance, emerging after the top notes fade.' },
                  { tier: 'Base Notes', notes: product.base_notes, desc: 'The lasting impression — what remains hours later.' },
                ].map(({ tier, notes, desc }) => (
                  <div key={tier} className="border border-[rgba(180,132,61,0.12)] p-5">
                    <p className="font-body text-xs tracking-widest uppercase text-champagne-500 mb-2">{tier}</p>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {notes.map((n) => (
                        <button
                          key={n}
                          onClick={() => setActiveNote(activeNote === n ? null : n)}
                          className={`px-3 py-1 font-body text-xs border transition-all duration-200 ${
                            activeNote === n
                              ? 'border-champagne-400 bg-champagne-100/60 text-brown-100'
                              : 'border-[rgba(180,132,61,0.15)] text-brown-50 hover:border-champagne-400'
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                    {activeNote && notes.includes(activeNote) && (
                      <motion.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
                                className="font-body text-xs text-brown-50 italic mt-2">
                        {desc}
                      </motion.p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Personality */}
      <section className="py-16 bg-cream-200/40">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <p className="section-label">Fragrance Profile</p>
            <h2 className="font-display text-3xl text-brown-100">Personality</h2>
          </div>
          <div className="space-y-5">
            {Object.entries(product.personality).map(([key, value]) => (
              <PersonalityBar key={key} label={key} value={value} keys={PERSONALITY_LABELS[key] || [key, '']} />
            ))}
          </div>
        </div>
      </section>

      {/* You may also love */}
      {related.length > 0 && (
        <section className="py-16 bg-cream-100">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="text-center mb-10">
              <p className="section-label">Explore More</p>
              <h2 className="font-display text-3xl text-brown-100">You May Also Love</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* Sticky mobile bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-cream-100 border-t border-[rgba(180,132,61,0.12)] px-4 py-3 flex gap-3 md:hidden z-30">
        <div className="flex-1 min-w-0">
          <p className="font-body font-medium text-sm text-brown-100 truncate">{product.name}</p>
          <p className="font-body text-xs text-champagne-500">{formatPrice(selectedSize?.price || product.price)}</p>
        </div>
        <button onClick={handleAddToCart} className="btn-primary py-2.5 px-5 shrink-0">
          <ShoppingBag size={15} />
          Add to Bag
        </button>
      </div>
    </div>
  )
}

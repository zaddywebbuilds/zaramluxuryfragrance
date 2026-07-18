import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ShoppingBag, Heart } from 'lucide-react'
import { useCartStore, useWishlistStore } from '../../store/useStore'
import { formatPrice } from '../../lib/utils'
import { PhotoMedallion } from '../decor/PhotoDecor'
import { asset } from '../../lib/assets'

gsap.registerPlugin(ScrollTrigger)

export default function HorizontalProductScroll({ products = [], title = 'Featured Collection', label = 'Explore' }) {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const addToCart = useCartStore((s) => s.addItem)
  const { items: wishlist, addItem: addWish, removeItem: removeWish } = useWishlistStore()

  useEffect(() => {
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track || products.length === 0) return

    // Wait for layout
    const init = () => {
      const trackWidth = track.scrollWidth
      const viewportWidth = window.innerWidth
      const distance = trackWidth - viewportWidth + 64 // 64px padding right

      if (distance <= 0) return

      const ctx = gsap.context(() => {
        gsap.to(track, {
          x: -distance,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: () => `+=${distance + viewportWidth * 0.5}`,
            scrub: 1.2,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        })
      }, section)

      return () => ctx.revert()
    }

    // Small delay to let images load and layout settle
    const timer = setTimeout(init, 100)
    return () => clearTimeout(timer)
  }, [products])

  if (!products.length) return null

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#0a0a0a]">
      <PhotoMedallion src={asset('/products/thriller.jpg')} size={62} className="decor--float-slow hidden 2xl:block" style={{ right: '18%', top: 26, boxShadow: '0 0 0 4px rgba(212,172,112,0.15), 0 8px 22px rgba(0,0,0,0.5)' }} />

      {/* Header — visible above the pinned area */}
      <div className="relative pt-16 pb-8 px-8 md:px-16 flex items-end justify-between">
        <div>
          <p className="text-xs tracking-[0.25em] uppercase text-gold-400 mb-2 font-medium">{label}</p>
          <h2 className="text-3xl md:text-5xl font-display font-light text-cream-100">{title}</h2>
        </div>
        <Link
          to="/shop"
          className="hidden md:inline-flex items-center gap-2 text-sm tracking-widest uppercase text-cream-300 border border-cream-700 px-6 py-3 hover:border-gold-400 hover:text-gold-400 transition-colors duration-300"
        >
          View All
        </Link>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        className="flex gap-5 px-8 md:px-16 pb-16 pt-4"
        style={{ width: 'max-content' }}
      >
        {products.map((product) => {
          const isWished = wishlist.some((w) => w.id === product.id)
          const displayPrice = product.sale_price || product.price
          const img = product.images?.[0]

          return (
            <div
              key={product.id}
              className="relative flex-shrink-0 group"
              style={{ width: '300px' }}
            >
              {/* Image */}
              <Link to={`/product/${product.slug}`} className="block relative overflow-hidden bg-[#111]"
                style={{ height: '380px' }}>
                {img ? (
                  <img
                    src={img}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-cream-700">
                    <span className="text-4xl">✦</span>
                  </div>
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
                  <span className="text-white text-xs tracking-[0.2em] uppercase border border-white/60 px-4 py-2">
                    View Details
                  </span>
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  {product.is_new_arrival && (
                    <span className="bg-gold-500 text-[#0a0a0a] text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5">
                      New
                    </span>
                  )}
                  {product.is_bestseller && !product.is_new_arrival && (
                    <span className="bg-cream-100 text-[#0a0a0a] text-[10px] font-semibold tracking-widest uppercase px-2 py-0.5">
                      Bestseller
                    </span>
                  )}
                </div>

                {/* Wishlist */}
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    isWished ? removeWish(product.id) : addWish(product)
                  }}
                  className="absolute top-3 right-3 w-8 h-8 bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/80 transition-colors"
                  aria-label="Wishlist"
                >
                  <Heart
                    size={14}
                    className={isWished ? 'fill-gold-400 stroke-gold-400' : 'stroke-white'}
                  />
                </button>
              </Link>

              {/* Info */}
              <div className="mt-4 px-1">
                <p className="text-[10px] tracking-[0.2em] uppercase text-cream-500 mb-1">{product.brand}</p>
                <Link to={`/product/${product.slug}`}>
                  <h3 className="text-cream-100 font-display text-base leading-snug group-hover:text-gold-400 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                </Link>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-gold-400 font-semibold text-sm">
                    {formatPrice(displayPrice)}
                  </span>
                  <button
                    onClick={() => addToCart({ ...product, selectedSize: product.sizes?.[0] })}
                    className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase text-cream-300 hover:text-gold-400 transition-colors"
                  >
                    <ShoppingBag size={12} />
                    Add
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

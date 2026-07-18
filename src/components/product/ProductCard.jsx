import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react'
import { useCartStore, useWishlistStore } from '../../store/useStore'
import { formatPrice } from '../../lib/utils'

export default function ProductCard({ product, className = '' }) {
  const [hovered, setHovered] = useState(false)
  const [selectedSize, setSelectedSize] = useState(
    product.sizes.find((s) => s.ml === product.defaultSize) || product.sizes[0]
  )

  const { addItem } = useCartStore()
  const { toggle, isWishlisted } = useWishlistStore()
  const wishlisted = isWishlisted(product.id)

  const handleAddToCart = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addItem(product, selectedSize.ml, 1)
  }

  const handleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggle(product)
  }

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className={`group relative bg-cream-50 ${className}`}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25 }}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {product.is_bestseller && <span className="badge-bestseller">Bestseller</span>}
        {product.is_new_arrival && <span className="badge-new">New</span>}
        {product.sale_price && <span className="badge-sale">Sale</span>}
      </div>

      {/* Wishlist */}
      <button
        onClick={handleWishlist}
        aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        className="absolute top-3 right-3 z-10 w-8 h-8 bg-cream-100/90 flex items-center justify-center transition-colors hover:bg-cream-100"
      >
        <Heart
          size={14}
          className={wishlisted ? 'fill-blush-300 text-blush-300' : 'text-brown-50'}
        />
      </button>

      {/* Image */}
      <Link to={`/product/${product.slug}`} className="block overflow-hidden aspect-[3/4] relative bg-cream-200">
        <img
          src={product.images[0]}
          alt={product.name}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${hovered ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}
          loading="lazy"
        />
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={`${product.name} — view 2`}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
            loading="lazy"
          />
        )}

        {/* Hover overlay */}
        <div className={`absolute inset-0 bg-brown-200/10 flex flex-col items-center justify-end pb-4 gap-2 transition-opacity duration-300 pointer-events-none ${hovered ? 'opacity-100' : 'opacity-0'}`}>
          <span className="inline-flex items-center gap-2 px-5 py-2.5 bg-cream-100/95 text-brown-100 font-body text-xs tracking-widest uppercase">
            <Eye size={13} /> View Fragrance
          </span>
        </div>
      </Link>

      {/* Info */}
      <div className="p-4">
        <p className="font-body text-[10px] tracking-widest uppercase text-champagne-500 mb-1">
          {product.scent_family}
        </p>
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-display text-lg text-brown-100 leading-snug hover:text-champagne-500 transition-colors">
            {product.name}
          </h3>
        </Link>
        <p className="font-body text-xs text-brown-50 mt-0.5 line-clamp-1">
          {product.brand}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mt-2">
          <div className="flex">
            {[1,2,3,4,5].map((s) => (
              <Star key={s} size={11}
                className={s <= Math.round(product.rating) ? 'fill-champagne-400 text-champagne-400' : 'text-cream-300'} />
            ))}
          </div>
          <span className="font-body text-[10px] text-brown-50">({product.review_count})</span>
        </div>

        {/* Size selector */}
        <div className="flex gap-1.5 mt-3">
          {product.sizes.map((s) => (
            <button
              key={s.ml}
              onClick={(e) => { e.preventDefault(); setSelectedSize(s) }}
              className={`px-2.5 py-1 font-body text-[10px] border transition-colors ${
                selectedSize.ml === s.ml
                  ? 'border-brown-100 bg-brown-100 text-cream-100'
                  : 'border-[rgba(180,132,61,0.22)] text-brown-50 hover:border-brown-50'
              }`}
            >
              {s.ml}ml
            </button>
          ))}
        </div>

        {/* Price + Add */}
        <div className="flex items-center justify-between mt-3">
          <div>
            {product.sale_price ? (
              <div className="flex items-baseline gap-2">
                <span className="font-body font-semibold text-base text-brown-100">
                  {formatPrice(product.sale_price)}
                </span>
                <span className="font-body text-xs text-brown-50 line-through">
                  {formatPrice(selectedSize.price)}
                </span>
              </div>
            ) : (
              <span className="font-body font-semibold text-base text-brown-100">
                {formatPrice(selectedSize.price)}
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            aria-label="Add to bag"
            className="w-9 h-9 bg-brown-100 flex items-center justify-center text-cream-100 hover:bg-brown-200 transition-colors"
          >
            <ShoppingBag size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

import { asset } from '../../lib/assets'
export function BottleFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative animate-float">
        <img
          src={asset('/products/midnight-edition-set.jpg')}
          alt="Zaram Luxury Fragrance bottle"
          className="w-56 h-72 object-cover shadow-luxury"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-champagne-200/20 to-transparent" />
      </div>
    </div>
  )
}

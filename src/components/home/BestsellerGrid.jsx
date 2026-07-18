import { Link } from 'react-router-dom'
import { PRODUCTS } from '../../data/products'
import ProductCard from '../product/ProductCard'
import { useStaggerReveal } from '../../hooks/useScrollAnimation'
import { PhotoCard } from '../decor/PhotoDecor'

const bestsellers = PRODUCTS.filter((p) => p.is_bestseller).slice(0, 4)

export default function BestsellerGrid() {
  const gridRef = useStaggerReveal('[data-item]', { stagger: 0.1, y: 30 })

  return (
    <section className="relative py-20 bg-cream-200/40 overflow-hidden">
      <PhotoCard src="/products/love-key.jpg" width={100} tilt={5} className="decor--float-slow hidden 2xl:block" style={{ right: '1.5%', top: 26 }} />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <p className="section-label">Most Loved</p>
            <h2 className="section-title">
              Bestselling<br />Fragrances
            </h2>
          </div>
          <Link to="/shop?sort=bestsellers" className="btn-secondary self-start md:self-auto">
            View All →
          </Link>
        </div>

        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {bestsellers.map((product) => (
            <div key={product.id} data-item>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { DEMO_PRODUCTS } from '../../data/products'
import ProductCard from '../product/ProductCard'

const bestsellers = DEMO_PRODUCTS.filter((p) => p.isBestseller).slice(0, 4)

export default function BestsellerGrid() {
  return (
    <section className="py-20 bg-cream-200/40">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
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

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {bestsellers.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

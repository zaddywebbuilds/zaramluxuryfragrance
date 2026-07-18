import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { asset } from '../../lib/assets'

/**
 * Dark editorial showcase that extends the hero — two real product
 * photographs with a headline, continuing the #08060e hero backdrop
 * so the top of the page reads as one continuous dark canvas.
 */
export default function HeroShowcase() {
  return (
    <section className="relative bg-[#08060e] overflow-hidden py-24 md:py-32">
      {/* Ambient gold glow, echoes the hero */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(ellipse, rgba(180,132,61,0.08) 0%, transparent 65%)' }} />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* Large photo — left */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-5 relative"
          >
            <div className="aspect-[4/5] overflow-hidden">
              <img
                src={asset('/products/oud-al-layl-set.jpg')}
                alt="Oud Al Layl — the signature of the collection"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 lg:-right-6 border border-champagne-400/40 px-5 py-3 bg-[#08060e]/90 backdrop-blur-sm">
              <p className="font-body text-[10px] tracking-[0.3em] uppercase text-champagne-400">Oud Al Layl</p>
            </div>
          </motion.div>

          {/* Text — centre */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="lg:col-span-4 text-center lg:px-4"
          >
            <p className="font-body text-[10px] tracking-[0.35em] uppercase text-champagne-400 mb-5">
              The Collection
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-cream-100 leading-[1.1] mb-6">
              Crafted to Be<br />
              <em className="not-italic text-gradient-gold">Remembered.</em>
            </h2>
            <p className="font-body text-sm md:text-base text-cream-300/60 leading-relaxed mb-8 max-w-sm mx-auto">
              From deep midnight ouds to radiant golden florals — every bottle in the Zaram
              collection is chosen to become part of how the world remembers you.
            </p>
            <Link to="/shop" className="btn-secondary-dark">
              Explore All Fragrances
            </Link>
          </motion.div>

          {/* Tall photo — right, offset upward for editorial rhythm */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="lg:col-span-3 relative lg:-mt-16"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img
                src={asset('/products/elyssia-scarlet.jpg')}
                alt="Elyssia Scarlet"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute -bottom-4 left-4 border border-champagne-400/40 px-5 py-3 bg-[#08060e]/90 backdrop-blur-sm">
              <p className="font-body text-[10px] tracking-[0.3em] uppercase text-champagne-400">Elyssia Scarlet</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

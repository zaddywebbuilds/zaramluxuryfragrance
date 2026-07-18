import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Gift, Heart, Sparkles, Building2 } from 'lucide-react'

const OCCASIONS = [
  { icon: Heart, label: 'Birthday Gifts', desc: 'Make their day unforgettable.' },
  { icon: Sparkles, label: 'Anniversary & Romance', desc: 'A scent they\'ll associate with you.' },
  { icon: Gift, label: 'Bridal & Wedding Gifts', desc: 'Timeless, elegant and remembered.' },
  { icon: Building2, label: 'Corporate Gifting', desc: 'Premium gifts that represent your brand.' },
]

export default function GiftSection() {
  return (
    <section className="py-20 bg-luxury-gradient relative overflow-hidden">
      {/* Soft background image */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <img
          src="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=1400&q=60"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="section-label">Gifting Experience</p>
            <h2 className="section-title mb-4">
              Give a Scent.<br />Leave a Memory.
            </h2>
            <div className="divider-gold" />
            <p className="font-body text-base text-brown-50 leading-relaxed mb-8">
              A fragrance is more than a gift — it becomes part of someone's identity. Every Zaram order
              can be packaged beautifully with your personal message, making it the most thoughtful gift you've given.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {OCCASIONS.map(({ icon: Icon, label, desc }) => (
                <div key={label} className="flex gap-3">
                  <Icon size={18} className="text-champagne-500 shrink-0 mt-0.5" strokeWidth={1.5} />
                  <div>
                    <p className="font-body font-medium text-sm text-brown-100">{label}</p>
                    <p className="font-body text-xs text-brown-50">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/shop?filter=gifts" className="btn-primary gap-2">
                <Gift size={15} />
                Create a Memorable Gift
              </Link>
              <Link to="/our-story#contact" className="btn-secondary">
                Enquire About Corporate Gifting
              </Link>
            </div>
          </motion.div>

          {/* Image collage */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="grid grid-cols-2 gap-3"
          >
            <div className="space-y-3">
              <div className="aspect-[3/4] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1608528577891-eb055944f2e7?w=500&q=85"
                     alt="Gift packaging" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="aspect-square overflow-hidden">
                <img src="https://images.unsplash.com/photo-1548369937-47519962c11a?w=500&q=85"
                     alt="Fragrance gift" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
            <div className="space-y-3 mt-8">
              <div className="aspect-square overflow-hidden">
                <img src="https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500&q=85"
                     alt="Premium perfume" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="aspect-[3/4] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=500&q=85"
                     alt="Luxury packaging" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

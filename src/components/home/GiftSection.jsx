import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Gift, Heart, Sparkles, Building2 } from 'lucide-react'
import { PhotoMedallion } from '../decor/PhotoDecor'
import { asset } from '../../lib/assets'

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
          src={asset('/products/oud-al-layl-set.jpg')}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <PhotoMedallion src={asset('/products/her-confession.jpg')} size={84} className="decor--float hidden xl:block" style={{ left: '1.5%', bottom: 60 }} />

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
                <img src={asset('/products/lamsat-harir-dubai-chocolate-set.jpg')}
                     alt="Gift packaging" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="aspect-square overflow-hidden">
                <img src={asset('/products/al-faris-spray-set.jpg')}
                     alt="Fragrance gift" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
            <div className="space-y-3 mt-8">
              <div className="aspect-square overflow-hidden">
                <img src={asset('/products/elyssia-scarlet.jpg')}
                     alt="Premium perfume" className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="aspect-[3/4] overflow-hidden">
                <img src={asset('/products/oud-al-layl-set.jpg')}
                     alt="Luxury packaging" className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

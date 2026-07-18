import { motion } from 'framer-motion'
import { ShieldCheck, Award, Gift, Users } from 'lucide-react'
import { PhotoMedallion, PhotoCard } from '../decor/PhotoDecor'
import { asset } from '../../lib/assets'

const BENEFITS = [
  {
    icon: Award,
    title: 'Carefully Selected Fragrances',
    desc: 'Every fragrance is reviewed for quality, longevity and authenticity before joining the collection.',
  },
  {
    icon: ShieldCheck,
    title: 'Authenticity and Quality Focus',
    desc: 'We source with care. You receive exactly what you ordered — genuine, well-packaged and sealed.',
  },
  {
    icon: Gift,
    title: 'Beautiful Gift-Ready Packaging',
    desc: 'Whether for yourself or a loved one, every order arrives ready to impress.',
  },
  {
    icon: Users,
    title: 'Personal Fragrance Guidance',
    desc: 'Our scent concierge is available on WhatsApp to help you find your perfect match.',
  },
]

export default function WhyShopWithUs() {
  return (
    <section className="relative py-20 bg-cream-100 overflow-hidden">
      <PhotoMedallion src={asset('/products/raghad.jpg')} size={92} className="decor--float hidden xl:block" style={{ left: '2.5%', top: 44 }} />
      <PhotoCard src={asset('/products/thriller.jpg')} width={104} tilt={6} className="decor--float-slow hidden xl:block" style={{ right: '2.5%', top: 40 }} />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-14">
          <p className="section-label">Why Zaram</p>
          <h2 className="section-title">
            A Different Kind<br />of Fragrance Experience
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BENEFITS.map(({ icon: Icon, title, desc }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="group p-8 border border-[rgba(180,132,61,0.12)] bg-cream-50 hover:border-champagne-400 transition-colors duration-300"
            >
              <div className="w-12 h-12 border border-champagne-400/40 flex items-center justify-center mb-5 group-hover:border-champagne-400 group-hover:bg-champagne-100/50 transition-all duration-300">
                <Icon size={20} className="text-champagne-500" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-xl text-brown-100 mb-3">{title}</h3>
              <p className="font-body text-sm text-brown-50 leading-relaxed">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

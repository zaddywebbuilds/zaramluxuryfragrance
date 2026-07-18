import { motion } from 'framer-motion'
import { PhotoMedallion } from '../decor/PhotoDecor'
import { asset } from '../../lib/assets'

export default function EditorialStatement() {
  return (
    <section className="relative py-28 bg-dark-gradient overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={asset('/products/lamsat-harir-lifestyle.jpg')}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brown-200/80 via-brown-200/60 to-brown-200/90" />
      </div>

      {/* Perfume decor — real product shots */}
      <PhotoMedallion src={asset('/products/zenith.jpg')} size={86} className="decor--float hidden xl:block" style={{ left: '5%', top: '20%', boxShadow: '0 0 0 5px rgba(212,172,112,0.2), 0 10px 28px rgba(0,0,0,0.45)' }} />
      <PhotoMedallion src={asset('/products/raghad.jpg')} size={70} className="decor--float-slow hidden xl:block" style={{ right: '6%', bottom: '18%', boxShadow: '0 0 0 5px rgba(212,172,112,0.2), 0 10px 28px rgba(0,0,0,0.45)' }} />

      <div className="relative max-w-4xl mx-auto px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
        >
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px w-16 bg-champagne-400/40" />
            <div className="w-1.5 h-1.5 bg-champagne-400 rounded-full" />
            <div className="h-px w-16 bg-champagne-400/40" />
          </div>

          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream-100 leading-tight mb-8 italic">
            "Perfume is more than what<br />
            people smell. It is how they<br />
            <span className="text-gradient-gold not-italic">remember you."</span>
          </h2>

          <p className="font-body text-base text-cream-300/60 tracking-wide max-w-xl mx-auto">
            Every fragrance in the Zaram collection is chosen to become a part of the identity you carry into every room.
          </p>

          <div className="flex items-center justify-center gap-4 mt-10">
            <div className="h-px w-16 bg-champagne-400/40" />
            <div className="w-1.5 h-1.5 bg-champagne-400 rounded-full" />
            <div className="h-px w-16 bg-champagne-400/40" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

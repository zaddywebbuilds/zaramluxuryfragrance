import { motion } from 'framer-motion'

export default function EditorialStatement() {
  return (
    <section className="relative py-28 bg-dark-gradient overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1590736969955-71cc94901144?w=1400&q=80"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brown-200/80 via-brown-200/60 to-brown-200/90" />
      </div>

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

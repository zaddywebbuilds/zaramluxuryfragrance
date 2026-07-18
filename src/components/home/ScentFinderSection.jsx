import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useUIStore } from '../../store/useStore'

export default function ScentFinderSection() {
  const { openScentFinder } = useUIStore()

  return (
    <section id="scent-finder" className="py-20 bg-blush-100/60">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative aspect-[4/3] overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800&q=85"
              alt="Fragrance discovery"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blush-100/20 to-transparent" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <p className="section-label">Personalised Discovery</p>
            <h2 className="section-title mb-4">
              Find the Fragrance<br />That Feels Like You.
            </h2>
            <div className="divider-gold" />
            <p className="font-body text-base text-brown-50 leading-relaxed mb-8">
              Not sure where to start? Answer five simple questions about your mood, preferences and
              occasion — and we'll recommend three fragrances chosen specifically for you.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                'Who are you shopping for?',
                'What mood should it create?',
                'Which scent families?',
                'When will you wear it?',
              ].map((q, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="font-display text-champagne-400 text-lg mt-0.5">{i + 1}.</span>
                  <span className="font-body text-sm text-brown-50">{q}</span>
                </div>
              ))}
            </div>

            <button onClick={openScentFinder} className="btn-primary gap-3">
              <Sparkles size={16} />
              Start the Scent Finder
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

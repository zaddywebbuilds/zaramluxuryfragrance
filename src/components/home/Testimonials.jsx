import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, BadgeCheck } from 'lucide-react'
import { DEMO_TESTIMONIALS } from '../../data/products'

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const reviews = DEMO_TESTIMONIALS

  const prev = () => setCurrent((c) => (c - 1 + reviews.length) % reviews.length)
  const next = () => setCurrent((c) => (c + 1) % reviews.length)

  const review = reviews[current]

  return (
    <section className="py-20 bg-cream-200/50">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <p className="section-label">Customer Stories</p>
          <h2 className="section-title">Worn and Remembered</h2>
          <p className="font-body text-xs text-brown-50/60 mt-2">
            ✦ Demo reviews — replace with real customer stories from Supabase
          </p>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-cream-50 border border-[rgba(180,132,61,0.1)] p-8 md:p-12"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-5">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} size={14} className="fill-champagne-400 text-champagne-400" />
                ))}
              </div>

              <blockquote className="font-display text-xl md:text-2xl text-brown-100 leading-relaxed mb-6 italic">
                "{review.review}"
              </blockquote>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="font-body font-medium text-sm text-brown-100">{review.name}</p>
                  <p className="font-body text-xs text-brown-50">{review.city} · {review.product}</p>
                </div>
                {review.verified && (
                  <div className="flex items-center gap-1.5 font-body text-xs text-champagne-500">
                    <BadgeCheck size={14} />
                    Verified Purchase
                  </div>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex items-center justify-between mt-6">
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-colors duration-200 ${i === current ? 'bg-champagne-400' : 'bg-cream-300'}`}
                  aria-label={`Review ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={prev} aria-label="Previous review"
                      className="w-10 h-10 border border-[rgba(180,132,61,0.22)] flex items-center justify-center text-brown-50 hover:border-champagne-400 hover:text-champagne-500 transition-colors">
                <ChevronLeft size={16} />
              </button>
              <button onClick={next} aria-label="Next review"
                      className="w-10 h-10 border border-[rgba(180,132,61,0.22)] flex items-center justify-center text-brown-50 hover:border-champagne-400 hover:text-champagne-500 transition-colors">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

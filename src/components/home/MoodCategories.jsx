import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MOOD_CATEGORIES } from '../../data/products'
import { PhotoMedallion, PhotoCard } from '../decor/PhotoDecor'

export default function MoodCategories() {
  return (
    <section className="relative py-20 bg-cream-100 overflow-hidden">
      {/* Perfume decor — real product shots */}
      <PhotoCard src="/products/elyssia-scarlet.jpg" width={110} tilt={-7} className="decor--float hidden xl:block" style={{ left: '2.5%', top: 48 }} />
      <PhotoMedallion src="/products/zenith.jpg" size={90} className="decor--float-slow hidden xl:block" style={{ right: '4%', top: 44 }} />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <p className="section-label">Shop by Mood</p>
          <h2 className="section-title">
            How Do You Want<br />to Feel Today?
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {MOOD_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              className="group relative overflow-hidden aspect-[4/5] cursor-pointer"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brown-200/90 via-brown-200/30 to-transparent transition-opacity duration-300" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
                <h3 className="font-display text-xl md:text-2xl text-cream-100 leading-tight mb-1.5">
                  {cat.name}
                </h3>
                <p className="font-body text-xs text-cream-200/70 mb-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {cat.description}
                </p>
                <Link
                  to={`/shop?mood=${cat.id}`}
                  className="inline-flex items-center font-body text-xs tracking-widest uppercase text-champagne-300 hover:text-champagne-200 transition-colors"
                >
                  Shop →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

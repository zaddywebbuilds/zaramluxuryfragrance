import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { useUIStore } from '../../store/useStore'
import { asset } from '../../lib/assets'
import { isTouchDevice } from '../../lib/quality'

// Desktop orbit: 6 images (reduced from 10 for performance)
const ORBIT_PRODUCTS = [
  { src: asset('/products/oud-al-layl-set.jpg'),      name: 'Oud Al Layl' },
  { src: asset('/products/elyssia-scarlet.jpg'),      name: 'Elyssia Scarlet' },
  { src: asset('/products/zenith.jpg'),               name: 'Zenith' },
  { src: asset('/products/raghad.jpg'),               name: 'Raghad' },
  { src: asset('/products/love-key.jpg'),             name: 'Love Key' },
  { src: asset('/products/golden-elixir.jpg'),        name: 'Golden Elixir' },
]

// Mobile hero: 3 stacked images, no animation
const MOBILE_HERO_IMAGES = [
  { src: asset('/products/oud-al-layl-set.jpg'),   name: 'Oud Al Layl' },
  { src: asset('/products/elyssia-scarlet.jpg'),   name: 'Elyssia Scarlet' },
  { src: asset('/products/zenith.jpg'),            name: 'Zenith' },
]

function MobileHeroImages() {
  return (
    <div className="flex gap-2 justify-center mt-6 px-2" aria-hidden="true">
      {MOBILE_HERO_IMAGES.map((p, i) => (
        <div key={p.src}
          className="relative overflow-hidden rounded-sm flex-1 max-w-[28vw]"
          style={{ aspectRatio: '3/4', opacity: 1 - i * 0.15 }}>
          <img src={p.src} alt={p.name}
            loading={i === 0 ? 'eager' : 'lazy'}
            className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      ))}
    </div>
  )
}

function OrbitRing() {
  const count = ORBIT_PRODUCTS.length
  return (
    <div className="orbit-wrapper" aria-hidden="true">
      <div className="orbit-scene">
        <div className="orbit-ring orbit-ring--outer" />
        <div className="orbit-ring orbit-ring--inner" />

        {ORBIT_PRODUCTS.map((p, i) => {
          const angle = (360 / count) * i
          return (
            <div key={p.src} className="orbit-item" style={{ '--start-angle': `${angle}deg` }}>
              <div className="orbit-card">
                <div className="orbit-img-wrap">
                  <img src={p.src} alt={p.name} loading={i < 2 ? 'eager' : 'lazy'} />
                </div>
                <span className="orbit-label">{p.name}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Video lives OUTSIDE the rotating scene — never moves */}
      <div className="orbit-center">
        <video autoPlay muted loop playsInline preload="none" className="orbit-video">
          <source src={asset('/hero-video.mp4')} type="video/mp4" />
        </video>
        <div className="orbit-center-overlay" />
      </div>
    </div>
  )
}

export default function HeroSection() {
  const ref = useRef(null)
  const { openScentFinder } = useUIStore()
  const isTouch = isTouchDevice()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, isTouch ? 0 : 60])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="hero-section">
      <div className="absolute inset-0 bg-[#08060e]" />

      {/* Ambient glow — lightweight, no grain texture on mobile */}
      {!isTouch && (
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
             style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'200\' height=\'200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
                     backgroundRepeat: 'repeat' }} />
      )}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(180,132,61,0.10) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full min-h-[100svh] flex flex-col lg:flex-row items-center gap-6 lg:gap-16 pt-24 pb-12">

        {/* Text */}
        <motion.div style={{ y, opacity }} className="flex-1 z-10 text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}
            className="font-body text-[10px] tracking-[0.35em] uppercase text-champagne-400 mb-4"
          >
            Fragrance, Identity & Memory
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}
            className="font-display text-5xl md:text-6xl xl:text-7xl text-cream-100 leading-[1.06] mb-6"
          >
            Leave a Memory<br />
            <em className="not-italic text-gradient-gold">Before You Leave</em><br />
            the Room.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.6 }}
            className="font-body text-base md:text-lg text-cream-300/70 leading-relaxed mb-8 max-w-md mx-auto lg:mx-0"
          >
            Discover unforgettable scents for every mood, moment and version of you.
            Authentic fragrances delivered across Nigeria.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Link to="/shop" className="btn-primary">Shop the Collection</Link>
            <button onClick={openScentFinder} className="btn-secondary-dark">Find My Scent</button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75, duration: 0.7 }}
            className="mt-8 flex items-center gap-6 flex-wrap justify-center lg:justify-start"
          >
            {['Authentic', 'Nationwide Delivery', 'WhatsApp Support'].map((t) => (
              <span key={t} className="font-body text-xs text-cream-300/50 flex items-center gap-1.5">
                <span className="w-1 h-1 bg-champagne-400/60 rounded-full" />
                {t}
              </span>
            ))}
          </motion.div>

          {/* Mobile product images — no orbit animation */}
          {isTouch && <MobileHeroImages />}
        </motion.div>

        {/* Desktop orbit — hidden on touch devices */}
        {!isTouch && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 1.1 }}
            className="flex-1 flex items-center justify-center"
            style={{ minHeight: '520px' }}
          >
            <OrbitRing />
          </motion.div>
        )}
      </div>

      <motion.div
        animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream-300/30 z-10"
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  )
}

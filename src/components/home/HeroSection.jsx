import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { useUIStore } from '../../store/useStore'
import { asset } from '../../lib/assets'

// 10 product images to orbit
const ORBIT_PRODUCTS = [
  { src: asset('/products/oud-al-layl-set.jpg'),            name: 'Oud Al Layl' },
  { src: asset('/products/elyssia-scarlet.jpg'),            name: 'Elyssia Scarlet' },
  { src: asset('/products/midnight-edition-set.jpg'),       name: 'Midnight Edition' },
  { src: asset('/products/zenith.jpg'),                     name: 'Zenith' },
  { src: asset('/products/raghad.jpg'),                     name: 'Raghad' },
  { src: asset('/products/lamsat-harir-dubai-chocolate.jpg'), name: 'Lamsat Harir' },
  { src: asset('/products/love-key.jpg'),                   name: 'Love Key' },
  { src: asset('/products/thriller.jpg'),                   name: 'Thriller' },
  { src: asset('/products/her-confession.jpg'),             name: 'Her Confession' },
  { src: asset('/products/golden-elixir.jpg'),              name: 'Golden Elixir' },
]

function OrbitRing() {
  const count = ORBIT_PRODUCTS.length
  return (
    // Wrapper stays still — only orbit-scene rotates inside it
    <div className="orbit-wrapper" aria-hidden="true">
      <div className="orbit-scene">
        <div className="orbit-ring orbit-ring--outer" />
        <div className="orbit-ring orbit-ring--inner" />

        {ORBIT_PRODUCTS.map((p, i) => {
          const angle = (360 / count) * i
          return (
            <div
              key={p.src}
              className="orbit-item"
              style={{ '--start-angle': `${angle}deg` }}
            >
              <div className="orbit-card">
                <div className="orbit-img-wrap">
                  <img src={p.src} alt={p.name} loading="eager" />
                </div>
                <span className="orbit-label">{p.name}</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Video lives OUTSIDE the rotating scene — never moves */}
      <div className="orbit-center">
        <video autoPlay muted loop playsInline className="orbit-video">
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
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 60])
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} className="hero-section">
      {/* Dark background */}
      <div className="absolute inset-0 bg-[#08060e]" />

      {/* Subtle grain overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'200\' height=\'200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
                   backgroundRepeat: 'repeat' }} />

      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(180,132,61,0.10) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full min-h-screen flex flex-col lg:flex-row items-center gap-6 lg:gap-16 pt-24 pb-12">

        {/* Left — text (always first in DOM so it's on top on mobile) */}
        <motion.div style={{ y, opacity }} className="flex-1 z-10 text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8 }}
            className="font-body text-[10px] tracking-[0.35em] uppercase text-champagne-400 mb-4"
          >
            Fragrance, Identity & Memory
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.9 }}
            className="font-display text-5xl md:text-6xl xl:text-7xl text-cream-100 leading-[1.06] mb-6"
          >
            Leave a Memory<br />
            <em className="not-italic text-gradient-gold">Before You Leave</em><br />
            the Room.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }}
            className="font-body text-base md:text-lg text-cream-300/70 leading-relaxed mb-8 max-w-md mx-auto lg:mx-0"
          >
            Discover unforgettable scents for every mood, moment and version of you.
            Authentic fragrances delivered across Nigeria.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
          >
            <Link to="/shop" className="btn-primary">
              Shop the Collection
            </Link>
            <button onClick={openScentFinder} className="btn-secondary-dark">
              Find My Scent
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-8 flex items-center gap-6 flex-wrap justify-center lg:justify-start"
          >
            {['Authentic', 'Nationwide Delivery', 'WhatsApp Support'].map((t) => (
              <span key={t} className="font-body text-xs text-cream-300/50 flex items-center gap-1.5">
                <span className="w-1 h-1 bg-champagne-400/60 rounded-full" />
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Right — orbit */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4, duration: 1.2 }}
          className="flex-1 flex items-center justify-center"
          style={{ minHeight: '520px' }}
        >
          <OrbitRing />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream-300/30 z-10"
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  )
}

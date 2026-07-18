import { useRef, Suspense, lazy } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { useUIStore } from '../../store/useStore'

// Lazy load 3D bottle only where supported
const PerfumeBottle3D = lazy(() => import('../three/PerfumeBottle3D'))

function BottleFallback() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div className="relative animate-float">
        <img
          src="/products/midnight-edition-set.jpg"
          alt="Zaram Luxury Fragrance"
          className="w-64 h-80 md:w-80 md:h-96 object-cover shadow-luxury"
        />
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-champagne-200/30 to-transparent pointer-events-none" />
      </div>
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 bg-champagne-400/40 rounded-full animate-float"
          style={{
            left: `${20 + i * 12}%`,
            top: `${25 + (i % 3) * 20}%`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: `${4 + i}s`,
          }}
        />
      ))}
    </div>
  )
}

export default function HeroSection() {
  const ref = useRef(null)
  const { openScentFinder } = useUIStore()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 80])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden bg-luxury-gradient">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
           style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.75\' numOctaves=\'4\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'1\'/%3E%3C/svg%3E")',
                   backgroundRepeat: 'repeat' }} />

      {/* Decorative gradient orbs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blush-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-champagne-200/40 rounded-full blur-2xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8 w-full pt-24 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div style={{ y, opacity }} className="z-10 order-2 lg:order-1">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.7 }}
            className="section-label"
          >
            Fragrance, Identity and Memory
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.8 }}
            className="font-display text-5xl md:text-6xl xl:text-7xl text-brown-100 leading-[1.08] mb-6"
          >
            Leave a Memory<br />
            <em className="not-italic text-gradient-gold">Before You Leave</em><br />
            the Room.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.7 }}
            className="font-body text-base md:text-lg text-brown-50 leading-relaxed mb-8 max-w-lg"
          >
            Discover unforgettable scents selected for every mood, moment and version of you.
            Elegant fragrances, thoughtful gifting and nationwide delivery across Nigeria.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.7 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/shop" className="btn-primary">
              Shop the Collection
            </Link>
            <button onClick={openScentFinder} className="btn-secondary">
              Find My Scent
            </button>
          </motion.div>

          {/* Quick trust signals */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.7 }}
            className="mt-8 flex items-center gap-6 flex-wrap"
          >
            {['Authentic', 'Nationwide Delivery', 'WhatsApp Support'].map((t) => (
              <span key={t} className="font-body text-xs text-brown-50 flex items-center gap-1.5">
                <span className="w-1 h-1 bg-champagne-400 rounded-full" />
                {t}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* Bottle */}
        <motion.div
          initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 1 }}
          className="order-1 lg:order-2 h-[420px] md:h-[560px] relative"
        >
          <Suspense fallback={<BottleFallback />}>
            <PerfumeBottle3D />
          </Suspense>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-brown-50/40"
      >
        <ChevronDown size={24} />
      </motion.div>
    </section>
  )
}

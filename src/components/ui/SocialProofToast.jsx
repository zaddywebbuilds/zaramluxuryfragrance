import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, X } from 'lucide-react'
import { PRODUCTS } from '../../data/products'

const FIRST_NAMES = [
  'Amaka', 'Chisom', 'Tunde', 'Ngozi', 'Emeka', 'Fatima', 'Seun', 'Adaeze',
  'Bolaji', 'Chiamaka', 'Femi', 'Ifunanya', 'Kola', 'Lola', 'Musa', 'Nkechi',
  'Obinna', 'Priscilla', 'Rotimi', 'Sola', 'Tosin', 'Uche', 'Victor', 'Yewande',
  'Zainab', 'Adeola', 'Blessing', 'Chukwudi', 'Damilola', 'Efe', 'Gbemi',
  'Hassan', 'Ifeoma', 'James', 'Kafayat', 'Lanre', 'Michael', 'Nonso',
]

const LAST_NAMES = [
  'Okafor', 'Adeyemi', 'Ibrahim', 'Nwosu', 'Babatunde', 'Eze', 'Afolabi',
  'Chukwu', 'Olawale', 'Musa', 'Okeke', 'Adebayo', 'Okonkwo', 'Lawal',
  'Nwachukwu', 'Ogunyemi', 'Balogun', 'Uwakwe', 'Adeleke', 'Obiora',
]

const LOCATIONS = [
  'Ikeja, Lagos', 'Lekki, Lagos', 'Victoria Island, Lagos', 'Surulere, Lagos',
  'Wuse, Abuja', 'Garki, Abuja', 'Maitama, Abuja', 'Gwarinpa, Abuja',
  'GRA, Port Harcourt', 'Rumuola, Port Harcourt',
  'Enugu State', 'Anambra State', 'Kano State', 'Ibadan, Oyo State',
  'Benin City', 'Asaba, Delta State', 'Uyo, Akwa Ibom', 'Calabar',
  'Owerri, Imo State', 'Abeokuta, Ogun State',
]

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomMinutes() {
  const r = Math.random()
  if (r < 0.3) return { value: Math.floor(Math.random() * 55) + 5, unit: 'mins' }
  if (r < 0.7) return { value: Math.floor(Math.random() * 5) + 1, unit: 'hrs' }
  return { value: Math.floor(Math.random() * 2) + 1, unit: 'days' }
}

function buildNotification() {
  const product = randomFrom(PRODUCTS)
  const { value, unit } = randomMinutes()
  return {
    id: Date.now(),
    name: `${randomFrom(FIRST_NAMES)} ${randomFrom(LAST_NAMES)}`,
    location: randomFrom(LOCATIONS),
    product: product.name,
    image: product.images[0],
    time: `${value} ${unit} ago`,
  }
}

export default function SocialProofToast() {
  const [toast, setToast] = useState(null)
  const [dismissed, setDismissed] = useState(false)

  const show = useCallback(() => {
    setDismissed(false)
    setToast(buildNotification())
  }, [])

  useEffect(() => {
    // First toast after 8 seconds
    const initial = setTimeout(show, 8000)
    return () => clearTimeout(initial)
  }, [show])

  useEffect(() => {
    if (!toast) return
    // Auto-dismiss after 6s
    const hide = setTimeout(() => setToast(null), 6000)
    // Next toast 25–55s after this one disappears
    const next = setTimeout(show, 6000 + (Math.random() * 30000 + 25000))
    return () => { clearTimeout(hide); clearTimeout(next) }
  }, [toast, show])

  if (dismissed) return null

  return (
    <div className="fixed bottom-6 left-4 z-50 pointer-events-none">
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
            className="pointer-events-auto flex items-center gap-3 bg-cream-50 border border-[rgba(180,132,61,0.18)] shadow-luxury rounded-sm pr-3 max-w-[280px] sm:max-w-[320px] overflow-hidden"
          >
            {/* Product thumbnail */}
            <div className="w-14 h-14 shrink-0 overflow-hidden bg-cream-200">
              <img
                src={toast.image}
                alt={toast.product}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0 py-2.5">
              <div className="flex items-center gap-1 mb-0.5">
                <ShoppingBag size={10} className="text-champagne-500 shrink-0" />
                <span className="font-body text-[10px] text-champagne-500 tracking-wide uppercase">
                  Just purchased
                </span>
              </div>
              <p className="font-body text-xs font-medium text-brown-100 leading-snug truncate">
                {toast.name}
              </p>
              <p className="font-body text-[11px] text-brown-50 leading-snug truncate">
                from {toast.location}
              </p>
              <p className="font-body text-[11px] text-brown-100 mt-0.5 truncate">
                bought <span className="text-champagne-500">{toast.product}</span>
              </p>
              <p className="font-body text-[10px] text-brown-50/60 mt-0.5">{toast.time}</p>
            </div>

            {/* Close */}
            <button
              onClick={() => { setToast(null); setDismissed(true) }}
              className="shrink-0 p-1 text-brown-50/40 hover:text-brown-50 transition-colors"
              aria-label="Dismiss"
            >
              <X size={12} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

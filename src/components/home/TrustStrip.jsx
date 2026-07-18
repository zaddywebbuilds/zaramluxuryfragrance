import { motion } from 'framer-motion'
import { ShieldCheck, Truck, MessageCircle, Package } from 'lucide-react'

const ITEMS = [
  { icon: ShieldCheck, label: 'Authenticity Assured', desc: 'Every fragrance carefully verified' },
  { icon: Truck, label: 'Nationwide Delivery', desc: 'Across all Nigerian states' },
  { icon: Package, label: 'Gift-Ready Packaging', desc: 'Beautiful presentation on every order' },
  { icon: MessageCircle, label: 'WhatsApp Scent Concierge', desc: 'Personal fragrance guidance' },
]

export default function TrustStrip() {
  return (
    <section className="bg-cream-50 border-y border-[rgba(180,132,61,0.1)] py-8">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-[rgba(180,132,61,0.12)]">
          {ITEMS.map(({ icon: Icon, label, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center text-center px-4 py-2"
            >
              <Icon size={20} className="text-champagne-500 mb-2.5" strokeWidth={1.5} />
              <p className="font-body font-medium text-sm text-brown-100">{label}</p>
              <p className="font-body text-xs text-brown-50 mt-0.5">{desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

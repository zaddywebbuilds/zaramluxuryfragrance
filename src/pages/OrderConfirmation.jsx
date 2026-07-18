import { useParams, Link } from 'react-router-dom'
import { CheckCircle, MessageCircle, ShoppingBag } from 'lucide-react'
import { motion } from 'framer-motion'
import { siteConfig } from '../config/site'
import { buildWhatsAppUrl, buildOrderWhatsAppMessage, formatPrice } from '../lib/utils'

export default function OrderConfirmation() {
  const { ref } = useParams()

  // In production, fetch order from Supabase using ref
  // For now, read from sessionStorage (set during checkout)
  const orderRaw = sessionStorage.getItem('last_order')
  const order = orderRaw ? JSON.parse(orderRaw) : null

  const waMsg = order
    ? buildOrderWhatsAppMessage({
        reference: ref,
        customerName: order.customerName,
        items: order.items,
        city: order.city,
        state: order.state,
        total: order.total,
      })
    : `Hello Zaram! My order reference is ${ref}. Please confirm details.`

  return (
    <div className="min-h-screen bg-luxury-gradient flex items-center justify-center py-24 px-4">
      <div className="max-w-lg w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-cream-50 border border-[rgba(180,132,61,0.12)] p-8 md:p-12"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
              className="w-16 h-16 bg-champagne-100 flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle size={32} className="text-champagne-500" />
            </motion.div>
            <h1 className="font-display text-3xl text-brown-100 mb-2">Order Request Received</h1>
            <p className="font-body text-sm text-brown-50">
              Your order request has been received. We will confirm availability,
              delivery details and payment instructions shortly.
            </p>
          </div>

          <div className="bg-cream-200/50 border border-[rgba(180,132,61,0.1)] p-4 mb-6 text-center">
            <p className="font-body text-xs tracking-widest uppercase text-champagne-500 mb-1">Order Reference</p>
            <p className="font-display text-2xl text-brown-100">{ref}</p>
          </div>

          {order && (
            <div className="space-y-3 mb-6">
              <div className="flex justify-between font-body text-sm">
                <span className="text-brown-50">Customer</span>
                <span className="text-brown-100 font-medium">{order.customerName}</span>
              </div>
              <div className="flex justify-between font-body text-sm">
                <span className="text-brown-50">Delivery</span>
                <span className="text-brown-100 font-medium">{order.city}, {order.state}</span>
              </div>
              <div className="flex justify-between font-body text-sm border-t border-[rgba(180,132,61,0.1)] pt-3">
                <span className="text-brown-50">Estimated Total</span>
                <span className="text-brown-100 font-medium">{formatPrice(order.total)}</span>
              </div>
            </div>
          )}

          <div className="bg-blush-100/60 border border-blush-200/50 p-4 mb-6">
            <p className="font-body text-sm text-brown-100 font-medium mb-1">What happens next?</p>
            <ul className="font-body text-xs text-brown-50 space-y-1.5">
              <li>✓ We review your order and confirm product availability</li>
              <li>✓ We calculate your exact delivery fee</li>
              <li>✓ We send you payment instructions</li>
              <li>✓ Once payment is confirmed, we dispatch your order</li>
            </ul>
          </div>

          <div className="space-y-3">
            <a
              href={buildWhatsAppUrl(siteConfig.whatsapp, waMsg)}
              target="_blank" rel="noopener noreferrer"
              className="btn-whatsapp w-full flex items-center justify-center gap-2"
            >
              <MessageCircle size={16} />
              Continue on WhatsApp
            </a>
            <Link to="/shop" className="btn-secondary w-full flex items-center justify-center gap-2">
              <ShoppingBag size={15} />
              Continue Shopping
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

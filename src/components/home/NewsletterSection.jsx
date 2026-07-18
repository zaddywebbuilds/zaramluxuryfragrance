import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, MessageCircle, CheckCircle, Loader } from 'lucide-react'
import { siteConfig } from '../../config/site'
import { buildWhatsAppUrl } from '../../lib/utils'
import { PhotoMedallion } from '../decor/PhotoDecor'
import { asset } from '../../lib/assets'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [whatsapp, setWhatsapp] = useState(false)
  const [consent, setConsent] = useState(false)
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email || !consent) {
      setError('Please enter your email and accept the privacy policy.')
      return
    }
    setError('')
    setStatus('loading')
    // Simulate — connect to Supabase newsletter table in production
    await new Promise((r) => setTimeout(r, 1200))
    setStatus('success')
  }

  return (
    <section className="py-20 bg-brown-100 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-champagne-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-blush-200/10 rounded-full blur-2xl pointer-events-none" />

      {/* Perfume decor — real product shots */}
      <PhotoMedallion src={asset('/products/oud-al-layl-set.jpg')} size={96} className="decor--float hidden xl:block" style={{ left: '6%', top: '28%', boxShadow: '0 0 0 5px rgba(212,172,112,0.18), 0 10px 28px rgba(0,0,0,0.4)' }} />
      <PhotoMedallion src={asset('/products/golden-elixir.jpg')} size={78} className="decor--float-slow hidden xl:block" style={{ right: '7%', top: '24%', boxShadow: '0 0 0 5px rgba(212,172,112,0.18), 0 10px 28px rgba(0,0,0,0.4)' }} />
      <PhotoMedallion src={asset('/products/lamsat-harir-dubai-chocolate.jpg')} size={58} className="decor--drift hidden xl:block" style={{ right: '13%', bottom: '14%', boxShadow: '0 0 0 4px rgba(212,172,112,0.15), 0 8px 20px rgba(0,0,0,0.35)' }} />

      <div className="relative max-w-2xl mx-auto px-4 md:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="w-10 h-10 mx-auto mb-6 border border-champagne-400/30 flex items-center justify-center">
            <Mail size={18} className="text-champagne-400" />
          </div>

          <p className="font-body text-xs tracking-[0.3em] uppercase text-champagne-400 mb-3">
            The Scent Circle
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-cream-100 mb-4">
            Enter the Scent Circle
          </h2>
          <p className="font-body text-sm text-cream-200/60 mb-8 leading-relaxed">
            New fragrance arrivals, restock alerts, scent-selection tips and gifting inspiration —
            delivered to you first.
          </p>

          {status === 'success' ? (
            <div className="flex flex-col items-center gap-3 py-6">
              <CheckCircle size={36} className="text-champagne-400" />
              <p className="font-display text-xl text-cream-100">Welcome to the Scent Circle.</p>
              <p className="font-body text-sm text-cream-200/60">
                You'll hear from us when something worth knowing arrives.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="flex-1 px-4 py-3 bg-cream-100/10 border border-cream-100/20 text-cream-100 font-body text-sm placeholder:text-cream-200/30 focus:outline-none focus:border-champagne-400 transition-colors"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-gold shrink-0 min-w-[120px]"
                >
                  {status === 'loading' ? (
                    <Loader size={16} className="animate-spin" />
                  ) : 'Subscribe'}
                </button>
              </div>

              <label className="flex items-start gap-3 text-left cursor-pointer">
                <input
                  type="checkbox"
                  checked={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.checked)}
                  className="mt-0.5 accent-champagne-400"
                />
                <span className="font-body text-xs text-cream-200/50">
                  Also send me fragrance updates on WhatsApp
                </span>
              </label>

              <label className="flex items-start gap-3 text-left cursor-pointer">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  required
                  className="mt-0.5 accent-champagne-400"
                />
                <span className="font-body text-xs text-cream-200/50">
                  I agree to Zaram's privacy policy and consent to receive marketing communications.
                  I can unsubscribe at any time.
                </span>
              </label>

              {error && (
                <p className="font-body text-xs text-blush-200">{error}</p>
              )}
            </form>
          )}

          {/* WhatsApp alternative */}
          <div className="mt-8 pt-8 border-t border-cream-100/10">
            <p className="font-body text-xs text-cream-200/40 mb-3">Prefer to chat directly?</p>
            <a
              href={buildWhatsAppUrl(siteConfig.whatsapp, 'Hello! I\'d like fragrance recommendations and updates from Zaram Luxury Fragrance.')}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-body text-sm text-[#25D366] hover:underline transition-colors"
            >
              <MessageCircle size={15} />
              Join the WhatsApp Scent Circle
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

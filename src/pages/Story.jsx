import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Mail, Phone, ChevronDown, ChevronUp, Share2 } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { siteConfig } from '../config/site'
import { buildWhatsAppUrl, buildScentConsultWhatsAppMessage, validateNigerianPhone } from '../lib/utils'

const FAQS = [
  { q: 'Are your perfumes original?', a: 'Yes. Every fragrance in the Zaram collection is carefully sourced and verified. We do not sell imitations, dilutions or copies. What you receive is exactly what you ordered, sealed and genuine.' },
  { q: 'How do I choose a perfume online?', a: 'Start with our Scent Finder — answer five simple questions about your mood, occasion and preferences. You can also chat with our WhatsApp scent concierge who will guide you personally.' },
  { q: 'Do you deliver across Nigeria?', a: 'Yes. We deliver to all states across Nigeria. Delivery fees and timelines vary by location and will be confirmed when our team processes your order.' },
  { q: 'How long does delivery take?', a: 'Lagos orders typically arrive within 1–3 business days. Nationwide orders take 3–7 business days depending on your location. Specific timelines are confirmed when your order is accepted.' },
  { q: 'Can I send an order as a gift?', a: 'Absolutely. Select gift wrapping during checkout, add a personal message and enter the recipient\'s delivery address. We handle the rest beautifully.' },
  { q: 'How do I pay for my order?', a: 'Online payment is not yet active. After you submit your order request, our team will confirm availability and send you payment instructions — typically bank transfer or mobile money. We will let you know your options clearly.' },
  { q: 'When will online payment become available?', a: 'We are preparing a secure online payment option. For now, payment is handled manually after order confirmation. We will announce when online payment goes live.' },
  { q: 'Can I exchange a fragrance?', a: 'If a product arrives damaged or sealed incorrectly, contact us within 24 hours with clear photos. We will resolve the issue promptly. Opened fragrances cannot be returned for hygiene reasons.' },
  { q: 'What if an item arrives damaged?', a: 'Contact us immediately on WhatsApp with photos of the damage. We take quality seriously and will arrange a replacement or full resolution.' },
  { q: 'Do you offer wholesale orders?', a: 'Yes. For bulk and wholesale enquiries, please reach out through WhatsApp or the contact form. We have options for retailers, resellers and event planners.' },
  { q: 'How can I track my order?', a: 'Once your order is dispatched, we will send you tracking details via WhatsApp or email. You can also reach us to ask for an update at any time.' },
  { q: 'Can I order through WhatsApp?', a: 'Yes. You can browse the website, then complete your order via WhatsApp by telling us the fragrance, size and your delivery details. Our team will guide you through the rest.' },
]

function FAQ({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-[rgba(180,132,61,0.1)]">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
        aria-expanded={open}
      >
        <span className="font-body font-medium text-sm md:text-base text-brown-100">{q}</span>
        {open ? <ChevronUp size={16} className="text-champagne-500 shrink-0" /> : <ChevronDown size={16} className="text-brown-50 shrink-0" />}
      </button>
      {open && (
        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }}
                  className="font-body text-sm text-brown-50 leading-relaxed pb-5">
          {a}
        </motion.p>
      )}
    </div>
  )
}

export default function Story() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm()
  const [formStatus, setFormStatus] = useState('idle')

  const onSubmit = async (data) => {
    setFormStatus('loading')
    await new Promise((r) => setTimeout(r, 1200)) // Simulate — connect to Supabase
    setFormStatus('success')
    reset()
  }

  return (
    <div className="bg-cream-100">
      {/* Hero */}
      <section className="pt-28 pb-20 bg-dark-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <img src="/products/zenith.jpg"
               alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-brown-200/70 to-brown-200/95" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 md:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="section-label text-champagne-400">Our Story</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream-100 leading-tight mb-6">
              We Believe Everyone Deserves<br />a Signature Scent.
            </h1>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-16 bg-champagne-400/40" />
              <div className="w-1 h-1 bg-champagne-400 rounded-full" />
              <div className="h-px w-16 bg-champagne-400/40" />
            </div>
            <p className="font-body text-base text-cream-200/70 leading-relaxed max-w-xl mx-auto">
              Zaram Luxury Fragrance was built on a simple belief — that finding a beautiful, authentic perfume
              in Nigeria should be easy, personal and completely trustworthy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 bg-cream-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label">Who We Are</p>
              <h2 className="section-title mb-6">Fragrance, Confidence<br />and Personal Expression</h2>
              <div className="divider-gold" />
              <div className="mt-6 space-y-4 font-body text-base text-brown-50 leading-relaxed">
                <p>
                  We know how it feels to want a fragrance that truly represents you — and how difficult it can be to
                  find one you can trust online. Zaram was created to change that.
                </p>
                <p>
                  Every fragrance in our collection is chosen with intention. We focus on quality,
                  longevity and authenticity — so when you order, what arrives is exactly what you expected.
                </p>
                <p>
                  We are here to help you find your signature scent, send a gift that will be remembered and
                  experience the pleasure of premium fragrance delivered straight to your door across Nigeria.
                </p>
                <p className="italic text-brown-100 border-l-2 border-champagne-400 pl-4">
                  [Founder's personal story and background will be added here — placeholder]
                </p>
              </div>
            </div>
            <div className="aspect-[4/5] overflow-hidden">
              <img src="/products/lamsat-harir-lifestyle.jpg"
                   alt="Zaram Luxury Fragrance story"
                   className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 pt-16 border-t border-[rgba(180,132,61,0.1)]">
            {[
              { title: 'Fragrance With Feeling', desc: 'Every scent we carry is selected because it creates an emotion — not just because it\'s popular.' },
              { title: 'Quality With Integrity', desc: 'We do not sell imitations. We do not make promises we cannot keep. Authenticity is non-negotiable.' },
              { title: 'Service With Intention', desc: 'We are available on WhatsApp, by phone and by email to guide you personally through every purchase.' },
            ].map(({ title, desc }) => (
              <div key={title} className="text-center">
                <div className="w-1 h-8 bg-champagne-400 mx-auto mb-5" />
                <h3 className="font-display text-xl text-brown-100 mb-3">{title}</h3>
                <p className="font-body text-sm text-brown-50 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-luxury-gradient">
        <div className="max-w-4xl mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <p className="section-label">Simple Process</p>
            <h2 className="section-title">How Ordering Works</h2>
            <p className="font-body text-sm text-brown-50 mt-3 max-w-lg mx-auto">
              Online payment is not currently active. Here's exactly how your order is processed.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { step: '01', title: 'Discover Your Fragrance', desc: 'Browse by mood, scent family or use the Scent Finder to get personalised recommendations.' },
              { step: '02', title: 'Select Size & Preferences', desc: 'Choose your bottle size, add gift wrapping and enter your delivery details.' },
              { step: '03', title: 'Submit Your Order Request', desc: 'Click "Submit Order Request". No card details required at this stage.' },
              { step: '04', title: 'Receive Confirmation', desc: 'Our team confirms availability, delivery fee and payment instructions — usually within 2 hours.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="font-display text-5xl text-champagne-200 mb-3">{step}</div>
                <h3 className="font-display text-lg text-brown-100 mb-2">{title}</h3>
                <p className="font-body text-sm text-brown-50 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-20 bg-cream-100">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <p className="section-label">Need to Know</p>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <div>
            {FAQS.map((item) => <FAQ key={item.q} {...item} />)}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-cream-200/50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <p className="section-label">Get in Touch</p>
            <h2 className="section-title">We're Here to Help</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact info */}
            <div className="space-y-8">
              <div>
                <p className="font-body text-xs tracking-widest uppercase text-champagne-500 mb-4">Contact Details</p>
                <div className="space-y-4">
                  {[
                    { icon: MessageCircle, label: 'WhatsApp', value: siteConfig.phone, href: buildWhatsAppUrl(siteConfig.whatsapp, buildScentConsultWhatsAppMessage()) },
                    { icon: Phone, label: 'Phone', value: siteConfig.phone, href: `tel:${siteConfig.phone}` },
                    { icon: Mail, label: 'Email', value: siteConfig.email, href: `mailto:${siteConfig.email}` },
                    { icon: Share2, label: 'Instagram', value: '@zaramluxury', href: siteConfig.instagram },
                  ].map(({ icon: Icon, label, value, href }) => (
                    <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                       className="flex items-center gap-4 group">
                      <div className="w-10 h-10 border border-[rgba(180,132,61,0.2)] flex items-center justify-center group-hover:border-champagne-400 transition-colors shrink-0">
                        <Icon size={16} className="text-champagne-500" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="font-body text-xs text-brown-50 uppercase tracking-wider">{label}</p>
                        <p className="font-body text-sm text-brown-100 group-hover:text-champagne-500 transition-colors">{value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-body text-xs tracking-widest uppercase text-champagne-500 mb-2">Business Hours</p>
                <p className="font-body text-sm text-brown-100">{siteConfig.businessHours}</p>
              </div>
              <div>
                <p className="font-body text-xs tracking-widest uppercase text-champagne-500 mb-2">Address</p>
                <p className="font-body text-sm text-brown-100">{siteConfig.address}</p>
              </div>
              <a href={buildWhatsAppUrl(siteConfig.whatsapp, buildScentConsultWhatsAppMessage())}
                 target="_blank" rel="noopener noreferrer"
                 className="btn-whatsapp inline-flex gap-2">
                <MessageCircle size={16} />
                Chat on WhatsApp Now
              </a>
            </div>

            {/* Contact form */}
            <div>
              <p className="font-body text-xs tracking-widest uppercase text-champagne-500 mb-6">Send a Message</p>
              {formStatus === 'success' ? (
                <div className="p-8 border border-champagne-400/30 bg-champagne-100/30 text-center">
                  <p className="font-display text-2xl text-brown-100 mb-2">Message Received</p>
                  <p className="font-body text-sm text-brown-50">We'll get back to you within 24 hours. For faster responses, reach us on WhatsApp.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <input {...register('name', { required: 'Name required' })} placeholder="Full Name *"
                             className="input-luxury" />
                      {errors.name && <p className="font-body text-xs text-blush-300 mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <input {...register('email', { required: 'Email required', pattern: { value: /^\S+@\S+\.\S+$/, message: 'Invalid email' } })}
                             placeholder="Email Address *" className="input-luxury" />
                      {errors.email && <p className="font-body text-xs text-blush-300 mt-1">{errors.email.message}</p>}
                    </div>
                  </div>
                  <input {...register('phone')} placeholder="Phone Number" className="input-luxury" />
                  <input {...register('subject', { required: 'Subject required' })} placeholder="Subject *" className="input-luxury" />
                  <input {...register('orderRef')} placeholder="Order Reference (if applicable)" className="input-luxury" />
                  <textarea {...register('message', { required: 'Message required' })} rows={5}
                            placeholder="Your message *" className="input-luxury resize-none" />
                  {errors.message && <p className="font-body text-xs text-blush-300">{errors.message.message}</p>}
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input type="checkbox" {...register('consent', { required: true })} className="mt-0.5 accent-champagne-400" />
                    <span className="font-body text-xs text-brown-50">
                      I consent to Zaram storing this message to respond to my enquiry.
                    </span>
                  </label>
                  <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
                    {isSubmitting ? 'Sending…' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Policies summary */}
      <section id="delivery-policy" className="py-16 bg-cream-100 border-t border-[rgba(180,132,61,0.1)]">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <div className="text-center mb-10">
            <p className="section-label">Policies</p>
            <h2 className="font-display text-3xl text-brown-100">What You Should Know</h2>
          </div>
          <div className="space-y-6">
            {[
              { id: 'delivery', title: 'Delivery Policy', body: 'We deliver to all Nigerian states. Delivery fees are calculated based on your location and confirmed after your order request. Lagos orders are typically fulfilled within 1–3 business days; nationwide delivery takes 3–7 business days.' },
              { id: 'returns', title: 'Returns & Exchange Policy', body: 'Sealed, unopened products may be returned within 7 days of delivery if you receive the wrong item. Opened fragrances cannot be returned for hygiene reasons. Damaged items must be reported within 24 hours of receipt with photographic evidence.' },
              { id: 'authenticity', title: 'Authenticity Policy', body: 'Every product sold by Zaram Luxury Fragrance is genuine. We do not sell imitations, refills or copies. Products arrive in original manufacturer packaging.' },
              { id: 'privacy', title: 'Privacy Policy', body: 'We collect your name, email, phone number and address to process your orders and communicate with you. We do not sell your data to third parties. Your information is stored securely and used only to provide our service.' },
              { id: 'terms', title: 'Terms & Conditions', body: 'By placing an order with Zaram Luxury Fragrance, you agree to our order-confirmation process. Orders are not confirmed until you receive written confirmation from our team. Prices are subject to change without notice on new orders.' },
            ].map(({ id, title, body }) => (
              <div key={id} id={id} className="border border-[rgba(180,132,61,0.1)] p-6">
                <h3 className="font-display text-lg text-brown-100 mb-3">{title}</h3>
                <p className="font-body text-sm text-brown-50 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

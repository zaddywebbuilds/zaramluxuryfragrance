import { Link } from 'react-router-dom'
import { Share2, MessageCircle } from 'lucide-react'
import { siteConfig } from '../../config/site'
import { buildWhatsAppUrl, buildScentConsultWhatsAppMessage } from '../../lib/utils'
import { PhotoMedallion } from '../decor/PhotoDecor'

const footerLinks = {
  Shop: [
    { label: 'All Fragrances', to: '/shop' },
    { label: 'Bestsellers', to: '/shop?sort=bestsellers' },
    { label: 'New Arrivals', to: '/shop?filter=new' },
    { label: 'Gift Sets', to: '/shop?filter=gifts' },
    { label: 'Find My Scent', to: '/#scent-finder' },
  ],
  Support: [
    { label: 'Our Story', to: '/our-story' },
    { label: 'How to Order', to: '/our-story#how-it-works' },
    { label: 'Delivery Info', to: '/our-story#delivery' },
    { label: 'FAQs', to: '/our-story#faq' },
    { label: 'Contact Us', to: '/our-story#contact' },
  ],
  Policies: [
    { label: 'Delivery Policy', to: '/our-story#delivery-policy' },
    { label: 'Returns & Exchange', to: '/our-story#returns' },
    { label: 'Authenticity Policy', to: '/our-story#authenticity' },
    { label: 'Privacy Policy', to: '/our-story#privacy' },
    { label: 'Terms & Conditions', to: '/our-story#terms' },
  ],
}

export default function Footer() {
  return (
    <footer className="relative bg-brown-200 text-cream-200 overflow-hidden">
      <PhotoMedallion src="/products/midnight-edition-set.jpg" size={72} className="decor--float-slow hidden xl:block" style={{ right: '3%', top: 60, boxShadow: '0 0 0 4px rgba(212,172,112,0.15), 0 8px 22px rgba(0,0,0,0.45)', opacity: 0.85 }} />

      <div className="relative max-w-7xl mx-auto px-4 md:px-8">
        {/* Top */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="font-display text-3xl font-light text-cream-100 mb-1">ZARAM</div>
            <div className="font-body text-[9px] tracking-[0.3em] uppercase text-champagne-400 mb-5">
              Luxury Fragrance
            </div>
            <p className="font-body text-sm text-cream-300/70 leading-relaxed mb-6 max-w-xs">
              Premium authentic fragrances selected for every mood, moment and version of you.
              Nationwide delivery across Nigeria.
            </p>
            <div className="flex items-center gap-3 mb-6">
              <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer"
                 aria-label="Instagram"
                 className="w-9 h-9 border border-cream-100/20 flex items-center justify-center hover:border-champagne-400 hover:text-champagne-400 transition-colors">
                <Share2 size={15} />
              </a>
              <a href={buildWhatsAppUrl(siteConfig.whatsapp, buildScentConsultWhatsAppMessage())}
                 target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"
                 className="w-9 h-9 border border-cream-100/20 flex items-center justify-center hover:border-[#25D366] hover:text-[#25D366] transition-colors">
                <MessageCircle size={15} />
              </a>
            </div>
            <p className="font-body text-xs text-cream-300/50">
              {siteConfig.businessHours}
            </p>
          </div>

          {/* Link groups */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="font-body text-xs tracking-[0.25em] uppercase text-champagne-400 mb-5">
                {group}
              </h4>
              <ul className="space-y-3">
                {links.map((l) => (
                  <li key={l.label}>
                    <Link
                      to={l.to}
                      className="font-body text-sm text-cream-300/60 hover:text-cream-100 transition-colors duration-200"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-cream-100/10 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-cream-300/40">
            © {new Date().getFullYear()} Zaram Luxury Fragrance. All rights reserved.
          </p>
          <p className="font-body text-xs text-cream-300/40 italic font-display">
            "Some scents are worn. Others are remembered."
          </p>
        </div>
      </div>
    </footer>
  )
}

import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { siteConfig } from '../../config/site'
import { buildWhatsAppUrl, buildScentConsultWhatsAppMessage } from '../../lib/utils'

export default function WhatsAppFloat() {
  return (
    <motion.a
      href={buildWhatsAppUrl(siteConfig.whatsapp, buildScentConsultWhatsAppMessage())}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2, type: 'spring', stiffness: 200 }}
      whileHover={{ scale: 1.08 }}
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] flex items-center justify-center shadow-gold hover:shadow-luxury-hover transition-shadow"
    >
      <MessageCircle size={24} color="white" fill="white" />
    </motion.a>
  )
}

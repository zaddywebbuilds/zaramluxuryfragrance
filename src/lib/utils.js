import { siteConfig } from '../config/site'

export const formatPrice = (amount) => {
  if (!amount && amount !== 0) return ''
  return `${siteConfig.currencySymbol}${amount.toLocaleString('en-NG')}`
}

export const generateOrderRef = () => {
  const prefix = 'ZAR'
  const timestamp = Date.now().toString(36).toUpperCase()
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase()
  return `${prefix}-${timestamp}-${rand}`
}

export const buildWhatsAppUrl = (phone, message) => {
  const clean = phone.replace(/\D/g, '')
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${clean}?text=${encoded}`
}

export const buildProductWhatsAppMessage = (product, size) => {
  return `Hello Zaram Luxury Fragrance! 👋\n\nI'm interested in:\n*${product.name}* – ${size}ml\nPrice: ${formatPrice(product.sizes.find((s) => s.ml === size)?.price || product.price)}\n\nCould you help me with availability and ordering?`
}

export const buildOrderWhatsAppMessage = (order) => {
  const lines = [
    `Hello Zaram Luxury Fragrance! 👋`,
    ``,
    `Order Reference: *${order.reference}*`,
    `Customer: ${order.customerName}`,
    ``,
    `Items:`,
    ...order.items.map((i) => `• ${i.name} (${i.size}ml) × ${i.quantity} — ${formatPrice(i.price * i.quantity)}`),
    ``,
    `Delivery: ${order.city}, ${order.state}`,
    `Total: ${formatPrice(order.total)}`,
    ``,
    `Please confirm availability and provide payment instructions. Thank you!`,
  ]
  return lines.join('\n')
}

export const buildScentConsultWhatsAppMessage = () => {
  return `Hello Zaram Luxury Fragrance! 👋\n\nI'd like help choosing a fragrance. Can I speak with your scent concierge?`
}

export const slugify = (text) =>
  text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')

export const clsx = (...classes) => classes.filter(Boolean).join(' ')

export const debounce = (fn, ms = 300) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), ms)
  }
}

export const validateNigerianPhone = (phone) => {
  const clean = phone.replace(/\D/g, '')
  return /^(0[7-9][0-1]\d{8}|234[7-9][0-1]\d{8})$/.test(clean)
}

export const truncate = (str, n) =>
  str.length > n ? str.substring(0, n - 1) + '…' : str

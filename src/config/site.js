// ============================================================
// ZARAM LUXURY FRAGRANCE — CENTRAL SITE CONFIGURATION
// Edit this file to update all brand, contact, and business info
// ============================================================

export const siteConfig = {
  // Brand Identity
  brandName: 'Zaram Luxury Fragrance',
  brandShort: 'ZARAM',
  tagline: 'Leave a Memory Before You Leave the Room.',
  description:
    'Premium authentic fragrances selected for every mood, moment and version of you. Nationwide delivery across Nigeria.',

  // Contact
  phone: '+234 800 000 0000',           // UPDATE
  whatsapp: '+2348000000000',            // UPDATE — digits only, no spaces
  email: 'hello@zaramluxury.com',        // UPDATE
  address: '14 Fragrance Close, Lekki Phase 1, Lagos, Nigeria', // UPDATE

  // Social
  instagram: 'https://instagram.com/zaramluxury',  // UPDATE
  tiktok: 'https://tiktok.com/@zaramluxury',       // UPDATE
  facebook: '',                                     // UPDATE or leave empty

  // Business Hours
  businessHours: 'Monday – Saturday, 9am – 6pm WAT',

  // Hosting & Domain
  githubBasePath: '/zaramluxuryfragrance/',
  customDomain: '',                   // Set to 'https://www.zaramluxury.com' when ready
  siteUrl: 'https://zaramluxury.github.io/zaram-luxury', // UPDATE

  // Currency
  currency: 'NGN',
  currencySymbol: '₦',

  // Payment Configuration
  paymentsEnabled: false,
  paymentProvider: 'disabled', // future values: 'paystack'

  // Order Mode
  orderMode: 'manual_confirmation',

  // Free Delivery Threshold (set to 0 to disable)
  freeDeliveryThreshold: 150000,

  // Announcement Bar Messages
  announcements: [
    'Nationwide Delivery Across Nigeria',
    'Authentic Fragrances, Carefully Selected',
    'Need Help Choosing? Chat With Our Scent Concierge',
    'Gift Packaging Available on All Orders',
    'Submit Your Order and Receive Confirmation Within 2 Hours',
  ],

  // Product Price Ranges (for filters & scent finder)
  priceRanges: [
    { label: 'Under ₦25,000', min: 0, max: 25000 },
    { label: '₦25,000 – ₦50,000', min: 25000, max: 50000 },
    { label: '₦50,000 – ₦100,000', min: 50000, max: 100000 },
    { label: 'Above ₦100,000', min: 100000, max: Infinity },
  ],

  // Delivery Zones (base fees, admin can override in Supabase)
  deliveryZones: [
    { zone: 'Lagos Island & Mainland', fee: 3000, days: '1–2 business days' },
    { zone: 'Lagos Outskirts (Ikorodu, Epe, Badagry)', fee: 5000, days: '2–3 business days' },
    { zone: 'Abuja', fee: 6000, days: '2–3 business days' },
    { zone: 'Port Harcourt', fee: 6500, days: '2–4 business days' },
    { zone: 'Other South West States', fee: 5500, days: '3–5 business days' },
    { zone: 'Other States (Nationwide)', fee: 7500, days: '4–7 business days' },
  ],

  // Pickup
  pickupEnabled: true,
  pickupAddress: '14 Fragrance Close, Lekki Phase 1, Lagos',
  pickupHours: 'Monday – Saturday, 10am – 5pm',

  // Analytics (set IDs to enable — leave empty to disable)
  googleAnalyticsId: '',
  metaPixelId: '',
  tiktokPixelId: '',

  // SEO
  siteName: 'Zaram Luxury Fragrance',
  separator: '–',
}

export default siteConfig

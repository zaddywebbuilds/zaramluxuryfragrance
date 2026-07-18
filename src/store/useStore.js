import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { generateOrderRef } from '../lib/utils'

// ── Cart Store ──────────────────────────────────────────────
export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      addItem: (product, size, quantity = 1) => {
        const key = `${product.id}-${size}`
        const items = get().items
        const existing = items.find((i) => i.key === key)
        const sizeData = product.sizes.find((s) => s.ml === size) || product.sizes[0]
        if (existing) {
          set({
            items: items.map((i) =>
              i.key === key ? { ...i, quantity: i.quantity + quantity } : i
            ),
          })
        } else {
          set({
            items: [
              ...items,
              {
                key,
                productId: product.id,
                slug: product.slug,
                name: product.name,
                brand: product.brand,
                size,
                price: sizeData.price,
                image: product.images[0],
                quantity,
                giftWrap: false,
                giftMessage: '',
              },
            ],
          })
        }
        set({ isOpen: true })
      },

      removeItem: (key) =>
        set((s) => ({ items: s.items.filter((i) => i.key !== key) })),

      updateQuantity: (key, quantity) => {
        if (quantity < 1) return
        set((s) => ({
          items: s.items.map((i) => (i.key === key ? { ...i, quantity } : i)),
        }))
      },

      toggleGiftWrap: (key) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.key === key ? { ...i, giftWrap: !i.giftWrap } : i
          ),
        })),

      setGiftMessage: (key, message) =>
        set((s) => ({
          items: s.items.map((i) =>
            i.key === key ? { ...i, giftMessage: message } : i
          ),
        })),

      clearCart: () => set({ items: [] }),

      get subtotal() {
        return get().items.reduce((sum, i) => sum + i.price * i.quantity, 0)
      },

      get itemCount() {
        return get().items.reduce((sum, i) => sum + i.quantity, 0)
      },
    }),
    { name: 'zaram-cart' }
  )
)

// ── Wishlist Store ──────────────────────────────────────────
export const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      openWishlist: () => set({ isOpen: true }),
      closeWishlist: () => set({ isOpen: false }),

      toggle: (product) => {
        const items = get().items
        const exists = items.find((i) => i.id === product.id)
        if (exists) {
          set({ items: items.filter((i) => i.id !== product.id) })
        } else {
          set({
            items: [
              ...items,
              {
                id: product.id,
                slug: product.slug,
                name: product.name,
                brand: product.brand,
                price: product.price,
                image: product.images[0],
                scentFamily: product.scentFamily,
              },
            ],
          })
        }
      },

      isWishlisted: (productId) => get().items.some((i) => i.id === productId),
      remove: (productId) =>
        set((s) => ({ items: s.items.filter((i) => i.id !== productId) })),
      clear: () => set({ items: [] }),
    }),
    { name: 'zaram-wishlist' }
  )
)

// ── UI Store ────────────────────────────────────────────────
export const useUIStore = create((set) => ({
  searchOpen: false,
  mobileMenuOpen: false,
  scentFinderOpen: false,

  openSearch: () => set({ searchOpen: true }),
  closeSearch: () => set({ searchOpen: false }),
  toggleSearch: () => set((s) => ({ searchOpen: !s.searchOpen })),

  openMobileMenu: () => set({ mobileMenuOpen: true }),
  closeMobileMenu: () => set({ mobileMenuOpen: false }),

  openScentFinder: () => set({ scentFinderOpen: true }),
  closeScentFinder: () => set({ scentFinderOpen: false }),
}))

// ── Recently Viewed Store ────────────────────────────────────
export const useRecentlyViewedStore = create(
  persist(
    (set, get) => ({
      products: [],

      add: (product) => {
        const filtered = get().products.filter((p) => p.id !== product.id)
        set({
          products: [
            { id: product.id, slug: product.slug, name: product.name, image: product.images[0], price: product.price },
            ...filtered,
          ].slice(0, 6),
        })
      },
    }),
    { name: 'zaram-recently-viewed' }
  )
)

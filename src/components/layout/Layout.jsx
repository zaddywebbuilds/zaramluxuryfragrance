import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './Navbar'
import Footer from './Footer'
import AnnouncementBar from './AnnouncementBar'
import CartDrawer from '../cart/CartDrawer'
import WishlistDrawer from '../cart/WishlistDrawer'
import SearchOverlay from '../ui/SearchOverlay'
import WhatsAppFloat from '../ui/WhatsAppFloat'
import ScentFinderModal from '../home/ScentFinderModal'

export default function Layout() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />

      {/* Global overlays */}
      <CartDrawer />
      <WishlistDrawer />
      <SearchOverlay />
      <ScentFinderModal />
      <WhatsAppFloat />
    </div>
  )
}

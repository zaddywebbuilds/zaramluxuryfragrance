import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-luxury-gradient flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <p className="font-display text-8xl text-champagne-200 mb-4">404</p>
        <h1 className="font-display text-3xl md:text-4xl text-brown-100 mb-3">
          This Page Doesn't Exist
        </h1>
        <p className="font-body text-base text-brown-50 mb-8 max-w-md">
          The page you're looking for may have been moved, renamed or removed.
          Let's get you back to the collection.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="btn-primary">Back to Home</Link>
          <Link to="/shop" className="btn-secondary">Browse the Collection</Link>
        </div>
      </motion.div>
    </div>
  )
}

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronRight, ChevronLeft, Sparkles } from 'lucide-react'
import { useUIStore } from '../../store/useStore'
import { PRODUCTS } from '../../data/products'
import ProductCard from '../product/ProductCard'

const STEPS = [
  {
    id: 'who',
    question: 'Who are you shopping for?',
    options: [
      { value: 'feminine', label: 'For Her', emoji: '🌸' },
      { value: 'masculine', label: 'For Him', emoji: '🔥' },
      { value: 'unisex', label: 'For Anyone', emoji: '✨' },
      { value: 'gift', label: 'As a Gift', emoji: '🎁' },
    ],
  },
  {
    id: 'mood',
    question: 'What mood should the fragrance create?',
    options: [
      { value: 'romantic', label: 'Romantic & Intimate', emoji: '💫' },
      { value: 'bold', label: 'Bold & Powerful', emoji: '⚡' },
      { value: 'fresh', label: 'Fresh & Clean', emoji: '🌊' },
      { value: 'warm', label: 'Warm & Sensual', emoji: '🕯️' },
    ],
  },
  {
    id: 'family',
    question: 'Which scent families do you enjoy?',
    options: [
      { value: 'oud', label: 'Oud & Oriental', emoji: '🪵' },
      { value: 'floral', label: 'Floral & Rose', emoji: '🌹' },
      { value: 'fresh', label: 'Fresh & Aquatic', emoji: '💨' },
      { value: 'gourmand', label: 'Vanilla & Sweet', emoji: '🍮' },
    ],
    multi: true,
  },
  {
    id: 'occasion',
    question: 'When will you wear it?',
    options: [
      { value: 'everyday', label: 'Everyday & Office', emoji: '☀️' },
      { value: 'date', label: 'Date Night', emoji: '🌙' },
      { value: 'wedding', label: 'Wedding & Formal', emoji: '👑' },
      { value: 'special', label: 'Special Occasions', emoji: '🥂' },
    ],
  },
  {
    id: 'budget',
    question: 'What is your budget?',
    options: [
      { value: '0-25000', label: 'Under ₦25,000', emoji: '💚' },
      { value: '25000-50000', label: '₦25,000 – ₦50,000', emoji: '💛' },
      { value: '50000-100000', label: '₦50,000 – ₦100,000', emoji: '🧡' },
      { value: '100000+', label: 'Above ₦100,000', emoji: '💎' },
    ],
  },
]

function matchProducts(answers) {
  return PRODUCTS.filter((p) => {
    // Gender
    if (answers.who && answers.who !== 'gift') {
      if (answers.who === 'feminine' && p.gender === 'masculine') return false
      if (answers.who === 'masculine' && p.gender === 'feminine') return false
    }
    // Budget
    if (answers.budget) {
      const [min, max] = answers.budget.split('-').map(Number)
      const price = p.price
      if (max && price > max) return false
      if (price < min) return false
    }
    return true
  }).slice(0, 3)
}

export default function ScentFinderModal() {
  const { scentFinderOpen, closeScentFinder } = useUIStore()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [done, setDone] = useState(false)
  const [results, setResults] = useState([])

  const current = STEPS[step]

  const select = (value) => {
    const newAnswers = { ...answers, [current.id]: value }
    setAnswers(newAnswers)

    if (step < STEPS.length - 1) {
      setStep(step + 1)
    } else {
      setResults(matchProducts(newAnswers))
      setDone(true)
    }
  }

  const reset = () => {
    setStep(0)
    setAnswers({})
    setDone(false)
    setResults([])
  }

  return (
    <AnimatePresence>
      {scentFinderOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={closeScentFinder}
            className="overlay-dark"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }} transition={{ duration: 0.3 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 bg-cream-100 z-50 overflow-y-auto shadow-luxury-hover"
          >
            <div className="relative min-h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between px-6 md:px-10 py-6 border-b border-[rgba(180,132,61,0.12)]">
                <div className="flex items-center gap-2">
                  <Sparkles size={18} className="text-champagne-400" />
                  <span className="font-body text-xs tracking-widest uppercase text-champagne-500">
                    Scent Finder
                  </span>
                </div>
                <button onClick={() => { closeScentFinder(); reset() }} aria-label="Close" className="p-2 text-brown-50 hover:text-brown-100 transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 px-6 md:px-10 py-10">
                {!done ? (
                  <div className="max-w-2xl mx-auto">
                    {/* Progress */}
                    <div className="flex gap-1.5 mb-8">
                      {STEPS.map((_, i) => (
                        <div key={i} className={`h-0.5 flex-1 transition-colors duration-300 ${i <= step ? 'bg-champagne-400' : 'bg-cream-300'}`} />
                      ))}
                    </div>

                    <p className="font-body text-xs tracking-widest uppercase text-champagne-500 mb-3">
                      Question {step + 1} of {STEPS.length}
                    </p>
                    <h2 className="font-display text-3xl md:text-4xl text-brown-100 mb-8">
                      {current.question}
                    </h2>

                    <div className="grid grid-cols-2 gap-3">
                      {current.options.map((opt) => (
                        <motion.button
                          key={opt.value}
                          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                          onClick={() => select(opt.value)}
                          className={`p-5 text-left border transition-all duration-200 ${
                            answers[current.id] === opt.value
                              ? 'border-champagne-400 bg-champagne-100/60'
                              : 'border-[rgba(180,132,61,0.15)] hover:border-champagne-400 bg-cream-50'
                          }`}
                        >
                          <span className="text-2xl block mb-2">{opt.emoji}</span>
                          <span className="font-body font-medium text-sm text-brown-100">{opt.label}</span>
                        </motion.button>
                      ))}
                    </div>

                    {step > 0 && (
                      <button onClick={() => setStep(step - 1)}
                              className="mt-6 inline-flex items-center gap-2 font-body text-xs text-brown-50 hover:text-brown-100 transition-colors">
                        <ChevronLeft size={14} /> Back
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-10">
                      <div className="section-label">Your Matches</div>
                      <h2 className="font-display text-4xl text-brown-100 mb-3">
                        Fragrances Selected For You
                      </h2>
                      <p className="font-body text-sm text-brown-50">
                        Based on your preferences — {Object.values(answers).join(', ')}
                      </p>
                    </div>

                    {results.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {results.map((p) => (
                          <ProductCard key={p.id} product={p} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-10">
                        <p className="font-body text-brown-50 mb-4">
                          No exact matches — but we have beautiful fragrances waiting for you.
                        </p>
                      </div>
                    )}

                    <div className="mt-8 flex justify-center">
                      <button onClick={reset} className="btn-secondary">
                        Try Again
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

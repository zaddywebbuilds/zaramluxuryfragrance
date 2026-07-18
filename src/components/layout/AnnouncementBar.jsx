import { useState, useEffect } from 'react'
import { siteConfig } from '../../config/site'
import { X } from 'lucide-react'

export default function AnnouncementBar() {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)
  const msgs = siteConfig.announcements

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % msgs.length)
    }, 4000)
    return () => clearInterval(id)
  }, [msgs.length])

  if (!visible) return null

  return (
    <div className="relative bg-brown-100 text-cream-100 text-xs font-body tracking-widest uppercase py-2.5 px-10 text-center overflow-hidden">
      <div className="relative h-4 overflow-hidden">
        {msgs.map((msg, i) => (
          <span
            key={i}
            className={`absolute inset-0 flex items-center justify-center transition-all duration-700 ${
              i === current ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            {msg}
          </span>
        ))}
      </div>
      <button
        onClick={() => setVisible(false)}
        aria-label="Close announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-cream-100/60 hover:text-cream-100 transition-colors"
      >
        <X size={13} />
      </button>
    </div>
  )
}

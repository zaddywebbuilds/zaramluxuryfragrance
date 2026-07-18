import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Pinned split scene: the image panel grows from ~45% width while the
 * copy reveals line by line, tone shifts warm, CTA lands last.
 * Fully scrubbed — reverses naturally when scrolling back up.
 */
export default function SplitPanelScene({
  image,
  imageAlt = '',
  label = 'Featured Fragrance',
  title = '',
  lines = [],
  cta = { to: '/shop', text: 'Discover It' },
}) {
  const section = useRef(null)
  const imgPanel = useRef(null)
  const img = useRef(null)
  const titleRef = useRef(null)
  const lineEls = useRef([])
  const ctaRef = useRef(null)
  const dots = useRef(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set([titleRef.current, ctaRef.current], { opacity: 1, y: 0 })
        lineEls.current.forEach((el) => el && gsap.set(el.firstChild, { yPercent: 0, opacity: 1 }))
        return
      }

      const mm = gsap.matchMedia()
      mm.add({ isMobile: '(max-width: 767px)', isDesktop: '(min-width: 768px)' }, (mctx) => {
        const { isMobile } = mctx.conditions

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: section.current,
            start: 'top top',
            end: isMobile ? '+=130%' : '+=170%',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
          },
        })

        /* Image panel expands; the photo breathes from 1 → 1.08 */
        if (!isMobile) {
          tl.fromTo(imgPanel.current, { width: '45%' }, { width: '62%', duration: 0.55, ease: 'power1.inOut' }, 0)
        }
        tl.fromTo(img.current, { scale: 1 }, { scale: 1.08, duration: 1, ease: 'none' }, 0)

        /* Background tone drifts warmer */
          .fromTo(section.current, { backgroundColor: '#FBF7F1' }, { backgroundColor: '#F6EBE0', duration: 1 }, 0)

        /* Title holds briefly, then copy reveals line by line */
          .fromTo(titleRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.12, ease: 'power2.out' }, 0.05)

        lineEls.current.forEach((el, i) => {
          if (!el) return
          tl.fromTo(el.firstChild,
            { yPercent: 110, opacity: 0.3, filter: 'blur(4px)' },
            { yPercent: 0, opacity: 1, filter: 'blur(0px)', duration: 0.1, ease: 'power2.out' },
            0.3 + i * 0.09)
        })

        /* Fragrance-note dust drifting between the panels */
        tl.fromTo(dots.current, { opacity: 0, x: -30 }, { opacity: 1, x: 30, duration: 0.7 }, 0.15)

        /* CTA appears only after the description is readable */
          .fromTo(ctaRef.current, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.1, ease: 'power2.out' }, 0.72)
      })
    }, section)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={section} className="relative min-h-[100svh] overflow-hidden bg-cream-100 flex items-stretch">
      {/* Note-dust between panels */}
      <div ref={dots} className="absolute left-[40%] top-0 bottom-0 w-[20%] pointer-events-none z-10 opacity-0" aria-hidden="true">
        {[18, 34, 52, 68, 82].map((top, i) => (
          <span key={i} className="absolute rounded-full bg-champagne-400"
                style={{ top: `${top}%`, left: `${(i * 37) % 90}%`, width: 4 + (i % 3) * 2, height: 4 + (i % 3) * 2, opacity: 0.35 + (i % 3) * 0.15 }} />
        ))}
      </div>

      <div className="flex flex-col md:flex-row w-full min-h-[100svh]">
        {/* Image panel */}
        <div ref={imgPanel} className="relative overflow-hidden h-[44svh] md:h-auto w-full md:w-[45%] shrink-0">
          <img ref={img} src={image} alt={imageAlt}
               className="absolute inset-0 w-full h-full object-cover will-change-transform" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-cream-100/10" />
        </div>

        {/* Copy panel */}
        <div className="flex-1 flex items-center">
          <div className="px-6 md:px-14 lg:px-20 py-14 max-w-xl">
            <div ref={titleRef} className="opacity-0">
              <p className="section-label">{label}</p>
              <h2 className="section-title mb-6">{title}</h2>
              <div className="divider-gold" />
            </div>

            <div className="mt-6 space-y-3">
              {lines.map((line, i) => (
                <div key={i} ref={(el) => (lineEls.current[i] = el)} className="overflow-hidden">
                  <p className="font-body text-base md:text-lg text-brown-50 leading-relaxed will-change-transform">
                    {line}
                  </p>
                </div>
              ))}
            </div>

            <div ref={ctaRef} className="mt-9 opacity-0">
              <Link to={cta.to} className="btn-primary">{cta.text}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

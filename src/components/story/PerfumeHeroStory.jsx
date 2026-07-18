import { lazy, Suspense, useLayoutEffect, useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getQualityTier } from '../../lib/quality'
import { asset } from '../../lib/assets'
import { STORY } from './storyState'

gsap.registerPlugin(ScrollTrigger)

const BottleScene = lazy(() => import('./BottleScene'))

const NOTES = [
  { tier: 'Top Notes', text: 'Bergamot · Saffron · Pink Pepper' },
  { tier: 'Heart Notes', text: 'Turkish Rose · Oud Wood · Jasmine' },
  { tier: 'Base Notes', text: 'Amber · Vanilla · Deep Musk' },
]

/* Static bottle used as Suspense fallback and for the low tier —
   the hero is never blank while 3D loads. */
function StaticBottle({ innerRef }) {
  return (
    <div ref={innerRef} className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="relative w-[220px] md:w-[280px] aspect-[3/4] overflow-hidden rounded-t-[110px]"
           style={{ boxShadow: '0 0 80px rgba(180,132,61,0.25), 0 30px 60px rgba(0,0,0,0.5)' }}>
        <img src={asset('/products/zenith.jpg')} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 30% 20%, rgba(255,242,220,0.18), transparent 55%)' }} />
      </div>
    </div>
  )
}

/* Reduced-motion version — everything in its final readable position. */
function ReducedStory() {
  return (
    <section className="relative bg-[#08060e] py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <p className="font-body text-[10px] tracking-[0.35em] uppercase text-champagne-400 mb-4">The Signature</p>
          <h2 className="font-display text-4xl md:text-5xl text-cream-100 leading-tight mb-6">
            Oud Al Layl.<br /><em className="not-italic text-gradient-gold">Worn After Dark.</em>
          </h2>
          <ul className="space-y-4 mb-8">
            {NOTES.map((n) => (
              <li key={n.tier}>
                <p className="font-body text-[10px] tracking-[0.3em] uppercase text-champagne-400/80">{n.tier}</p>
                <p className="font-body text-sm text-cream-300/70">{n.text}</p>
              </li>
            ))}
          </ul>
          <Link to="/shop" className="btn-secondary-dark">Explore the Collection</Link>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
          className="aspect-[3/4] max-w-sm mx-auto overflow-hidden">
          <img src={asset('/products/oud-al-layl-set.jpg')} alt="Oud Al Layl" className="w-full h-full object-cover" loading="lazy" />
        </motion.div>
      </div>
    </section>
  )
}

export default function PerfumeHeroStory() {
  const [tier] = useState(getQualityTier)
  const [active, setActive] = useState(false)

  const section = useRef(null)
  const headline = useRef(null)
  const fragName = useRef(null)
  const notesWrap = useRef(null)
  const noteItems = useRef([])
  const bottleWrap = useRef(null)   // canvas OR static image wrapper
  const waves = useRef(null)
  const glow = useRef(null)
  const mistFg = useRef(null)
  const panel = useRef(null)
  const panelInner = useRef(null)

  const is3D = tier === 'high' || tier === 'medium'

  /* Cursor sway — capable desktops only, lerped, returns to rest */
  useEffect(() => {
    if (tier !== 'high') return
    let tx = 0, ty = 0
    const onMove = (e) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1
      ty = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    const onLeave = () => { tx = 0; ty = 0 }
    const tick = () => {
      STORY.mx += (tx - STORY.mx) * 0.06
      STORY.my += (ty - STORY.my) * 0.06
    }
    window.addEventListener('mousemove', onMove)
    document.documentElement.addEventListener('mouseleave', onLeave)
    gsap.ticker.add(tick)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      gsap.ticker.remove(tick)
      STORY.mx = 0; STORY.my = 0
    }
  }, [tier])

  useLayoutEffect(() => {
    if (tier === 'reduced') return
    if (import.meta.env.DEV) { window.__ST = ScrollTrigger; window.__G = gsap }
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add({ isMobile: '(max-width: 767px)', isDesktop: '(min-width: 768px)' }, (mctx) => {
        const { isMobile } = mctx.conditions
        const endDist = isMobile ? '+=200%' : '+=320%'
        const moveScale = isMobile ? 0.6 : 1

        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: section.current,
            start: 'top top',
            end: endDist,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            onUpdate: (self) => { STORY.p = self.progress },
            onToggle: (self) => setActive(self.isActive),
          },
        })

        if (import.meta.env.DEV) window.__TL = tl

        /* Layered depth — each layer drifts at its own rate across the scene */
        tl.to(waves.current, { yPercent: -8 * moveScale }, 0)
          .to(glow.current, { yPercent: -16 * moveScale, duration: 1 }, 0)
          .to(mistFg.current, { yPercent: -34 * moveScale, duration: 1 }, 0)

        /* Beat 2 — headline exits, fragrance name reveals */
          .to(headline.current, { y: -90 * moveScale, opacity: 0, filter: 'blur(6px)', duration: 0.16, ease: 'power1.in' }, 0.2)
          .fromTo(fragName.current,
            { y: 60, opacity: 0 },
            { y: 0, opacity: 0.9, duration: 0.16, ease: 'power2.out' }, 0.23)

        /* Beat 3 — name dims aside, notes reveal line by line */
          .to(fragName.current, { opacity: 0.15, x: -40 * moveScale, duration: 0.16 }, 0.44)
          .fromTo(notesWrap.current, { opacity: 0 }, { opacity: 1, duration: 0.06 }, 0.42)

        noteItems.current.forEach((el, i) => {
          if (!el) return
          tl.fromTo(el.querySelector('[data-note-inner]'),
            { yPercent: 110, opacity: 0, filter: 'blur(4px)' },
            { yPercent: 0, opacity: 1, filter: 'blur(0px)', duration: 0.07, ease: 'power2.out' },
            0.45 + i * 0.06)
        })

        /* Beat 4 — pass through the mist; bottle media fades as panel rises */
        tl.to(bottleWrap.current, { scale: 1.1, opacity: 0, duration: 0.16, ease: 'power1.in' }, 0.66)
          .to(notesWrap.current, { opacity: 0, y: -30, duration: 0.08 }, 0.66)

        /* Low tier: the static bottle moves via CSS transforms instead of 3D */
        if (!is3D) {
          tl.to(bottleWrap.current, { scale: 1.08, duration: 0.2, ease: 'power1.inOut' }, 0.2)
            .to(bottleWrap.current, { xPercent: -26 * moveScale, duration: 0.2, ease: 'power1.inOut' }, 0.4)
        }

        /* Cream panel rises over the scene — rounded, flattening as it lands */
        tl.fromTo(panel.current,
          { yPercent: 104, y: 0, borderTopLeftRadius: 64, borderTopRightRadius: 64 },
          { yPercent: 0, y: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0, duration: 0.24, ease: 'power2.inOut' }, 0.62)

        /* Beat 5 — settle: panel content staggers in */
          .fromTo(panelInner.current.children,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.1, stagger: 0.035, ease: 'power2.out' }, 0.86)

        return () => { STORY.p = 0 }
      })
    }, section)

    /* Refresh once assets have finished loading so pin distances are exact */
    const refresh = () => ScrollTrigger.refresh()
    if (document.readyState === 'complete') refresh()
    else window.addEventListener('load', refresh)

    return () => {
      window.removeEventListener('load', refresh)
      ctx.revert()
    }
  }, [tier, is3D])

  if (tier === 'reduced') return <ReducedStory />

  return (
    <section ref={section} className="relative h-[100svh] overflow-hidden bg-[#08060e]">
      {/* 1 — distant gradient */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(165deg, #08060e 0%, #140d1a 55%, #0d0812 100%)' }} />

      {/* 2 — silk waves */}
      <div ref={waves} className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -left-1/4 top-[18%] w-[80%] h-[42%] rounded-[100%] opacity-40"
             style={{ background: 'radial-gradient(ellipse, rgba(212,172,112,0.12), transparent 65%)', filter: 'blur(30px)', transform: 'rotate(-14deg)' }} />
        <div className="absolute -right-1/4 bottom-[16%] w-[75%] h-[40%] rounded-[100%] opacity-35"
             style={{ background: 'radial-gradient(ellipse, rgba(232,180,184,0.10), transparent 65%)', filter: 'blur(34px)', transform: 'rotate(10deg)' }} />
      </div>

      {/* 3 — decorative glow */}
      <div ref={glow} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] h-[640px] rounded-full pointer-events-none"
           style={{ background: 'radial-gradient(circle, rgba(180,132,61,0.14) 0%, transparent 62%)' }} aria-hidden="true" />

      {/* Fragrance name — revealed behind the bottle at beat 2 */}
      <div ref={fragName} className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0" aria-hidden="true">
        <p className="font-display text-[16vw] md:text-[11vw] leading-none text-transparent whitespace-nowrap select-none"
           style={{ WebkitTextStroke: '1px rgba(212,172,112,0.35)' }}>
          OUD AL LAYL
        </p>
      </div>

      {/* 5 — bottle: lazy 3D on capable devices, real photo otherwise */}
      <div ref={bottleWrap} className="absolute inset-0">
        {is3D ? (
          <Suspense fallback={<StaticBottle />}>
            <BottleScene tier={tier} active={active} />
          </Suspense>
        ) : (
          <StaticBottle />
        )}
      </div>

      {/* 6 — foreground mist */}
      <div ref={mistFg} className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute left-[8%] bottom-[6%] w-[45%] h-[30%]"
             style={{ background: 'radial-gradient(ellipse, rgba(251,247,241,0.05), transparent 70%)', filter: 'blur(22px)' }} />
        <div className="absolute right-[6%] top-[12%] w-[38%] h-[26%]"
             style={{ background: 'radial-gradient(ellipse, rgba(233,201,143,0.06), transparent 70%)', filter: 'blur(26px)' }} />
      </div>

      {/* 7 — headline (beat 1) */}
      <div ref={headline} className="absolute inset-x-0 top-[14%] md:top-[16%] text-center px-4 z-10">
        <p className="font-body text-[10px] tracking-[0.35em] uppercase text-champagne-400 mb-4">A Story in Scent</p>
        <h2 className="font-display text-4xl md:text-6xl text-cream-100 leading-[1.08]">
          One Bottle.<br /><em className="not-italic text-gradient-gold">A Thousand Memories.</em>
        </h2>
      </div>

      {/* Notes — beat 3, right side */}
      <div ref={notesWrap} className="absolute right-[6%] top-1/2 -translate-y-1/2 z-10 opacity-0 max-w-[46%] md:max-w-xs">
        {NOTES.map((n, i) => (
          <div key={n.tier} ref={(el) => (noteItems.current[i] = el)} className="overflow-hidden mb-6">
            <div data-note-inner>
              <div className="flex items-center gap-3 mb-1.5">
                <span className="w-6 h-px bg-champagne-400/70" />
                <p className="font-body text-[10px] tracking-[0.3em] uppercase text-champagne-400">{n.tier}</p>
              </div>
              <p className="font-display text-lg md:text-xl text-cream-100/90">{n.text}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none">
        <span className="font-body text-[9px] tracking-[0.3em] uppercase text-champagne-400/50">Scroll</span>
        <span className="w-px h-10 bg-gradient-to-b from-champagne-400/60 to-transparent" />
      </div>

      {/* Cream panel — beats 4–5, rises over the scene */}
      {/* Initial offset is applied by GSAP (yPercent) in useLayoutEffect —
          an inline translateY(104%) would flatten to px and fight the tween */}
      <div ref={panel} className="absolute inset-0 z-20 bg-cream-100 flex items-center justify-center translate-y-full">
        <div ref={panelInner} className="max-w-2xl mx-auto px-6 text-center">
          <p className="section-label">The House of Zaram</p>
          <h2 className="section-title mb-5">Scent Is the<br />Strongest Memory.</h2>
          <p className="font-body text-base text-brown-50 leading-relaxed mb-8 max-w-lg mx-auto">
            Long after the evening ends, fragrance is what stays. Every bottle we select is
            chosen for how it lingers — on skin, in rooms, in minds.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/shop" className="btn-primary">Shop the Collection</Link>
            <Link to="/our-story" className="btn-secondary">Our Story</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

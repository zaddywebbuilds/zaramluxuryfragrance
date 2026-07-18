import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Fade up on scroll into view
export function useFadeUp(options = {}) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const targets = options.stagger ? el.querySelectorAll(options.selector || '[data-fade]') : [el]
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, y: options.y ?? 50 },
        {
          opacity: 1,
          y: 0,
          duration: options.duration ?? 0.9,
          ease: 'power3.out',
          stagger: options.stagger ?? 0,
          scrollTrigger: {
            trigger: el,
            start: options.start ?? 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, el)
    return () => ctx.revert()
  }, [])
  return ref
}

// Fade in (opacity only)
export function useFadeIn(options = {}) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0 },
        {
          opacity: 1,
          duration: options.duration ?? 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: options.start ?? 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, el)
    return () => ctx.revert()
  }, [])
  return ref
}

// Slide in from left
export function useSlideInLeft(options = {}) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, x: options.x ?? -80 },
        {
          opacity: 1,
          x: 0,
          duration: options.duration ?? 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: options.start ?? 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, el)
    return () => ctx.revert()
  }, [])
  return ref
}

// Slide in from right
export function useSlideInRight(options = {}) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, x: options.x ?? 80 },
        {
          opacity: 1,
          x: 0,
          duration: options.duration ?? 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: options.start ?? 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, el)
    return () => ctx.revert()
  }, [])
  return ref
}

// Staggered children reveal
export function useStaggerReveal(selector = '[data-item]', options = {}) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const items = el.querySelectorAll(selector)
    if (!items.length) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { opacity: 0, y: options.y ?? 40, scale: options.scale ?? 1 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: options.duration ?? 0.7,
          ease: 'power3.out',
          stagger: options.stagger ?? 0.12,
          scrollTrigger: {
            trigger: el,
            start: options.start ?? 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, el)
    return () => ctx.revert()
  }, [])
  return ref
}

// Parallax on scroll
export function useParallax(speed = 0.3) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: -100 * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, el)
    return () => ctx.revert()
  }, [])
  return ref
}

// Scale up on scroll (zoom in reveal)
export function useScaleReveal(options = {}) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, scale: options.from ?? 0.88 },
        {
          opacity: 1,
          scale: 1,
          duration: options.duration ?? 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: options.start ?? 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      )
    }, el)
    return () => ctx.revert()
  }, [])
  return ref
}

import { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Masked line reveal — each line sits in an overflow-hidden wrapper and
 * slides up from 110% with a light blur fade, staggered. Reverses when
 * the trigger scrolls back out. Pass `lines` as an array of strings or
 * JSX fragments.
 */
export default function MaskedTextReveal({
  lines = [],
  as: Tag = 'h2',
  className = '',
  lineClassName = '',
  stagger = 0.12,
  start = 'top 80%',
}) {
  const root = useRef(null)

  useLayoutEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx = gsap.context(() => {
      const targets = root.current.querySelectorAll('[data-line-inner]')
      if (reduced) {
        gsap.set(targets, { yPercent: 0, opacity: 1, filter: 'none' })
        return
      }
      gsap.fromTo(targets,
        { yPercent: 110, opacity: 0.4, filter: 'blur(6px)' },
        {
          yPercent: 0, opacity: 1, filter: 'blur(0px)',
          duration: 0.9, ease: 'power3.out', stagger,
          scrollTrigger: {
            trigger: root.current,
            start,
            toggleActions: 'play none none reverse',
          },
        })
    }, root)
    return () => ctx.revert()
  }, [stagger, start])

  return (
    <Tag ref={root} className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden">
          <span data-line-inner className={`block will-change-transform ${lineClassName}`}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  )
}

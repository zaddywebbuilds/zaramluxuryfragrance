/**
 * Device-quality tiers for the cinematic scroll scenes.
 *
 *  reduced — visitor asked for reduced motion: no pinning, no parallax,
 *            content rendered in its final readable position.
 *  low     — no WebGL / weak device: static bottle image + CSS transforms.
 *  medium  — mobile or mid device: simplified 3D, fewer particles.
 *  high    — capable desktop: full 3D, mist, reflections, cursor parallax.
 */
export function getQualityTier() {
  if (typeof window === 'undefined') return 'low'

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return 'reduced'

  let gl = null
  try {
    const c = document.createElement('canvas')
    gl = c.getContext('webgl2') || c.getContext('webgl')
  } catch { /* no WebGL */ }
  if (!gl) return 'low'

  const mem = navigator.deviceMemory || 4
  const cores = navigator.hardwareConcurrency || 4
  if (mem <= 2 || cores <= 2) return 'low'

  const coarse = window.matchMedia('(pointer: coarse)').matches
  if (coarse || mem <= 4) return 'medium'

  return 'high'
}

export const isTouchDevice = () =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

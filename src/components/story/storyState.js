/**
 * Mutable singleton bridging GSAP ScrollTrigger (writes) and the R3F
 * render loop (reads) without triggering React re-renders.
 *  p        — pinned-scene scroll progress 0..1
 *  mx, my   — smoothed cursor position -1..1 (desktop only)
 */
export const STORY = { p: 0, mx: 0, my: 0 }

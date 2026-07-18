/**
 * Real-photo decorative accents — actual Zaram product photography
 * presented as floating medallions and polaroid-style cards that fill
 * empty space in each section. All are aria-hidden decorations.
 */

/* Circular gold-rimmed medallion with a real product photo */
export function PhotoMedallion({ src, size = 110, className = '', style }) {
  return (
    <div
      aria-hidden="true"
      className={`decor ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        border: '2px solid rgba(180,132,61,0.45)',
        boxShadow: '0 0 0 5px rgba(251,247,241,0.65), 0 10px 28px rgba(62,44,28,0.18)',
        ...style,
      }}
    >
      <img src={src} alt="" loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </div>
  )
}

/* Tilted polaroid-style photo card */
export function PhotoCard({ src, width = 130, tilt = -6, className = '', style }) {
  return (
    <div
      aria-hidden="true"
      className={`decor ${className}`}
      style={{
        width,
        padding: '8px 8px 22px',
        background: '#FFFDF9',
        border: '1px solid rgba(180,132,61,0.25)',
        boxShadow: '0 12px 30px rgba(62,44,28,0.22)',
        transform: `rotate(${tilt}deg)`,
        ...style,
      }}
    >
      <img src={src} alt="" loading="lazy"
        style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block' }} />
    </div>
  )
}

/* Soft-fade cameo — photo dissolving into the section background */
export function PhotoCameo({ src, size = 220, fade = '#FBF7F1', className = '', style }) {
  return (
    <div
      aria-hidden="true"
      className={`decor ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        WebkitMaskImage: 'radial-gradient(circle, black 55%, transparent 72%)',
        maskImage: 'radial-gradient(circle, black 55%, transparent 72%)',
        ...style,
      }}
    >
      <img src={src} alt="" loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle, transparent 45%, ${fade} 75%)` }} />
    </div>
  )
}

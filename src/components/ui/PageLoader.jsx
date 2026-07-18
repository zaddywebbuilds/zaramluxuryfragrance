export default function PageLoader() {
  return (
    <div className="fixed inset-0 bg-luxury-gradient flex flex-col items-center justify-center z-[100]">
      <div className="font-display text-4xl text-brown-100 tracking-widest mb-2">ZARAM</div>
      <div className="font-body text-[9px] tracking-[0.4em] uppercase text-champagne-500 mb-10">
        Luxury Fragrance
      </div>
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 bg-champagne-400 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  )
}

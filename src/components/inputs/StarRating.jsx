import { useState } from 'react'

export default function StarRating({ value, onChange, labels }) {
  const [hover, setHover] = useState(null)
  const active = hover ?? value ?? 0

  return (
    <div className="py-4">
      {/* Stars — kept LTR so 1 is always on the left (universal convention) */}
      <div className="flex gap-3 justify-center" dir="ltr">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            onMouseEnter={() => setHover(n)}
            onMouseLeave={() => setHover(null)}
            className={`text-5xl transition-all duration-100 cursor-pointer select-none leading-none ${
              active >= n
                ? 'text-[#19ffff] drop-shadow-[0_0_12px_rgba(25,255,255,0.6)] scale-110'
                : 'text-white/15 hover:text-white/40'
            }`}
            aria-label={`דירוג ${n}`}
          >
            ★
          </button>
        ))}
      </div>

      {/* Labels */}
      <div className="flex justify-between text-xs text-white/40 mt-5 px-1" dir="ltr">
        <span className="text-right max-w-[100px]">{labels[1]}</span>
        <span className="text-center max-w-[120px]">{labels[3]}</span>
        <span className="text-left max-w-[100px]">{labels[5]}</span>
      </div>

      {/* Selected value indicator */}
      {value && (
        <p className="text-center text-sm text-[#19ffff]/70 mt-4 font-medium">
          {labels[value] || `${value} / 5`}
        </p>
      )}
    </div>
  )
}

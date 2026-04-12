export default function ProgressBar({ current, total }) {
  const pct = (current / total) * 100

  return (
    <div className="w-full px-6 pt-5 pb-3 bg-[#11061d]">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-white/40 font-medium">
            שאלה {current} מתוך {total}
          </span>
          <span className="text-xs text-white/30">{Math.round(pct)}%</span>
        </div>
        <div className="h-1 bg-white/8 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500 ease-out"
            style={{
              width: `${pct}%`,
              background: 'linear-gradient(90deg, #9747ff, #19ffff)',
            }}
          />
        </div>
      </div>
    </div>
  )
}

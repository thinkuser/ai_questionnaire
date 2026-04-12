// In RTL with dir="rtl" + justify-between:
// first child → right side (primary CTA: הבא)
// second child → left side (secondary: חזרה)

export default function Navigation({
  onBack,
  onNext,
  canNext = true,
  isLast = false,
  showBack = true,
}) {
  return (
    <div className="flex items-center justify-between mt-8 gap-4">
      {/* Primary action — appears on RIGHT in RTL */}
      <button
        onClick={onNext}
        disabled={!canNext}
        className={`px-8 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
          canNext
            ? 'bg-white text-black hover:bg-[#19ffff] hover:scale-105 active:scale-95 cursor-pointer'
            : 'bg-white/15 text-white/30 cursor-not-allowed'
        }`}
      >
        {isLast ? 'שלח סקר ✓' : 'הבא'}
      </button>

      {/* Secondary action — appears on LEFT in RTL */}
      {showBack ? (
        <button
          onClick={onBack}
          className="px-5 py-3 rounded-xl border border-white/15 text-white/50 hover:border-white/35 hover:text-white/80 transition-all duration-200 text-sm cursor-pointer"
        >
          חזרה
        </button>
      ) : (
        <div />
      )}
    </div>
  )
}

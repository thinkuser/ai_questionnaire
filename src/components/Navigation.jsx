// In RTL with dir="rtl" + justify-between:
// first child → RIGHT side → חזרה (Back)
// second child → LEFT side → הבא (Next)

export default function Navigation({
  onBack,
  onNext,
  onSkip,
  canNext = true,
  isLast = false,
  showBack = true,
}) {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between gap-4">
        {/* חזרה — RIGHT in RTL */}
        {showBack ? (
          <button
            onClick={onBack}
            className="px-5 py-3 rounded-xl border border-white/20 text-white/60 hover:border-white/40 hover:text-white/90 transition-all duration-200 text-sm cursor-pointer"
          >
            חזרה
          </button>
        ) : (
          <div />
        )}

        {/* הבא — LEFT in RTL */}
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
      </div>

      {/* Skip link */}
      {onSkip && (
        <div className="text-center mt-4">
          <button
            onClick={onSkip}
            className="text-xs text-white/30 hover:text-white/60 transition-colors duration-200 cursor-pointer underline underline-offset-2"
          >
            דלג על שאלה זו
          </button>
        </div>
      )}
    </div>
  )
}

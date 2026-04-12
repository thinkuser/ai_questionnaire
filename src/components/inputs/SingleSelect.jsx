export default function SingleSelect({ options, value, onChange }) {
  return (
    <div className="space-y-2">
      {options.map((opt) => {
        const selected = value === opt
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`w-full text-right px-4 py-3.5 rounded-xl border transition-all duration-150 cursor-pointer ${
              selected
                ? 'bg-[#19ffff]/10 border-[#19ffff]/60 text-white'
                : 'bg-[#0e0420] border-white/10 text-white/75 hover:border-white/30 hover:bg-white/4 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-3">
              {/* Radio indicator */}
              <span
                className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-150 ${
                  selected ? 'border-[#19ffff]' : 'border-white/25'
                }`}
              >
                {selected && (
                  <span className="w-2 h-2 rounded-full bg-[#19ffff] block" />
                )}
              </span>
              <span className="text-sm leading-relaxed">{opt}</span>
            </div>
          </button>
        )
      })}
    </div>
  )
}

import { useState } from 'react'

export default function MultiSelect({ options, value = [], onChange, maxSelect, otherEnabled }) {
  // otherText stored locally; encoded into value as 'אחר: [text]' when changed
  const currentOtherEncoded = value?.find((v) => v.startsWith('אחר: '))
  const [otherText, setOtherText] = useState(currentOtherEncoded?.replace('אחר: ', '') || '')

  const isOtherSelected = value?.some((v) => v === 'אחר' || v.startsWith('אחר: '))
  const reachedMax = maxSelect && value?.length >= maxSelect

  const toggle = (option) => {
    const current = value || []
    if (current.includes(option)) {
      onChange(current.filter((o) => o !== option))
    } else {
      if (reachedMax) return
      onChange([...current, option])
    }
  }

  const toggleOther = () => {
    const current = value || []
    if (isOtherSelected) {
      // deselect — remove any אחר variant
      onChange(current.filter((v) => v !== 'אחר' && !v.startsWith('אחר: ')))
      setOtherText('')
    } else {
      if (reachedMax) return
      onChange([...current, 'אחר'])
    }
  }

  const handleOtherTextChange = (text) => {
    setOtherText(text)
    const withoutOther = (value || []).filter((v) => v !== 'אחר' && !v.startsWith('אחר: '))
    if (text.trim()) {
      onChange([...withoutOther, `אחר: ${text}`])
    } else {
      onChange([...withoutOther, 'אחר'])
    }
  }

  const isDisabled = (option) => {
    if (!maxSelect) return false
    return !value?.includes(option) && reachedMax
  }

  const optionClass = (selected, disabled) =>
    `w-full text-right px-4 py-3 rounded-xl border transition-all duration-150 cursor-pointer ${
      selected
        ? 'bg-[#9747ff]/18 border-[#9747ff]/70 text-white'
        : disabled
        ? 'border-white/8 text-white/25 cursor-not-allowed'
        : 'bg-[#150828] border-white/18 text-white/85 hover:border-white/35 hover:bg-white/4 hover:text-white'
    }`

  const checkBox = (selected) => (
    <span
      className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 text-xs font-bold transition-all duration-150 ${
        selected ? 'bg-[#9747ff] border-[#9747ff] text-white' : 'border-white/25 text-transparent'
      }`}
    >
      ✓
    </span>
  )

  return (
    <div className="space-y-2">
      {maxSelect && (
        <p className="text-xs text-white/35 mb-3">
          {value?.length || 0} / {maxSelect} נבחרו
        </p>
      )}

      {options.map((opt) => {
        const selected = value?.includes(opt)
        const disabled = isDisabled(opt)
        return (
          <button
            key={opt}
            type="button"
            onClick={() => !disabled && toggle(opt)}
            disabled={disabled}
            className={optionClass(selected, disabled)}
          >
            <div className="flex items-center gap-3">
              {checkBox(selected)}
              <span className="text-sm">{opt}</span>
            </div>
          </button>
        )
      })}

      {/* Other option */}
      {otherEnabled && (
        <div>
          <button
            type="button"
            onClick={toggleOther}
            disabled={!isOtherSelected && !!reachedMax}
            className={optionClass(isOtherSelected, !isOtherSelected && !!reachedMax)}
          >
            <div className="flex items-center gap-3">
              {checkBox(isOtherSelected)}
              <span className="text-sm">אחר</span>
            </div>
          </button>

          {isOtherSelected && (
            <input
              type="text"
              value={otherText}
              onChange={(e) => handleOtherTextChange(e.target.value)}
              placeholder="ציינו..."
              autoFocus
              className="mt-2 w-full bg-[#150828] border border-white/20 rounded-xl px-4 py-3 text-white text-sm placeholder-white/45 outline-none focus:border-[#9747ff] transition-colors duration-200"
            />
          )}
        </div>
      )}
    </div>
  )
}

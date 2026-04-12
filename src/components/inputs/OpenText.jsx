export default function OpenText({ value, onChange, placeholder }) {
  return (
    <textarea
      value={value || ''}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={5}
      className="w-full bg-[#150828] border border-white/20 rounded-2xl px-4 py-4 text-white text-sm placeholder-white/65 outline-none focus:border-[#9747ff] resize-none transition-colors duration-200 leading-relaxed"
    />
  )
}

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navigation from './Navigation'
import { IDENTITY_FIELDS } from '../data/questions'

const variants = {
  enter: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } }),
}

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export default function IdentityScreen({ direction, onNext, onBack, initialData }) {
  const [form, setForm] = useState(initialData || {})

  const set = (id, value) => setForm((prev) => ({ ...prev, [id]: value }))

  const isValid =
    form.fullName?.trim() &&
    form.company?.trim() &&
    form.role &&
    isValidEmail(form.email || '') &&
    form.orgSize

  const handleNext = () => {
    if (isValid) onNext(form)
  }

  const inputBase =
    'w-full bg-[#150828] border border-white/20 rounded-xl px-4 py-3 text-white text-sm placeholder-white/45 outline-none focus:border-[#9747ff] transition-colors duration-200'

  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      className="w-full max-w-xl mx-auto"
    >
      {/* Header */}
      <div className="mb-8">
        <div className="text-xs font-semibold tracking-widest text-[#9747ff] uppercase mb-3">
          ThinkUser
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">כמעט סיימנו!</h1>
        <p className="text-white/65 text-sm leading-relaxed">
          רגע לפני הסוף — ספרו לנו קצת על עצמכם כדי שנוכל לחזור אליכם עם רעיונות מותאמים.
        </p>
      </div>

      {/* Fields */}
      <div className="space-y-4">
        {IDENTITY_FIELDS.map((field) => (
          <div key={field.id}>
            <label className="block text-xs font-medium text-white/70 mb-1.5">
              {field.label}
              {field.required && <span className="text-[#ff47e2] mr-1">*</span>}
            </label>

            {field.type === 'text' && (
              <input
                type="text"
                value={form[field.id] || ''}
                onChange={(e) => set(field.id, e.target.value)}
                placeholder={field.placeholder}
                className={inputBase}
              />
            )}

            {field.type === 'email' && (
              <input
                type="email"
                dir="ltr"
                value={form[field.id] || ''}
                onChange={(e) => set(field.id, e.target.value)}
                placeholder={field.placeholder}
                className={inputBase + ' text-left'}
              />
            )}

            {field.type === 'select' && (
              <select
                value={form[field.id] || ''}
                onChange={(e) => set(field.id, e.target.value)}
                className={
                  inputBase +
                  ' appearance-none cursor-pointer ' +
                  (form[field.id] ? 'text-white' : 'text-white/45')
                }
                style={{ background: '#150828' }}
              >
                <option value="" disabled>
                  בחרו תפקיד...
                </option>
                {field.options.map((opt) => (
                  <option key={opt} value={opt} className="text-white bg-[#1a0d2e]">
                    {opt}
                  </option>
                ))}
              </select>
            )}

            {field.type === 'radio' && (
              <div className="flex flex-wrap gap-2 mt-1">
                {field.options.map((opt) => {
                  const selected = form[field.id] === opt
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => set(field.id, opt)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 cursor-pointer ${
                        selected
                          ? 'bg-[#9747ff]/25 border border-[#9747ff] text-white'
                          : 'bg-[#150828] border border-white/20 text-white/65 hover:border-white/40 hover:text-white/90'
                      }`}
                    >
                      {opt}
                    </button>
                  )
                })}
              </div>
            )}
          </div>
        ))}
      </div>

      <Navigation onNext={handleNext} onBack={onBack} canNext={!!isValid} showBack={true} />
    </motion.div>
  )
}

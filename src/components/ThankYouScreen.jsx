import { motion } from 'framer-motion'
import { QUESTIONS } from '../data/questions'

const KEY_Q_IDS = [8, 14, 16]

export default function ThankYouScreen({ identity, answers, onRestart }) {
  const keyQuestions = QUESTIONS.filter((q) => KEY_Q_IDS.includes(q.id))

  const formatAnswer = (val) => {
    if (!val && val !== 0) return '—'
    if (Array.isArray(val)) return val.join(' · ')
    return String(val)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }}
      className="w-full max-w-xl mx-auto text-center"
    >
      {/* Emoji */}
      <div className="text-6xl mb-5 select-none">🙏</div>

      {/* Heading */}
      <h1 className="text-2xl font-bold text-white mb-2">
        תודה! מבטיחים לדבר בקרוב
      </h1>
      <p className="text-white/50 text-sm mb-10 leading-relaxed">
        נחזור אליך בקרוב עם רעיונות מותאמים לארגון שלך
      </p>

      {/* Summary card */}
      <div className="bg-[#1a0d2e] border border-white/8 rounded-2xl p-6 text-right">
        <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-5">
          סיכום
        </p>

        {/* Identity summary */}
        <div className="space-y-2 mb-5 pb-5 border-b border-white/6">
          {identity.fullName && (
            <div className="flex gap-2">
              <span className="text-white/40 text-sm min-w-fit">שם:</span>
              <span className="text-white text-sm font-medium">{identity.fullName}</span>
            </div>
          )}
          {identity.company && (
            <div className="flex gap-2">
              <span className="text-white/40 text-sm min-w-fit">חברה:</span>
              <span className="text-white text-sm font-medium">{identity.company}</span>
            </div>
          )}
          {identity.role && (
            <div className="flex gap-2">
              <span className="text-white/40 text-sm min-w-fit">תפקיד:</span>
              <span className="text-white text-sm">{identity.role}</span>
            </div>
          )}
          {identity.orgSize && (
            <div className="flex gap-2">
              <span className="text-white/40 text-sm min-w-fit">גודל ארגון:</span>
              <span className="text-white text-sm">{identity.orgSize} עובדים</span>
            </div>
          )}
        </div>

        {/* Key answers */}
        <div className="space-y-4">
          {keyQuestions.map((q) => {
            const ans = answers[q.id]
            if (!ans && ans !== 0) return null
            return (
              <div key={q.id}>
                <p className="text-white/35 text-xs mb-1 leading-relaxed">{q.text}</p>
                <p className="text-white/90 text-sm leading-relaxed">{formatAnswer(ans)}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Restart button */}
      <button
        onClick={onRestart}
        className="mt-8 px-6 py-2.5 rounded-xl border border-white/15 text-white/50 hover:border-white/35 hover:text-white/80 transition-all duration-200 text-sm cursor-pointer"
      >
        התחל מחדש
      </button>
    </motion.div>
  )
}

import { motion } from 'framer-motion'
import Navigation from './Navigation'
import StarRating from './inputs/StarRating'
import MultiSelect from './inputs/MultiSelect'
import SingleSelect from './inputs/SingleSelect'
import OpenText from './inputs/OpenText'

const variants = {
  enter: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0, transition: { duration: 0.2, ease: 'easeIn' } }),
}

function canProceed(question, value) {
  if (question.type === 'open') return true // optional
  if (value === undefined || value === null || value === '') return false
  if (Array.isArray(value)) return value.length > 0
  return true
}

export default function QuestionScreen({
  direction,
  question,
  questionNumber,
  value,
  onChange,
  onNext,
  onBack,
  onSkip,
  isLast,
  isFirst,
}) {
  const canNext = canProceed(question, value)

  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      className="w-full max-w-xl mx-auto"
    >
      {/* Question label */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-semibold text-[#9747ff] tracking-wider">
            שאלה {questionNumber}
          </span>
          {question.hint && (
            <span className="text-xs text-[#19ffff]/70 bg-[#19ffff]/8 border border-[#19ffff]/20 rounded-full px-2.5 py-0.5">
              {question.hint}
            </span>
          )}
        </div>

        <h2 className="text-xl font-bold text-white leading-relaxed mb-1">
          {question.text}
        </h2>

        {question.subtext && (
          <p className="text-sm text-white/40 mt-1">{question.subtext}</p>
        )}
      </div>

      {/* Input */}
      <div>
        {question.type === 'star' && (
          <StarRating value={value} onChange={onChange} labels={question.labels} />
        )}
        {question.type === 'multi' && (
          <MultiSelect
            options={question.options}
            value={value}
            onChange={onChange}
            maxSelect={question.maxSelect}
            otherEnabled={question.otherEnabled}
          />
        )}
        {question.type === 'single' && (
          <SingleSelect options={question.options} value={value} onChange={onChange} />
        )}
        {question.type === 'open' && (
          <OpenText value={value} onChange={onChange} placeholder={question.placeholder} />
        )}
      </div>

      <Navigation
        onBack={onBack}
        onNext={onNext}
        onSkip={onSkip}
        canNext={canNext}
        isLast={isLast}
        showBack={!isFirst}
      />
    </motion.div>
  )
}

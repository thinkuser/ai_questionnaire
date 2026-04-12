import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import IdentityScreen from './components/IdentityScreen'
import QuestionScreen from './components/QuestionScreen'
import ThankYouScreen from './components/ThankYouScreen'
import ProgressBar from './components/ProgressBar'
import { QUESTIONS } from './data/questions'

export default function App() {
  const [screen, setScreen] = useState('identity') // 'identity' | 'question' | 'thankyou'
  const [currentQ, setCurrentQ] = useState(0)
  const [identity, setIdentity] = useState({})
  const [answers, setAnswers] = useState({})
  const [direction, setDirection] = useState(1) // 1 = forward, -1 = backward

  const handleIdentityNext = (identityData) => {
    setIdentity(identityData)
    setDirection(1)
    setScreen('question')
  }

  const handleAnswer = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const handleNext = () => {
    setDirection(1)
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ((prev) => prev + 1)
    } else {
      const responses = { identity, answers }
      console.log('AI Readiness Survey — Responses:', JSON.stringify(responses, null, 2))
      setScreen('thankyou')
    }
  }

  const handleBack = () => {
    setDirection(-1)
    if (currentQ === 0) {
      setScreen('identity')
    } else {
      setCurrentQ((prev) => prev - 1)
    }
  }

  return (
    <div className="min-h-screen bg-[#11061d] flex flex-col">
      {screen === 'question' && (
        <ProgressBar current={currentQ + 1} total={QUESTIONS.length} />
      )}

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <AnimatePresence mode="wait" custom={direction}>
          {screen === 'identity' && (
            <IdentityScreen
              key="identity"
              direction={direction}
              onNext={handleIdentityNext}
              initialData={identity}
            />
          )}
          {screen === 'question' && (
            <QuestionScreen
              key={`q-${currentQ}`}
              direction={direction}
              question={QUESTIONS[currentQ]}
              value={answers[QUESTIONS[currentQ].id]}
              onChange={(val) => handleAnswer(QUESTIONS[currentQ].id, val)}
              onNext={handleNext}
              onBack={handleBack}
              isLast={currentQ === QUESTIONS.length - 1}
            />
          )}
          {screen === 'thankyou' && (
            <ThankYouScreen
              key="thankyou"
              direction={direction}
              identity={identity}
              answers={answers}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

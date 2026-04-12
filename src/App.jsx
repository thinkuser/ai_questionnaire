import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import IdentityScreen from './components/IdentityScreen'
import QuestionScreen from './components/QuestionScreen'
import ThankYouScreen from './components/ThankYouScreen'
import ProgressBar from './components/ProgressBar'
import { QUESTIONS } from './data/questions'

export default function App() {
  const [screen, setScreen] = useState('question') // 'question' | 'identity' | 'thankyou'
  const [currentQ, setCurrentQ] = useState(0)
  const [identity, setIdentity] = useState({})
  const [answers, setAnswers] = useState({})
  const [direction, setDirection] = useState(1) // 1 = forward, -1 = backward

  // Called when user submits the identity form (now at the end)
  const handleIdentityNext = (identityData) => {
    setIdentity(identityData)
    setDirection(1)
    const responses = { identity: identityData, answers }
    console.log('AI Readiness Survey — Responses:', JSON.stringify(responses, null, 2))
    setScreen('thankyou')
  }

  // Back from identity → return to last question
  const handleIdentityBack = () => {
    setDirection(-1)
    setCurrentQ(QUESTIONS.length - 1)
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
      // After last question → go to identity collection
      setScreen('identity')
    }
  }

  const handleSkip = () => {
    setDirection(1)
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ((prev) => prev + 1)
    } else {
      setScreen('identity')
    }
  }

  const handleBack = () => {
    setDirection(-1)
    if (currentQ > 0) {
      setCurrentQ((prev) => prev - 1)
    }
    // On Q0, back button is hidden — nothing to do
  }

  const handleRestart = () => {
    setScreen('question')
    setCurrentQ(0)
    setIdentity({})
    setAnswers({})
    setDirection(1)
  }

  return (
    <div className="min-h-screen bg-[#11061d] flex flex-col">
      {screen === 'question' && (
        <ProgressBar current={currentQ + 1} total={QUESTIONS.length} />
      )}

      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <AnimatePresence mode="wait" custom={direction}>
          {screen === 'question' && (
            <QuestionScreen
              key={`q-${currentQ}`}
              direction={direction}
              question={QUESTIONS[currentQ]}
              value={answers[QUESTIONS[currentQ].id]}
              onChange={(val) => handleAnswer(QUESTIONS[currentQ].id, val)}
              onNext={handleNext}
              onBack={handleBack}
              onSkip={handleSkip}
              isLast={currentQ === QUESTIONS.length - 1}
              isFirst={currentQ === 0}
            />
          )}
          {screen === 'identity' && (
            <IdentityScreen
              key="identity"
              direction={direction}
              onNext={handleIdentityNext}
              onBack={handleIdentityBack}
              initialData={identity}
            />
          )}
          {screen === 'thankyou' && (
            <ThankYouScreen
              key="thankyou"
              direction={direction}
              identity={identity}
              answers={answers}
              onRestart={handleRestart}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { ProgressBar } from "./progress-bar"
import { QuestionCard } from "./question-card"
import { Timer } from "./timer"

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "Which country is famous for the Taj Mahal?",
    options: ["Italy", "India", "Turkey", "Egypt"],
    correct: 1,
  },
  {
    id: 2,
    question: "What is the capital of Japan?",
    options: ["Seoul", "Bangkok", "Tokyo", "Beijing"],
    correct: 2,
  },
  {
    id: 3,
    question: "Which festival is celebrated in Rio de Janeiro?",
    options: ["Diwali", "Carnival", "Oktoberfest", "La Tomatina"],
    correct: 1,
  },
  {
    id: 4,
    question: "What is the traditional dance of Spain?",
    options: ["Tango", "Salsa", "Flamenco", "Waltz"],
    correct: 2,
  },
  {
    id: 5,
    question: "Which country gifted the Statue of Liberty to the USA?",
    options: ["Britain", "France", "Germany", "Italy"],
    correct: 1,
  },
  {
    id: 6,
    question: "What is the oldest civilization in the world?",
    options: ["Egyptian", "Mesopotamian", "Indus Valley", "Chinese"],
    correct: 1,
  },
  {
    id: 7,
    question: "Which musical instrument is from Ireland?",
    options: ["Oud", "Bodhrán", "Sitar", "Didgeridoo"],
    correct: 1,
  },
  {
    id: 8,
    question: "What is the traditional greeting in Japan?",
    options: ["Namaste", "Bow", "Handshake", "Kiss"],
    correct: 1,
  },
  {
    id: 9,
    question: "Which country is the origin of tea culture?",
    options: ["India", "China", "Japan", "Sri Lanka"],
    correct: 1,
  },
  {
    id: 10,
    question: "What is the Great Wall of China primarily made of?",
    options: ["Wood", "Brick and Stone", "Metal", "Clay"],
    correct: 1,
  },
]

interface QuizInterfaceProps {
  onComplete: (score: number, total: number) => void
}

export function QuizInterface({ onComplete }: QuizInterfaceProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)

  const currentQuestion = QUIZ_QUESTIONS[currentIndex]
  const progress = ((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100

  const handleAnswer = (optionIndex: number) => {
    if (answered) return

    setSelectedAnswer(optionIndex)
    setAnswered(true)

    if (optionIndex === currentQuestion.correct) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer(null)
      setAnswered(false)
    } else {
      onComplete(score + (selectedAnswer === currentQuestion.correct ? 1 : 0), QUIZ_QUESTIONS.length)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header with Timer */}
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Culture Quiz Challenge
          </h1>
          <div className="flex-shrink-0">
            <Timer />
          </div>
        </div>

        {/* Progress Bar */}
        <ProgressBar current={currentIndex + 1} total={QUIZ_QUESTIONS.length} />

        {/* Question Card */}
        <div className="mt-8">
          <QuestionCard
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            answered={answered}
            onAnswer={handleAnswer}
          />
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between items-center">
          <div className="text-gray-600 font-semibold">
            Question {currentIndex + 1} of {QUIZ_QUESTIONS.length}
          </div>
          <button
            onClick={handleNext}
            disabled={!answered}
            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105"
          >
            {currentIndex === QUIZ_QUESTIONS.length - 1 ? "Finish" : "Next"}
          </button>
        </div>
      </div>
    </div>
  )
}

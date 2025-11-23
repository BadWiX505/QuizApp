"use client"

import { useState } from "react"
import { QuizInterface } from "@/components/quiz-interface"
import { QuizResults } from "@/components/quiz-results"
import { WaitingPage } from "@/components/waiting-page"

export default function Home() {
  const [quizStarted, setQuizStarted] = useState(false)
  const [onWaitingPage, setOnWaitingPage] = useState(false)
  const [results, setResults] = useState<any>(null)

  const handleQuizComplete = (finalScore: number, totalQuestions: number) => {
    setResults({ score: finalScore, total: totalQuestions })
  }

  const handleRestart = () => {
    setQuizStarted(false)
    setOnWaitingPage(false)
    setResults(null)
  }

  const handleStartQuiz = () => {
    setOnWaitingPage(false)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {!quizStarted ? (
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="w-full max-w-2xl">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Header with gradient */}
              <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-green-500 p-8 text-center">
                {/* Logo Section */}
                <div className="mb-6 flex justify-center">
                  <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <img src="/generic-club-logo.png" alt="Club Logo" className="w-20 h-20 object-contain" />
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Culture Quiz</h1>
                <p className="text-blue-100 text-lg">Test Your Knowledge and Learn Something New!</p>
              </div>

              {/* Content Section */}
              <div className="p-8 md:p-12">
                <div className="space-y-6">
                  <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold text-gray-800">Welcome to the Challenge</h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Challenge yourself with our exciting culture quiz! Explore diverse topics, expand your knowledge,
                      and discover fascinating facts about world cultures.
                    </p>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-3 gap-4 py-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">50</div>
                      <p className="text-sm text-gray-600">Questions</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">4</div>
                      <p className="text-sm text-gray-600">Options</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">∞</div>
                      <p className="text-sm text-gray-600">Learning</p>
                    </div>
                  </div>

                  {/* Start Button */}
                  <button
                    onClick={() => {
                      setQuizStarted(true)
                      setOnWaitingPage(true)
                    }}
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg"
                  >
                    Start Quiz
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : onWaitingPage ? (
        <WaitingPage onReady={handleStartQuiz} />
      ) : results ? (
        <QuizResults score={results.score} total={results.total} onRestart={handleRestart} />
      ) : (
        <QuizInterface onComplete={handleQuizComplete} />
      )}
    </main>
  )
}

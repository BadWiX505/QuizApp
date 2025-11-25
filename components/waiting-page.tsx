"use client"

import { useState, useEffect } from "react"

interface confDataType {
  name: string
  duration: number
  maxParticipants: string
  totalQuestions: string
  start: boolean
}
export function WaitingPage({ onReady, configData }: { onReady: () => void, configData: confDataType }) {
  const [loadingDots, setLoadingDots] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingDots((prev) => (prev + 1) % 4)
    }, 500)
    return () => clearInterval(interval)
  }, [])

  const funMessages = [
    "Sharpening your brain cells...",
    "Loading brain power...",
    "Preparing the culture questions...",
    "Warming up the knowledge vault...",
    "Brewing some brain juice...",
    "Charging up your quiz energy...",
    "Organizing the culture facts...",
    "Summoning the quiz spirits...",
  ]

  const randomMessage = funMessages[Math.floor(Math.random() * funMessages.length)]

  const dots = ".".repeat(loadingDots)

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-green-500 p-8 text-center">
            {/* Animated Logo */}
            <div className="mb-6 flex justify-center">
              <div className="w-32 h-32 bg-white rounded-full shadow-lg flex items-center justify-center animate-bounce">
                <img src="/generic-club-logo.png" alt="Club Logo" className="w-28 h-28 object-contain" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Get Ready!</h1>
            <p className="text-blue-100 text-lg">The adventure is about to begin</p>
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-12">
            <div className="space-y-8">
              {/* Animated Loading Bar */}
              <div className="space-y-4">
                <p className="text-center text-gray-600 font-semibold">
                  {randomMessage}
                  <span className="inline-block w-6">{dots}</span>
                </p>
              </div>

              {/* Fun Facts Section */}
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl p-6 border-2 border-blue-200">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Did You Know?</h3>
                <div className="space-y-3">
                  <FunFact text="The Great Wall of China is over 13,000 miles long!" delay={0} />
                  <FunFact text="There are more than 7,000 languages spoken worldwide." delay={200} />
                  <FunFact text="Japan has more than 100,000 restaurants." delay={400} />
                  <FunFact text="The Eiffel Tower grows taller in summer due to heat expansion!" delay={600} />
                  <FunFact text="Antarctica is the only continent with no native plants or animals." delay={800} />
                </div>
              </div>

              {/* Fun Stats */}
              <div className="grid grid-cols-3 gap-4">
                <StatCard number="great" label="Culture Facts" icon="🌍" color="from-blue-400 to-blue-600" delay={0} />
                <StatCard
                  number={configData?.totalQuestions}
                  label="Quiz Questions"
                  icon="❓"
                  color="from-green-400 to-green-600"
                  delay={100}
                />
                <StatCard number="100%" label="Challenge" icon="🏆" color="from-purple-400 to-purple-600" delay={200} />
              </div>

              {/* Start Button */}
              {
                configData?.start &&
                <button
                  onClick={onReady}
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg active:scale-95"
                >
                  Let's Go!
                </button>
              }
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

function FunFact({ text, delay }: { text: string; delay: number }) {
  return (
    <div
      className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow animate-fade-in"
      style={{
        animationDelay: `${delay}ms`,
        opacity: 0,
        animation: `fadeIn 0.6s ease-in forwards`,
      }}
    >
      <span className="text-2xl flex-shrink-0">💡</span>
      <p className="text-gray-700 text-sm leading-relaxed">{text}</p>
    </div>
  )
}

function StatCard({
  number,
  label,
  icon,
  color,
  delay,
}: {
  number: string
  label: string
  icon: string
  color: string
  delay: number
}) {
  return (
    <div
      className={`bg-gradient-to-br ${color} rounded-2xl p-4 text-white text-center shadow-lg transform hover:scale-110 transition-transform`}
      style={{
        animationDelay: `${delay}ms`,
        opacity: 0,
        animation: `slideUp 0.6s ease-out forwards`,
      }}
    >
      <div className="text-3xl mb-2">{icon}</div>
      <div className="text-2xl font-bold">{number}</div>
      <p className="text-xs uppercase tracking-wider opacity-90">{label}</p>
    </div>
  )
}

"use client"

interface QuizResultsProps {
  score: number
  total: number
  onRestart: () => void
}

export function QuizResults({ score, total, onRestart }: QuizResultsProps) {
  const percentage = Math.round((score / total) * 100)
  const message =
    percentage === 100
      ? "Perfect Score! You're a Culture Master! 🌟"
      : percentage >= 80
        ? "Excellent Performance! 🎉"
        : percentage >= 60
          ? "Great Job! Keep Learning! 📚"
          : percentage >= 40
            ? "Good Effort! Practice More! 💪"
            : "Keep Trying! You'll Improve! 🚀"

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">
          {/* Celebration circle */}
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 via-blue-400 to-green-500 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
              <div className="text-6xl font-bold text-white">{percentage}%</div>
            </div>
          </div>

          {/* Score */}
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h1>
          <p className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            {message}
          </p>

          {/* Score Details */}
          <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 mb-8">
            <p className="text-gray-600 mb-2">Your Score</p>
            <p className="text-4xl font-bold text-gray-800">
              {score} <span className="text-xl text-gray-500">/ {total}</span>
            </p>
          </div>

          {/* Restart Button */}
          <button
            onClick={onRestart}
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            Take Quiz Again
          </button>
        </div>
      </div>
    </div>
  )
}

"use client"

interface QuestionCardProps {
  question: {
    id: number
    question: string
    options: string[]
    correct: number
  }
  selectedAnswer: number | null
  answered: boolean
  onAnswer: (optionIndex: number) => void
}

export function QuestionCard({ question, selectedAnswer, answered, onAnswer }: QuestionCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      {/* Question */}
      <div className="mb-8">
        <p className="text-gray-500 text-sm font-semibold mb-2">QUESTION</p>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">{question.question}</h2>
      </div>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index
          const isCorrect = index === question.correct
          const showCorrect = answered && isCorrect
          const showWrong = answered && isSelected && !isCorrect

          return (
            <button
              key={index}
              onClick={() => onAnswer(index)}
              disabled={answered}
              className={`w-full p-4 rounded-xl text-left font-semibold text-lg transition-all transform ${
                showCorrect
                  ? "bg-green-100 border-2 border-green-500 text-green-800"
                  : showWrong
                    ? "bg-red-100 border-2 border-red-500 text-red-800"
                    : isSelected
                      ? "bg-blue-100 border-2 border-blue-500 text-blue-800"
                      : "bg-gray-100 border-2 border-gray-200 text-gray-800 hover:border-blue-400 hover:bg-blue-50"
              } ${!answered && "cursor-pointer hover:scale-102"} ${answered && "cursor-not-allowed"}`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center font-bold ${
                    showCorrect
                      ? "bg-green-500 border-green-500 text-white"
                      : showWrong
                        ? "bg-red-500 border-red-500 text-white"
                        : isSelected
                          ? "bg-blue-500 border-blue-500 text-white"
                          : "border-gray-400 text-gray-600"
                  }`}
                >
                  {String.fromCharCode(65 + index)}
                </div>
                <span>{option}</span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Feedback */}
      {answered && (
        <div
          className={`mt-6 p-4 rounded-lg ${
            selectedAnswer === question.correct
              ? "bg-green-50 border border-green-200 text-green-800"
              : "bg-red-50 border border-red-200 text-red-800"
          }`}
        >
          {selectedAnswer === question.correct ? (
            <p className="font-semibold">✓ Correct! Well done!</p>
          ) : (
            <p className="font-semibold">
              ✗ Incorrect. The correct answer is:{" "}
              <span className="text-white bg-red-600 px-2 py-1 rounded">{question.options[question.correct]}</span>
            </p>
          )}
        </div>
      )}
    </div>
  )
}

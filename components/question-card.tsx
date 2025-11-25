"use client"

interface QuestionCardProps {
  question: {
   id : string
   question: string,
   options : string[]
   correctAnswer: number,
   category: string ,
  }
  selectedAnswer: number | null
  onAnswer: (optionIndex: number) => void
}

export function QuestionCard({ question, selectedAnswer, onAnswer }: QuestionCardProps) {
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

          return (
            <button
              key={index}
              onClick={() => onAnswer(index)}
              className={`w-full p-4 rounded-xl text-left font-semibold text-lg transition-all transform ${
                isSelected
                  ? "bg-blue-100 border-2 border-blue-500 text-blue-800"
                  : "bg-gray-100 border-2 border-gray-200 text-gray-800 hover:border-blue-400 hover:bg-blue-50"
              } cursor-pointer hover:scale-102`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center font-bold ${
                    isSelected ? "bg-blue-500 border-blue-500 text-white" : "border-gray-400 text-gray-600"
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
    </div>
  )
}

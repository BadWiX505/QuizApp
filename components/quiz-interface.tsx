"use client"

import { useEffect, useRef, useState } from "react"
import { ProgressBar } from "./progress-bar"
import { QuestionCard } from "./question-card"
import { Timer } from "./timer"

interface UserAnswer {
  questionId: string
  selectedAnswer: number | null
}

interface confDataType {
  name: string
  duration: number
  maxParticipants: string
  totalQuestions: string
  start: boolean
}

interface questionType {
  id: string
  question: string,
  options: string[]
  correctAnswer: number,
  category: string,
}

interface QuizInterfaceProps {
  onComplete: (score: number, total: number , time : number) => void
  questions: questionType[]
  confData: confDataType
}

export function QuizInterface({ onComplete, questions, confData }: QuizInterfaceProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([])
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [time, setTime] = useState<number>(confData.duration * 60)
  const TIMER_ID = useRef<any>(null)
  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100
  const userAnswersRef = useRef<UserAnswer[]>([])

  useEffect(() => {
    userAnswersRef.current = userAnswers;
  }, [userAnswers])


  useEffect(()=>{
     if(time<1){
       const score = questions.reduce((acc, question, index) => {
              return acc + (
                userAnswersRef.current[index]?.selectedAnswer === question.correctAnswer ? 1 : 0
              );
            }, 0);
            onComplete(score, questions.length , time);
     }
  },[time])

  useEffect(() => {
    const timeTrack = () => {
      TIMER_ID.current = setInterval(() => {
        setTime(prevTime => {
          if (prevTime > 1) {
            return prevTime - 1;
          } else {
            clearInterval(TIMER_ID.current);
            return 0; 
          }
        });
      }, 1000);

    }
    timeTrack()
    return () => clearInterval(TIMER_ID.current);
  }, [])

  const handleAnswer = (optionIndex: number) => {
    setSelectedAnswer(optionIndex)
  }

  const handleSkip = () => {
    saveAnswerAndMove(null)
  }

  const handleNext = () => {
    saveAnswerAndMove(selectedAnswer)
  }

  const saveAnswerAndMove = (answer: number | null) => {
    const newAnswers = [...userAnswers]
    newAnswers[currentIndex] = {
      questionId: currentQuestion.id,
      selectedAnswer: answer,
    }
    setUserAnswers(newAnswers)

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer(null)
    } else {
      const score = questions.reduce((acc, question, index) => {
        return acc + (newAnswers[index]?.selectedAnswer === question.correctAnswer ? 1 : 0)
      }, 0)
      onComplete(score, questions.length , time)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 py-8 px-2 sm:px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header with Timer */}
        <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Défi Quiz Culture
          </h1>
          <div className="flex-shrink-0">
            <Timer time={time} />
          </div>
        </div>

        {/* Progress Bar */}
        <ProgressBar current={currentIndex + 1} total={questions.length} />

        {/* Question Card */}
        <div className="mt-8">
          <QuestionCard question={currentQuestion} selectedAnswer={selectedAnswer} onAnswer={handleAnswer} />
        </div>

        {/* Navigation */}
        <div className="mt-8 flex justify-between items-center gap-4">
          <div className="text-gray-600 font-semibold">
            Question {currentIndex + 1} sur {questions.length}
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleSkip}
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
            >
              Passer
            </button>
            <button
              onClick={handleNext}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105"
            >
              {currentIndex === questions.length - 1 ? "Terminer" : "Suivant"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

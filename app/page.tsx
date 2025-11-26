"use client"

import { useState } from "react"
import { QuizInterface } from "@/components/quiz-interface"
import { QuizResults } from "@/components/quiz-results"
import { WaitingPage } from "@/components/waiting-page"
import { useEffect } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"

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

export default function Home() {
  const [quizStarted, setQuizStarted] = useState(false)
  const [onWaitingPage, setOnWaitingPage] = useState(false)
  const [questions, setQuestions] = useState<questionType[] | any[]>([])
  const [configData, setConfigData] = useState<confDataType>({
    name: "",
    duration: 0,
    maxParticipants: "",
    totalQuestions: "",
    start: false
  })
  const [results, setResults] = useState<any>(null)


  const router = useRouter();
  useEffect(() => {
    const check_connection = async () => {
      try {
        const res = await axios.get('/api/user/connect', {
          withCredentials: true
        });
        const connected = res.data?.connected;
        if (!connected)
          router.replace('/identify');
      } catch (err: any) {

      }
    }
    const config = async () => {
      const res = await axios.get('/api/config');
      const data = res.data?.configData;
      setConfigData(data);
    }

    const questions = async () => {
      try {
        const res = await axios.get('/api/questions');
        setQuestions(res.data?.questions)
      } catch (err: any) {

      }
    }
    questions()
    config()
    check_connection()
  }, [])
  const handleQuizComplete = (finalScore: number, totalQuestions: number , time : number) => {
    setResults({ score: finalScore, total: totalQuestions , time : (configData.duration*60 - time)})
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
        <div className="flex items-center justify-center min-h-screen  sm:px-4">
          <div className="w-full max-w-2xl">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
              {/* Header with gradient */}
              <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-green-500 p-8 text-center">
                {/* Logo Section */}
                <div className="mb-6 flex justify-center">
                  <div className="w-24 h-24 bg-white rounded-full shadow-lg flex items-center justify-center">
                    <img src="/generic-club-logo.png" alt="Logo du Club" className="w-20 h-20 object-contain rounded-full" />
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{configData.name}</h1>
                <p className="text-blue-100 text-lg">Testez vos connaissances et apprenez quelque chose de nouveau !</p>
              </div>

              {/* Content Section */}
              <div className="p-8 md:p-12">
                <div className="space-y-6">
                  <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold text-gray-800">Bienvenue dans le Défi</h2>
                    <p className="text-gray-600 text-lg leading-relaxed">
                      Mettez-vous au défi avec notre quiz culturel passionnant ! Explorez des sujets variés, élargissez vos connaissances
                      et découvrez des faits fascinants sur les cultures du monde.
                    </p>
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-3 gap-4 py-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">{configData?.totalQuestions}</div>
                      <p className="text-sm text-gray-600">Questions</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">4</div>
                      <p className="text-sm text-gray-600">Options</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">{configData.duration} min</div>
                      <p className="text-sm text-gray-600">Durée</p>
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
                    Commencer le Quiz
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : onWaitingPage ? (
        <WaitingPage onReady={handleStartQuiz} configData={configData} />
      ) : results ? (
        <QuizResults score={results.score} total={results.total} onRestart={handleRestart} time={results.time} />
      ) : (
        <QuizInterface onComplete={handleQuizComplete} questions={questions} confData={configData} />
      )}
    </main>
  )
}

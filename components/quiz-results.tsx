"use client"

import { formatSecondsToMMSS } from "@/lib/utils"
import axios from "axios"
import { time } from "console"
import { useEffect } from "react"

interface QuizResultsProps {
  score: number
  total: number
  time : number
  onRestart: () => void
}

export function QuizResults({ score, total, time, onRestart }: QuizResultsProps) {
  useEffect(()=>{
      const storeScore = async ()=>{
           const res  = await axios.patch('/api/user',{score : score , time : time , total : total});
           console.log(res.data)
      }
      storeScore();
  },[score])

  const percentage = Math.round((score / total) * 100)

  const message =
    percentage === 100
      ? "Score Parfait ! Vous êtes un Maître de la Culture ! 🌟"
      : percentage >= 80
        ? "Excellent Travail ! 🎉"
        : percentage >= 60
          ? "Très Bien ! Continuez à Apprendre ! 📚"
          : percentage >= 40
            ? "Bon Effort ! Entraînez-vous Encore ! 💪"
            : "Restez à Jour ! Vous Allez Progresser ! 🚀"

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center px-1 sm:px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">

          {/* Celebration circle */}
          <div className="mb-8">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-blue-500 via-blue-400 to-green-500 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform">
              <div className="text-5xl font-bold text-white">{percentage}%</div>
            </div>
          </div>

          {/* Score */}
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Quiz Terminé !</h1>
          <p className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            {message}
          </p>

          {/* Score Details */}
          <div className="bg-gradient-to-r flex flex-row space-x-16 justify-center items-center from-blue-50 to-green-50 rounded-xl p-6 mb-8">
            <div>
              <p className="text-gray-600 mb-2">Votre Score</p>
              <p className="text-4xl font-bold text-gray-800">
                {score} <span className="text-xl text-gray-500">/ {total}</span>
              </p>
            </div>

            <div>
              <p className="text-gray-600 mb-2">Votre Temps</p>
              <p className="text-4xl font-bold text-gray-800">
                {formatSecondsToMMSS(time)}
              </p>
            </div>
          </div>

          {/* Restart Button */}

        </div>
      </div>
    </div>
  )
}

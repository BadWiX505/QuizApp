"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Trophy, TrendingUp } from "lucide-react"
import axios from "axios"
import { formatSecondsToMMSS } from "@/lib/utils"

interface Score {
  id: string
  credentials :{
  firstName: string
  lastName: string
  filiere: string
  }
  score: number
  total: number
  time: number
  percentage : number
}

export function ScoresSection() {
  const [scores, setScores] = useState<Score[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"percentage">("percentage")

   useEffect(()=>{
     const users = async () => {
      try {
        const res = await axios.get('/api/user');
        setScores(res.data?.users);
      } catch (err: any) {
      }
    }
    users();
   },[])

  const filteredScores = scores.filter(
    (score) =>
      score.credentials.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      score.credentials.lastName.toLowerCase().includes(searchTerm.toLowerCase()),
  )
const sortedScores = [...filteredScores].sort((a, b) => {
  // 1. Sort by percentage (descending)
  if (b.percentage !== a.percentage) {
    return b.percentage - a.percentage;
  }
  // 2. If percentages equal → sort by time (ascending)
    return a.time - b.time;
});


  const averageScore = (scores.reduce((sum, s) => sum + s.percentage, 0) / scores.length).toFixed(1)
  const topScore = Math.max(...scores.map((s) => s.percentage))

  const getScoreColor = (percentage: number) => {
    if (percentage >= 90) return "text-green-600"
    if (percentage >= 70) return "text-blue-600"
    if (percentage >= 50) return "text-yellow-600"
    return "text-red-600"
  }

  const getScoreBgColor = (percentage: number) => {
    if (percentage >= 90) return "bg-green-100"
    if (percentage >= 70) return "bg-blue-100"
    if (percentage >= 50) return "bg-yellow-100"
    return "bg-red-100"
  }

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg pt-0 bg-white">
        <CardHeader className="bg-gradient-to-r  py-2 pt-3 from-blue-500 to-green-500 text-white rounded-t-lg">
          <CardTitle>User Scores & Results</CardTitle>
          <CardDescription className="text-blue-100">Track and analyze quiz performance</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Search and Sort */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-2 border-gray-200 focus:border-blue-500"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy( "percentage")}
                className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
              >
                <option value="percentage">Sort by Score (Highest First)</option>
              </select>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border-l-4 border-l-blue-500">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600 mb-1">Total Submissions</p>
                  <p className="text-3xl font-bold text-blue-600">{scores.length}</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-green-500">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600 mb-1">Average Score</p>
                  <p className="text-3xl font-bold text-green-600">{averageScore}%</p>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-purple-500">
                <CardContent className="p-4">
                  <p className="text-sm text-gray-600 mb-1">Top Score</p>
                  <p className="text-3xl font-bold text-purple-600">{topScore}%</p>
                </CardContent>
              </Card>
            </div>

            {/* Scores Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200 bg-gray-50">
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Rank</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Name</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Filière</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Score</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Percentage</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Time Spent</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedScores.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                        No scores available yet
                      </td>
                    </tr>
                  ) : (
                    sortedScores.map((score, index) => (
                      <tr
                        key={score.id}
                        className={`border-b border-gray-200 hover:bg-blue-50 transition-colors ${
                          index === 0 ? "bg-yellow-50" : ""
                        }`}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            {index < 3 && <Trophy className="w-4 h-4 text-yellow-500" />}
                            <span className="font-bold text-gray-700">#{index + 1}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-semibold text-gray-800">
                            {score.credentials.firstName} {score.credentials.lastName}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{score.credentials.filiere}</td>
                        <td className="px-4 py-3 font-semibold text-gray-800">
                          {score.score}/{score.total}
                        </td>
                        <td className="px-4 py-3">
                          <div
                            className={`inline-block px-3 py-1 rounded-full font-semibold ${getScoreBgColor(score.percentage)} ${getScoreColor(score.percentage)}`}
                          >
                            {score.percentage}%
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-600 flex items-center gap-1">
                          <TrendingUp className="w-4 h-4 text-blue-500" />
                          {formatSecondsToMMSS(score.time)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

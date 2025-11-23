"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Trophy, TrendingUp } from "lucide-react"

interface Score {
  id: string
  firstName: string
  lastName: string
  filiere: string
  score: number
  totalQuestions: number
  percentage: number
  completedDate: string
  timeSpent: string
}

export function ScoresSection() {
  const [scores, setScores] = useState<Score[]>([
    {
      id: "1",
      firstName: "Ahmed",
      lastName: "Mohamed",
      filiere: "Computer Science",
      score: 45,
      totalQuestions: 50,
      percentage: 90,
      completedDate: "2025-01-15",
      timeSpent: "4m 30s",
    },
    {
      id: "2",
      firstName: "Fatima",
      lastName: "Hassan",
      filiere: "Engineering",
      score: 42,
      totalQuestions: 50,
      percentage: 84,
      completedDate: "2025-01-14",
      timeSpent: "4m 45s",
    },
    {
      id: "3",
      firstName: "Karim",
      lastName: "Khalil",
      filiere: "Business Administration",
      score: 48,
      totalQuestions: 50,
      percentage: 96,
      completedDate: "2025-01-13",
      timeSpent: "4m 15s",
    },
    {
      id: "4",
      firstName: "Layla",
      lastName: "Ibrahim",
      filiere: "Arts & Humanities",
      score: 38,
      totalQuestions: 50,
      percentage: 76,
      completedDate: "2025-01-12",
      timeSpent: "4m 50s",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"percentage" | "date">("percentage")

  const filteredScores = scores.filter(
    (score) =>
      score.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      score.lastName.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedScores = [...filteredScores].sort((a, b) => {
    if (sortBy === "percentage") {
      return b.percentage - a.percentage
    }
    return new Date(b.completedDate).getTime() - new Date(a.completedDate).getTime()
  })

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
      <Card className="border-0 shadow-lg bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-t-lg">
          <CardTitle>User Scores & Results</CardTitle>
          <CardDescription className="text-blue-100">Track and analyze quiz performance</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Search and Sort */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search by name..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-2 border-gray-200 focus:border-blue-500"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "percentage" | "date")}
                className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
              >
                <option value="percentage">Sort by Score (Highest First)</option>
                <option value="date">Sort by Date (Newest First)</option>
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
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
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
                            {score.firstName} {score.lastName}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{score.filiere}</td>
                        <td className="px-4 py-3 font-semibold text-gray-800">
                          {score.score}/{score.totalQuestions}
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
                          {score.timeSpent}
                        </td>
                        <td className="px-4 py-3 text-gray-600">{score.completedDate}</td>
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

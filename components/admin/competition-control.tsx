"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Calendar, Clock, Users } from "lucide-react"

export function CompetitionControl() {
  const [isRunning, setIsRunning] = useState(false)
  const [competitionData, setCompetitionData] = useState({
    name: "Culture Quiz 2025",
    startDate: "2025-01-15",
    endDate: "2025-02-15",
    duration: "5",
    maxParticipants: "100",
    totalQuestions: "50",
  })

  const handleToggleCompetition = () => {
    setIsRunning(!isRunning)
  }

  const handleUpdateField = (field: string, value: string) => {
    setCompetitionData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-t-lg">
          <CardTitle>Competition Control</CardTitle>
          <CardDescription className="text-blue-100">Manage competition settings and status</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Status Section */}
            <div className="border border-gray-200 rounded-lg p-6 bg-gradient-to-r from-blue-50 to-green-50">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Competition Status</h3>
                  <p className="text-gray-600">
                    {isRunning ? (
                      <span className="text-green-600 font-semibold flex items-center gap-2">
                        <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                        RUNNING
                      </span>
                    ) : (
                      <span className="text-red-600 font-semibold flex items-center gap-2">
                        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                        STOPPED
                      </span>
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-semibold text-gray-700">Start Competition</span>
                  <Switch checked={isRunning} onCheckedChange={handleToggleCompetition} className="scale-125" />
                </div>
              </div>
            </div>

            {/* Competition Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Competition Name</label>
                <Input
                  value={competitionData.name}
                  onChange={(e) => handleUpdateField("name", e.target.value)}
                  className="border-2 border-gray-200 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Duration (Minutes)</label>
                <Input
                  type="number"
                  value={competitionData.duration}
                  onChange={(e) => handleUpdateField("duration", e.target.value)}
                  className="border-2 border-gray-200 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Start Date</label>
                <Input
                  type="date"
                  value={competitionData.startDate}
                  onChange={(e) => handleUpdateField("startDate", e.target.value)}
                  className="border-2 border-gray-200 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">End Date</label>
                <Input
                  type="date"
                  value={competitionData.endDate}
                  onChange={(e) => handleUpdateField("endDate", e.target.value)}
                  className="border-2 border-gray-200 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Max Participants</label>
                <Input
                  type="number"
                  value={competitionData.maxParticipants}
                  onChange={(e) => handleUpdateField("maxParticipants", e.target.value)}
                  className="border-2 border-gray-200 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700">Total Questions</label>
                <Input
                  type="number"
                  value={competitionData.totalQuestions}
                  onChange={(e) => handleUpdateField("totalQuestions", e.target.value)}
                  className="border-2 border-gray-200 focus:border-blue-500"
                />
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold py-3">
              Save Competition Settings
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-l-blue-500 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="text-2xl font-bold text-gray-800">{competitionData.duration} min</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-lg">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Participants</p>
                <p className="text-2xl font-bold text-gray-800">{competitionData.maxParticipants}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500 shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Questions</p>
                <p className="text-2xl font-bold text-gray-800">{competitionData.totalQuestions}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

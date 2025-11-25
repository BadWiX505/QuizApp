"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Mail, BookOpen } from "lucide-react"
import axios from "axios"
import { formatSecondsToMMSS } from "@/lib/utils"

interface User {
  id: string
  credentials : {
  firstName: string
  lastName: string
  filiere: string
  }
  score ?: number
  time ?: number
  total ? : number
  percentage ?: number
}

export function UsersConsultation() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const users = async () => {
      try {
        const res = await axios.get('/api/user');
        console.log(res.data?.users)
        setUsers(res.data?.users)
      } catch (err: any) {
      }
    }
    users()
  }, [])
  const [searchTerm, setSearchTerm] = useState("")
  const [filterFiliere, setFilterFiliere] = useState("all")

  const filieres = Array.from(new Set(users.map((u) => u.credentials.filiere)))

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.credentials.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.credentials.lastName.toLowerCase().includes(searchTerm.toLowerCase()) 

    const matchesFiliere = filterFiliere === "all" || user.credentials.filiere === filterFiliere

    return matchesSearch && matchesFiliere
  })

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-white pt-0">
        <CardHeader className="bg-gradient-to-r py-2 pt-3  from-blue-500 to-green-500 text-white rounded-t-lg">
          <CardTitle>Users Consultation</CardTitle>
          <CardDescription className="text-blue-100">View and search registered users</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-2 border-gray-200 focus:border-blue-500"
                />
              </div>

              <select
                value={filterFiliere}
                onChange={(e) => setFilterFiliere(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-green-500"
              >
                <option value="all">All Filières</option>
                {filieres.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            {/* Users List */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200 bg-gray-50">
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Name</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Filière</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Score</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                        No users found matching your search criteria
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b border-gray-200 hover:bg-blue-50 transition-colors">
                        <td className="px-4 py-3">
                          <div className="font-semibold text-gray-800">
                            {user.credentials.firstName} {user.credentials.lastName}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2 text-gray-700">
                            <BookOpen className="w-4 h-4 text-blue-500" />
                            {user.credentials.filiere}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2 text-gray-700">
                            {user?.score}/{user?.total}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{user?.time ? formatSecondsToMMSS(user?.time) : ''}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-4 pt-4 border-t border-gray-200">
              <div className="text-center">
                <p className="text-gray-600 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-blue-600">{users.length}</p>
              </div>
             
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

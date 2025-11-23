"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Mail, BookOpen } from "lucide-react"

interface User {
  id: string
  firstName: string
  lastName: string
  filiere: string
  email: string
  joinedDate: string
  status: "active" | "inactive"
}

export function UsersConsultation() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      firstName: "Ahmed",
      lastName: "Mohamed",
      filiere: "Computer Science",
      email: "ahmed@example.com",
      joinedDate: "2025-01-10",
      status: "active",
    },
    {
      id: "2",
      firstName: "Fatima",
      lastName: "Hassan",
      filiere: "Engineering",
      email: "fatima@example.com",
      joinedDate: "2025-01-12",
      status: "active",
    },
    {
      id: "3",
      firstName: "Karim",
      lastName: "Khalil",
      filiere: "Business Administration",
      email: "karim@example.com",
      joinedDate: "2025-01-08",
      status: "inactive",
    },
    {
      id: "4",
      firstName: "Layla",
      lastName: "Ibrahim",
      filiere: "Arts & Humanities",
      email: "layla@example.com",
      joinedDate: "2025-01-15",
      status: "active",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterFiliere, setFilterFiliere] = useState("all")

  const filieres = Array.from(new Set(users.map((u) => u.filiere)))

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFiliere = filterFiliere === "all" || user.filiere === filterFiliere

    return matchesSearch && matchesFiliere
  })

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-t-lg">
          <CardTitle>Users Consultation</CardTitle>
          <CardDescription className="text-blue-100">View and search registered users</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            {/* Search and Filter */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
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
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Email</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Joined Date</th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-700">Status</th>
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
                            {user.firstName} {user.lastName}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2 text-gray-700">
                            <BookOpen className="w-4 h-4 text-blue-500" />
                            {user.filiere}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2 text-gray-700">
                            <Mail className="w-4 h-4 text-green-500" />
                            {user.email}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{user.joinedDate}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-3 py-1 rounded-full text-sm font-semibold ${
                              user.status === "active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {user.status === "active" ? "Active" : "Inactive"}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
              <div className="text-center">
                <p className="text-gray-600 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-blue-600">{users.length}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 text-sm">Active Users</p>
                <p className="text-2xl font-bold text-green-600">{users.filter((u) => u.status === "active").length}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600 text-sm">Inactive Users</p>
                <p className="text-2xl font-bold text-gray-600">
                  {users.filter((u) => u.status === "inactive").length}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

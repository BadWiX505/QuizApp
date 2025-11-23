"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"

const FILIERES = [
  "Computer Science",
  "Engineering",
  "Business Administration",
  "Arts & Humanities",
  "Natural Sciences",
  "Social Sciences",
  "Law",
  "Medicine",
]

export default function IdentificationPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    filiere: "",
  })

  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.firstName && formData.lastName && formData.filiere) {
      setSubmitted(true)
      console.log("[v0] Form submitted:", formData)
      // Store in session storage for quiz page to access
      sessionStorage.setItem("userInfo", JSON.stringify(formData))
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-green-500 p-8 text-center">
              {/* Logo Section */}
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <img src="/generic-club-logo.png" alt="Club Logo" className="w-16 h-16 object-contain" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">Identification</h1>
              <p className="text-blue-100 text-sm mt-2">Enter your details to begin</p>
            </div>

            {/* Form Section */}
            <div className="p-8">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* First Name Input */}
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Enter your first name"
                      className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all text-gray-800"
                      required
                    />
                  </div>

                  {/* Last Name Input */}
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Enter your last name"
                      className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-300 transition-all text-gray-800"
                      required
                    />
                  </div>

                  {/* Filiere Dropdown */}
                  <div className="space-y-2">
                    <label htmlFor="filiere" className="block text-sm font-semibold text-gray-700">
                      Filière (Field of Study)
                    </label>
                    <select
                      id="filiere"
                      name="filiere"
                      value={formData.filiere}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-300 transition-all text-gray-800 bg-white"
                      required
                    >
                      <option value="">Select your field of study</option>
                      {FILIERES.map((filiere) => (
                        <option key={filiere} value={filiere}>
                          {filiere}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 shadow-lg mt-6"
                  >
                    Proceed to Quiz
                  </button>
                </form>
              ) : (
                <div className="space-y-6 text-center py-4">
                  <div className="text-6xl">✓</div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome!</h2>
                    <p className="text-gray-600 mb-4">
                      {formData.firstName} {formData.lastName}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">Field: {formData.filiere}</p>
                  </div>
                  <Link
                    href="/"
                    className="inline-block bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-bold py-3 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg"
                  >
                    Go to Quiz
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

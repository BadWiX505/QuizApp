"use client"

import type React from "react"

import { useEffect, useState } from "react"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"

const FILIERES = [
  "GECSI",
  "GEER",
  "Autres"
]

export default function IdentificationPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    filiere: "",
  })

  const router = useRouter();
  useEffect(()=>{
        const check_connection = async ()=>{
             try{
              const res = await axios.get('/api/user/connect',{
                withCredentials : true
              });
              const connected = res.data?.connected;
              if(connected)
                  router.replace('/');
            }catch(err : any){
        
            }
          }
          check_connection()
  },[])

  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.firstName && formData.lastName && formData.filiere) {
      try{
      const res = await axios.post('/api/user',{
        credentials : formData
      });
      setSubmitted(true)
      console.log("[v0] Form submitted:", formData)
    }catch(err : any){
          
      }
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="flex items-center justify-center min-h-screen sm:px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-green-500 p-8 text-center">
              {/* Logo Section */}
              <div className="mb-6 flex justify-center">
                <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <img src="/generic-club-logo.png" alt="Logo du Club" className="w-16 h-16 object-contain" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-white">Identification</h1>
              <p className="text-blue-100 text-sm mt-2">Entrez vos informations pour commencer</p>
            </div>

            {/* Form Section */}
            <div className="p-8">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* First Name Input */}
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700">
                      Prénom
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="Entrez votre prénom"
                      className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-300 transition-all text-gray-800"
                      required
                    />
                  </div>

                  {/* Last Name Input */}
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700">
                      Nom
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Entrez votre nom"
                      className="w-full px-4 py-3 border-2 border-green-200 rounded-lg focus:outline-none focus:border-green-600 focus:ring-2 focus:ring-green-300 transition-all text-gray-800"
                      required
                    />
                  </div>

                  {/* Filiere Dropdown */}
                  <div className="space-y-2">
                    <label htmlFor="filiere" className="block text-sm font-semibold text-gray-700">
                      Filière
                    </label>
                    <select
                      id="filiere"
                      name="filiere"
                      value={formData.filiere}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-purple-200 rounded-lg focus:outline-none focus:border-purple-600 focus:ring-2 focus:ring-purple-300 transition-all text-gray-800 bg-white"
                      required
                    >
                      <option value="">Sélectionnez votre filière</option>
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
                    Passer au Quiz
                  </button>
                </form>
              ) : (
                <div className="space-y-6 text-center py-4">
                  <div className="text-6xl">✓</div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Bienvenue !</h2>
                    <p className="text-gray-600 mb-4">
                      {formData.firstName} {formData.lastName}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">Filière : {formData.filiere}</p>
                  </div>
                  <Link
                    href="/"
                    className="inline-block bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-bold py-3 px-8 rounded-xl transition-all transform hover:scale-105 shadow-lg"
                  >
                    Aller au Quiz
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

"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { QuestionsManager } from "@/components/admin/questions-manager"
import { CompetitionControl } from "@/components/admin/competition-control"
import { UsersConsultation } from "@/components/admin/users-consultation"
import { ScoresSection } from "@/components/admin/scores-section"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const connectAdmin = async () => {
      try {
        const res = await axios.get('/api/user/connect?admin=YES');
        if (!res.data?.adminConnection)
              router.replace('/');
        else
            setIsLoading(false);     
      } catch (err: any) { 
      }
    }

          connectAdmin();

  }, [isLoading])

  if (!isLoading)
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-green-500 p-6 sticky top-0 z-50 shadow-lg">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-blue-100">Manage quiz, users, and competition</p>
              </div>
            </div>
            <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center">
              <img src="/generic-club-logo.png" alt="Club Logo" className="w-12 h-12 object-contain rounded-full" />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto p-6">
          <Tabs defaultValue="questions" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6 bg-white shadow-md p-1 rounded-lg">
              <TabsTrigger
                value="questions"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-md transition-all"
              >
                Questions
              </TabsTrigger>
              <TabsTrigger
                value="competition"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-md transition-all"
              >
                Competition
              </TabsTrigger>
              <TabsTrigger
                value="users"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-md transition-all"
              >
                Users
              </TabsTrigger>
              <TabsTrigger
                value="scores"
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-green-500 data-[state=active]:text-white rounded-md transition-all"
              >
                Scores
              </TabsTrigger>
            </TabsList>

            <TabsContent value="questions">
              <QuestionsManager />
            </TabsContent>

            <TabsContent value="competition">
              <CompetitionControl />
            </TabsContent>

            <TabsContent value="users">
              <UsersConsultation />
            </TabsContent>

            <TabsContent value="scores">
              <ScoresSection />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    )
}

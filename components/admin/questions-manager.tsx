"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Plus, Trash2, Edit2 } from "lucide-react"

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  category: string
}

export function QuestionsManager() {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: "1",
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: 2,
      category: "Geography",
    },
    {
      id: "2",
      question: "Who painted the Mona Lisa?",
      options: ["Van Gogh", "Leonardo da Vinci", "Michelangelo", "Raphael"],
      correctAnswer: 1,
      category: "Art",
    },
  ])

  const [formData, setFormData] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctAnswer: "0",
    category: "",
  })

  const [editingId, setEditingId] = useState<string | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddQuestion = () => {
    if (
      formData.question &&
      formData.option1 &&
      formData.option2 &&
      formData.option3 &&
      formData.option4 &&
      formData.category
    ) {
      if (editingId) {
        setQuestions(
          questions.map((q) =>
            q.id === editingId
              ? {
                  ...q,
                  question: formData.question,
                  options: [formData.option1, formData.option2, formData.option3, formData.option4],
                  correctAnswer: Number.parseInt(formData.correctAnswer),
                  category: formData.category,
                }
              : q,
          ),
        )
        setEditingId(null)
      } else {
        const newQuestion: Question = {
          id: Date.now().toString(),
          question: formData.question,
          options: [formData.option1, formData.option2, formData.option3, formData.option4],
          correctAnswer: Number.parseInt(formData.correctAnswer),
          category: formData.category,
        }
        setQuestions([...questions, newQuestion])
      }

      setFormData({
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        correctAnswer: "0",
        category: "",
      })
      setIsDialogOpen(false)
    }
  }

  const handleDeleteQuestion = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id))
  }

  const handleEditQuestion = (question: Question) => {
    setFormData({
      question: question.question,
      option1: question.options[0],
      option2: question.options[1],
      option3: question.options[2],
      option4: question.options[3],
      correctAnswer: question.correctAnswer.toString(),
      category: question.category,
    })
    setEditingId(question.id)
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
    setEditingId(null)
    setFormData({ question: "", option1: "", option2: "", option3: "", option4: "", correctAnswer: "0", category: "" })
  }

  return (
    <div className="space-y-6">
      <Card className="border-0 shadow-lg bg-white">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-green-500 text-white rounded-t-lg">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Manage Questions</CardTitle>
              <CardDescription className="text-blue-100">Create, edit, and delete quiz questions</CardDescription>
            </div>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-white text-blue-600 hover:bg-gray-100 gap-2">
                  <Plus className="w-4 h-4" />
                  Add Question
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>{editingId ? "Edit Question" : "Add New Question"}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Question</label>
                    <Textarea
                      placeholder="Enter the question"
                      value={formData.question}
                      onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                      className="border-2 border-gray-200 focus:border-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((num) => (
                      <div key={num}>
                        <label className="block text-sm font-semibold mb-2">Option {num}</label>
                        <Input
                          placeholder={`Option ${num}`}
                          value={formData[`option${num}` as keyof typeof formData]}
                          onChange={(e) => setFormData({ ...formData, [`option${num}`]: e.target.value })}
                          className="border-2 border-gray-200 focus:border-green-500"
                        />
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Correct Answer</label>
                      <select
                        value={formData.correctAnswer}
                        onChange={(e) => setFormData({ ...formData, correctAnswer: e.target.value })}
                        className="w-full px-3 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                      >
                        {[0, 1, 2, 3].map((num) => (
                          <option key={num} value={num}>
                            Option {num + 1}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">Category</label>
                      <Input
                        placeholder="e.g., Geography, History"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="border-2 border-gray-200 focus:border-green-500"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={handleAddQuestion}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white"
                    >
                      {editingId ? "Update Question" : "Add Question"}
                    </Button>
                    <Button variant="outline" onClick={handleCloseDialog} className="flex-1 bg-transparent">
                      Cancel
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-3">
            {questions.length === 0 ? (
              <p className="text-center py-8 text-gray-500">No questions yet. Add one to get started!</p>
            ) : (
              questions.map((q) => (
                <div key={q.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">{q.category}</span>
                        <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                          Answer: Option {q.correctAnswer + 1}
                        </span>
                      </div>
                      <p className="font-semibold text-gray-800 mb-2">{q.question}</p>
                      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
                        {q.options.map((opt, idx) => (
                          <p key={idx}>
                            {idx + 1}. {opt}
                          </p>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button size="sm" variant="outline" onClick={() => handleEditQuestion(q)} className="gap-1">
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDeleteQuestion(q.id)}
                        className="gap-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      <div className="text-sm text-gray-600 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="font-semibold mb-1">Total Questions: {questions.length}</p>
        <p>Manage your quiz questions here. You can add, edit, and delete questions as needed.</p>
      </div>
    </div>
  )
}

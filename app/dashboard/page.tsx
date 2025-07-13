"use client"
import { useState, useEffect } from "react"
import { Plus, Target, Calendar, TrendingUp, UserIcon, LogOut, Trash2, CheckCircle2, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
interface Goal {
    id: string
    title: string
    description: string
    category: string
    targetDate: string
    progress: number
    completed: boolean
    createdAt: string
    milestones: string[]
}

export default function Dashboard (){

    const  user = {
        email: "bezylmophatotieno@gmail.com",
        name:"Bezyl Mophat Otieno"
    }

    const [goals, setGoals] = useState<Goal[]>([])
    const [isAddingGoal, setIsAddingGoal] = useState(false)
    const [editingGoal, setEditingGoal] = useState<Goal | null>(null)
    const [newGoal, setNewGoal] = useState({
        title: "",
        description: "",
        category: "",
        targetDate: "",
        milestones: [""],
    })



    // Load goals from localStorage
    useEffect(() => {
        if (user) {
            const savedGoals = localStorage.getItem(`goals_${user.email}`)
            if (savedGoals) {
                setGoals(JSON.parse(savedGoals))
            }
        }
    }, [user])

    // Save goals to localStorage
    useEffect(() => {
        if (user && goals.length > 0) {
            localStorage.setItem(`goals_${user.email}`, JSON.stringify(goals))
        }
    }, [goals, user])


    const handleLogout = () => {
        window.location.href = "/.auth/logout"
    }

    const addGoal = () => {
        if (!newGoal.title.trim()) return

        const goal: Goal = {
            id: Date.now().toString(),
            title: newGoal.title,
            description: newGoal.description,
            category: newGoal.category,
            targetDate: newGoal.targetDate,
            progress: 0,
            completed: false,
            createdAt: new Date().toISOString(),
            milestones: newGoal.milestones.filter((m) => m.trim()),
        }

        setGoals([...goals, goal])
        setNewGoal({ title: "", description: "", category: "", targetDate: "", milestones: [""] })
        setIsAddingGoal(false)
    }

    const updateGoalProgress = (id: string, progress: number) => {
        setGoals(goals.map((goal) => (goal.id === id ? { ...goal, progress, completed: progress >= 100 } : goal)))
    }

    const deleteGoal = (id: string) => {
        setGoals(goals.filter((goal) => goal.id !== id))
    }

    const toggleGoalComplete = (id: string) => {
        setGoals(
            goals.map((goal) =>
                goal.id === id ? { ...goal, completed: !goal.completed, progress: !goal.completed ? 100 : 0 } : goal,
            ),
        )
    }

    const getCategoryColor = (category: string) => {
        const colors = {
            Health: "from-green-400 to-emerald-600",
            Career: "from-blue-400 to-indigo-600",
            Personal: "from-purple-400 to-pink-600",
            Finance: "from-yellow-400 to-orange-600",
            Learning: "from-cyan-400 to-teal-600",
            Relationships: "from-rose-400 to-red-600",
        }
        return colors[category as keyof typeof colors] || "from-gray-400 to-gray-600"
    }

    const completedGoals = goals.filter((g) => g.completed).length
    const totalGoals = goals.length
    const overallProgress = totalGoals > 0 ? (completedGoals / totalGoals) * 100 : 0

return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
        {/* Header */}
        <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                            <Target className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">Goal Tracker 2024</h1>
                            <p className="text-white/70 text-sm">Your journey to success</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="sm" onClick={handleLogout} className="text-white hover:bg-white/10">
                            <LogOut className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white/70 text-sm">Total Goals</p>
                                <p className="text-3xl font-bold text-white">{totalGoals}</p>
                            </div>
                            <Target className="w-8 h-8 text-purple-400" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white/70 text-sm">Completed</p>
                                <p className="text-3xl font-bold text-white">{completedGoals}</p>
                            </div>
                            <CheckCircle2 className="w-8 h-8 text-green-400" />
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-lg border-white/20">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-white/70 text-sm">Overall Progress</p>
                                <p className="text-3xl font-bold text-white">{Math.round(overallProgress)}%</p>
                            </div>
                            <TrendingUp className="w-8 h-8 text-blue-400" />
                        </div>
                        <Progress value={overallProgress} className="mt-2" />
                    </CardContent>
                </Card>
            </div>

            {/* Add Goal Button */}
            <div className="mb-8">
                <Dialog open={isAddingGoal} onOpenChange={setIsAddingGoal}>
                    <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
                            <Plus className="w-4 h-4 mr-2" />
                            Add New Goal
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-900 border-gray-700">
                        <DialogHeader>
                            <DialogTitle className="text-white">Create New Goal</DialogTitle>
                            <DialogDescription className="text-gray-400">
                                Set a new goal for your journey to success.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="title" className="text-white">
                                    Goal Title
                                </Label>
                                <Input
                                    id="title"
                                    value={newGoal.title}
                                    onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                                    placeholder="Enter your goal title"
                                    className="bg-gray-800 border-gray-600 text-white"
                                />
                            </div>
                            <div>
                                <Label htmlFor="description" className="text-white">
                                    Description
                                </Label>
                                <Textarea
                                    id="description"
                                    value={newGoal.description}
                                    onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                                    placeholder="Describe your goal in detail"
                                    className="bg-gray-800 border-gray-600 text-white"
                                />
                            </div>
                            <div>
                                <Label htmlFor="category" className="text-white">
                                    Category
                                </Label>
                                <Select
                                    value={newGoal.category}
                                    onValueChange={(value) => setNewGoal({ ...newGoal, category: value })}
                                >
                                    <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-800 border-gray-600">
                                        <SelectItem value="Health">Health</SelectItem>
                                        <SelectItem value="Career">Career</SelectItem>
                                        <SelectItem value="Personal">Personal</SelectItem>
                                        <SelectItem value="Finance">Finance</SelectItem>
                                        <SelectItem value="Learning">Learning</SelectItem>
                                        <SelectItem value="Relationships">Relationships</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="targetDate" className="text-white">
                                    Target Date
                                </Label>
                                <Input
                                    id="targetDate"
                                    type="date"
                                    value={newGoal.targetDate}
                                    onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                                    className="bg-gray-800 border-gray-600 text-white"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                variant="outline"
                                onClick={() => setIsAddingGoal(false)}
                                className="border-gray-600 text-gray-300"
                            >
                                Cancel
                            </Button>
                            <Button onClick={addGoal} className="bg-gradient-to-r from-purple-500 to-pink-500">
                                Create Goal
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Goals Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {goals.map((goal) => (
                    <Card
                        key={goal.id}
                        className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105"
                    >
                        <CardHeader>
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-2 mb-2">
                                        <Badge className={`bg-gradient-to-r ${getCategoryColor(goal.category)} text-white border-0`}>
                                            {goal.category}
                                        </Badge>
                                        {goal.completed && <CheckCircle2 className="w-5 h-5 text-green-400" />}
                                    </div>
                                    <CardTitle className="text-white text-lg">{goal.title}</CardTitle>
                                    <CardDescription className="text-white/70 mt-1">{goal.description}</CardDescription>
                                </div>
                                <div className="flex space-x-1">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => toggleGoalComplete(goal.id)}
                                        className="text-white hover:bg-white/10"
                                    >
                                        {goal.completed ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => deleteGoal(goal.id)}
                                        className="text-red-400 hover:bg-red-400/10"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-white/70 text-sm">Progress</span>
                                        <span className="text-white text-sm font-medium">{goal.progress}%</span>
                                    </div>
                                    <Progress value={goal.progress} className="h-2" />
                                </div>

                                {goal.targetDate && (
                                    <div className="flex items-center space-x-2 text-white/70 text-sm">
                                        <Calendar className="w-4 h-4" />
                                        <span>Target: {new Date(goal.targetDate).toLocaleDateString()}</span>
                                    </div>
                                )}

                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="range"
                                        min="0"
                                        max="100"
                                        value={goal.progress}
                                        onChange={(e) => updateGoalProgress(goal.id, Number.parseInt(e.target.value))}
                                        className="flex-1"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {goals.length === 0 && (
                <div className="text-center py-12">
                    <Target className="w-16 h-16 text-white/30 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No goals yet</h3>
                    <p className="text-white/70 mb-6">Start your journey by creating your first goal!</p>
                    <Button
                        onClick={() => setIsAddingGoal(true)}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Your First Goal
                    </Button>
                </div>
            )}
        </main>
    </div>
)
}
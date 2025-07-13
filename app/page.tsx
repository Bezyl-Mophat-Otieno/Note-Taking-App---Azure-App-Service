"use client"
import {useRouter} from "next/navigation";
import { Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"


export default function GoalTracker() {
  const router = useRouter()
  const  user = {
    email: "bezylmophatotieno@gmail.com",
    name:"Bezyl Mophat Otieno"
  }
  const handleLogin = () => {
    localStorage.setItem("user",JSON.stringify(user))
    router.push("/dashboard")

  }
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border-white/20">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl text-white">Goal Tracker 2024</CardTitle>
            <CardDescription className="text-white/70">Track your yearly goals with style</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              Sign In with Azure AD
            </Button>
          </CardContent>
        </Card>
      </div>
    )
}

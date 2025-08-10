"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import Header from "@/components/header"
import {
  TrendingUp,
  CreditCard,
  DollarSign,
  Calendar,
  ArrowUpRight,
  CheckCircle,
  Clock,
  AlertCircle,
} from "lucide-react"

export default function DashboardPage() {
  const [creditScore] = useState(720)
  const [scoreChange] = useState(45)
  const [creditUtilization] = useState(23)

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main className="px-4 md:px-6 py-8 pt-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-gray-300">Track your credit building journey</p>
          </div>

          {/* Credit Score Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Main Credit Score Card */}
            <Card className="lg:col-span-2 bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Credit Score Overview</CardTitle>
                <CardDescription className="text-gray-400">Your current credit standing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="relative w-24 h-24">
                      <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 120 120">
                        <circle cx="60" cy="60" r="45" stroke="#374151" strokeWidth="8" fill="none" />
                        <circle
                          cx="60"
                          cy="60"
                          r="45"
                          stroke="#0ea5e9"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray={`${(creditScore / 850) * 283} 283`}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-2xl font-bold text-white">{creditScore}</div>
                        <div className="text-xs text-sky-500">FICO® Score</div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl font-bold text-white">{creditScore}</span>
                        <div className="flex items-center gap-1">
                          <ArrowUpRight className="w-4 h-4 text-green-500" />
                          <span className="text-green-500 font-semibold">+{scoreChange}</span>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm">Good Credit</p>
                      <p className="text-gray-500 text-xs">Last updated: Today</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Improving</Badge>
                </div>

                {/* Credit Score Range */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Poor</span>
                    <span className="text-gray-400">Fair</span>
                    <span className="text-gray-400">Good</span>
                    <span className="text-gray-400">Very Good</span>
                    <span className="text-gray-400">Excellent</span>
                  </div>
                  <div className="relative h-2 bg-gray-700 rounded-full">
                    <div className="absolute h-2 bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 to-blue-500 rounded-full w-full"></div>
                    <div
                      className="absolute w-3 h-3 bg-white border-2 border-sky-500 rounded-full transform -translate-y-0.5"
                      style={{ left: `${(creditScore / 850) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>300</span>
                    <span>850</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Credit Utilization */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-sky-500" />
                  Credit Utilization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-white mb-1">{creditUtilization}%</div>
                  <p className="text-gray-400 text-sm">of available credit</p>
                </div>
                <Progress value={creditUtilization} className="mb-4" />
                <div className="text-center">
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Excellent</Badge>
                  <p className="text-xs text-gray-500 mt-2">Keep it under 30%</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Account Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Active Plans</p>
                    <p className="text-2xl font-bold text-white">2</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Monthly Payment</p>
                    <p className="text-2xl font-bold text-white">$45</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-sky-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Next Payment</p>
                    <p className="text-2xl font-bold text-white">Dec 15</p>
                  </div>
                  <Calendar className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Account Age</p>
                    <p className="text-2xl font-bold text-white">8 mo</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity & Credit Factors */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Activity</CardTitle>
                <CardDescription className="text-gray-400">Your latest credit building activities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div className="flex-1">
                      <p className="text-white font-medium">Payment Processed</p>
                      <p className="text-gray-400 text-sm">Credit Line Booster - $25</p>
                    </div>
                    <span className="text-gray-500 text-xs">2 days ago</span>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-sky-500" />
                    <div className="flex-1">
                      <p className="text-white font-medium">Credit Score Updated</p>
                      <p className="text-gray-400 text-sm">Score increased by 5 points</p>
                    </div>
                    <span className="text-gray-500 text-xs">1 week ago</span>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div className="flex-1">
                      <p className="text-white font-medium">Payment Processed</p>
                      <p className="text-gray-400 text-sm">Secured Loan Booster - $20</p>
                    </div>
                    <span className="text-gray-500 text-xs">2 weeks ago</span>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                    <AlertCircle className="w-5 h-5 text-orange-500" />
                    <div className="flex-1">
                      <p className="text-white font-medium">Account Opened</p>
                      <p className="text-gray-400 text-sm">New tradeline reported to bureaus</p>
                    </div>
                    <span className="text-gray-500 text-xs">1 month ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Credit Factors */}
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Credit Factors</CardTitle>
                <CardDescription className="text-gray-400">Key factors affecting your score</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">Payment History</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Excellent</Badge>
                    </div>
                    <Progress value={95} className="mb-1" />
                    <p className="text-xs text-gray-500">100% on-time payments</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">Credit Utilization</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Excellent</Badge>
                    </div>
                    <Progress value={77} className="mb-1" />
                    <p className="text-xs text-gray-500">23% utilization</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">Credit Age</span>
                      <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Fair</Badge>
                    </div>
                    <Progress value={40} className="mb-1" />
                    <p className="text-xs text-gray-500">8 months average age</p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">Credit Mix</span>
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Good</Badge>
                    </div>
                    <Progress value={70} className="mb-1" />
                    <p className="text-xs text-gray-500">2 account types</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Items */}
          <Card className="mt-6 bg-gray-900 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white">Recommended Actions</CardTitle>
              <CardDescription className="text-gray-400">Steps to improve your credit score</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="w-5 h-5 text-sky-500" />
                    <h4 className="font-semibold text-white">Make Your Next Payment</h4>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">
                    Your next payment is due in 5 days. Keep your perfect payment history!
                  </p>
                  <Button className="w-full bg-sky-500 hover:bg-sky-600 text-white">Make Payment</Button>
                </div>

                <div className="p-4 bg-gray-800 rounded-lg">
                  <div className="flex items-center gap-3 mb-3">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <h4 className="font-semibold text-white">Add Another Plan</h4>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">
                    Boost your score faster with an additional credit builder plan.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                  >
                    View Plans
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

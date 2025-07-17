"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/header"
import FooterNavigation from "@/components/footer-navigation"
import { useRouter } from "next/navigation"
import { TrendingUp, Download, Calendar, AlertTriangle, CheckCircle, CreditCard, FileText } from "lucide-react"

interface UserData {
  firstName: string
  lastName: string
  email: string
  phone: string
  isVerified: boolean
  signupDate: string
}

interface CreditFactor {
  name: string
  percentage: number
  status: string
  impact: string
  color: string
}

export default function CreditReportsPage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  const creditFactors: CreditFactor[] = [
    { name: "Payment History", percentage: 95, status: "Excellent", impact: "High Impact", color: "#1e40af" },
    { name: "Credit Utilization", percentage: 78, status: "Good", impact: "High Impact", color: "#06b6d4" },
    {
      name: "Length of Credit History",
      percentage: 85,
      status: "Very Good",
      impact: "Medium Impact",
      color: "#bfdbfe",
    },
    { name: "Credit Mix", percentage: 72, status: "Good", impact: "Low Impact", color: "#f3b4d1" },
    { name: "New Credit", percentage: 88, status: "Very Good", impact: "Low Impact", color: "#be185d" },
  ]

  const overallCreditHealth = Math.round(
    creditFactors.reduce((sum, factor) => sum + factor.percentage, 0) / creditFactors.length,
  )

  // Calculate pie chart segments
  const total = creditFactors.reduce((sum, factor) => sum + factor.percentage, 0)
  let cumulativePercentage = 0

  const pieSegments = creditFactors.map((factor) => {
    const startAngle = (cumulativePercentage / total) * 360
    const endAngle = ((cumulativePercentage + factor.percentage) / total) * 360
    cumulativePercentage += factor.percentage

    const startAngleRad = (startAngle - 90) * (Math.PI / 180)
    const endAngleRad = (endAngle - 90) * (Math.PI / 180)

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"

    const x1 = 150 + 120 * Math.cos(startAngleRad)
    const y1 = 150 + 120 * Math.sin(startAngleRad)
    const x2 = 150 + 120 * Math.cos(endAngleRad)
    const y2 = 150 + 120 * Math.sin(endAngleRad)

    const pathData = [`M 150 150`, `L ${x1} ${y1}`, `A 120 120 0 ${largeArcFlag} 1 ${x2} ${y2}`, `Z`].join(" ")

    return {
      ...factor,
      pathData,
      startAngle,
      endAngle,
    }
  })

  useEffect(() => {
    // Check if user is authenticated
    const authData = localStorage.getItem("takeoff_auth")
    const storedUser = localStorage.getItem("takeoff_user")

    if (!authData) {
      router.push("/signin")
      return
    }

    if (storedUser) {
      setUserData(JSON.parse(storedUser))
    }

    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your credit reports...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header showAuth={false} />

      <main className="max-w-6xl mx-auto px-4 py-8 pt-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-sky-500 mb-2">Credit Reports</h1>
              <p className="text-sky-400">Monitor your credit health and track improvements</p>
            </div>
          </div>
          <Button className="bg-sky-500 hover:bg-sky-600">
            <Download className="h-4 w-4 mr-2" />
            Download Report
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Credit Score Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-sky-500" />
                  Credit Score Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-5xl font-bold text-sky-500 mb-2">675</div>
                    <div className="text-lg text-sky-500 font-medium mb-1">+12 points this month</div>
                    <div className="text-sm text-sky-300">Last updated: {new Date().toLocaleDateString()}</div>
                  </div>
                  <div className="relative w-40 h-40">
                    <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 160 160">
                      <circle cx="80" cy="80" r="60" stroke="#e5e7eb" strokeWidth="12" fill="none" />
                      <circle
                        cx="80"
                        cy="80"
                        r="60"
                        stroke="#0ea5e9"
                        strokeWidth="12"
                        fill="none"
                        strokeDasharray={`${(675 / 850) * 377} 377`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold">675</div>
                        <div className="text-sm text-sky-300">Good</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Score Range */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between text-sm text-sky-400 mb-2">
                    <span>Poor</span>
                    <span>Fair</span>
                    <span>Good</span>
                    <span>Very Good</span>
                    <span>Excellent</span>
                  </div>
                  <div className="relative h-3 bg-gradient-to-r from-red-400 via-yellow-400 via-green-400 via-blue-400 to-green-600 rounded-full">
                    <div
                      className="absolute w-4 h-4 bg-white border-2 border-sky-500 rounded-full transform -translate-y-0.5"
                      style={{ left: `${(675 / 850) * 100}%`, transform: "translateX(-50%) translateY(-2px)" }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-sky-300 mt-1">
                    <span>300</span>
                    <span>850</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Credit Score Factors - Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Credit Score Factors</CardTitle>
                <p className="text-sm text-sky-400">Understanding what impacts your credit score</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Pie Chart */}
                  <div className="flex items-center justify-center">
                    <div className="relative">
                      <svg
                        width="300"
                        height="300"
                        viewBox="0 0 300 300"
                        className="transform hover:scale-105 transition-transform duration-200"
                      >
                        {pieSegments.map((segment, index) => (
                          <path
                            key={index}
                            d={segment.pathData}
                            fill={segment.color}
                            stroke="white"
                            strokeWidth="2"
                            className="hover:opacity-80 transition-opacity duration-200 cursor-pointer"
                          />
                        ))}
                        {/* Center circle with overall health */}
                        <circle cx="150" cy="150" r="50" fill="white" stroke="#e5e7eb" strokeWidth="2" />
                        <text x="150" y="145" textAnchor="middle" className="text-2xl font-bold fill-sky-500">
                          {overallCreditHealth}%
                        </text>
                        <text x="150" y="165" textAnchor="middle" className="text-sm fill-sky-400">
                          Overall Health
                        </text>
                      </svg>
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-sky-500 mb-4">Factor Breakdown</h3>
                    {creditFactors.map((factor, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-4 h-4 rounded-full" style={{ backgroundColor: factor.color }}></div>
                          <div>
                            <div className="font-medium text-sky-500">{factor.name}</div>
                            <div className="text-sm text-sky-300">{factor.impact}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-sky-500">{factor.percentage}%</div>
                          <div className="text-sm text-sky-400">{factor.status}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary Card */}
                <div className="mt-6 p-4 bg-sky-50 rounded-lg border border-sky-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-sky-500">Overall Credit Health</h4>
                      <p className="text-sm text-sky-400">Based on all factors combined</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-sky-500">{overallCreditHealth}%</div>
                      <div className="text-sm text-sky-400">
                        {overallCreditHealth >= 90
                          ? "Excellent"
                          : overallCreditHealth >= 80
                            ? "Very Good"
                            : overallCreditHealth >= 70
                              ? "Good"
                              : overallCreditHealth >= 60
                                ? "Fair"
                                : "Poor"}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Credit History Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-sky-500" />
                  Credit History Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    <div className="flex-1">
                      <div className="font-medium text-sky-500">Payment Made</div>
                      <div className="text-sm text-green-600">Credit card payment of $150 processed</div>
                    </div>
                    <div className="text-sm text-sky-300">2 days ago</div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <TrendingUp className="h-6 w-6 text-blue-500" />
                    <div className="flex-1">
                      <div className="font-medium text-sky-500">Credit Score Updated</div>
                      <div className="text-sm text-sky-400">Score increased by 12 points to 675</div>
                    </div>
                    <div className="text-sm text-sky-300">1 week ago</div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <CreditCard className="h-6 w-6 text-yellow-500" />
                    <div className="flex-1">
                      <div className="font-medium text-sky-500">Credit Utilization Improved</div>
                      <div className="text-sm text-yellow-600">Utilization decreased to 15%</div>
                    </div>
                    <div className="text-sm text-sky-300">2 weeks ago</div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                    <CheckCircle className="h-6 w-6 text-green-500" />
                    <div className="flex-1">
                      <div className="font-medium text-sky-500">Account Opened</div>
                      <div className="text-sm text-green-600">New credit building account activated</div>
                    </div>
                    <div className="text-sm text-sky-300">1 month ago</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sky-400">Current Score</span>
                  <span className="font-semibold text-2xl">675</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sky-400">Monthly Change</span>
                  <span className="font-semibold text-green-600">+12</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sky-400">Credit Age</span>
                  <span className="font-semibold">6 months</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sky-400">Utilization</span>
                  <span className="font-semibold">15%</span>
                </div>
              </CardContent>
            </Card>

            {/* Credit Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  Credit Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="font-medium text-sky-500">All Good!</span>
                  </div>
                  <p className="text-sm text-green-600">No negative items detected on your credit report.</p>
                </div>

                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center gap-2 mb-1">
                    <TrendingUp className="h-4 w-4 text-blue-500" />
                    <span className="font-medium text-sky-500">Improvement Opportunity</span>
                  </div>
                  <p className="text-sm text-sky-400">
                    Consider keeping credit utilization below 10% for optimal scores.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Available Reports */}
            <Card>
              <CardHeader>
                <CardTitle>Available Reports</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <FileText className="h-4 w-4 mr-2" />
                  Experian Report
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <FileText className="h-4 w-4 mr-2" />
                  Equifax Report
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <FileText className="h-4 w-4 mr-2" />
                  TransUnion Report
                </Button>
              </CardContent>
            </Card>

            {/* Credit Building Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Credit Building Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-sky-50 rounded-lg">
                  <h4 className="font-medium text-sky-500 mb-1">Pay on Time</h4>
                  <p className="text-sm text-sky-400">
                    Payment history is the most important factor in your credit score.
                  </p>
                </div>
                <div className="p-3 bg-sky-50 rounded-lg">
                  <h4 className="font-medium text-sky-500 mb-1">Keep Balances Low</h4>
                  <p className="text-sm text-sky-400">Aim to use less than 30% of your available credit limit.</p>
                </div>
                <div className="p-3 bg-sky-50 rounded-lg">
                  <h4 className="font-medium text-sky-500 mb-1">Monitor Regularly</h4>
                  <p className="text-sm text-sky-400">
                    Check your credit report monthly for errors or suspicious activity.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <FooterNavigation />
    </div>
  )
}

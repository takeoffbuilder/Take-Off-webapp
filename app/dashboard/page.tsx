"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  CreditCard,
  Target,
  Award,
  CheckCircle,
  Calendar,
  DollarSign,
  Rocket,
  Star,
  Zap,
} from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

interface SelectedBooster {
  id: string
  plan: {
    id: string
    name: string
    price: number
    builderAmount: string
    features: string[]
  }
  backdatedHistory: boolean
}

export default function Dashboard() {
  const [selectedBoosters, setSelectedBoosters] = useState<SelectedBooster[]>([])
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  useEffect(() => {
    // Check for payment success
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get("payment") === "success") {
      setPaymentSuccess(true)
      // Remove the parameter from URL
      window.history.replaceState({}, "", "/dashboard")
    }

    // Load selected boosters from localStorage
    const storedBoosters = localStorage.getItem("takeoff_selected_boosters")
    if (storedBoosters) {
      try {
        setSelectedBoosters(JSON.parse(storedBoosters))
      } catch (error) {
        console.error("Error parsing stored boosters:", error)
      }
    } else {
      // If no boosters in storage, create a default one based on selected plan
      const selectedPlan = localStorage.getItem("takeoff_selected_plan")
      if (selectedPlan) {
        const planData = JSON.parse(selectedPlan)
        const defaultBooster: SelectedBooster = {
          id: "default-1",
          plan: {
            id: planData.id || "starter",
            name: planData.name || "Starter Boost",
            price: planData.price || 15,
            builderAmount: planData.builderAmount || "$1500",
            features: planData.features || ["$1500 Builder Account", "Credit monitoring", "Monthly reports"],
          },
          backdatedHistory: false,
        }
        setSelectedBoosters([defaultBooster])
      }
    }
  }, [])

  const calculateTotalMonthly = () => {
    return selectedBoosters.reduce((total, booster) => {
      let boosterTotal = booster.plan.price
      if (booster.backdatedHistory) {
        boosterTotal += 50
      }
      return total + boosterTotal
    }, 0)
  }

  const getTotalBuilderAmount = () => {
    return selectedBoosters.reduce((total, booster) => {
      const amount = Number.parseInt(booster.plan.builderAmount.replace(/[$,]/g, ""))
      return total + amount
    }, 0)
  }

  const getPlanIcon = (planName: string) => {
    if (planName.toLowerCase().includes("starter")) return <Rocket className="h-5 w-5" />
    if (planName.toLowerCase().includes("power")) return <Zap className="h-5 w-5" />
    if (planName.toLowerCase().includes("max")) return <Star className="h-5 w-5" />
    if (planName.toLowerCase().includes("blaster")) return <Target className="h-5 w-5" />
    if (planName.toLowerCase().includes("super")) return <Award className="h-5 w-5" />
    if (planName.toLowerCase().includes("star")) return <Star className="h-5 w-5" />
    return <CreditCard className="h-5 w-5" />
  }

  const getPlanColor = (planName: string) => {
    if (planName.toLowerCase().includes("starter")) return "text-blue-400"
    if (planName.toLowerCase().includes("power")) return "text-purple-400"
    if (planName.toLowerCase().includes("max")) return "text-green-400"
    if (planName.toLowerCase().includes("blaster")) return "text-orange-400"
    if (planName.toLowerCase().includes("super")) return "text-red-400"
    if (planName.toLowerCase().includes("star")) return "text-yellow-400"
    return "text-sky-400"
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <div className="container mx-auto px-4 py-8">
        {/* Success Message */}
        {paymentSuccess && (
          <div className="mb-6 p-4 bg-green-900/20 border border-green-700/30 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span className="font-medium text-green-300">Payment Successful!</span>
            </div>
            <p className="text-green-200 text-sm mt-1">
              Your booster plans are now active and building your credit history.
            </p>
          </div>
        )}

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-300">Track your credit building progress</p>
        </div>

        {/* Active Booster Plans Detail Section */}
        {selectedBoosters.length > 0 && (
          <Card className="bg-gray-900 border-gray-700 mb-6">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-sky-400" />
                Your Active Booster Plans
                <Badge variant="secondary" className="bg-sky-900 text-sky-300 ml-2">
                  {selectedBoosters.length} Active
                </Badge>
              </CardTitle>
              <p className="text-gray-400 text-sm">
                Credit building plans selected during signup and currently building your credit history
              </p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 mb-6">
                {selectedBoosters.map((booster, index) => (
                  <div key={booster.id} className="border border-gray-600 rounded-lg p-6 bg-gray-800/50">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 bg-gray-700 rounded-lg ${getPlanColor(booster.plan.name)}`}>
                          {getPlanIcon(booster.plan.name)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-white text-lg">{booster.plan.name}</h3>
                          <p className="text-gray-400 text-sm">Plan #{index + 1}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary" className="bg-green-900 text-green-300 mb-2">
                          Active
                        </Badge>
                        <p className="text-xs text-gray-400">Since signup</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Plan Details */}
                      <div>
                        <h4 className="font-medium text-white mb-3">Plan Details</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Builder Account</span>
                            <span className={`font-semibold ${getPlanColor(booster.plan.name)}`}>
                              {booster.plan.builderAmount}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Monthly Payment</span>
                            <span className="text-white">${booster.plan.price}</span>
                          </div>
                          {booster.backdatedHistory && (
                            <div className="flex justify-between">
                              <span className="text-gray-400">2-Year Backdated History</span>
                              <span className="text-white">+$50</span>
                            </div>
                          )}
                          <div className="flex justify-between font-medium border-t border-gray-700 pt-2 mt-2">
                            <span className="text-gray-300">Total Monthly</span>
                            <span className="text-white">
                              ${booster.plan.price + (booster.backdatedHistory ? 50 : 0)}/mo
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Plan Features */}
                      <div>
                        <h4 className="font-medium text-white mb-3">Included Features</h4>
                        <div className="space-y-2">
                          {booster.plan.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                              <span className="text-gray-300 text-sm">{feature}</span>
                            </div>
                          ))}
                          {booster.backdatedHistory && (
                            <div className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-400 flex-shrink-0" />
                              <span className="text-gray-300 text-sm">2-year backdated credit history</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Payment Info */}
                    <div className="mt-4 pt-4 border-t border-gray-700">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Next payment due:</span>
                        <span className="text-white">January 15, 2025</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-800 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-sky-400">${getTotalBuilderAmount().toLocaleString()}</div>
                  <div className="text-sm text-gray-400">Total Builder Amount</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">${calculateTotalMonthly()}</div>
                  <div className="text-sm text-gray-400">Monthly Payment</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{selectedBoosters.length}</div>
                  <div className="text-sm text-gray-400">Active Plans</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">
                    {selectedBoosters.filter((b) => b.backdatedHistory).length}
                  </div>
                  <div className="text-sm text-gray-400">Backdated Plans</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/plans">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-sky-600 text-sky-400 hover:bg-sky-900/20 bg-transparent"
                  >
                    Add Another Plan
                  </Button>
                </Link>
                <Link href="/payment-history">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                  >
                    View Payment History
                  </Button>
                </Link>
                <Link href="/settings">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                  >
                    Manage Plans
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Credit Score Overview */}
        <Card className="bg-gray-900 border-gray-700 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-sky-400" />
              Credit Score Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-3xl font-bold text-sky-400">720</div>
                <div className="text-sm text-gray-400">Current Score</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-green-400">+45</div>
                <div className="text-sm text-gray-400">This Month</div>
              </div>
            </div>
            <Progress value={72} className="h-2 bg-gray-800" />
            <div className="flex justify-between text-sm text-gray-400 mt-2">
              <span>Poor</span>
              <span>Fair</span>
              <span>Good</span>
              <span>Excellent</span>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-sky-400/20 rounded-lg">
                  <CreditCard className="h-5 w-5 text-sky-400" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-white">
                    ${getTotalBuilderAmount() > 0 ? getTotalBuilderAmount().toLocaleString() : "2,500"}
                  </div>
                  <div className="text-sm text-gray-400">Total Credit Limit</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-400/20 rounded-lg">
                  <Target className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-white">15%</div>
                  <div className="text-sm text-gray-400">Utilization</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-400/20 rounded-lg">
                  <Award className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-white">98%</div>
                  <div className="text-sm text-gray-400">On-time Payments</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="bg-gray-900 border-gray-700 mb-6">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentSuccess && (
                <div className="flex items-center justify-between py-2 border-b border-gray-800">
                  <div>
                    <div className="text-white font-medium">Booster Plans Activated</div>
                    <div className="text-sm text-gray-400">
                      {selectedBoosters.length} plan{selectedBoosters.length > 1 ? "s" : ""} activated successfully
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">Just now</div>
                </div>
              )}
              <div className="flex items-center justify-between py-2 border-b border-gray-800">
                <div>
                  <div className="text-white font-medium">Payment Processed</div>
                  <div className="text-sm text-gray-400">Credit card payment of $150</div>
                </div>
                <div className="text-sm text-gray-400">2 days ago</div>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-800">
                <div>
                  <div className="text-white font-medium">Credit Score Updated</div>
                  <div className="text-sm text-gray-400">Score increased by 5 points</div>
                </div>
                <div className="text-sm text-gray-400">1 week ago</div>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-white font-medium">Account Opened</div>
                  <div className="text-sm text-gray-400">New credit builder account</div>
                </div>
                <div className="text-sm text-gray-400">2 weeks ago</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link href="/payment">
            <Button className="bg-sky-600 hover:bg-sky-700 text-white h-12 w-full">
              <DollarSign className="h-4 w-4 mr-2" />
              Make a Payment
            </Button>
          </Link>
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 h-12 bg-transparent">
            <Calendar className="h-4 w-4 mr-2" />
            View Credit Report
          </Button>
        </div>
      </div>
    </div>
  )
}

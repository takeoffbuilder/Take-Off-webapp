"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Header from "@/components/header"
import { useRouter } from "next/navigation"
import { Calendar, CreditCard, TrendingUp, Bell, HelpCircle, Star, History, BookOpen } from "lucide-react"
import Link from "next/link"
import FooterNavigation from "@/components/footer-navigation"

interface UserData {
  firstName: string
  lastName: string
  email: string
  phone: string
  isVerified: boolean
  signupDate: string
}

interface Subscription {
  id: string
  planName: string
  planType: string
  originalPlanType?: string
  price: string
  billingFrequency: string
  nextBillingDate: string
  status: string
  activatedAt: string
  creditLimit?: string
  loanAmount?: string
  features: string[]
}

export default function DashboardPage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const [allSubscriptions, setAllSubscriptions] = useState<Subscription[]>([])

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

    // Load all plans and create unified subscription list
    const loadAllPlans = () => {
      let allPlans: Subscription[] = []

      // Load main plan
      const mainPlanData = localStorage.getItem("takeoff_selected_plan")
      if (mainPlanData) {
        const mainPlan = JSON.parse(mainPlanData)
        const mainPlanSubscription: Subscription = {
          id: "main-plan",
          planName: mainPlan.planName,
          planType: "main-plan",
          originalPlanType: mainPlan.planType,
          price: "$25.00", // Default main plan price
          billingFrequency: "monthly",
          nextBillingDate: mainPlan.nextBillingDate,
          status: mainPlan.paymentStatus || "active",
          activatedAt: mainPlan.selectedAt,
          features: [
            "Credit monitoring",
            "Monthly credit reports",
            "Payment reminders",
            "Credit building tips",
            "Account management",
          ],
        }
        allPlans.push(mainPlanSubscription)
      }

      // Load boost plans
      const subscriptionsData = localStorage.getItem("takeoff_subscriptions")
      if (subscriptionsData) {
        const boostPlans = JSON.parse(subscriptionsData).filter(
          (sub: Subscription) => sub.status === "active" && sub.planType !== "main-plan",
        )
        allPlans = [...allPlans, ...boostPlans]
      }

      setAllSubscriptions(allPlans)
    }

    loadAllPlans()

    // Listen for storage changes to update in real-time
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "takeoff_subscriptions" || e.key === "takeoff_selected_plan") {
        loadAllPlans()
      }
    }

    window.addEventListener("storage", handleStorageChange)
    setIsLoading(false)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [router])

  // Separate main plan and boost plans
  const mainPlan = allSubscriptions.find((sub) => sub.planType === "main-plan")
  const boostPlans = allSubscriptions.filter((sub) => sub.planType !== "main-plan")

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header showAuth={false} />

      <main className="max-w-7xl mx-auto px-4 py-8 pt-24">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {userData?.firstName || "User"}!</h1>
            <p className="text-gray-600">Here's your credit building progress</p>
          </div>
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
                    <div className="text-4xl font-bold text-sky-500 mb-1">675</div>
                    <div className="text-sm text-sky-500 font-medium">+12 points this month</div>
                    <div className="text-xs text-gray-500">Last updated today</div>
                  </div>
                  <div className="relative w-32 h-32">
                    <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                      <circle cx="60" cy="60" r="50" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        stroke="#0ea5e9"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${(675 / 850) * 314} 314`}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-2xl font-bold">675</div>
                        <div className="text-xs text-gray-500">Good</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Credit Score History Chart */}
                <div className="bg-sky-50 rounded-lg p-4">
                  <div className="h-32 relative">
                    <svg className="w-full h-full" viewBox="0 0 400 120">
                      <path
                        d="M 20 80 Q 80 75 140 70 Q 200 65 260 60 Q 320 55 380 50"
                        stroke="#0ea5e9"
                        strokeWidth="3"
                        fill="none"
                      />
                      <circle cx="380" cy="50" r="4" fill="#0ea5e9" />
                    </svg>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-sky-500" />
                  Payment Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                    <div>
                      <div className="font-medium text-green-800">Last Payment</div>
                      <div className="text-sm text-green-600">$25.00 - June 15, 2024</div>
                    </div>
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>

                  <div className="p-4 bg-sky-50 rounded-lg border border-sky-200">
                    <div>
                      <div className="font-medium text-sky-800">Next Payment</div>
                      <div className="text-sm text-sky-600">$25.00 - July 15, 2024</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Account Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Credit Building Journey</span>
                      <span>75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">6</div>
                      <div className="text-sm text-gray-600">Months Active</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">100%</div>
                      <div className="text-sm text-gray-600">On-Time Payments</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* User Info */}
            <Card>
              <CardHeader>
                <CardTitle>Account Info</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div>
                    <div className="text-sm text-gray-500">Name</div>
                    <div className="font-medium">
                      {userData?.firstName} {userData?.lastName}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Email</div>
                    <div className="font-medium">{userData?.email}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Status</div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm font-medium text-green-600">Verified</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Current Plans */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Current Plans</CardTitle>
                  <Link href="/my-plans">
                    <Button variant="outline" size="sm" className="text-xs bg-transparent">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Main Plan */}
                  {mainPlan && (
                    <div className="p-4 bg-sky-50 rounded-lg border border-sky-200">
                      <div className="flex items-center justify-between mb-3">
                        <div className="font-semibold text-sky-800">{mainPlan.planName}</div>
                        <div className="text-xs bg-sky-100 text-sky-700 px-2 py-1 rounded-full font-medium">
                          Main Plan
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Type:</span>
                          <span className="font-medium capitalize">
                            {mainPlan.originalPlanType?.replace("-", " ") || "Credit Line"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <div className="flex items-center gap-1">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                            <span className="text-green-600 capitalize font-medium">{mainPlan.status}</span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Next Billing:</span>
                          <span className="font-medium">{new Date(mainPlan.nextBillingDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Activated:</span>
                          <span className="font-medium">{new Date(mainPlan.activatedAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="mt-4 pt-3 border-t border-sky-200">
                        <Link href="/payment">
                          <Button
                            size="sm"
                            className="bg-sky-500 hover:bg-sky-600 text-xs px-3 py-1 h-7 transition-colors"
                          >
                            Pay Now - $25.00
                          </Button>
                        </Link>
                      </div>
                    </div>
                  )}

                  {/* Additional Booster Plans */}
                  {boostPlans.length > 0 && (
                    <div className="space-y-3">
                      <div className="text-sm font-semibold text-gray-700 flex items-center gap-2 border-t pt-3">
                        <Star className="h-4 w-4 text-yellow-500" />
                        Additional Booster Plans ({boostPlans.length})
                      </div>
                      {boostPlans.map((boost, index) => (
                        <div key={boost.id} className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex items-center justify-between mb-3">
                            <div className="font-semibold text-green-800">{boost.planName}</div>
                            <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                              {boost.price}/month
                            </div>
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Type:</span>
                              <span className="font-medium capitalize">{boost.planType.replace("-", " ")}</span>
                            </div>
                            {boost.creditLimit && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Credit Limit:</span>
                                <span className="font-medium text-green-700">{boost.creditLimit}</span>
                              </div>
                            )}
                            {boost.loanAmount && (
                              <div className="flex justify-between">
                                <span className="text-gray-600">Loan Amount:</span>
                                <span className="font-medium text-green-700">{boost.loanAmount}</span>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <span className="text-gray-600">Status:</span>
                              <div className="flex items-center gap-1">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                                <span className="text-green-600 capitalize font-medium">{boost.status}</span>
                              </div>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Activated:</span>
                              <span className="font-medium">{new Date(boost.activatedAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                          <div className="mt-4 pt-3 border-t border-green-200">
                            <Link href="/payment">
                              <Button
                                size="sm"
                                className="bg-green-500 hover:bg-green-600 text-xs px-3 py-1 h-7 transition-colors"
                              >
                                Pay Now - {boost.price}
                              </Button>
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Add a Boost Prompt */}
            <Card className="bg-gradient-to-br from-sky-500 to-sky-600 text-white">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Upgrade or Add Another Boost to Your Credit!</h3>
                <p className="text-sm text-sky-100 mb-4">
                  Accelerate your credit building with additional services and faster results
                </p>
                <Link href="/add-boost">
                  <Button variant="secondary" size="sm" className="w-full hover:bg-gray-100 transition-colors">
                    Add a Boost
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/my-courses">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent hover:bg-gray-50 transition-colors"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    My Courses
                  </Button>
                </Link>
                <Link href="/transactions">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent hover:bg-gray-50 transition-colors"
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    View Transactions
                  </Button>
                </Link>
                <Link href="/payment-history">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent hover:bg-gray-50 transition-colors"
                  >
                    <History className="h-4 w-4 mr-2" />
                    Payment History
                  </Button>
                </Link>
                <Link href="/support">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent hover:bg-gray-50 transition-colors"
                  >
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Support
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-sky-500 rounded-full mt-2"></div>
                    <div>
                      <div className="text-sm font-medium">Credit score updated</div>
                      <div className="text-xs text-gray-500">2 hours ago</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <div className="text-sm font-medium">Payment processed</div>
                      <div className="text-xs text-gray-500">1 day ago</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <div className="text-sm font-medium">Account verified</div>
                      <div className="text-xs text-gray-500">3 days ago</div>
                    </div>
                  </div>
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

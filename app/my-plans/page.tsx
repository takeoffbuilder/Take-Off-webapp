"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Header from "@/components/header"
import { useRouter } from "next/navigation"
import { CreditCard, Shield, Star, Plus, Calendar, DollarSign, Trash2, AlertTriangle, X } from "lucide-react"
import Link from "next/link"
import FooterNavigation from "@/components/footer-navigation"

interface UserData {
  firstName: string
  lastName: string
  email: string
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

export default function MyPlansPage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [cancelMode, setCancelMode] = useState(false)
  const [plansToCancel, setPlansToCancel] = useState<string[]>([])
  const router = useRouter()

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

      setSubscriptions(allPlans)
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

  const mainPlan = subscriptions.find((sub) => sub.planType === "main-plan")
  const boostPlans = subscriptions.filter((sub) => sub.planType !== "main-plan")

  const getTotalMonthlyBilling = () => {
    return subscriptions.reduce((total, sub) => {
      const price = Number.parseFloat(sub.price.replace("$", ""))
      return total + price
    }, 0)
  }

  const getPlanIcon = (planType: string, originalPlanType?: string) => {
    const type = originalPlanType || planType
    if (type === "credit-line") {
      return <CreditCard className="h-5 w-5 text-sky-500" />
    } else if (type === "secured-loan") {
      return <Shield className="h-5 w-5 text-green-500" />
    }
    return <Star className="h-5 w-5 text-purple-500" />
  }

  const getPlanTypeLabel = (planType: string, originalPlanType?: string) => {
    const type = originalPlanType || planType
    if (type === "credit-line") return "Credit Line"
    if (type === "secured-loan") return "Secured Loan"
    if (type === "main-plan") return "Primary Credit Plan"
    return "Credit Booster"
  }

  const handleCancelToggle = (planId: string) => {
    setPlansToCancel((prev) => (prev.includes(planId) ? prev.filter((id) => id !== planId) : [...prev, planId]))
  }

  const handleConfirmCancel = () => {
    // Remove canceled plans from subscriptions
    const updatedSubscriptions = subscriptions.filter((sub) => !plansToCancel.includes(sub.id))

    // Update localStorage
    if (plansToCancel.includes("main-plan")) {
      // If main plan is canceled, remove it
      localStorage.removeItem("takeoff_selected_plan")
    }

    // Update boost plans in localStorage
    const remainingBoostPlans = updatedSubscriptions.filter((sub) => sub.planType !== "main-plan")
    localStorage.setItem("takeoff_subscriptions", JSON.stringify(remainingBoostPlans))

    // Update state
    setSubscriptions(updatedSubscriptions)
    setPlansToCancel([])
    setCancelMode(false)

    // Trigger storage event to update dashboard
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "takeoff_subscriptions",
        newValue: JSON.stringify(remainingBoostPlans),
      }),
    )

    if (plansToCancel.includes("main-plan")) {
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "takeoff_selected_plan",
          newValue: null,
        }),
      )
    }
  }

  const handleCancelMode = () => {
    if (cancelMode) {
      setPlansToCancel([])
    }
    setCancelMode(!cancelMode)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your plans...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header showAuth={false} />

      <main className="max-w-7xl mx-auto px-4 py-8 pt-24">
        {/* Back Button */}

        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Active Plans ({subscriptions.length})</h1>
            <p className="text-gray-600">Manage your active credit building plans</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">${getTotalMonthlyBilling().toFixed(2)}</div>
              <div className="text-sm text-gray-500">Total monthly billing</div>
            </div>
            {subscriptions.length > 0 && (
              <Button
                variant={cancelMode ? "destructive" : "outline"}
                onClick={handleCancelMode}
                className="flex items-center gap-2"
              >
                {cancelMode ? (
                  <>
                    <X className="h-4 w-4" />
                    Exit Cancel Mode
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    Cancel Plans
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Cancel Mode Alert */}
        {cancelMode && (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              Select the plans you want to cancel by checking the boxes, then click "Confirm Cancellation" to proceed.
              <strong className="block mt-1">Warning: This action cannot be undone.</strong>
            </AlertDescription>
          </Alert>
        )}

        {/* Confirm Cancel Button */}
        {cancelMode && plansToCancel.length > 0 && (
          <div className="mb-6">
            <Card className="border-red-200 bg-red-50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-red-800">
                      Cancel {plansToCancel.length} plan{plansToCancel.length > 1 ? "s" : ""}?
                    </h3>
                    <p className="text-sm text-red-600">
                      You are about to cancel {plansToCancel.length} plan{plansToCancel.length > 1 ? "s" : ""}. This
                      will stop all billing and remove access to these services.
                    </p>
                  </div>
                  <Button variant="destructive" onClick={handleConfirmCancel} className="ml-4">
                    Confirm Cancellation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Main Plan */}
        {mainPlan && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Primary Plan
            </h2>
            <Card className={`border-2 shadow-lg ${cancelMode ? "border-gray-300" : "border-sky-200"}`}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {cancelMode && (
                      <Checkbox
                        checked={plansToCancel.includes(mainPlan.id)}
                        onCheckedChange={() => handleCancelToggle(mainPlan.id)}
                        className="data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                      />
                    )}
                    {getPlanIcon(mainPlan.planType, mainPlan.originalPlanType)}
                    <div>
                      <CardTitle className="text-xl">{mainPlan.planName}</CardTitle>
                      <Badge variant="secondary" className="mt-1">
                        Main Plan
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-sky-600">{mainPlan.price}</div>
                    <div className="text-sm text-gray-500">/month</div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Plan Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Type:</span>
                        <span className="font-medium">
                          {getPlanTypeLabel(mainPlan.planType, mainPlan.originalPlanType)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <Badge variant="outline" className="text-green-600 border-green-200">
                          {mainPlan.status}
                        </Badge>
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
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Features</h4>
                    <ul className="space-y-1 text-sm">
                      {mainPlan.features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-sky-500 rounded-full"></div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                      {mainPlan.features.length > 4 && (
                        <li className="text-gray-500 text-xs">+{mainPlan.features.length - 4} more features</li>
                      )}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Active Booster Plans */}
        {boostPlans.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-500" />
              Active Booster Plans ({boostPlans.length})
            </h2>
            <div className="grid gap-6">
              {boostPlans.map((boost) => (
                <Card key={boost.id} className={`border-2 ${cancelMode ? "border-gray-300" : "border-green-200"}`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {cancelMode && (
                          <Checkbox
                            checked={plansToCancel.includes(boost.id)}
                            onCheckedChange={() => handleCancelToggle(boost.id)}
                            className="data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500"
                          />
                        )}
                        <div className="flex items-center gap-3">
                          {getPlanIcon(boost.planType)}
                          <div>
                            <CardTitle className="text-xl text-green-800">{boost.planName}</CardTitle>
                            <div className="text-lg text-green-600 font-medium">{getPlanTypeLabel(boost.planType)}</div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant="outline" className="text-green-600 border-green-200 px-3 py-1">
                          Booster Plan
                        </Badge>
                        <Badge className="bg-green-100 text-green-800 border-green-200 px-3 py-1">Active</Badge>
                        {!cancelMode && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                          >
                            <X className="h-4 w-4 mr-1" />
                            Cancel Boost
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Pricing Info */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-green-500" />
                          <span className="text-sm font-medium text-gray-600">Price:</span>
                        </div>
                        <div className="text-2xl font-bold text-green-600">{boost.price}/monthly</div>

                        {boost.creditLimit && (
                          <div>
                            <div className="text-sm text-gray-600 mb-1">Credit Limit:</div>
                            <div className="text-xl font-bold text-green-600">{boost.creditLimit}</div>
                          </div>
                        )}

                        {boost.loanAmount && (
                          <div>
                            <div className="text-sm text-gray-600 mb-1">Loan Amount:</div>
                            <div className="text-xl font-bold text-green-600">{boost.loanAmount}</div>
                          </div>
                        )}
                      </div>

                      {/* Billing Info */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-green-500" />
                          <span className="text-sm font-medium text-gray-600">Next Billing:</span>
                        </div>
                        <div className="text-lg font-semibold">
                          {new Date(boost.nextBillingDate).toLocaleDateString()}
                        </div>

                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-600">Billing:</span>
                        </div>
                        <div className="text-sm capitalize">{boost.billingFrequency}</div>

                        <div className="text-sm text-gray-600">
                          Activated: {new Date(boost.activatedAt).toLocaleDateString()}
                        </div>
                      </div>

                      {/* Features */}
                      <div>
                        <h5 className="font-medium text-sm mb-3">Features:</h5>
                        <div className="flex flex-wrap gap-2">
                          {boost.features.slice(0, 7).map((feature, featureIndex) => (
                            <Badge
                              key={featureIndex}
                              variant="outline"
                              className="text-xs text-green-700 border-green-200"
                            >
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* No Plans Message */}
        {subscriptions.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Active Plans</h3>
            <p className="text-gray-600 mb-6">You don't have any active credit building plans yet.</p>
            <Link href="/services">
              <Button className="bg-sky-500 hover:bg-sky-600">Choose Your Plan</Button>
            </Link>
          </div>
        )}

        {/* Add More Plans CTA */}
        {subscriptions.length > 0 && !cancelMode && (
          <div className="text-center">
            <Card className="bg-gradient-to-br from-sky-500 to-sky-600 text-white border-0">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">Supercharge Your Credit Building</h3>
                <p className="text-sky-100 mb-6 max-w-2xl mx-auto">
                  Add more booster plans to diversify your credit profile and accelerate your score improvements even
                  faster.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/add-boost">
                    <Button variant="secondary" size="lg" className="px-8">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Another Boost
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button
                      variant="outline"
                      size="lg"
                      className="px-8 bg-transparent border-white text-white hover:bg-white hover:text-sky-600"
                    >
                      <Calendar className="h-4 w-4 mr-2" />
                      View Dashboard
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Billing Summary */}
        {subscriptions.length > 0 && !cancelMode && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-500" />
                  Billing Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {subscriptions.map((sub) => (
                    <div
                      key={sub.id}
                      className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0"
                    >
                      <div>
                        <div className="font-medium">{sub.planName}</div>
                        <div className="text-sm text-gray-500">
                          {sub.planType === "main-plan" ? "Primary Plan" : "Booster Plan"}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{sub.price}/month</div>
                        <div className="text-sm text-gray-500">
                          Next: {new Date(sub.nextBillingDate).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-between items-center pt-3 border-t border-gray-200 font-semibold">
                    <div>Total Monthly</div>
                    <div className="text-xl text-sky-600">${getTotalMonthlyBilling().toFixed(2)}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <FooterNavigation />
    </div>
  )
}

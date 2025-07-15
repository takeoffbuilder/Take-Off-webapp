"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import { useRouter } from "next/navigation"
import { CheckCircle, CreditCard, Shield, Star, DollarSign, ArrowRight } from "lucide-react"
import Link from "next/link"

interface PlanDetails {
  planName: string
  planType: string
  price: string
  billingFrequency: string
  creditLimit?: string
  loanAmount?: string
  features: string[]
}

export default function BoostConfirmationPage() {
  const [planDetails, setPlanDetails] = useState<PlanDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isConfirming, setIsConfirming] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const authData = localStorage.getItem("takeoff_auth")
    if (!authData) {
      router.push("/signin")
      return
    }

    // Get plan details from localStorage
    const storedPlan = localStorage.getItem("takeoff_pending_boost")
    if (storedPlan) {
      const parsedPlan = JSON.parse(storedPlan)
      setPlanDetails({
        planName: parsedPlan.planName,
        planType: parsedPlan.planType,
        price: parsedPlan.price,
        billingFrequency: parsedPlan.billingFrequency || "monthly",
        creditLimit: parsedPlan.creditLimit,
        loanAmount: parsedPlan.loanAmount,
        features: parsedPlan.features || getPlanFeatures(parsedPlan.planType, parsedPlan.planName),
      })
    } else {
      router.push("/add-boost")
      return
    }

    setIsLoading(false)
  }, [router])

  const getPlanFeatures = (planType: string, planName: string): string[] => {
    if (planType === "credit-line") {
      if (planName.includes("Starter")) {
        return [
          "$1,500 credit line",
          "Monthly credit reporting",
          "Basic credit monitoring",
          "Mobile app access",
          "Email support",
          "Automatic payments",
        ]
      } else if (planName.includes("Power")) {
        return [
          "$2,500 credit line",
          "Tri-bureau credit reporting",
          "Advanced credit monitoring",
          "Credit score alerts",
          "Priority support",
          "Financial education resources",
          "Rent payment reporting",
        ]
      } else if (planName.includes("Max")) {
        return [
          "$3,500 credit line",
          "Tri-bureau reporting",
          "Real-time credit monitoring",
          "Credit coaching sessions",
          "Dedicated support",
          "Identity theft protection",
          "Credit dispute assistance",
          "Utility bill reporting",
        ]
      }
    } else if (planType === "secured-loan") {
      if (planName.includes("Starter")) {
        return [
          "$1,500 secured loan",
          "12-24 month terms",
          "Monthly credit reporting",
          "Fixed interest rate",
          "Automatic payments",
          "Email support",
        ]
      } else if (planName.includes("Power")) {
        return [
          "$2,500 secured loan",
          "12-36 month terms",
          "Tri-bureau credit reporting",
          "Competitive interest rate",
          "Flexible payment options",
          "Priority support",
          "Credit education resources",
        ]
      } else if (planName.includes("Max")) {
        return [
          "$3,500 secured loan",
          "12-48 month terms",
          "Tri-bureau reporting",
          "Best interest rates",
          "Custom payment plans",
          "Dedicated support",
          "Credit coaching included",
          "Early payoff options",
        ]
      }
    }

    return [
      "Enhanced credit monitoring",
      "Priority customer support",
      "Advanced credit tools",
      "Personalized recommendations",
    ]
  }

  const getPlanIcon = (planType: string) => {
    if (planType === "credit-line") {
      return <CreditCard className="h-8 w-8 text-sky-500" />
    } else if (planType === "secured-loan") {
      return <Shield className="h-8 w-8 text-green-500" />
    }
    return <Star className="h-8 w-8 text-purple-500" />
  }

  const getPlanTypeLabel = (planType: string) => {
    if (planType === "credit-line") return "Credit Line Booster"
    if (planType === "secured-loan") return "Secured Loan Booster"
    return "Credit Booster"
  }

  const handleConfirmPlan = async () => {
    if (!planDetails) return

    setIsConfirming(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create subscription object
      const newSubscription = {
        id: `boost-${Date.now()}`,
        planName: planDetails.planName,
        planType: planDetails.planType,
        price: planDetails.price,
        billingFrequency: planDetails.billingFrequency,
        nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        status: "active",
        activatedAt: new Date().toISOString(),
        creditLimit: planDetails.creditLimit,
        loanAmount: planDetails.loanAmount,
        features: planDetails.features,
      }

      // Get existing subscriptions
      const existingSubscriptions = JSON.parse(localStorage.getItem("takeoff_subscriptions") || "[]")

      // Add new subscription
      const updatedSubscriptions = [...existingSubscriptions, newSubscription]

      // Save to localStorage
      localStorage.setItem("takeoff_subscriptions", JSON.stringify(updatedSubscriptions))

      // Clean up pending boost
      localStorage.removeItem("takeoff_pending_boost")

      // Trigger storage event to update dashboard
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "takeoff_subscriptions",
          newValue: JSON.stringify(updatedSubscriptions),
        }),
      )

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Error confirming plan:", error)
      setIsConfirming(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading confirmation details...</p>
        </div>
      </div>
    )
  }

  if (!planDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Plan Not Found</h1>
          <p className="text-gray-600 mb-6">We couldn't find the plan details.</p>
          <Link href="/add-boost">
            <Button>Choose a Plan</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showAuth={false} />

      <main className="max-w-4xl mx-auto px-4 py-8 pt-24">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Confirm Your Booster Plan</h1>
          <p className="text-gray-600">Review your selection and confirm to activate your new credit booster</p>
        </div>

        {/* Plan Details Card */}
        <Card className="mb-8 border-2 border-sky-200 shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {getPlanIcon(planDetails.planType)}
                <div>
                  <CardTitle className="text-2xl">{planDetails.planName}</CardTitle>
                  <Badge variant="secondary" className="mt-1">
                    {getPlanTypeLabel(planDetails.planType)}
                  </Badge>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-sky-600">{planDetails.price}</div>
                <div className="text-sm text-gray-500">per month</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Plan Benefits */}
              <div>
                <h3 className="text-lg font-semibold mb-4">What's Included</h3>
                <ul className="space-y-3">
                  {planDetails.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Plan Details */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Plan Details</h3>
                <div className="space-y-3">
                  {planDetails.creditLimit && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Credit Limit</span>
                      <span className="font-semibold text-green-600">{planDetails.creditLimit}</span>
                    </div>
                  )}
                  {planDetails.loanAmount && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Loan Amount</span>
                      <span className="font-semibold text-green-600">{planDetails.loanAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600">Billing Frequency</span>
                    <span className="font-semibold capitalize">{planDetails.billingFrequency}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">First Payment</span>
                    <span className="font-semibold">Today</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600">Next Payment</span>
                    <span className="font-semibold">
                      {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Billing Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-green-500" />
              Billing Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Plan Cost</span>
                <span className="font-semibold">{planDetails.price}/month</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Setup Fee</span>
                <span className="font-semibold text-green-600">$0.00</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total Today</span>
                  <span className="text-2xl font-bold text-sky-600">{planDetails.price}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/add-boost">
            <Button variant="outline" size="lg" className="px-8 bg-transparent">
              Back to Plans
            </Button>
          </Link>
          <Button
            size="lg"
            className="px-8 bg-sky-500 hover:bg-sky-600"
            onClick={handleConfirmPlan}
            disabled={isConfirming}
          >
            {isConfirming ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Activating Plan...
              </>
            ) : (
              <>
                Confirm & Activate Plan
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>

        {/* Terms Notice */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            By confirming, you agree to our{" "}
            <Link href="/terms" className="text-sky-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-sky-600 hover:underline">
              Privacy Policy
            </Link>
            . Your first payment will be processed today.
          </p>
        </div>
      </main>
    </div>
  )
}

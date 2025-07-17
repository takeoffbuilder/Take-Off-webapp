"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import { useRouter, useSearchParams } from "next/navigation"
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

const PlanConfirmationPage = () => {
  const [planDetails, setPlanDetails] = useState<PlanDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isConfirming, setIsConfirming] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Check if user is authenticated
    const authData = localStorage.getItem("takeoff_auth")
    if (!authData) {
      router.push("/signin")
      return
    }

    // Get plan details from URL params
    const planType = searchParams.get("plan")
    const planName = searchParams.get("name")
    const price = searchParams.get("price")

    if (planType && planName && price) {
      // Create plan details from URL params
      const details: PlanDetails = {
        planName: decodeURIComponent(planName),
        planType,
        price: decodeURIComponent(price),
        billingFrequency: "monthly",
        features: getPlanFeatures(planType),
      }

      // Add specific details based on plan type
      if (planType === "credit-line") {
        details.creditLimit = "$1,000"
      } else if (planType === "secured-loan") {
        details.loanAmount = "$500"
      }

      setPlanDetails(details)
    } else {
      router.push("/plans")
      return
    }

    setIsLoading(false)
  }, [router, searchParams])

  const getPlanFeatures = (planType: string): string[] => {
    switch (planType) {
      case "credit-line":
        return [
          "Secured credit line up to $1,000",
          "Monthly credit reporting to all 3 bureaus",
          "No annual fees or hidden costs",
          "Build positive credit history",
          "Online account management",
          "24/7 customer support",
        ]
      case "secured-loan":
        return [
          "Secured installment loan up to $500",
          "Fixed monthly payments",
          "Credit bureau reporting",
          "Improve credit mix diversity",
          "Flexible repayment terms",
          "Credit building education",
        ]
      default:
        return [
          "Enhanced credit monitoring",
          "Priority customer support",
          "Advanced credit building tools",
          "Personalized recommendations",
          "Monthly progress reports",
        ]
    }
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
    if (planType === "credit-line") return "Credit Line Plan"
    if (planType === "secured-loan") return "Secured Loan Plan"
    return "Credit Building Plan"
  }

  const handleConfirmPlan = async () => {
    if (!planDetails) return

    setIsConfirming(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create main plan object
      const mainPlan = {
        planName: planDetails.planName,
        planType: planDetails.planType,
        selectedAt: new Date().toISOString(),
        paymentStatus: "active",
        nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      }

      // Save main plan
      localStorage.setItem("takeoff_selected_plan", JSON.stringify(mainPlan))

      // Create subscription entry for the main plan
      const mainPlanSubscription = {
        id: "main-plan",
        planName: planDetails.planName,
        planType: "main-plan",
        originalPlanType: planDetails.planType,
        price: planDetails.price,
        billingFrequency: planDetails.billingFrequency,
        nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        status: "active",
        activatedAt: new Date().toISOString(),
        creditLimit: planDetails.creditLimit,
        loanAmount: planDetails.loanAmount,
        features: planDetails.features,
      }

      // Get existing subscriptions and add main plan
      const existingSubscriptions = JSON.parse(localStorage.getItem("takeoff_subscriptions") || "[]")
      const updatedSubscriptions = [
        mainPlanSubscription,
        ...existingSubscriptions.filter((sub: any) => sub.id !== "main-plan"),
      ]

      localStorage.setItem("takeoff_subscriptions", JSON.stringify(updatedSubscriptions))

      // Trigger storage events
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "takeoff_selected_plan",
          newValue: JSON.stringify(mainPlan),
        }),
      )

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
          <Link href="/plans">
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Confirm Your Plan Selection</h1>
          <p className="text-gray-600">Review your selection and confirm to start building your credit</p>
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
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
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
          <Link href="/plans">
            <Button variant="outline" size="lg" className="px-8 bg-transparent hover:bg-gray-50 transition-colors">
              Back to Plans
            </Button>
          </Link>
          <Button
            size="lg"
            className="px-8 bg-sky-500 hover:bg-sky-600 transition-colors disabled:opacity-50"
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
                Confirm & Start Building Credit
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

export default PlanConfirmationPage

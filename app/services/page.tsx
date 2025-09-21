"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Check, Star, Zap, Shield, TrendingUp, Users, Award } from "lucide-react"

interface Plan {
  id: string
  name: string
  price: number
  builderAmount: string
  description: string
  features: string[]
  popular?: boolean
  premium?: boolean
}

export default function ServicesPage() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Check if user already has a selected plan and redirect
  useEffect(() => {
    const existingPlan = localStorage.getItem("takeoff_selected_plan")
    if (existingPlan) {
      // User already has a plan selected, redirect to personal info
      router.push("/personal-info")
      return
    }

    // Check if user is authenticated
    const isAuth = localStorage.getItem("takeoff_auth")
    if (!isAuth) {
      router.push("/signin")
      return
    }
  }, [router])

  const plans: Plan[] = [
    {
      id: "starter",
      name: "Starter Boost",
      price: 15,
      builderAmount: "$1500 Builder Account",
      description: "Perfect for beginners starting their credit journey",
      features: [
        "Credit monitoring",
        "Basic credit education",
        "Monthly credit score updates",
        "Email support",
        "Mobile app access",
      ],
    },
    {
      id: "power",
      name: "Power Boost",
      price: 25,
      builderAmount: "$2500 Builder Account",
      description: "Accelerate your credit building with advanced tools",
      features: [
        "Everything in Starter",
        "Advanced credit insights",
        "Personalized recommendations",
        "Priority support",
        "Credit dispute assistance",
        "Financial planning tools",
      ],
      popular: true,
    },
    {
      id: "max",
      name: "Max Boost",
      price: 35,
      builderAmount: "$3500 Builder Account",
      description: "Maximum credit building power for serious users",
      features: [
        "Everything in Power",
        "Dedicated credit advisor",
        "Expedited dispute resolution",
        "Advanced analytics dashboard",
        "Custom credit strategies",
        "VIP customer support",
      ],
    },
    {
      id: "blaster",
      name: "Blaster Boost",
      price: 50,
      builderAmount: "$5000 Builder Account",
      description: "Premium credit building for ambitious goals",
      features: [
        "Everything in Max",
        "Premium credit monitoring",
        "Identity theft protection",
        "Credit optimization strategies",
        "Quarterly strategy reviews",
        "Direct lender relationships",
      ],
      premium: true,
    },
    {
      id: "super",
      name: "Super Boost",
      price: 100,
      builderAmount: "$10000 Builder Account",
      description: "Super-charged credit building for maximum impact",
      features: [
        "Everything in Blaster",
        "White-glove service",
        "Custom credit products",
        "Investment opportunities",
        "Wealth building strategies",
        "Personal finance concierge",
      ],
      premium: true,
    },
    {
      id: "star",
      name: "Star Boost",
      price: 150,
      builderAmount: "$20000 Builder Account",
      description: "Ultimate credit and wealth building experience",
      features: [
        "Everything in Super",
        "Private banking access",
        "Exclusive investment deals",
        "Tax optimization strategies",
        "Estate planning assistance",
        "24/7 dedicated support team",
      ],
      premium: true,
    },
  ]

  const handlePlanSelect = async (planId: string) => {
    setSelectedPlan(planId)
    setIsLoading(true)

    try {
      // Store selected plan
      localStorage.setItem(
        "takeoff_selected_plan",
        JSON.stringify({
          plan: planId,
          selectedAt: new Date().toISOString(),
        }),
      )

      // Analytics event
      if (typeof window !== "undefined" && (window as any).gtag) {
        ;(window as any).gtag("event", "plan_selected", {
          event_category: "conversion",
          event_label: planId,
          value: plans.find((p) => p.id === planId)?.price || 0,
        })
      }

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Redirect to personal info
      router.push("/personal-info")
    } catch (error) {
      console.error("Error selecting plan:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push("/")
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="inline-flex items-center text-sky-400 hover:text-sky-300 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </button>
          <h1 className="text-4xl font-bold text-white mb-4">Choose Your Credit Building Plan</h1>
          <p className="text-xl text-gray-300 mb-6">
            Select the plan that best fits your credit building goals and budget
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Step 1 of 3</span>
            <span>33% Complete</span>
          </div>
          <Progress value={33} className="h-2 bg-gray-800" />
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {plans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative bg-gray-900 border-gray-700 hover:border-sky-500 transition-all duration-300 ${
                selectedPlan === plan.id ? "border-sky-500 ring-2 ring-sky-500/20" : ""
              } ${plan.premium ? "border-yellow-500/50" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-sky-500 text-white px-3 py-1">Most Popular</Badge>
                </div>
              )}
              {plan.premium && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-yellow-500 text-black px-3 py-1 font-semibold">Premium</Badge>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4">
                  {plan.premium ? (
                    <Star className="h-12 w-12 text-yellow-500" />
                  ) : plan.popular ? (
                    <Zap className="h-12 w-12 text-sky-500" />
                  ) : (
                    <Shield className="h-12 w-12 text-gray-400" />
                  )}
                </div>
                <CardTitle className="text-2xl font-bold text-white">{plan.name}</CardTitle>
                <div className="text-3xl font-bold text-sky-400 mb-2">
                  ${plan.price}
                  <span className="text-lg text-gray-400 font-normal">/month</span>
                </div>
                <div className="text-lg font-semibold text-yellow-400 mb-2">{plan.builderAmount}</div>
                <CardDescription className="text-gray-300">{plan.description}</CardDescription>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="h-5 w-5 text-sky-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handlePlanSelect(plan.id)}
                  disabled={isLoading}
                  className={`w-full py-3 text-lg font-semibold transition-all duration-300 ${
                    plan.premium
                      ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                      : plan.popular
                        ? "bg-sky-500 hover:bg-sky-600 text-white"
                        : "bg-gray-700 hover:bg-gray-600 text-white"
                  } ${selectedPlan === plan.id ? "ring-2 ring-offset-2 ring-offset-gray-900" : ""}`}
                >
                  {isLoading && selectedPlan === plan.id ? "Selecting..." : "Get Started"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Why Choose Take Off?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-sky-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Proven Results</h4>
              <p className="text-gray-300 text-sm">
                Our users see an average credit score increase of 100+ points within 6 months
              </p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 text-sky-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Expert Support</h4>
              <p className="text-gray-300 text-sm">
                Get guidance from certified credit counselors and financial experts
              </p>
            </div>
            <div className="text-center">
              <Award className="h-12 w-12 text-sky-400 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-white mb-2">Industry Leading</h4>
              <p className="text-gray-300 text-sm">
                Trusted by over 100,000 users and rated #1 in customer satisfaction
              </p>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 p-4 bg-gray-900 border border-gray-700 rounded-lg">
          <p className="text-gray-300 text-sm text-center">
            🔒 Your information is encrypted and secure. We use bank-level security to protect your data.
          </p>
        </div>
      </div>
    </div>
  )
}

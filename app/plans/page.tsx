"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import { Check, Star, CreditCard, Shield, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

export default function PlansPage() {
  const [selectedCategory, setSelectedCategory] = useState<"credit-line" | "secured-loan">("credit-line")
  const router = useRouter()

  const creditLineOptions = [
    {
      name: "Starter Boost",
      creditLimit: "$1,500",
      price: "$15",
      period: "/month",
      description: "Perfect for building your first credit line",
      features: [
        "$1,500 credit line",
        "Monthly credit reporting",
        "1 bureau credit report access",
        "Basic credit monitoring",
        "Mobile app access",
        "Email support",
        "Automatic payments",
      ],
      popular: false,
      buttonText: "Choose Starter",
      gradient: "from-blue-500 to-blue-600",
      borderColor: "border-blue-200",
    },
    {
      name: "Power Boost",
      creditLimit: "$2,500",
      price: "$25",
      period: "/month",
      description: "Accelerate your credit building journey",
      features: [
        "$2,500 credit line",
        "Tri-bureau credit reporting",
        "2 bureau credit report access",
        "Advanced credit monitoring",
        "Credit score alerts",
        "Priority support",
        "Financial education resources",
        "Rent payment reporting",
      ],
      popular: true,
      buttonText: "Choose Power",
      gradient: "from-sky-500 to-sky-600",
      borderColor: "border-sky-300",
    },
    {
      name: "Max Boost",
      creditLimit: "$3,500",
      price: "$35",
      period: "/month",
      description: "Maximum credit building power",
      features: [
        "$3,500 credit line",
        "Tri-bureau reporting",
        "3 bureau credit report access",
        "Real-time credit monitoring",
        "Credit coaching sessions",
        "Dedicated support",
        "Identity theft protection",
        "Credit dispute assistance",
        "Utility bill reporting",
      ],
      popular: false,
      buttonText: "Choose Max",
      gradient: "from-purple-500 to-purple-600",
      borderColor: "border-purple-200",
    },
  ]

  const securedLoanOptions = [
    {
      name: "Starter Boost",
      creditLimit: "$1,500",
      price: "$15",
      period: "/month",
      description: "Build credit with a secured installment loan",
      features: [
        "$1,500 secured loan",
        "12-24 month terms",
        "Monthly credit reporting",
        "1 bureau credit report access",
        "Fixed interest rate",
        "Automatic payments",
        "Email support",
      ],
      popular: false,
      buttonText: "Choose Starter",
      gradient: "from-green-500 to-green-600",
      borderColor: "border-green-200",
    },
    {
      name: "Power Boost",
      creditLimit: "$2,500",
      price: "$25",
      period: "/month",
      description: "Stronger credit building with higher loan amount",
      features: [
        "$2,500 secured loan",
        "12-36 month terms",
        "Tri-bureau credit reporting",
        "2 bureau credit report access",
        "Competitive interest rate",
        "Flexible payment options",
        "Priority support",
        "Credit education resources",
      ],
      popular: true,
      buttonText: "Choose Power",
      gradient: "from-emerald-500 to-emerald-600",
      borderColor: "border-emerald-200",
    },
    {
      name: "Max Boost",
      creditLimit: "$3,500",
      price: "$35",
      period: "/month",
      description: "Maximum loan amount for serious credit builders",
      features: [
        "$3,500 secured loan",
        "12-48 month terms",
        "Tri-bureau reporting",
        "3 bureau credit report access",
        "Best interest rates",
        "Custom payment plans",
        "Dedicated support",
        "Credit coaching included",
        "Early payoff options",
      ],
      popular: false,
      buttonText: "Choose Max",
      gradient: "from-teal-500 to-teal-600",
      borderColor: "border-teal-200",
    },
  ]

  const handleSelectPlan = (planName: string, planType: string) => {
    const currentOptions = selectedCategory === "credit-line" ? creditLineOptions : securedLoanOptions
    const selectedOption = currentOptions.find((option) => option.name === planName)
    if (!selectedOption) return

    // Check if user is authenticated
    const authData = localStorage.getItem("takeoff_auth")
    if (!authData) {
      // Pass plan details to sign-in page via URL params
      const params = new URLSearchParams({
        plan: planName,
        type: selectedCategory,
        price: selectedOption.price,
        limit: selectedOption.creditLimit || "",
      })
      router.push(`/signin?${params.toString()}`)
      return
    }

    const limit = selectedOption.creditLimit

    // If already authenticated, go to plan confirmation page
    const params = new URLSearchParams({
      plan: planName,
      type: selectedCategory,
      price: selectedOption.price,
      limit: limit || "",
    })

    router.push(`/plan-confirmation?${params.toString()}`)
  }

  const currentOptions = selectedCategory === "credit-line" ? creditLineOptions : securedLoanOptions

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8 pt-24">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Credit Building Plan</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select the perfect credit building solution for your financial goals. All plans include tri-bureau reporting
            and no hidden fees.
          </p>
        </div>

        {/* Service Category Toggle */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-full p-1 shadow-lg border">
            <div className="flex">
              <button
                onClick={() => setSelectedCategory("credit-line")}
                className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === "credit-line"
                    ? "bg-sky-500 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <CreditCard className="h-4 w-4" />
                Credit Line Booster
              </button>
              <button
                onClick={() => setSelectedCategory("secured-loan")}
                className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === "secured-loan"
                    ? "bg-sky-500 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Shield className="h-4 w-4" />
                Secured Loan Booster
              </button>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {currentOptions.map((plan, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden ${
                plan.popular ? `ring-2 ring-sky-400 shadow-xl ${plan.borderColor}` : `border-2 ${plan.borderColor}`
              } hover:shadow-xl transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-5 py-2 rounded-full font-semibold text-sm shadow-lg border-2 border-white flex items-center gap-1">
                    <Star className="h-4 w-4 fill-current" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className={`h-1 bg-gradient-to-r ${plan.gradient}`}></div>

              <CardHeader className="text-center pb-4 pt-10">
                <CardTitle className="text-xl font-bold mb-2">{plan.name}</CardTitle>
                <div className="mb-4">
                  <div className="text-3xl font-bold text-gray-900 mb-1">{plan.creditLimit}</div>
                  <div className="text-sm text-gray-500 mb-3">
                    {selectedCategory === "credit-line" ? "Credit Line" : "Loan Amount"}
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-2xl font-bold text-sky-600">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{plan.description}</p>
              </CardHeader>

              <CardContent className="pt-0">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className="h-4 w-4 text-sky-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSelectPlan(plan.name, selectedCategory)}
                  className={`w-full bg-gradient-to-r ${plan.gradient} hover:opacity-90 text-white py-3 rounded-full font-medium flex items-center justify-center gap-2 transition-all`}
                >
                  {plan.buttonText}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 bg-gradient-to-r from-sky-500 to-sky-600 rounded-2xl p-8 text-white max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4">Ready to Take Off?</h2>
          <p className="text-sky-100 mb-6 max-w-2xl mx-auto">
            Join thousands of users who have successfully built their credit with Take Off. Choose your plan above and
            start your journey today!
          </p>
        </div>
      </main>
    </div>
  )
}

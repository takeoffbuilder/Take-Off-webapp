"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/header"
import { Check, CreditCard, Shield, ArrowRight } from "lucide-react"
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
        "1 Bureau Credit Report Access",
        "Basic credit monitoring",
        "Mobile app access",
        "Email support",
        "Automatic payments",
      ],
      buttonText: "Choose Starter",
      buttonColor: "bg-blue-500 hover:bg-blue-600",
      borderColor: "border-blue-500",
      checkColor: "text-blue-400",
      priceColor: "text-blue-400",
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
        "2 Bureau Credit Report Access",
        "Advanced credit monitoring",
        "Credit score alerts",
        "Priority support",
        "Financial education resources",
        "Rent payment reporting",
      ],
      buttonText: "Choose Power",
      buttonColor: "bg-cyan-500 hover:bg-cyan-600",
      borderColor: "border-cyan-400",
      checkColor: "text-cyan-400",
      priceColor: "text-cyan-400",
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
        "3 Bureau Credit Report Access",
        "Real-time credit monitoring",
        "Credit coaching sessions",
        "Dedicated support",
        "Identity theft protection",
        "Credit dispute assistance",
        "Utility bill reporting",
      ],
      buttonText: "Choose Max",
      buttonColor: "bg-purple-500 hover:bg-purple-600",
      borderColor: "border-purple-500",
      checkColor: "text-purple-400",
      priceColor: "text-purple-400",
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
        "1 Bureau Credit Report Access",
        "Fixed interest rate",
        "Automatic payments",
        "Email support",
      ],
      buttonText: "Choose Starter",
      buttonColor: "bg-green-500 hover:bg-green-600",
      borderColor: "border-green-500",
      checkColor: "text-green-400",
      priceColor: "text-green-400",
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
        "2 Bureau Credit Report Access",
        "Competitive interest rate",
        "Flexible payment options",
        "Priority support",
        "Credit education resources",
      ],
      buttonText: "Choose Power",
      buttonColor: "bg-emerald-500 hover:bg-emerald-600",
      borderColor: "border-emerald-400",
      checkColor: "text-emerald-400",
      priceColor: "text-emerald-400",
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
        "3 Bureau Credit Report Access",
        "Best interest rates",
        "Custom payment plans",
        "Dedicated support",
        "Credit coaching included",
        "Early payoff options",
      ],
      buttonText: "Choose Max",
      buttonColor: "bg-teal-500 hover:bg-teal-600",
      borderColor: "border-teal-500",
      checkColor: "text-teal-400",
      priceColor: "text-teal-400",
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
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
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
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
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
              className={`relative overflow-hidden bg-slate-800 border-2 ${plan.borderColor} hover:shadow-2xl transition-all duration-300`}
            >
              <CardHeader className="text-center pb-6 pt-8">
                <CardTitle className="text-2xl font-bold mb-4 text-white">{plan.name}</CardTitle>
                <div className="mb-4">
                  <div className="text-4xl font-bold text-white mb-2">{plan.creditLimit}</div>
                  <div className="text-gray-400 text-sm mb-4">
                    {selectedCategory === "credit-line" ? "Credit Line" : "Loan Amount"}
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <span className={`text-3xl font-bold ${plan.priceColor}`}>{plan.price}</span>
                    <span className="text-gray-400">{plan.period}</span>
                  </div>
                </div>
                <p className="text-gray-300 text-sm">{plan.description}</p>
              </CardHeader>

              <CardContent className="pt-0 px-6 pb-6">
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-3">
                      <Check className={`h-5 w-5 ${plan.checkColor} flex-shrink-0 mt-0.5`} />
                      <span className="text-gray-200 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSelectPlan(plan.name, selectedCategory)}
                  className={`w-full ${plan.buttonColor} text-white py-3 rounded-full font-medium flex items-center justify-center gap-2 transition-all transform hover:scale-105`}
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

"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import { useRouter } from "next/navigation"
import { Check, Star, Shield, ArrowRight, TrendingUp, CreditCard } from "lucide-react"

interface UserData {
  firstName: string
  lastName: string
  email: string
}

interface SelectedPlan {
  planName: string
  planType: string
  price: string
}

export default function AddBoostPage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [currentPlan, setCurrentPlan] = useState<SelectedPlan | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState<"credit-line" | "secured-loan">("credit-line")

  useEffect(() => {
    // Check if user is authenticated
    const authData = localStorage.getItem("takeoff_auth")
    const storedUser = localStorage.getItem("takeoff_user")
    const planData = localStorage.getItem("takeoff_selected_plan")

    if (!authData) {
      router.push("/signin")
      return
    }

    if (storedUser) {
      setUserData(JSON.parse(storedUser))
    }

    if (planData) {
      setCurrentPlan(JSON.parse(planData))
    }

    setIsLoading(false)
  }, [router])

  const creditLineOptions = [
    {
      name: "Starter Boost",
      creditLimit: "$1,500",
      price: "$25",
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
      buttonText: "Add This Boost",
      gradient: "from-blue-500 to-blue-600",
      borderColor: "border-blue-200",
    },
    {
      name: "Power Boost",
      creditLimit: "$2,500",
      price: "$35",
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
      buttonText: "Add This Boost",
      gradient: "from-sky-500 to-sky-600",
      borderColor: "border-sky-300",
    },
    {
      name: "Max Boost",
      creditLimit: "$3,500",
      price: "$45",
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
      buttonText: "Add This Boost",
      gradient: "from-purple-500 to-purple-600",
      borderColor: "border-purple-200",
    },
  ]

  const securedLoanOptions = [
    {
      name: "Starter Boost",
      creditLimit: "$1,500",
      price: "$25",
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
      buttonText: "Add This Boost",
      gradient: "from-green-500 to-green-600",
      borderColor: "border-green-200",
    },
    {
      name: "Power Boost",
      creditLimit: "$2,500",
      price: "$35",
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
      buttonText: "Add This Boost",
      gradient: "from-emerald-500 to-emerald-600",
      borderColor: "border-emerald-200",
    },
    {
      name: "Max Boost",
      creditLimit: "$3,500",
      price: "$45",
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
      buttonText: "Add This Boost",
      gradient: "from-teal-500 to-teal-600",
      borderColor: "border-teal-200",
    },
  ]

  const currentOptions = selectedCategory === "credit-line" ? creditLineOptions : securedLoanOptions

  const handleSelectBoost = (planName: string, planType: string) => {
    const selectedOption = currentOptions.find((option) => option.name === planName)
    if (!selectedOption) return

    const limit = selectedOption.creditLimit

    // Store the selected boost/plan
    localStorage.setItem(
      "takeoff_pending_boost",
      JSON.stringify({
        planName: planName,
        planType: selectedCategory,
        price: selectedOption.price,
        billingFrequency: "monthly",
        creditLimit: selectedCategory === "credit-line" ? limit : undefined,
        loanAmount: selectedCategory === "secured-loan" ? limit : undefined,
        features: selectedOption.features,
        selectedAt: new Date().toISOString(),
      }),
    )

    // Redirect to boost confirmation
    router.push("/boost-confirmation")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading boost options...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showAuth={false} />

      <main className="max-w-7xl mx-auto px-4 py-8 pt-24">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Add Another Credit Building Plan, {userData?.firstName}!
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Supercharge your credit building by adding additional credit lines or secured loans to diversify your credit
            profile and accelerate your score improvements.
          </p>

          {/* Current Plan Display */}
          {currentPlan && (
            <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-800 px-4 py-2 rounded-full text-sm font-medium">
              <TrendingUp className="h-4 w-4" />
              Current Plan: {currentPlan.planName} ({currentPlan.price}/month)
            </div>
          )}
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

        {/* Boost Options Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 max-w-5xl mx-auto">
          {currentOptions.map((boost, index) => (
            <Card
              key={boost.name}
              className={`relative overflow-hidden h-full flex flex-col ${
                boost.popular ? `ring-2 ring-green-400 shadow-xl ${boost.borderColor}` : `border-2 ${boost.borderColor}`
              } hover:shadow-xl transition-all duration-300`}
            >
              {boost.popular && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-green-500 text-white px-3 py-1.5 rounded-full font-medium flex items-center gap-1 shadow-lg">
                    <Star className="h-3 w-3" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className={`h-1 bg-gradient-to-r ${boost.gradient}`}></div>

              <CardHeader className="text-center pb-4 pt-8 flex-shrink-0">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {selectedCategory === "credit-line" ? (
                    <CreditCard className="h-8 w-8 text-gray-600" />
                  ) : (
                    <Shield className="h-8 w-8 text-gray-600" />
                  )}
                </div>
                <CardTitle className="text-lg font-bold mb-2">{boost.name}</CardTitle>
                <div className="mb-4">
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <span className="text-2xl font-bold text-sky-600">{boost.price}</span>
                    <span className="text-gray-600">{boost.period}</span>
                  </div>
                  {boost.creditLimit && (
                    <div className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      {boost.creditLimit} Credit Limit
                    </div>
                  )}
                </div>
                <p className="text-gray-600 text-sm">{boost.description}</p>
              </CardHeader>

              <CardContent className="pt-0 flex-grow flex flex-col">
                <ul className="space-y-2 mb-6 flex-grow">
                  {boost.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSelectBoost(boost.name, selectedCategory)}
                  className={`w-full bg-gradient-to-r ${boost.gradient} hover:opacity-90 text-white py-3 rounded-full font-medium flex items-center justify-center gap-2 transition-all mt-auto`}
                >
                  {boost.buttonText}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="bg-white rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Why Add Credit Boosts?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-sky-500" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Faster Results</h3>
              <p className="text-gray-600">Accelerate your credit building with multiple reporting sources</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Comprehensive Coverage</h3>
              <p className="text-gray-600">Build credit from all aspects of your financial life</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Maximum Impact</h3>
              <p className="text-gray-600">Stack multiple boosts for the biggest credit score improvements</p>
            </div>
          </div>
        </div>

        {/* Bundle Offer */}
        <div className="bg-gradient-to-r from-sky-500 to-sky-600 rounded-2xl p-8 text-white text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Bundle & Save!</h2>
          <p className="text-xl text-sky-100 mb-6 max-w-2xl mx-auto">
            Add 2 or more boosts and save 20% on your additional services. The more you boost, the faster you build!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg" className="px-8">
              View Bundle Options
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 bg-transparent border-white text-white hover:bg-white hover:text-sky-600"
            >
              Contact Support
            </Button>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">Can I add multiple boosts to my account?</h3>
              <p className="text-gray-600">
                Yes! You can add as many boosts as you'd like. Each boost targets different aspects of your credit
                profile for maximum impact.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">How quickly will I see results from boosts?</h3>
              <p className="text-gray-600">
                Most boosts show results within 30-45 days. Rent reporting and utility boosts typically show the fastest
                improvements.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">Can I cancel a boost anytime?</h3>
              <p className="text-gray-600">
                Yes, you can cancel any boost at any time. The positive payment history will remain on your credit
                report even after cancellation.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">Do boosts work with all credit bureaus?</h3>
              <p className="text-gray-600">
                Most of our boosts report to all three major credit bureaus (Equifax, Experian, and TransUnion) for
                maximum impact.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

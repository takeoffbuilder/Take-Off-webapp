"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import { useRouter } from "next/navigation"
import { Check, Star, CreditCard, DollarSign, Shield, TrendingUp, ArrowRight } from "lucide-react"
import Link from "next/link"

interface UserData {
  firstName: string
  lastName: string
  email: string
  isVerified: boolean
}

export default function ServicesPage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<"credit-line" | "secured-loan">("credit-line")
  const [isLoading, setIsLoading] = useState(true)
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

    setIsLoading(false)
  }, [router])

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
        "Basic credit monitoring",
        "Mobile app access",
        "Email support",
        "Automatic payments",
      ],
      popular: false,
      buttonText: "Choose Starter",
      gradient: "from-blue-500 to-blue-600",
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
        "Advanced credit monitoring",
        "Credit score alerts",
        "Priority support",
        "Financial education resources",
        "Rent payment reporting",
      ],
      popular: true,
      buttonText: "Choose Power",
      gradient: "from-sky-500 to-sky-600",
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
    },
  ]

  const securedLoanOptions = [
    {
      name: "Starter Loan",
      loanAmount: "$1,500",
      price: "$15",
      period: "/month",
      description: "Build credit with a secured installment loan",
      features: [
        "$1,500 secured loan",
        "12-24 month terms",
        "Monthly credit reporting",
        "Fixed interest rate",
        "Automatic payments",
        "Email support",
      ],
      popular: false,
      buttonText: "Choose Starter",
      gradient: "from-green-500 to-green-600",
    },
    {
      name: "Power Loan",
      loanAmount: "$2,500",
      price: "$25",
      period: "/month",
      description: "Stronger credit building with higher loan amount",
      features: [
        "$2,500 secured loan",
        "12-36 month terms",
        "Tri-bureau credit reporting",
        "Competitive interest rate",
        "Flexible payment options",
        "Priority support",
        "Credit education resources",
      ],
      popular: true,
      buttonText: "Choose Power",
      gradient: "from-emerald-500 to-emerald-600",
    },
    {
      name: "Max Loan",
      loanAmount: "$3,500",
      price: "$35",
      period: "/month",
      description: "Maximum loan amount for serious credit builders",
      features: [
        "$3,500 secured loan",
        "12-48 month terms",
        "Tri-bureau reporting",
        "Best interest rates",
        "Custom payment plans",
        "Dedicated support",
        "Credit coaching included",
        "Early payoff options",
      ],
      popular: false,
      buttonText: "Choose Max",
      gradient: "from-teal-500 to-teal-600",
    },
  ]

  const handleSelectPlan = async (planName: string, planType: string) => {
    // Get the plan details for the URL
    const selectedOption = currentOptions.find((option) => option.name === planName)
    if (!selectedOption) return

    const limit = selectedCategory === "credit-line" ? selectedOption.creditLimit : selectedOption.loanAmount

    // Check if user is authenticated
    const authData = localStorage.getItem("takeoff_auth")
    if (!authData) {
      // Pass plan details to sign-in page via URL params
      const params = new URLSearchParams({
        plan: planName,
        type: planType,
        price: selectedOption.price,
        limit: limit || "",
      })
      router.push(`/signin?${params.toString()}`)
      return
    }

    // If already authenticated, redirect to personal info page with plan details
    const params = new URLSearchParams({
      plan: planName,
      type: planType,
      price: selectedOption.price,
      limit: limit || "",
    })

    router.push(`/personal-info?${params.toString()}`)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading services...</p>
        </div>
      </div>
    )
  }

  const currentOptions = selectedCategory === "credit-line" ? creditLineOptions : securedLoanOptions

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showAuth={false} />

      <main className="max-w-7xl mx-auto px-4 py-8 pt-24">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome, {userData?.firstName}! Choose Your Credit Building Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the perfect credit building solution for your financial goals. All plans include tri-bureau reporting
            and no hidden fees.
          </p>
        </div>

        {/* Service Category Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-white rounded-full p-2 shadow-lg">
            <div className="flex">
              <button
                onClick={() => setSelectedCategory("credit-line")}
                className={`px-8 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === "credit-line"
                    ? "bg-sky-500 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <CreditCard className="h-5 w-5 inline mr-2" />
                Credit Line Booster
              </button>
              <button
                onClick={() => setSelectedCategory("secured-loan")}
                className={`px-8 py-3 rounded-full font-medium transition-all ${
                  selectedCategory === "secured-loan"
                    ? "bg-sky-500 text-white shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Shield className="h-5 w-5 inline mr-2" />
                Secured Loan Booster
              </button>
            </div>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {currentOptions.map((plan, index) => (
            <Card
              key={index}
              className={`relative overflow-hidden ${
                plan.popular ? "ring-2 ring-sky-500 shadow-xl scale-105" : "shadow-lg"
              } hover:shadow-xl transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-sky-500 text-white px-4 py-1 rounded-full font-medium flex items-center gap-1">
                    <Star className="h-4 w-4" />
                    Most Popular
                  </Badge>
                </div>
              )}

              <div className={`h-2 bg-gradient-to-r ${plan.gradient}`}></div>

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="mt-4">
                  <div className="text-3xl font-bold text-gray-900 mb-1">
                    {selectedCategory === "credit-line" ? plan.creditLimit : plan.loanAmount}
                  </div>
                  <div className="text-sm text-gray-500 mb-2">
                    {selectedCategory === "credit-line" ? "Credit Line" : "Loan Amount"}
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-2xl font-bold text-sky-600">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                </div>
                <p className="text-gray-600 mt-3">{plan.description}</p>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-sky-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={() => handleSelectPlan(plan.name, selectedCategory)}
                  disabled={isLoading}
                  className={`w-full bg-gradient-to-r ${plan.gradient} hover:opacity-90 text-white py-3 rounded-full font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-50`}
                >
                  {isLoading ? "Processing..." : plan.buttonText}
                  {!isLoading && <ArrowRight className="h-4 w-4" />}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Comparison Section */}
        <div className="bg-white rounded-2xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Why Choose Take Off?</h2>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-sky-500" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Proven Results</h3>
              <p className="text-gray-600">Average +84 point increase in first year</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-500" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Tri-Bureau Reporting</h3>
              <p className="text-gray-600">Reports to Equifax, Experian & TransUnion</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <DollarSign className="h-8 w-8 text-purple-500" />
              </div>
              <h3 className="font-semibold text-lg mb-2">No Hidden Fees</h3>
              <p className="text-gray-600">Transparent pricing with no surprises</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Expert Support</h3>
              <p className="text-gray-600">Dedicated credit building specialists</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">
                What's the difference between Credit Line and Secured Loan options?
              </h3>
              <p className="text-gray-600">
                Credit Line Booster provides a revolving credit line that you can use and pay back repeatedly. Secured
                Loan Booster is an installment loan with fixed monthly payments that helps build your payment history.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">How quickly will I see results?</h3>
              <p className="text-gray-600">
                Most users see their first credit score update within 30-60 days. Significant improvements typically
                occur within 3-6 months of consistent on-time payments.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">Can I switch plans later?</h3>
              <p className="text-gray-600">
                Yes! You can upgrade or downgrade your plan at any time. Changes will take effect on your next billing
                cycle.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold text-lg mb-2">Is there a security deposit required?</h3>
              <p className="text-gray-600">
                For secured loan options, yes - the loan amount serves as your security deposit. For credit lines, no
                deposit is required.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-sky-500 to-sky-600 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Take Off?</h2>
          <p className="text-xl text-sky-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have successfully built their credit with Take Off. Choose your plan above and
            start your journey today!
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/dashboard">
              <Button variant="secondary" size="lg" className="px-8">
                View Dashboard
              </Button>
            </Link>
            <Link href="/help">
              <Button
                variant="outline"
                size="lg"
                className="px-8 bg-transparent border-white text-white hover:bg-white hover:text-sky-600"
              >
                Get Help
              </Button>
            </Link>
          </div>
        </div>
        {isLoading && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 max-w-sm mx-4 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4"></div>
              <h3 className="text-lg font-semibold mb-2">Processing Payment</h3>
              <p className="text-gray-600">Please wait while we set up your plan...</p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

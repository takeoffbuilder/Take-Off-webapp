"use client"

import { useState } from "react"
import { Check, Zap, Star, Rocket, Crown, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import Link from "next/link"

export default function PlansPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")

  const basicPlans = [
    {
      name: "Starter Boost",
      description: "Perfect for credit building beginners",
      monthlyPrice: 15,
      annualPrice: 150,
      savings: 30,
      features: [
        "$1500 Builder Account",
        "Tri-bureau reporting",
        "Credit score monitoring",
        "Mobile app access",
        "Email support",
        "Financial education resources",
        "2-year backdated history (+$50)",
      ],
      cta: "Get Started",
      href: "/signup?plan=starter",
      popular: false,
      icon: <Check className="w-6 h-6 text-sky-500" />,
    },
    {
      name: "Power Boost",
      description: "Most popular for faster credit growth",
      monthlyPrice: 25,
      annualPrice: 250,
      savings: 50,
      features: [
        "$2500 Builder Account",
        "Tri-bureau reporting",
        "Credit score monitoring",
        "Rent reporting included",
        "Priority support",
        "Advanced credit insights",
        "Credit dispute assistance",
        "Financial coaching",
        "2-year backdated history (+$50)",
      ],
      cta: "Get Started",
      href: "/signup?plan=power",
      popular: true,
      icon: <Zap className="w-6 h-6 text-green-500" />,
    },
    {
      name: "Max Boost",
      description: "Maximum credit building power",
      monthlyPrice: 35,
      annualPrice: 350,
      savings: 70,
      features: [
        "$3500 Builder Account",
        "Tri-bureau reporting",
        "Credit score monitoring",
        "Rent reporting included",
        "Utility bill reporting",
        "Premium support",
        "Advanced credit insights",
        "Credit dispute assistance",
        "1-on-1 financial coaching",
        "Identity monitoring",
        "2-year backdated history (+$50)",
      ],
      cta: "Get Started",
      href: "/signup?plan=max",
      popular: false,
      icon: <Star className="w-6 h-6 text-purple-500" />,
    },
  ]

  const premiumPlans = [
    {
      name: "Blaster Boost",
      description: "Accelerated credit building for serious users",
      monthlyPrice: 50,
      annualPrice: 500,
      savings: 100,
      features: [
        "$5000 Builder Account",
        "Tri-bureau reporting",
        "Real-time credit monitoring",
        "Rent & utility reporting",
        "Dedicated account manager",
        "Priority dispute resolution",
        "Advanced financial coaching",
        "Identity theft protection",
        "Credit optimization tools",
        "2-year backdated history (+$50)",
      ],
      cta: "Get Started",
      href: "/signup?plan=blaster",
      popular: false,
      icon: <Rocket className="w-6 h-6 text-orange-500" />,
    },
    {
      name: "Super Boost",
      description: "Premium credit building experience",
      monthlyPrice: 100,
      annualPrice: 1000,
      savings: 200,
      features: [
        "$10000 Builder Account",
        "Tri-bureau reporting",
        "24/7 credit monitoring",
        "All reporting services included",
        "White-glove service",
        "Instant dispute resolution",
        "Personal credit strategist",
        "Premium identity protection",
        "Investment account reporting",
        "Credit score guarantee",
        "2-year backdated history (+$50)",
      ],
      cta: "Get Started",
      href: "/signup?plan=super",
      popular: true,
      icon: <Crown className="w-6 h-6 text-yellow-500" />,
    },
    {
      name: "Star Boost",
      description: "Ultimate credit building solution",
      monthlyPrice: 150,
      annualPrice: 1500,
      savings: 300,
      features: [
        "$20000 Builder Account",
        "Tri-bureau reporting",
        "Real-time alerts & monitoring",
        "Comprehensive reporting suite",
        "Concierge-level service",
        "Immediate dispute handling",
        "Executive credit consultant",
        "Enterprise identity protection",
        "Business credit building",
        "Credit score optimization",
        "Exclusive financial products",
        "2-year backdated history (+$50)",
      ],
      cta: "Get Started",
      href: "/signup?plan=star",
      popular: false,
      icon: <Sparkles className="w-6 h-6 text-pink-500" />,
    },
  ]

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main className="px-4 md:px-6 pt-24 pb-16">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Choose Your <span className="text-sky-400">Take Off</span> Plan
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Build your credit faster with specialized tradelines reported to all three major credit bureaus. No credit
              checks, hidden fees, or interest.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`text-sm font-medium ${billingCycle === "monthly" ? "text-white" : "text-gray-400"}`}>
                Monthly
              </span>
              <button
                onClick={() => setBillingCycle(billingCycle === "monthly" ? "annual" : "monthly")}
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-black"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    billingCycle === "annual" ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span className={`text-sm font-medium ${billingCycle === "annual" ? "text-white" : "text-gray-400"}`}>
                Annual
              </span>
              {billingCycle === "annual" && <Badge className="bg-sky-500 text-white">Save up to 20%</Badge>}
            </div>
          </div>

          {/* Basic Plans Grid */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center text-white mb-12">Essential Plans</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {basicPlans.map((plan, index) => (
                <Card
                  key={plan.name}
                  className={`relative bg-gray-900 border-gray-700 text-white ${
                    plan.popular ? "ring-2 ring-sky-500 scale-105" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-sky-500 text-white px-4 py-1 flex items-center gap-1">
                        <Star className="w-3 h-3" />
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-4">
                    <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      {plan.icon}
                    </div>
                    <CardTitle className="text-2xl font-bold text-white">{plan.name}</CardTitle>
                    <CardDescription className="text-gray-400">{plan.description}</CardDescription>

                    <div className="mt-4">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-bold text-white">
                          ${billingCycle === "monthly" ? plan.monthlyPrice : Math.floor(plan.annualPrice / 12)}
                        </span>
                        <span className="text-gray-400">/month</span>
                      </div>

                      {billingCycle === "annual" && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-400">Billed annually: ${plan.annualPrice}</p>
                          <p className="text-sm text-sky-400 font-medium">Save ${plan.savings}/year</p>
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="pb-6">
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-sky-500 flex-shrink-0 mt-0.5" />
                          <span
                            className={`text-gray-300 text-sm ${feature.includes("+$50") ? "text-yellow-400" : ""}`}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link href={plan.href} className="block">
                      <Button
                        className={`w-full h-12 text-base font-semibold transition-colors ${
                          plan.popular
                            ? "bg-sky-500 hover:bg-sky-600 text-white"
                            : "bg-gray-800 hover:bg-gray-700 text-white border border-gray-600"
                        }`}
                      >
                        {plan.popular && <Zap className="w-4 h-4 mr-2" />}
                        {plan.cta}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Premium Plans Grid */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center text-white mb-12">Premium Plans</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {premiumPlans.map((plan, index) => (
                <Card
                  key={plan.name}
                  className={`relative bg-gradient-to-br from-gray-900 to-gray-800 border-gray-600 text-white ${
                    plan.popular ? "ring-2 ring-yellow-500 scale-105" : ""
                  } shadow-xl`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-yellow-500 text-black px-4 py-1 flex items-center gap-1 font-bold">
                        <Crown className="w-3 h-3" />
                        Premium Choice
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-4">
                    <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      {plan.icon}
                    </div>
                    <CardTitle className="text-2xl font-bold text-white">{plan.name}</CardTitle>
                    <CardDescription className="text-gray-300">{plan.description}</CardDescription>

                    <div className="mt-4">
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-bold text-white">
                          ${billingCycle === "monthly" ? plan.monthlyPrice : Math.floor(plan.annualPrice / 12)}
                        </span>
                        <span className="text-gray-400">/month</span>
                      </div>

                      {billingCycle === "annual" && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-400">Billed annually: ${plan.annualPrice}</p>
                          <p className="text-sm text-yellow-400 font-medium">Save ${plan.savings}/year</p>
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="pb-6">
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                          <span
                            className={`text-gray-200 text-sm ${feature.includes("+$50") ? "text-yellow-400" : ""}`}
                          >
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link href={plan.href} className="block">
                      <Button
                        className={`w-full h-12 text-base font-semibold transition-colors ${
                          plan.popular
                            ? "bg-yellow-500 hover:bg-yellow-600 text-black"
                            : "bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 text-white"
                        }`}
                      >
                        {plan.popular && <Crown className="w-4 h-4 mr-2" />}
                        {plan.cta}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center text-white mb-12">Frequently Asked Questions</h2>

            <div className="max-w-4xl mx-auto space-y-6">
              {[
                {
                  question: "How quickly will I see results?",
                  answer:
                    "Most users see credit score improvements within 30-60 days of their first reported payment. Results vary based on your starting credit profile and payment history. Higher builder account amounts typically lead to faster results.",
                },
                {
                  question: "What is the 2-year backdated history option?",
                  answer:
                    "For an additional $50, we can add 2 years of positive payment history to your credit builder account, giving you an immediate boost to your credit age and payment history - two key factors in your credit score.",
                },
                {
                  question: "Is there a credit check to get started?",
                  answer:
                    "No hard credit check is required. We only perform a soft credit pull for identity verification, which won't affect your credit score.",
                },
                {
                  question: "Can I cancel anytime?",
                  answer:
                    "Yes, you can cancel your subscription at any time. Your credit builder accounts will remain active until the end of your current billing period.",
                },
                {
                  question: "Which credit bureaus do you report to?",
                  answer:
                    "We report to all three major credit bureaus: Experian, Equifax, and TransUnion, giving you comprehensive credit building coverage.",
                },
                {
                  question: "What's the difference between Essential and Premium plans?",
                  answer:
                    "Essential plans focus on basic credit building with builder accounts up to $3,500. Premium plans offer larger builder accounts ($5,000-$20,000), dedicated support, advanced features, and white-glove service for serious credit builders.",
                },
              ].map((faq, index) => (
                <Card key={index} className="bg-gray-900 border-gray-700">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-3">{faq.question}</h3>
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-sky-500/20 to-blue-500/20 rounded-2xl border border-sky-500/30 p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Take Off?</h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of users who have improved their credit scores with Take Off. Start building your credit
                today with no credit checks required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/signup?plan=power">
                  <Button className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 text-lg rounded-full">
                    Start with Power Boost
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button
                    variant="outline"
                    className="border-sky-500 text-sky-400 hover:bg-sky-500/20 px-8 py-3 text-lg rounded-full bg-transparent"
                  >
                    Learn How It Works
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

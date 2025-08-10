"use client"

import { useState } from "react"
import { Check, Zap, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import Link from "next/link"

export default function PlansPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")

  const plans = [
    {
      name: "Starter Boost",
      description: "Perfect for credit building beginners",
      monthlyPrice: 15,
      annualPrice: 150,
      savings: 30,
      features: [
        "1 Credit Builder Account",
        "Tri-bureau reporting",
        "Credit score monitoring",
        "Mobile app access",
        "Email support",
        "Financial education resources",
      ],
      cta: "Get Started",
      href: "/signup?plan=starter",
      popular: false,
    },
    {
      name: "Power Boost",
      description: "Most popular for faster credit growth",
      monthlyPrice: 25,
      annualPrice: 250,
      savings: 50,
      features: [
        "2 Credit Builder Accounts",
        "Tri-bureau reporting",
        "Credit score monitoring",
        "Rent reporting included",
        "Priority support",
        "Advanced credit insights",
        "Credit dispute assistance",
        "Financial coaching",
      ],
      cta: "Get Started",
      href: "/signup?plan=power",
      popular: true,
    },
    {
      name: "Max Boost",
      description: "Maximum credit building power",
      monthlyPrice: 35,
      annualPrice: 350,
      savings: 70,
      features: [
        "3 Credit Builder Accounts",
        "Tri-bureau reporting",
        "Credit score monitoring",
        "Rent reporting included",
        "Utility bill reporting",
        "Premium support",
        "Advanced credit insights",
        "Credit dispute assistance",
        "1-on-1 financial coaching",
        "Identity monitoring",
      ],
      cta: "Get Started",
      href: "/signup?plan=max",
      popular: false,
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

          {/* Plans Grid */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
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
                        <span className="text-gray-300 text-sm">{feature}</span>
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

          {/* Features Comparison */}
          <div className="mt-20">
            <h2 className="text-3xl font-bold text-center text-white mb-12">Compare All Features</h2>

            <div className="bg-gray-900 rounded-2xl border border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="text-left p-6 text-white font-semibold">Features</th>
                      <th className="text-center p-6 text-white font-semibold">Starter Boost</th>
                      <th className="text-center p-6 text-white font-semibold relative">
                        Power Boost
                        <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-sky-500 text-white text-xs">
                          Popular
                        </Badge>
                      </th>
                      <th className="text-center p-6 text-white font-semibold">Max Boost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { feature: "Credit Builder Accounts", starter: "1", power: "2", max: "3" },
                      { feature: "Tri-bureau Reporting", starter: true, power: true, max: true },
                      { feature: "Credit Score Monitoring", starter: true, power: true, max: true },
                      { feature: "Mobile App Access", starter: true, power: true, max: true },
                      { feature: "Rent Reporting", starter: false, power: true, max: true },
                      { feature: "Utility Bill Reporting", starter: false, power: false, max: true },
                      { feature: "Credit Dispute Assistance", starter: false, power: true, max: true },
                      { feature: "Financial Coaching", starter: false, power: "Group", max: "1-on-1" },
                      { feature: "Identity Monitoring", starter: false, power: false, max: true },
                      { feature: "Support Level", starter: "Email", power: "Priority", max: "Premium" },
                    ].map((row, index) => (
                      <tr key={index} className="border-b border-gray-800 last:border-b-0">
                        <td className="p-6 text-gray-300 font-medium">{row.feature}</td>
                        <td className="p-6 text-center">
                          {typeof row.starter === "boolean" ? (
                            row.starter ? (
                              <Check className="w-5 h-5 text-sky-500 mx-auto" />
                            ) : (
                              <span className="text-gray-500">—</span>
                            )
                          ) : (
                            <span className="text-white">{row.starter}</span>
                          )}
                        </td>
                        <td className="p-6 text-center">
                          {typeof row.power === "boolean" ? (
                            row.power ? (
                              <Check className="w-5 h-5 text-sky-500 mx-auto" />
                            ) : (
                              <span className="text-gray-500">—</span>
                            )
                          ) : (
                            <span className="text-white">{row.power}</span>
                          )}
                        </td>
                        <td className="p-6 text-center">
                          {typeof row.max === "boolean" ? (
                            row.max ? (
                              <Check className="w-5 h-5 text-sky-500 mx-auto" />
                            ) : (
                              <span className="text-gray-500">—</span>
                            )
                          ) : (
                            <span className="text-white">{row.max}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
                    "Most users see credit score improvements within 30-60 days of their first reported payment. Results vary based on your starting credit profile and payment history.",
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
                  question: "What's the difference between the plans?",
                  answer:
                    "The main differences are the number of credit builder accounts and additional features like rent reporting, coaching, and support levels. More accounts typically lead to faster credit building.",
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

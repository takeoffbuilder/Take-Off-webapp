"use client"

import Header from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  TrendingUp,
  Shield,
  DollarSign,
  Clock,
  CheckCircle,
  CreditCard,
  BarChart3,
  Lock,
  Smartphone,
  HeadphonesIcon,
  Award,
} from "lucide-react"

export default function BenefitsPage() {
  const mainBenefits = [
    {
      icon: TrendingUp,
      title: "Proven Credit Score Improvements",
      description: "Users with starting credit under 600 see an average increase of +84 points in their first year.",
      stats: "+84 points average increase",
    },
    {
      icon: Shield,
      title: "Tri-Bureau Credit Reporting",
      description: "We report to all three major credit bureaus: Equifax, Experian, and TransUnion for maximum impact.",
      stats: "3 credit bureaus",
    },
    {
      icon: DollarSign,
      title: "No Hidden Fees",
      description:
        "Transparent pricing with no setup fees, maintenance charges, or surprise costs. What you see is what you pay.",
      stats: "100% transparent pricing",
    },
    {
      icon: Clock,
      title: "Fast Results",
      description: "Most users see their first credit score update within 30-60 days of their first reported payment.",
      stats: "30-60 days to first update",
    },
  ]

  const additionalBenefits = [
    {
      icon: CreditCard,
      title: "No Credit Check Required",
      description: "Get started regardless of your current credit situation. We only use soft checks for verification.",
    },
    {
      icon: BarChart3,
      title: "Real-Time Credit Monitoring",
      description: "Track your progress with real-time credit score updates and detailed progress reports.",
    },
    {
      icon: Lock,
      title: "Bank-Level Security",
      description: "Your personal and financial information is protected with industry-leading encryption.",
    },
    {
      icon: Smartphone,
      title: "Mobile App Access",
      description: "Manage your credit building journey on-the-go with our user-friendly mobile app.",
    },
    {
      icon: HeadphonesIcon,
      title: "Expert Support",
      description: "Get help from our dedicated credit building specialists whenever you need it.",
    },
    {
      icon: Award,
      title: "Educational Resources",
      description: "Access comprehensive guides and tools to learn about credit and financial wellness.",
    },
  ]

  const comparisonData = [
    {
      feature: "Credit Check Required",
      takeoff: "No",
      traditional: "Yes",
      takeoffBetter: true,
    },
    {
      feature: "Setup Time",
      takeoff: "Under 5 minutes",
      traditional: "Days to weeks",
      takeoffBetter: true,
    },
    {
      feature: "Credit Bureau Reporting",
      takeoff: "All 3 bureaus",
      traditional: "1-2 bureaus",
      takeoffBetter: true,
    },
    {
      feature: "Hidden Fees",
      takeoff: "None",
      traditional: "Common",
      takeoffBetter: true,
    },
    {
      feature: "Monthly Cost",
      takeoff: "From $10",
      traditional: "$25-50+",
      takeoffBetter: true,
    },
    {
      feature: "Real-Time Monitoring",
      takeoff: "Included",
      traditional: "Extra cost",
      takeoffBetter: true,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12 pt-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">The Take Off Advantage</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Discover why thousands of users choose Take Off for their credit building journey. Our proven system
            delivers real results with unmatched convenience and transparency.
          </p>
          <Link href="/signin">
            <Button className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 rounded-full text-lg">
              Experience the Benefits
            </Button>
          </Link>
        </div>

        {/* Main Benefits */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Key Benefits That Set Us Apart</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {mainBenefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-8 w-8 text-sky-500" />
                  </div>
                  <CardTitle className="text-lg mb-2">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{benefit.description}</p>
                  <div className="text-2xl font-bold text-sky-500">{benefit.stats}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Additional Benefits */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Everything You Need to Succeed</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {additionalBenefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-6 bg-white rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <benefit.icon className="h-6 w-6 text-sky-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Take Off vs Traditional Credit Building
          </h2>

          <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold text-gray-900">Feature</th>
                    <th className="px-6 py-4 text-center font-semibold text-sky-600">Take Off</th>
                    <th className="px-6 py-4 text-center font-semibold text-gray-600">Traditional Methods</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((row, index) => (
                    <tr key={index} className="border-t border-gray-200">
                      <td className="px-6 py-4 font-medium text-gray-900">{row.feature}</td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center gap-2 text-sky-600 font-medium">
                          <CheckCircle className="h-4 w-4" />
                          {row.takeoff}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-gray-600">{row.traditional}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Real Results from Real Users</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-sky-50 to-blue-50 border-sky-200">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-sky-600 mb-2">+127</div>
                <div className="text-lg font-semibold text-gray-900 mb-2">Points Increased</div>
                <div className="text-sm text-gray-600 mb-4">"Started at 523, now at 650 in just 8 months!"</div>
                <div className="text-xs text-gray-500">- Sarah M., verified user</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-green-600 mb-2">+95</div>
                <div className="text-lg font-semibold text-gray-900 mb-2">Points Increased</div>
                <div className="text-sm text-gray-600 mb-4">"Finally qualified for my first apartment!"</div>
                <div className="text-xs text-gray-500">- Marcus T., verified user</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
              <CardContent className="p-6">
                <div className="text-4xl font-bold text-purple-600 mb-2">+156</div>
                <div className="text-lg font-semibold text-gray-900 mb-2">Points Increased</div>
                <div className="text-sm text-gray-600 mb-4">"Got approved for my dream car loan!"</div>
                <div className="text-xs text-gray-500">- Jennifer L., verified user</div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-sky-500 to-sky-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience These Benefits?</h2>
          <p className="text-xl text-sky-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already building better credit with Take Off. Start your journey today with
            no credit check required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signin">
              <Button variant="secondary" size="lg" className="px-8">
                Get Started Now
              </Button>
            </Link>
            <Link href="/plans">
              <Button
                variant="outline"
                size="lg"
                className="px-8 bg-transparent border-white text-white hover:bg-white hover:text-sky-600"
              >
                View Plans & Pricing
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

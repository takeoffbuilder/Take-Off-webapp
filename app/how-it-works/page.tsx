"use client"

import Header from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Mail, CreditCard, TrendingUp, Shield, CheckCircle, Users } from "lucide-react"

export default function HowItWorksPage() {
  const steps = [
    {
      number: "1",
      title: "Enter Your Email",
      description: "Get started in seconds with just your email address - no passwords needed.",
      icon: Mail,
      details: [
        "No credit check required",
        "Passwordless authentication",
        "Instant account creation",
        "Secure email verification",
      ],
    },
    {
      number: "2",
      title: "Choose Your Plan",
      description: "Select the perfect credit building option and we'll report to all 3 bureaus.",
      icon: CreditCard,
      details: [
        "Credit lines from $1,500-$3,500",
        "Secured loans available",
        "Tri-bureau reporting included",
        "Plans starting at $10/month",
      ],
    },
    {
      number: "3",
      title: "Watch It Grow",
      description: "Track your credit score improvements in real-time on your dashboard.",
      icon: TrendingUp,
      details: [
        "Real-time credit monitoring",
        "Monthly progress reports",
        "Score improvement tracking",
        "Educational resources included",
      ],
    },
  ]

  const features = [
    {
      icon: Shield,
      title: "Tri-Bureau Reporting",
      description: "We report to Equifax, Experian, and TransUnion to maximize your credit building impact.",
    },
    {
      icon: CheckCircle,
      title: "No Hidden Fees",
      description: "Transparent pricing with no setup fees, maintenance charges, or surprise costs.",
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Our credit building specialists are here to help you succeed every step of the way.",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12 pt-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">How Take Off Works</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Building credit has never been easier. Our proven 3-step process helps you improve your credit score with no
            credit checks, hidden fees, or complicated applications.
          </p>
          <Link href="/signin">
            <Button className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 rounded-full text-lg">
              Start Building Today
            </Button>
          </Link>
        </div>

        {/* Steps Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Three Simple Steps to Better Credit</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <Card key={index} className="relative overflow-hidden hover:shadow-lg transition-shadow">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-sky-500 to-sky-600"></div>

                <CardHeader className="text-center pb-4">
                  <div className="w-16 h-16 bg-sky-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-2xl">{step.number}</span>
                  </div>
                  <CardTitle className="text-xl font-bold mb-2">{step.title}</CardTitle>
                  <p className="text-gray-600">{step.description}</p>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-sky-500 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Take Off?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-sky-500" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Results Section */}
        <div className="bg-white rounded-2xl p-8 mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Proven Results</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our users see real improvements in their credit scores with consistent on-time payments.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-sky-500 mb-2">+84</div>
              <div className="text-lg font-semibold text-gray-900 mb-1">Average Point Increase</div>
              <div className="text-sm text-gray-600">For users with starting credit under 600</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-sky-500 mb-2">30-60</div>
              <div className="text-lg font-semibold text-gray-900 mb-1">Days to First Update</div>
              <div className="text-sm text-gray-600">See your first credit score improvement</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-sky-500 mb-2">3</div>
              <div className="text-lg font-semibold text-gray-900 mb-1">Credit Bureaus</div>
              <div className="text-sm text-gray-600">Equifax, Experian & TransUnion</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-sky-500 to-sky-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Take Off?</h2>
          <p className="text-xl text-sky-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who have successfully built their credit with our proven system.
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
                View Plans
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

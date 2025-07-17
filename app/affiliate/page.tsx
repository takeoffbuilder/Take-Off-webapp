"use client"

import Header from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DollarSign, Users, TrendingUp, Gift, CheckCircle, Star } from "lucide-react"
import FooterNavigation from "@/components/footer-navigation"

export default function AffiliatePage() {
  const benefits = [
    {
      icon: DollarSign,
      title: "Earn $10 Per Referral",
      description: "Get paid $10 for every friend who signs up and completes their first month with Take Off.",
    },
    {
      icon: Users,
      title: "Help Friends Build Credit",
      description:
        "Share a service that actually works. Your friends will thank you for helping them improve their credit.",
    },
    {
      icon: TrendingUp,
      title: "Unlimited Earning Potential",
      description: "No caps on how much you can earn. The more you refer, the more you make.",
    },
    {
      icon: Gift,
      title: "Bonus Rewards",
      description: "Earn special bonuses when you reach referral milestones. Top affiliates get exclusive perks.",
    },
  ]

  const howItWorks = [
    {
      step: "1",
      title: "Sign Up",
      description: "Join our affiliate program for free and get your unique referral link.",
    },
    {
      step: "2",
      title: "Share",
      description:
        "Share your link with friends, family, or your audience through social media, email, or your website.",
    },
    {
      step: "3",
      title: "Earn",
      description: "Get paid $10 for each person who signs up using your link and completes their first month.",
    },
  ]

  const stats = [
    { number: "$10", label: "Per Successful Referral" },
    { number: "30%", label: "Average Conversion Rate" },
    { number: "24hrs", label: "Payment Processing Time" },
    { number: "∞", label: "Earning Potential" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-12 pt-24">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-sky-100 text-sky-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="h-4 w-4" />
            Earn Money Helping Others Build Credit
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Take Off Affiliate Program</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Earn $10 for every friend you refer to Take Off. Help others build better credit while building your income.
            It's a win-win for everyone.
          </p>
          <div className="flex justify-center">
            <Link href="/affiliate/join">
              <Button className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 rounded-full text-lg">
                Join the Program
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-sky-500 mb-2">{stat.number}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Join Our Affiliate Program?</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-8 w-8 text-sky-500" />
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* How It Works Section */}
        <div id="how-it-works" className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-sky-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-white font-bold text-2xl">{step.step}</span>
                </div>
                <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Affiliate Program Features</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-sky-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Real-Time Tracking</h3>
                  <p className="text-gray-600">
                    Monitor your referrals and earnings in real-time through your affiliate dashboard.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-sky-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Marketing Materials</h3>
                  <p className="text-gray-600">
                    Access professionally designed banners, social media posts, and email templates.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-sky-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Fast Payments</h3>
                  <p className="text-gray-600">
                    Get paid within 24 hours of a successful referral via PayPal or direct deposit.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-sky-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Dedicated Support</h3>
                  <p className="text-gray-600">
                    Get help from our affiliate support team whenever you need assistance.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-sky-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Performance Bonuses</h3>
                  <p className="text-gray-600">
                    Earn extra rewards when you hit monthly and quarterly referral milestones.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <CheckCircle className="h-6 w-6 text-sky-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">No Minimum Payout</h3>
                  <p className="text-gray-600">Get paid for every single referral - no minimum earning requirements.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-sky-500 to-sky-600 rounded-2xl p-12 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Earning?</h2>
          <p className="text-xl text-sky-100 mb-8 max-w-2xl mx-auto">
            Join thousands of affiliates who are already earning money by helping others build better credit.
          </p>
          <Link href="/affiliate/join">
            <Button variant="secondary" size="lg" className="px-8 py-3 text-lg">
              Get Your Affiliate Link Now
            </Button>
          </Link>
        </div>
      </main>
      <FooterNavigation />
    </div>
  )
}

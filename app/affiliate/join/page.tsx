"use client"
import { useState } from "react"
import Header from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Copy, CheckCircle, DollarSign, Share2, Facebook, Twitter, Mail, MessageCircle, BarChart3 } from "lucide-react"
import FooterNavigation from "@/components/footer-navigation"

export default function AffiliateJoinPage() {
  const [copied, setCopied] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState("month")

  // Generate a unique affiliate link (in real app, this would come from backend)
  const affiliateId = "TKF" + Math.random().toString(36).substr(2, 8).toUpperCase()
  const affiliateLink = `https://takeoff.com/signup?ref=${affiliateId}`

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(affiliateLink)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  const shareOptions = [
    {
      name: "Facebook",
      icon: Facebook,
      color: "bg-blue-600 hover:bg-blue-700",
      url: `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(affiliateLink)}`,
    },
    {
      name: "Twitter",
      icon: Twitter,
      color: "bg-sky-500 hover:bg-sky-600",
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(affiliateLink)}&text=${encodeURIComponent("Check out Take Off - the easiest way to build credit!")}`,
    },
    {
      name: "Email",
      icon: Mail,
      color: "bg-gray-600 hover:bg-gray-700",
      url: `mailto:?subject=${encodeURIComponent("Build Your Credit with Take Off")}&body=${encodeURIComponent(`Hey! I found this amazing credit building service called Take Off. Check it out: ${affiliateLink}`)}`,
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "bg-green-600 hover:bg-green-700",
      url: `https://wa.me/?text=${encodeURIComponent(`Check out Take Off - the easiest way to build credit! ${affiliateLink}`)}`,
    },
  ]

  // Mock stats data (in real app, this would come from backend)
  const stats = {
    month: {
      referrals: 12,
      earnings: 120, // Changed from 300 to 120 (12 referrals × $10)
      conversions: 8,
      pending: 4,
    },
    week: {
      referrals: 3,
      earnings: 30, // Changed from 75 to 30 (3 referrals × $10)
      conversions: 2,
      pending: 1,
    },
    today: {
      referrals: 1,
      earnings: 10, // Changed from 25 to 10 (1 referral × $10)
      conversions: 1,
      pending: 0,
    },
  }

  const currentStats = stats[selectedPeriod as keyof typeof stats]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />

      <main className="max-w-6xl mx-auto px-4 py-12 pt-24">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <CheckCircle className="h-4 w-4" />
            Welcome to the Affiliate Program!
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Your Affiliate Dashboard</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Start earning $10 for every successful referral. Share your unique link and watch your earnings grow!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Affiliate Link Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="h-5 w-5 text-sky-500" />
                  Your Affiliate Link
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="bg-sky-100 text-sky-700">
                      ID: {affiliateId}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input value={affiliateLink} readOnly className="font-mono text-sm bg-white" />
                    <Button
                      onClick={handleCopyLink}
                      className={`px-4 ${copied ? "bg-green-500 hover:bg-green-600" : "bg-sky-500 hover:bg-sky-600"}`}
                    >
                      {copied ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4 mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Share Buttons */}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Quick Share</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {shareOptions.map((option) => (
                      <a
                        key={option.name}
                        href={option.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${option.color} text-white p-3 rounded-lg flex flex-col items-center gap-2 transition-colors`}
                      >
                        <option.icon className="h-5 w-5" />
                        <span className="text-xs font-medium">{option.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Stats */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-sky-500" />
                    Performance Overview
                  </CardTitle>
                  <div className="flex gap-2">
                    {[
                      { key: "today", label: "Today" },
                      { key: "week", label: "Week" },
                      { key: "month", label: "Month" },
                    ].map((period) => (
                      <Button
                        key={period.key}
                        variant={selectedPeriod === period.key ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedPeriod(period.key)}
                        className={selectedPeriod === period.key ? "bg-sky-500 hover:bg-sky-600" : ""}
                      >
                        {period.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-sky-500 mb-1">{currentStats.referrals}</div>
                    <div className="text-sm text-gray-600">Total Referrals</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500 mb-1">${currentStats.earnings}</div>
                    <div className="text-sm text-gray-600">Earnings</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-500 mb-1">{currentStats.conversions}</div>
                    <div className="text-sm text-gray-600">Conversions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-500 mb-1">{currentStats.pending}</div>
                    <div className="text-sm text-gray-600">Pending</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips for Success */}
            <Card>
              <CardHeader>
                <CardTitle>Tips for Success</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sky-600 text-sm font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Share Your Story</h4>
                      <p className="text-gray-600 text-sm">
                        Tell people about your own credit building journey with Take Off. Personal experiences convert
                        better.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sky-600 text-sm font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Target the Right Audience</h4>
                      <p className="text-gray-600 text-sm">
                        Focus on people who are looking to build or rebuild their credit score.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-sky-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sky-600 text-sm font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Use Multiple Channels</h4>
                      <p className="text-gray-600 text-sm">
                        Share on social media, email, and in person. The more touchpoints, the better.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Conversion Rate</span>
                  <span className="font-semibold text-green-600">67%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Avg. Earnings/Month</span>
                  <span className="font-semibold text-sky-600">$120</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Earned</span>
                  <span className="font-semibold text-gray-900">$500</span>
                </div>
              </CardContent>
            </Card>

            {/* Payment Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  Payment Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="font-semibold text-green-800">Next Payment</span>
                  </div>
                  <p className="text-green-700 text-sm">$30 on Jan 15, 2024</p>
                </div>
                <div className="text-sm text-gray-600">
                  <p>• Payments processed within 24 hours</p>
                  <p>• $10 per successful referral</p>
                  <p>• No minimum payout required</p>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/support">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Contact Support
                  </Button>
                </Link>
                <Link href="/affiliate">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    Back to Affiliate Info
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <FooterNavigation />
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import FooterNavigation from "@/components/footer-navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import {
  DollarSign,
  Users,
  TrendingUp,
  Copy,
  Share2,
  ChevronRight,
  CheckCircle,
  Clock,
  ArrowUpRight,
  BarChart3,
  LineChart,
  PieChart,
  LinkIcon,
} from "lucide-react"
import Link from "next/link"

interface UserData {
  firstName: string
  lastName: string
  email: string
  phone: string
  isVerified: boolean
  signupDate: string
}

interface Referral {
  id: string
  name: string
  email: string
  date: string
  status: "completed" | "pending" | "failed"
  amount: number
}

export default function AffiliateDashboardPage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [referralLink, setReferralLink] = useState("https://takeoff.com/ref/user123")
  const [linkCopied, setLinkCopied] = useState(false)
  const router = useRouter()

  // Mock data
  const stats = {
    totalEarned: 240,
    pendingPayments: 30,
    totalReferrals: 24,
    conversionRate: 30,
  }

  const referrals: Referral[] = [
    {
      id: "ref_001",
      name: "John Smith",
      email: "john.smith@example.com",
      date: "2024-06-10",
      status: "completed",
      amount: 10,
    },
    {
      id: "ref_002",
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      date: "2024-06-08",
      status: "completed",
      amount: 10,
    },
    {
      id: "ref_003",
      name: "Michael Brown",
      email: "m.brown@example.com",
      date: "2024-06-05",
      status: "completed",
      amount: 10,
    },
    {
      id: "ref_004",
      name: "Emily Davis",
      email: "emily.d@example.com",
      date: "2024-06-01",
      status: "completed",
      amount: 10,
    },
    {
      id: "ref_005",
      name: "Robert Wilson",
      email: "r.wilson@example.com",
      date: "2024-05-28",
      status: "pending",
      amount: 10,
    },
    {
      id: "ref_006",
      name: "Jennifer Lee",
      email: "j.lee@example.com",
      date: "2024-05-25",
      status: "failed",
      amount: 0,
    },
    {
      id: "ref_007",
      name: "David Miller",
      email: "d.miller@example.com",
      date: "2024-05-20",
      status: "completed",
      amount: 10,
    },
    {
      id: "ref_008",
      name: "Lisa Anderson",
      email: "l.anderson@example.com",
      date: "2024-05-15",
      status: "completed",
      amount: 10,
    },
  ]

  const payouts = [
    {
      id: "payout_001",
      date: "2024-06-01",
      amount: 50,
      method: "PayPal",
      status: "completed",
    },
    {
      id: "payout_002",
      date: "2024-05-01",
      amount: 80,
      method: "Direct Deposit",
      status: "completed",
    },
    {
      id: "payout_003",
      date: "2024-04-01",
      amount: 60,
      method: "PayPal",
      status: "completed",
    },
    {
      id: "payout_004",
      date: "2024-03-01",
      amount: 50,
      method: "Direct Deposit",
      status: "completed",
    },
  ]

  const marketingMaterials = [
    {
      id: "material_001",
      title: "Email Template",
      description: "Pre-written email to send to friends and family",
      type: "template",
    },
    {
      id: "material_002",
      title: "Social Media Banner",
      description: "Optimized for Facebook, Twitter, and Instagram",
      type: "image",
    },
    {
      id: "material_003",
      title: "Product Benefits PDF",
      description: "Detailed explanation of Take Off's credit building benefits",
      type: "document",
    },
    {
      id: "material_004",
      title: "Testimonial Graphics",
      description: "Real customer success stories with Take Off",
      type: "image",
    },
  ]

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink)
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your affiliate dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header showAuth={false} />

      <main className="max-w-7xl mx-auto px-4 py-8 pt-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Affiliate Dashboard</h1>
            <p className="text-gray-600">Track your referrals, earnings, and access marketing materials</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button className="bg-sky-500 hover:bg-sky-600 transition-colors">
              <DollarSign className="h-4 w-4 mr-2" />
              Request Payout
            </Button>
            <Link href="/affiliate">
              <Button variant="outline">
                <Share2 className="h-4 w-4 mr-2" />
                Affiliate Program
              </Button>
            </Link>
          </div>
        </div>

        {/* Referral Link Card */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-2">Your Unique Referral Link</p>
                <div className="flex items-center gap-2 bg-gray-100 p-3 rounded-md">
                  <LinkIcon className="h-4 w-4 text-gray-500" />
                  <span className="text-gray-900 flex-1 truncate">{referralLink}</span>
                </div>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={copyReferralLink}>
                  <Copy className="h-4 w-4 mr-2" />
                  {linkCopied ? "Copied!" : "Copy Link"}
                </Button>
                <Button className="bg-sky-500 hover:bg-sky-600 transition-colors">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Earned</p>
                  <p className="text-2xl font-bold text-gray-900">${stats.totalEarned}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <DollarSign className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Payments</p>
                  <p className="text-2xl font-bold text-gray-900">${stats.pendingPayments}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Referrals</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalReferrals}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-sky-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Conversion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.conversionRate}%</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-purple-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="referrals" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
            <TabsTrigger value="payouts">Payouts</TabsTrigger>
            <TabsTrigger value="marketing">Marketing Materials</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="referrals">
            <Card>
              <CardHeader>
                <CardTitle>Your Referrals</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Name</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Email</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-600">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {referrals.map((referral) => (
                        <tr key={referral.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{referral.name}</td>
                          <td className="py-3 px-4">{referral.email}</td>
                          <td className="py-3 px-4">{new Date(referral.date).toLocaleDateString()}</td>
                          <td className="py-3 px-4">
                            <Badge
                              variant="outline"
                              className={
                                referral.status === "completed"
                                  ? "text-green-600 border-green-200"
                                  : referral.status === "pending"
                                    ? "text-yellow-600 border-yellow-200"
                                    : "text-red-600 border-red-200"
                              }
                            >
                              {referral.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-right font-medium">${referral.amount.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payouts">
            <Card>
              <CardHeader>
                <CardTitle>Payout History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Method</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                        <th className="text-right py-3 px-4 font-medium text-gray-600">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {payouts.map((payout) => (
                        <tr key={payout.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{new Date(payout.date).toLocaleDateString()}</td>
                          <td className="py-3 px-4">{payout.method}</td>
                          <td className="py-3 px-4">
                            <Badge
                              variant="outline"
                              className={
                                payout.status === "completed"
                                  ? "text-green-600 border-green-200"
                                  : "text-yellow-600 border-yellow-200"
                              }
                            >
                              {payout.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-right font-medium">${payout.amount.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="marketing">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {marketingMaterials.map((material) => (
                <Card key={material.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg mb-1">{material.title}</h3>
                        <p className="text-gray-600 mb-4">{material.description}</p>
                        <Badge variant="outline" className="text-sky-600 border-sky-200">
                          {material.type}
                        </Badge>
                      </div>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Referral Performance</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-64 flex items-center justify-center bg-gray-100 rounded-md">
                    <LineChart className="h-8 w-8 text-gray-400" />
                    <span className="ml-2 text-gray-500">Performance chart will appear here</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Conversion Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-64 flex items-center justify-center bg-gray-100 rounded-md">
                    <PieChart className="h-8 w-8 text-gray-400" />
                    <span className="ml-2 text-gray-500">Conversion chart will appear here</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Traffic Sources</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-64 flex items-center justify-center bg-gray-100 rounded-md">
                    <BarChart3 className="h-8 w-8 text-gray-400" />
                    <span className="ml-2 text-gray-500">Traffic chart will appear here</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Monthly Earnings</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-64 flex items-center justify-center bg-gray-100 rounded-md">
                    <BarChart3 className="h-8 w-8 text-gray-400" />
                    <span className="ml-2 text-gray-500">Earnings chart will appear here</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Tips for Success */}
        <Card>
          <CardHeader>
            <CardTitle className="text-white">Tips for Success</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-4 w-4 text-sky-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Share Your Personal Experience</h3>
                    <p className="text-white">
                      People trust authentic stories. Share how Take Off has helped you build credit.
                    </p>
                  </div>
                </div>
                <Link href="#" className="text-sky-500 hover:text-sky-600 mt-auto flex items-center">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>

              <div className="flex flex-col">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Users className="h-4 w-4 text-sky-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Target the Right Audience</h3>
                    <p className="text-white">
                      Focus on people who are actively looking to build or repair their credit score.
                    </p>
                  </div>
                </div>
                <Link href="#" className="text-sky-500 hover:text-sky-600 mt-auto flex items-center">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>

              <div className="flex flex-col">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <ArrowUpRight className="h-4 w-4 text-sky-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-1">Use Multiple Channels</h3>
                    <p className="text-white">
                      Share your referral link across email, social media, and in relevant online communities.
                    </p>
                  </div>
                </div>
                <Link href="#" className="text-sky-500 hover:text-sky-600 mt-auto flex items-center">
                  Learn more <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      <FooterNavigation />
    </div>
  )
}

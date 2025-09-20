"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Header from "@/components/header"
import FooterNavigation from "@/components/footer-navigation"
import {
  DollarSign,
  Users,
  TrendingUp,
  Copy,
  Share2,
  Calendar,
  Target,
  Award,
  Mail,
  MessageSquare,
  LinkIcon,
} from "lucide-react"

export default function AffiliatePage() {
  const [referralLink, setReferralLink] = useState("")
  const [linkCopied, setLinkCopied] = useState(false)
  const [userLastName, setUserLastName] = useState("Smith") // Default fallback
  const [earnings] = useState(1250.5)
  const [referrals] = useState(25)
  const [conversionRate] = useState(12.5)

  useEffect(() => {
    // Get user's last name from stored user data
    const storedUser = localStorage.getItem("takeoff_user")
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      if (userData.lastName) {
        setUserLastName(userData.lastName)
      }
    }
  }, [])

  useEffect(() => {
    // Generate referral link with user's last name
    const link = `https://takeoff.com/signup?ref=${userLastName.toLowerCase()}`
    setReferralLink(link)
  }, [userLastName])

  const stats = [
    {
      title: "Total Earnings",
      value: `$${earnings.toFixed(2)}`,
      icon: DollarSign,
      color: "text-green-500",
      bgColor: "bg-green-500/20",
      borderColor: "border-green-500/30",
    },
    {
      title: "Total Referrals",
      value: referrals.toString(),
      icon: Users,
      color: "text-sky-500",
      bgColor: "bg-sky-500/20",
      borderColor: "border-sky-500/30",
    },
    {
      title: "Conversion Rate",
      value: `${conversionRate}%`,
      icon: Target,
      color: "text-purple-500",
      bgColor: "bg-purple-500/20",
      borderColor: "border-purple-500/30",
    },
    {
      title: "This Month",
      value: "$425.00",
      icon: TrendingUp,
      color: "text-orange-500",
      bgColor: "bg-orange-500/20",
      borderColor: "border-orange-500/30",
    },
  ]

  const recentReferrals = [
    { name: "John D.", date: "Dec 10, 2024", commission: "$50.00", status: "Paid" },
    { name: "Sarah M.", date: "Dec 8, 2024", commission: "$50.00", status: "Pending" },
    { name: "Mike R.", date: "Dec 5, 2024", commission: "$50.00", status: "Paid" },
    { name: "Lisa K.", date: "Dec 3, 2024", commission: "$50.00", status: "Paid" },
    { name: "Tom W.", date: "Dec 1, 2024", commission: "$50.00", status: "Paid" },
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setLinkCopied(true)
    setTimeout(() => setLinkCopied(false), 2000)
  }

  const shareOnSocial = (platform: string) => {
    const message = encodeURIComponent(
      `Check out Take Off - it's helping me build my credit score! Join using my link: ${referralLink}`,
    )
    let url = ""

    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${message}`
        break
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`
        break
      case "email":
        url = `mailto:?subject=Join me on Take Off&body=${message}`
        break
    }

    if (url) {
      window.open(url, "_blank")
    }
  }

  return (
    <div className="min-h-screen bg-black pb-20">
      <Header showAuth={false} />

      <main className="px-4 md:px-6 py-8 pt-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Affiliate Program</h1>
            <p className="text-gray-300">Earn money by referring friends to Take Off</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-gray-900 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">{stat.title}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-full ${stat.bgColor} flex items-center justify-center`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Referral Tools */}
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Referral Tools</CardTitle>
                  <CardDescription className="text-gray-400">Share your unique referral link</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="link" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 bg-gray-800">
                      <TabsTrigger
                        value="link"
                        className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
                      >
                        Referral Link
                      </TabsTrigger>
                      <TabsTrigger
                        value="social"
                        className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
                      >
                        Share on Social
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="link" className="mt-6">
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="referral-link" className="text-white flex items-center gap-2">
                            <LinkIcon className="h-4 w-4 text-sky-400" />
                            Your Unique Referral Link
                          </Label>
                          <div className="flex gap-2 mt-2">
                            <Input
                              id="referral-link"
                              value={referralLink}
                              readOnly
                              className="bg-gray-800 border-gray-600 text-white"
                            />
                            <Button
                              onClick={() => copyToClipboard(referralLink)}
                              className="bg-sky-500 hover:bg-sky-600 text-white"
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                          {linkCopied && <p className="text-green-400 text-sm mt-2">✓ Link copied to clipboard!</p>}
                          <p className="text-gray-400 text-sm mt-2">
                            This personalized link includes your last name and tracks all referrals back to you
                          </p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="social" className="mt-6">
                      <div className="space-y-4">
                        <p className="text-gray-400">Share your referral link on social media</p>
                        <div className="flex gap-3">
                          <Button
                            onClick={() => shareOnSocial("twitter")}
                            variant="outline"
                            className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                          >
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Twitter
                          </Button>
                          <Button
                            onClick={() => shareOnSocial("facebook")}
                            variant="outline"
                            className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                          >
                            <Share2 className="w-4 h-4 mr-2" />
                            Facebook
                          </Button>
                          <Button
                            onClick={() => shareOnSocial("email")}
                            variant="outline"
                            className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                          >
                            <Mail className="w-4 h-4 mr-2" />
                            Email
                          </Button>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* How It Works */}
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">How It Works</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 bg-sky-400/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-sky-400 font-bold">1</span>
                      </div>
                      <h3 className="text-white font-semibold mb-2">Share Your Link</h3>
                      <p className="text-gray-400 text-sm">
                        Share your personalized referral link with friends and family
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-sky-400/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-sky-400 font-bold">2</span>
                      </div>
                      <h3 className="text-white font-semibold mb-2">They Sign Up</h3>
                      <p className="text-gray-400 text-sm">
                        Your referral signs up using your link and completes their first payment
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 bg-sky-400/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <span className="text-sky-400 font-bold">3</span>
                      </div>
                      <h3 className="text-white font-semibold mb-2">Earn Rewards</h3>
                      <p className="text-gray-400 text-sm">You earn $50 for each successful referral</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Referrals */}
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Recent Referrals</CardTitle>
                  <CardDescription className="text-gray-400">Your latest successful referrals</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentReferrals.map((referral, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-sky-500/20 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-sky-500" />
                          </div>
                          <div>
                            <p className="text-white font-medium">{referral.name}</p>
                            <p className="text-gray-400 text-sm">{referral.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-semibold">{referral.commission}</p>
                          <Badge
                            className={
                              referral.status === "Paid"
                                ? "bg-green-500/20 text-green-400 border-green-500/30"
                                : "bg-orange-500/20 text-orange-400 border-orange-500/30"
                            }
                          >
                            {referral.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Program Details */}
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Award className="w-5 h-5 text-sky-500" />
                    Program Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-gray-800 rounded-lg">
                      <h4 className="text-white font-semibold mb-1">Commission Rate</h4>
                      <p className="text-sky-400 text-2xl font-bold">$50</p>
                      <p className="text-gray-400 text-sm">per successful referral</p>
                    </div>

                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Cookie Duration</span>
                        <span className="text-white">30 days</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Minimum Payout</span>
                        <span className="text-white">$100</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Payment Schedule</span>
                        <span className="text-white">Monthly</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Tips */}
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Performance Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-800 rounded-lg">
                      <h4 className="text-white font-medium text-sm mb-1">Share Your Story</h4>
                      <p className="text-gray-400 text-xs">Tell friends how Take Off helped improve your credit</p>
                    </div>

                    <div className="p-3 bg-gray-800 rounded-lg">
                      <h4 className="text-white font-medium text-sm mb-1">Target the Right Audience</h4>
                      <p className="text-gray-400 text-xs">Focus on people looking to build credit</p>
                    </div>

                    <div className="p-3 bg-gray-800 rounded-lg">
                      <h4 className="text-white font-medium text-sm mb-1">Use Multiple Channels</h4>
                      <p className="text-gray-400 text-xs">Share across social media, email, and in person</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payout Information */}
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Next Payout</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-2">$425.00</div>
                    <p className="text-gray-400 text-sm mb-4">Available for payout</p>
                    <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                      <Calendar className="w-4 h-4" />
                      <span>Next payout: Jan 1, 2025</span>
                    </div>
                    <Button className="w-full bg-sky-500 hover:bg-sky-600 text-white">Request Payout</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <FooterNavigation />
    </div>
  )
}

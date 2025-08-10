"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Header from "@/components/header"
import {
  FileText,
  Download,
  Eye,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  CreditCard,
  Building,
  User,
} from "lucide-react"

export default function CreditReportsPage() {
  const [selectedBureau, setSelectedBureau] = useState("experian")

  const creditReports = {
    experian: {
      score: 720,
      date: "December 1, 2024",
      accounts: 8,
      inquiries: 2,
      negativeItems: 0,
    },
    equifax: {
      score: 715,
      date: "December 1, 2024",
      accounts: 8,
      inquiries: 1,
      negativeItems: 0,
    },
    transunion: {
      score: 725,
      date: "December 1, 2024",
      accounts: 8,
      inquiries: 2,
      negativeItems: 0,
    },
  }

  const accounts = [
    {
      name: "Take Off Credit Builder",
      type: "Installment Loan",
      balance: "$1,500",
      limit: "$1,500",
      status: "Current",
      opened: "Apr 2024",
      payment: "On Time",
    },
    {
      name: "Take Off Secured Card",
      type: "Credit Card",
      balance: "$150",
      limit: "$500",
      status: "Current",
      opened: "Apr 2024",
      payment: "On Time",
    },
    {
      name: "Capital One Platinum",
      type: "Credit Card",
      balance: "$0",
      limit: "$1,000",
      status: "Current",
      opened: "Jan 2023",
      payment: "On Time",
    },
  ]

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main className="px-4 md:px-6 py-8 pt-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Credit Reports</h1>
            <p className="text-gray-300">Monitor your credit across all three bureaus</p>
          </div>

          {/* Bureau Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {Object.entries(creditReports).map(([bureau, data]) => (
              <Card
                key={bureau}
                className={`cursor-pointer transition-all bg-gray-900 border-gray-700 ${
                  selectedBureau === bureau ? "ring-2 ring-sky-500" : ""
                }`}
                onClick={() => setSelectedBureau(bureau)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white capitalize">{bureau}</CardTitle>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Current</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-4">
                    <div className="text-3xl font-bold text-white mb-1">{data.score}</div>
                    <p className="text-gray-400 text-sm">FICO® Score</p>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Last Updated:</span>
                      <span className="text-white">{data.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Accounts:</span>
                      <span className="text-white">{data.accounts}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Inquiries:</span>
                      <span className="text-white">{data.inquiries}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detailed Report */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Report Content */}
            <div className="lg:col-span-2">
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white capitalize">{selectedBureau} Credit Report</CardTitle>
                      <CardDescription className="text-gray-400">
                        Last updated: {creditReports[selectedBureau].date}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        View Full Report
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="accounts" className="w-full">
                    <TabsList className="grid w-full grid-cols-4 bg-gray-800">
                      <TabsTrigger
                        value="accounts"
                        className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
                      >
                        Accounts
                      </TabsTrigger>
                      <TabsTrigger
                        value="inquiries"
                        className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
                      >
                        Inquiries
                      </TabsTrigger>
                      <TabsTrigger
                        value="personal"
                        className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
                      >
                        Personal Info
                      </TabsTrigger>
                      <TabsTrigger
                        value="disputes"
                        className="text-gray-300 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
                      >
                        Disputes
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="accounts" className="mt-6">
                      <div className="space-y-4">
                        {accounts.map((account, index) => (
                          <div key={index} className="p-4 bg-gray-800 rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <CreditCard className="w-5 h-5 text-sky-500" />
                                <div>
                                  <h4 className="font-semibold text-white">{account.name}</h4>
                                  <p className="text-sm text-gray-400">{account.type}</p>
                                </div>
                              </div>
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                {account.status}
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <p className="text-gray-400">Balance</p>
                                <p className="text-white font-medium">{account.balance}</p>
                              </div>
                              <div>
                                <p className="text-gray-400">Limit</p>
                                <p className="text-white font-medium">{account.limit}</p>
                              </div>
                              <div>
                                <p className="text-gray-400">Opened</p>
                                <p className="text-white font-medium">{account.opened}</p>
                              </div>
                              <div>
                                <p className="text-gray-400">Payment</p>
                                <p className="text-green-400 font-medium">{account.payment}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="inquiries" className="mt-6">
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-800 rounded-lg">
                          <div className="flex items-center gap-3 mb-2">
                            <FileText className="w-5 h-5 text-orange-500" />
                            <h4 className="font-semibold text-white">Take Off Financial</h4>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-400">Date</p>
                              <p className="text-white">April 15, 2024</p>
                            </div>
                            <div>
                              <p className="text-gray-400">Type</p>
                              <p className="text-white">Soft Inquiry</p>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-gray-800 rounded-lg">
                          <div className="flex items-center gap-3 mb-2">
                            <FileText className="w-5 h-5 text-orange-500" />
                            <h4 className="font-semibold text-white">Capital One</h4>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-400">Date</p>
                              <p className="text-white">January 10, 2023</p>
                            </div>
                            <div>
                              <p className="text-gray-400">Type</p>
                              <p className="text-white">Hard Inquiry</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="personal" className="mt-6">
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-800 rounded-lg">
                          <div className="flex items-center gap-3 mb-4">
                            <User className="w-5 h-5 text-sky-500" />
                            <h4 className="font-semibold text-white">Personal Information</h4>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-400">Name</p>
                              <p className="text-white">John Doe</p>
                            </div>
                            <div>
                              <p className="text-gray-400">Date of Birth</p>
                              <p className="text-white">01/15/1990</p>
                            </div>
                            <div>
                              <p className="text-gray-400">SSN</p>
                              <p className="text-white">***-**-1234</p>
                            </div>
                            <div>
                              <p className="text-gray-400">Phone</p>
                              <p className="text-white">(555) 123-4567</p>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-gray-800 rounded-lg">
                          <div className="flex items-center gap-3 mb-4">
                            <Building className="w-5 h-5 text-sky-500" />
                            <h4 className="font-semibold text-white">Addresses</h4>
                          </div>
                          <div className="space-y-3 text-sm">
                            <div>
                              <p className="text-gray-400">Current Address</p>
                              <p className="text-white">123 Main St, Anytown, ST 12345</p>
                            </div>
                            <div>
                              <p className="text-gray-400">Previous Address</p>
                              <p className="text-white">456 Oak Ave, Oldtown, ST 67890</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="disputes" className="mt-6">
                      <div className="text-center py-8">
                        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-white mb-2">No Active Disputes</h3>
                        <p className="text-gray-400 mb-4">You don't have any disputes in progress.</p>
                        <Button className="bg-sky-500 hover:bg-sky-600 text-white">File a Dispute</Button>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Score Trend */}
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-sky-500" />
                    Score Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">This Month</span>
                      <span className="text-green-400 font-semibold">+5</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Last 3 Months</span>
                      <span className="text-green-400 font-semibold">+15</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Last 6 Months</span>
                      <span className="text-green-400 font-semibold">+45</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Alerts */}
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    Credit Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-green-400 font-medium text-sm">Payment Reported</span>
                      </div>
                      <p className="text-gray-300 text-xs">Your on-time payment was reported to all bureaus</p>
                    </div>

                    <div className="p-3 bg-sky-500/10 border border-sky-500/20 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="w-4 h-4 text-sky-500" />
                        <span className="text-sky-400 font-medium text-sm">Score Increased</span>
                      </div>
                      <p className="text-gray-300 text-xs">Your credit score went up by 5 points</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Next Steps */}
              <Card className="bg-gray-900 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">Improve Your Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-800 rounded-lg">
                      <h4 className="text-white font-medium text-sm mb-1">Keep Making Payments</h4>
                      <p className="text-gray-400 text-xs">Continue your perfect payment history</p>
                    </div>

                    <div className="p-3 bg-gray-800 rounded-lg">
                      <h4 className="text-white font-medium text-sm mb-1">Add Another Account</h4>
                      <p className="text-gray-400 text-xs">Diversify your credit mix</p>
                    </div>

                    <Button className="w-full bg-sky-500 hover:bg-sky-600 text-white">View Recommendations</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

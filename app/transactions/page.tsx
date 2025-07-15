"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Header from "@/components/header"
import FooterNavigation from "@/components/footer-navigation"
import { useRouter } from "next/navigation"
import {
  ArrowLeft,
  Search,
  Download,
  CreditCard,
  DollarSign,
  TrendingUp,
  Zap,
  ArrowUpRight,
  ArrowDownRight,
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

interface Transaction {
  id: string
  type: "debit"
  amount: number
  description: string
  category: string
  date: string
  status: "completed" | "pending" | "failed"
  merchant?: string
  planType?: string
  planDuration?: string
}

export default function TransactionsPage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const router = useRouter()

  // Mock boost plan purchase transactions only
  const transactions: Transaction[] = [
    {
      id: "txn_001",
      type: "debit",
      amount: 29.99,
      description: "Starter Boost Plan - Credit Line",
      category: "starter_boost",
      date: "2024-06-15",
      status: "completed",
      merchant: "TakeOff Credit",
      planType: "Credit Line",
      planDuration: "Monthly",
    },
    {
      id: "txn_002",
      type: "debit",
      amount: 49.99,
      description: "Power Boost Plan - Secured Loan",
      category: "power_boost",
      date: "2024-05-15",
      status: "completed",
      merchant: "TakeOff Credit",
      planType: "Secured Loan",
      planDuration: "Monthly",
    },
    {
      id: "txn_003",
      type: "debit",
      amount: 79.99,
      description: "Max Boost Plan - Credit Line",
      category: "max_boost",
      date: "2024-04-15",
      status: "completed",
      merchant: "TakeOff Credit",
      planType: "Credit Line",
      planDuration: "Monthly",
    },
    {
      id: "txn_004",
      type: "debit",
      amount: 29.99,
      description: "Starter Boost Plan - Credit Line",
      category: "starter_boost",
      date: "2024-03-15",
      status: "completed",
      merchant: "TakeOff Credit",
      planType: "Credit Line",
      planDuration: "Monthly",
    },
    {
      id: "txn_005",
      type: "debit",
      amount: 49.99,
      description: "Power Boost Plan - Credit Line",
      category: "power_boost",
      date: "2024-02-15",
      status: "completed",
      merchant: "TakeOff Credit",
      planType: "Credit Line",
      planDuration: "Monthly",
    },
    {
      id: "txn_006",
      type: "debit",
      amount: 79.99,
      description: "Max Boost Plan - Secured Loan",
      category: "max_boost",
      date: "2024-01-15",
      status: "completed",
      merchant: "TakeOff Credit",
      planType: "Secured Loan",
      planDuration: "Monthly",
    },
    {
      id: "txn_007",
      type: "debit",
      amount: 29.99,
      description: "Starter Boost Plan - Credit Line",
      category: "starter_boost",
      date: "2023-12-15",
      status: "completed",
      merchant: "TakeOff Credit",
      planType: "Credit Line",
      planDuration: "Monthly",
    },
    {
      id: "txn_008",
      type: "debit",
      amount: 49.99,
      description: "Power Boost Plan - Credit Line",
      category: "power_boost",
      date: "2023-11-15",
      status: "failed",
      merchant: "TakeOff Credit",
      planType: "Credit Line",
      planDuration: "Monthly",
    },
    {
      id: "txn_009",
      type: "debit",
      amount: 79.99,
      description: "Max Boost Plan - Credit Line",
      category: "max_boost",
      date: "2023-10-15",
      status: "pending",
      merchant: "TakeOff Credit",
      planType: "Credit Line",
      planDuration: "Monthly",
    },
    {
      id: "txn_010",
      type: "debit",
      amount: 29.99,
      description: "Starter Boost Plan - Secured Loan",
      category: "starter_boost",
      date: "2023-09-15",
      status: "completed",
      merchant: "TakeOff Credit",
      planType: "Secured Loan",
      planDuration: "Monthly",
    },
  ]

  const categories = [
    { value: "all", label: "All Plans" },
    { value: "starter_boost", label: "Starter Boost" },
    { value: "power_boost", label: "Power Boost" },
    { value: "max_boost", label: "Max Boost" },
  ]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "starter_boost":
        return <Zap className="h-5 w-5 text-blue-500" />
      case "power_boost":
        return <TrendingUp className="h-5 w-5 text-orange-500" />
      case "max_boost":
        return <CreditCard className="h-5 w-5 text-purple-500" />
      default:
        return <DollarSign className="h-5 w-5 text-gray-500" />
    }
  }

  const getPlanBadgeColor = (category: string) => {
    switch (category) {
      case "starter_boost":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "power_boost":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "max_boost":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.planType?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || transaction.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const totalSpent = transactions.filter((t) => t.status === "completed").reduce((sum, t) => sum + t.amount, 0)

  const completedTransactions = transactions.filter((t) => t.status === "completed").length
  const pendingTransactions = transactions.filter((t) => t.status === "pending").length

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
          <p className="text-gray-600">Loading boost plan transactions...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header showAuth={false} />

      <main className="max-w-6xl mx-auto px-4 py-8 pt-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline" size="sm" className="bg-transparent">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Boost Plan Transactions</h1>
              <p className="text-gray-600">View your boost plan purchase history and payments</p>
            </div>
          </div>
          <Button className="bg-sky-500 hover:bg-sky-600">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Spent on Boosts</p>
                  <p className="text-2xl font-bold text-gray-900">${totalSpent.toFixed(2)}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Zap className="h-6 w-6 text-blue-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed Payments</p>
                  <p className="text-2xl font-bold text-gray-900">{completedTransactions}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <ArrowDownRight className="h-6 w-6 text-green-500" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Payments</p>
                  <p className="text-2xl font-bold text-gray-900">{pendingTransactions}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <CreditCard className="h-6 w-6 text-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search boost plan transactions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="md:w-64">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transactions List */}
        <Card>
          <CardHeader>
            <CardTitle>Boost Plan Purchase History</CardTitle>
            <p className="text-sm text-gray-600">
              Showing {filteredTransactions.length} of {transactions.length} boost plan transactions
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center border">
                      {getCategoryIcon(transaction.category)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{transaction.description}</div>
                      <div className="text-sm text-gray-600 flex items-center gap-2">
                        <span>{transaction.planType}</span>
                        <span>•</span>
                        <span>{transaction.planDuration}</span>
                        <span>•</span>
                        <span>{new Date(transaction.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">${transaction.amount.toFixed(2)}</div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={
                            transaction.status === "completed"
                              ? "text-green-600 border-green-200"
                              : transaction.status === "pending"
                                ? "text-yellow-600 border-yellow-200"
                                : "text-red-600 border-red-200"
                          }
                        >
                          {transaction.status}
                        </Badge>
                        <Badge variant="outline" className={getPlanBadgeColor(transaction.category)}>
                          {transaction.category.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </Badge>
                      </div>
                    </div>
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <ArrowUpRight className="h-4 w-4 text-blue-500" />
                    </div>
                  </div>
                </div>
              ))}

              {filteredTransactions.length === 0 && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No boost plan transactions found</h3>
                  <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                  <Link href="/add-boost">
                    <Button className="mt-4 bg-sky-500 hover:bg-sky-600">
                      <Zap className="h-4 w-4 mr-2" />
                      Purchase Boost Plan
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>

      <FooterNavigation />
    </div>
  )
}

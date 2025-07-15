"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import FooterNavigation from "@/components/footer-navigation"
import { useRouter } from "next/navigation"
import { ArrowLeft, Download, CreditCard, CheckCircle, Clock, DollarSign, Star } from "lucide-react"
import Link from "next/link"

interface UserData {
  firstName: string
  lastName: string
  email: string
  phone: string
  isVerified: boolean
  signupDate: string
}

interface Subscription {
  id: string
  planName: string
  planType: string
  originalPlanType?: string
  price: string
  billingFrequency: string
  nextBillingDate: string
  status: string
  activatedAt: string
  creditLimit?: string
  loanAmount?: string
  features: string[]
}

interface PaymentRecord {
  id: string
  planId: string
  planName: string
  amount: string
  date: string
  status: string
  method: string
  invoiceId: string
}

export default function PaymentHistoryPage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isExporting, setIsExporting] = useState(false)
  const router = useRouter()

  // Mock payment data - in real app this would come from API
  const paymentRecords: PaymentRecord[] = [
    {
      id: "pay_001",
      planId: "main-plan",
      planName: "TakeOff Credit Builder",
      amount: "$25.00",
      date: "2024-06-15",
      status: "completed",
      method: "•••• 4242",
      invoiceId: "INV-2024-001",
    },
    {
      id: "pay_002",
      planId: "boost_001",
      planName: "Credit Line Boost",
      amount: "$15.00",
      date: "2024-06-15",
      status: "completed",
      method: "•••• 4242",
      invoiceId: "INV-2024-002",
    },
    {
      id: "pay_003",
      planId: "main-plan",
      planName: "TakeOff Credit Builder",
      amount: "$25.00",
      date: "2024-05-15",
      status: "completed",
      method: "•••• 4242",
      invoiceId: "INV-2024-003",
    },
    {
      id: "pay_004",
      planId: "boost_001",
      planName: "Credit Line Boost",
      amount: "$15.00",
      date: "2024-05-15",
      status: "completed",
      method: "•••• 4242",
      invoiceId: "INV-2024-004",
    },
    {
      id: "pay_005",
      planId: "main-plan",
      planName: "TakeOff Credit Builder",
      amount: "$25.00",
      date: "2024-04-15",
      status: "completed",
      method: "•••• 4242",
      invoiceId: "INV-2024-005",
    },
  ]

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

    // Load all plans
    const loadAllPlans = () => {
      let allPlans: Subscription[] = []

      // Load main plan
      const mainPlanData = localStorage.getItem("takeoff_selected_plan")
      if (mainPlanData) {
        const mainPlan = JSON.parse(mainPlanData)
        const mainPlanSubscription: Subscription = {
          id: "main-plan",
          planName: mainPlan.planName,
          planType: "main-plan",
          originalPlanType: mainPlan.planType,
          price: "$25.00",
          billingFrequency: "monthly",
          nextBillingDate: mainPlan.nextBillingDate,
          status: mainPlan.paymentStatus || "active",
          activatedAt: mainPlan.selectedAt,
          features: [],
        }
        allPlans.push(mainPlanSubscription)
      }

      // Load boost plans
      const subscriptionsData = localStorage.getItem("takeoff_subscriptions")
      if (subscriptionsData) {
        const boostPlans = JSON.parse(subscriptionsData).filter(
          (sub: Subscription) => sub.status === "active" && sub.planType !== "main-plan",
        )
        allPlans = [...allPlans, ...boostPlans]
      }

      setSubscriptions(allPlans)
    }

    loadAllPlans()
    setIsLoading(false)
  }, [router])

  // Export payment history as PDF
  const handleExportHistory = async () => {
    setIsExporting(true)

    try {
      // Dynamic import of jsPDF
      const { jsPDF } = await import("jspdf")
      const doc = new jsPDF()

      // Set up the document
      const pageWidth = doc.internal.pageSize.width
      const margin = 20
      let yPosition = margin

      // Header
      doc.setFontSize(20)
      doc.setFont("helvetica", "bold")
      doc.text("TakeOff Payment History", margin, yPosition)
      yPosition += 15

      // User info
      doc.setFontSize(12)
      doc.setFont("helvetica", "normal")
      if (userData) {
        doc.text(`Account: ${userData.firstName} ${userData.lastName}`, margin, yPosition)
        yPosition += 8
        doc.text(`Email: ${userData.email}`, margin, yPosition)
        yPosition += 8
      }
      doc.text(`Generated: ${new Date().toLocaleDateString()}`, margin, yPosition)
      yPosition += 20

      // Summary section
      const totalPaid = paymentRecords
        .filter((payment) => payment.status === "completed")
        .reduce((sum, payment) => sum + Number.parseFloat(payment.amount.replace("$", "")), 0)
      const successfulPayments = paymentRecords.filter((payment) => payment.status === "completed").length
      const failedPayments = paymentRecords.filter((payment) => payment.status === "failed").length

      doc.setFontSize(14)
      doc.setFont("helvetica", "bold")
      doc.text("Payment Summary", margin, yPosition)
      yPosition += 12

      doc.setFontSize(11)
      doc.setFont("helvetica", "normal")
      doc.text(`Total Paid: $${totalPaid.toFixed(2)}`, margin, yPosition)
      yPosition += 8
      doc.text(`Successful Payments: ${successfulPayments}`, margin, yPosition)
      yPosition += 8
      doc.text(`Failed Payments: ${failedPayments}`, margin, yPosition)
      yPosition += 20

      // Active Plans section
      doc.setFontSize(14)
      doc.setFont("helvetica", "bold")
      doc.text("Active Plans", margin, yPosition)
      yPosition += 12

      doc.setFontSize(11)
      doc.setFont("helvetica", "normal")
      subscriptions.forEach((plan) => {
        if (yPosition > 250) {
          doc.addPage()
          yPosition = margin
        }

        doc.text(`• ${plan.planName} - ${plan.price}/month`, margin + 5, yPosition)
        yPosition += 8
        doc.text(`  Activated: ${new Date(plan.activatedAt).toLocaleDateString()}`, margin + 10, yPosition)
        yPosition += 8
        doc.text(`  Status: ${plan.status}`, margin + 10, yPosition)
        yPosition += 12
      })

      yPosition += 10

      // Payment Records section
      doc.setFontSize(14)
      doc.setFont("helvetica", "bold")
      doc.text("Payment Records", margin, yPosition)
      yPosition += 12

      // Table headers
      doc.setFontSize(10)
      doc.setFont("helvetica", "bold")
      doc.text("Date", margin, yPosition)
      doc.text("Plan", margin + 40, yPosition)
      doc.text("Amount", margin + 100, yPosition)
      doc.text("Status", margin + 130, yPosition)
      doc.text("Method", margin + 160, yPosition)
      yPosition += 8

      // Draw line under headers
      doc.line(margin, yPosition, pageWidth - margin, yPosition)
      yPosition += 8

      // Payment records
      doc.setFont("helvetica", "normal")
      paymentRecords.forEach((payment) => {
        if (yPosition > 270) {
          doc.addPage()
          yPosition = margin

          // Repeat headers on new page
          doc.setFontSize(10)
          doc.setFont("helvetica", "bold")
          doc.text("Date", margin, yPosition)
          doc.text("Plan", margin + 40, yPosition)
          doc.text("Amount", margin + 100, yPosition)
          doc.text("Status", margin + 130, yPosition)
          doc.text("Method", margin + 160, yPosition)
          yPosition += 8
          doc.line(margin, yPosition, pageWidth - margin, yPosition)
          yPosition += 8
          doc.setFont("helvetica", "normal")
        }

        const date = new Date(payment.date).toLocaleDateString()
        const planName = payment.planName.length > 20 ? payment.planName.substring(0, 17) + "..." : payment.planName

        doc.text(date, margin, yPosition)
        doc.text(planName, margin + 40, yPosition)
        doc.text(payment.amount, margin + 100, yPosition)
        doc.text(payment.status, margin + 130, yPosition)
        doc.text(payment.method, margin + 160, yPosition)
        yPosition += 10
      })

      // Footer
      const pageCount = doc.internal.getNumberOfPages()
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i)
        doc.setFontSize(8)
        doc.setFont("helvetica", "normal")
        doc.text(`Page ${i} of ${pageCount}`, pageWidth - 40, doc.internal.pageSize.height - 10)
        doc.text("TakeOff Credit Builder - Payment History", margin, doc.internal.pageSize.height - 10)
      }

      // Save the PDF
      const fileName = `TakeOff_Payment_History_${new Date().toISOString().split("T")[0]}.pdf`
      doc.save(fileName)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("Error generating PDF. Please try again.")
    } finally {
      setIsExporting(false)
    }
  }

  // Generate 12-month timeline for each plan
  const generateMonthlyTimeline = (plan: Subscription) => {
    const activationDate = new Date(plan.activatedAt)
    const months = []

    for (let i = 0; i < 12; i++) {
      const monthDate = new Date(activationDate.getFullYear(), activationDate.getMonth() + i, 1)
      const monthKey = `${monthDate.getFullYear()}-${String(monthDate.getMonth() + 1).padStart(2, "0")}`

      // Check if there's a payment for this month and plan
      const hasPayment = paymentRecords.some((payment) => {
        const paymentDate = new Date(payment.date)
        const paymentKey = `${paymentDate.getFullYear()}-${String(paymentDate.getMonth() + 1).padStart(2, "0")}`
        return paymentKey === monthKey && payment.planId === plan.id
      })

      months.push({
        date: monthDate,
        monthKey,
        hasPayment,
        amount: hasPayment ? plan.price : null,
      })
    }

    return months
  }

  const mainPlan = subscriptions.find((sub) => sub.planType === "main-plan")
  const boostPlans = subscriptions.filter((sub) => sub.planType !== "main-plan")

  const totalPaid = paymentRecords
    .filter((payment) => payment.status === "completed")
    .reduce((sum, payment) => sum + Number.parseFloat(payment.amount.replace("$", "")), 0)

  const successfulPayments = paymentRecords.filter((payment) => payment.status === "completed").length
  const failedPayments = paymentRecords.filter((payment) => payment.status === "failed").length

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment history...</p>
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
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment History</h1>
              <p className="text-gray-600">Track your payment timeline and billing history</p>
            </div>
          </div>
          <Button
            className="bg-sky-500 hover:bg-sky-600 disabled:opacity-50"
            onClick={handleExportHistory}
            disabled={isExporting}
          >
            <Download className="h-4 w-4 mr-2" />
            {isExporting ? "Exporting..." : "Export History"}
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Paid</p>
                  <p className="text-2xl font-bold text-gray-900">${totalPaid.toFixed(2)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Successful Payments</p>
                  <p className="text-2xl font-bold text-gray-900">{successfulPayments}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Failed Payments</p>
                  <p className="text-2xl font-bold text-gray-900">{failedPayments}</p>
                </div>
                <Clock className="h-8 w-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Payment Timelines */}
        <div className="space-y-8 mb-8">
          {/* Main Plan Timeline */}
          {mainPlan && (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard className="h-5 w-5 text-sky-500" />
                    <div>
                      <CardTitle className="text-sky-800">{mainPlan.planName}</CardTitle>
                      <p className="text-sm text-sky-600">
                        Main Plan • {mainPlan.price}/month • Activated{" "}
                        {new Date(mainPlan.activatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-sky-700 border-sky-200 bg-sky-50">
                    Main Plan
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
                  {generateMonthlyTimeline(mainPlan).map((month, index) => (
                    <div key={index} className="text-center">
                      <div className="mb-2">
                        {month.hasPayment ? (
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle className="h-4 w-4 text-white" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 bg-gray-200 rounded-full mx-auto"></div>
                        )}
                      </div>
                      <div className="text-xs text-gray-600">
                        {month.date.toLocaleDateString("en-US", { month: "short" })}
                      </div>
                      <div className="text-xs text-gray-500">{month.date.getFullYear()}</div>
                      {month.hasPayment && (
                        <div className="text-xs text-green-600 font-medium mt-1">{month.amount}</div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Booster Plans Timelines */}
          {boostPlans.map((plan) => (
            <Card key={plan.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Star className="h-5 w-5 text-green-500" />
                    <div>
                      <CardTitle className="text-green-800">{plan.planName}</CardTitle>
                      <p className="text-sm text-green-600">
                        Booster Plan • {plan.price}/month • Activated {new Date(plan.activatedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50">
                    Booster Plan
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-6 md:grid-cols-12 gap-2">
                  {generateMonthlyTimeline(plan).map((month, index) => (
                    <div key={index} className="text-center">
                      <div className="mb-2">
                        {month.hasPayment ? (
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle className="h-4 w-4 text-white" />
                          </div>
                        ) : (
                          <div className="w-8 h-8 bg-gray-200 rounded-full mx-auto"></div>
                        )}
                      </div>
                      <div className="text-xs text-gray-600">
                        {month.date.toLocaleDateString("en-US", { month: "short" })}
                      </div>
                      <div className="text-xs text-gray-500">{month.date.getFullYear()}</div>
                      {month.hasPayment && (
                        <div className="text-xs text-green-600 font-medium mt-1">{month.amount}</div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Legend */}
        <Card className="mb-8">
          <CardContent className="p-4">
            <div className="flex items-center justify-center gap-8">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-3 w-3 text-white" />
                </div>
                <span className="text-sm text-gray-600">Payment Made</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                <span className="text-sm text-gray-600">No Payment</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Payment Records */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Payment Records</CardTitle>
            <p className="text-sm text-gray-600">Complete history of all transactions</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentRecords.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        payment.status === "completed" ? "bg-green-100" : "bg-red-100"
                      }`}
                    >
                      {payment.status === "completed" ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Clock className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{payment.planName}</div>
                      <div className="text-sm text-gray-600">
                        {new Date(payment.date).toLocaleDateString()} • {payment.method}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{payment.amount}</div>
                      <Badge
                        variant="outline"
                        className={
                          payment.status === "completed"
                            ? "text-green-600 border-green-200"
                            : "text-red-600 border-red-200"
                        }
                      >
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>

      <FooterNavigation />
    </div>
  )
}

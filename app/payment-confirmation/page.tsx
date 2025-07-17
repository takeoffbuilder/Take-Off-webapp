"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/header"
import { useRouter } from "next/navigation"
import { CheckCircle, CreditCard, Shield, ArrowRight, Lock } from "lucide-react"

interface SelectedPlan {
  planName: string
  planType: string
  price: string
  creditLimit?: string
  loanAmount?: string
}

interface PersonalInfo {
  firstName: string
  lastName: string
  address: {
    city: string
    state: string
    zipCode: string
  }
}

interface PaymentInfo {
  nameOnCard: string
  cardNumber: string
  expiryDate: string
  cvv: string
  zipCode: string
}

export default function PaymentConfirmationPage() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan | null>(null)
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    nameOnCard: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    zipCode: "",
  })

  useEffect(() => {
    // Check if user completed personal info
    const planData = localStorage.getItem("takeoff_selected_plan")
    const personalData = localStorage.getItem("takeoff_personal_info")

    if (!planData || !personalData) {
      router.push("/services")
      return
    }

    const plan = JSON.parse(planData)
    const personal = JSON.parse(personalData)

    if (!plan.personalInfoCompleted) {
      router.push("/services")
      return
    }

    setSelectedPlan(plan)
    setPersonalInfo(personal)

    // Pre-fill name and zip code from personal info
    setPaymentInfo((prev) => ({
      ...prev,
      nameOnCard: `${personal.firstName} ${personal.lastName}`.trim(),
      zipCode: personal.address.zipCode,
    }))
  }, [router])

  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    const groups = numbers.match(/.{1,4}/g) || []
    return groups.join(" ").substr(0, 19) // Max 16 digits with spaces
  }

  const formatExpiryDate = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length >= 2) {
      return `${numbers.slice(0, 2)}/${numbers.slice(2, 4)}`
    }
    return numbers
  }

  const handlePaymentInputChange = (field: keyof PaymentInfo, value: string) => {
    let formattedValue = value

    if (field === "cardNumber") {
      formattedValue = formatCardNumber(value)
    } else if (field === "expiryDate") {
      formattedValue = formatExpiryDate(value)
    } else if (field === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4)
    } else if (field === "zipCode") {
      formattedValue = value.replace(/\D/g, "").slice(0, 5)
    }

    setPaymentInfo((prev) => ({
      ...prev,
      [field]: formattedValue,
    }))
  }

  const validatePaymentInfo = () => {
    return (
      paymentInfo.nameOnCard.trim() &&
      paymentInfo.cardNumber.replace(/\s/g, "").length >= 13 &&
      paymentInfo.expiryDate.length === 5 &&
      paymentInfo.cvv.length >= 3 &&
      paymentInfo.zipCode.length === 5
    )
  }

  const handleConfirmPayment = async () => {
    if (!validatePaymentInfo()) {
      alert("Please fill in all payment fields correctly.")
      return
    }

    setIsProcessing(true)

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Update plan status to completed
      if (selectedPlan) {
        localStorage.setItem(
          "takeoff_selected_plan",
          JSON.stringify({
            ...selectedPlan,
            paymentStatus: "completed",
            activatedAt: new Date().toISOString(),
          }),
        )
      }

      // Show success and redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      alert("Payment failed. Please try again.")
      setIsProcessing(false)
    }
  }

  if (!selectedPlan || !personalInfo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showAuth={false} />

      <main className="max-w-4xl mx-auto px-4 py-8 pt-24">
        {/* Congratulations Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-sky-500 to-sky-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Congrats! You're Ready for <span className="text-sky-500">Take Off</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your application has been approved, {personalInfo.firstName}! Complete your payment to activate your credit
            building account and start your journey to better credit.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-green-500" />
                Secure Payment Information
              </CardTitle>
              <p className="text-gray-600">Enter your payment details to activate your account</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Accepted Cards */}
              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-gray-700">We Accept:</span>
                <div className="flex items-center gap-3">
                  {/* Visa Logo */}
                  <div className="w-12 h-8 bg-white rounded border flex items-center justify-center">
                    <svg className="w-8 h-5" viewBox="0 0 40 24" fill="none">
                      <rect width="40" height="24" rx="4" fill="white" />
                      <path
                        d="M16.283 7.5h-2.927l-1.833 9h2.927l1.833-9zm7.977 5.717c.012-2.384-3.302-2.516-3.278-3.582.008-.325.317-.671 1-.76.338-.044 1.273-.078 2.336.41l.416-1.94c-.57-.207-1.302-.406-2.214-.406-2.34 0-3.986 1.244-3.998 3.025-.013 1.317 1.175 2.052 2.072 2.489.923.449 1.233.737 1.229 1.139-.006.615-.738.888-1.42.899-1.193.019-1.886-.322-2.437-.58l-.43 2.006c.555.255 1.582.477 2.648.488 2.488 0 4.115-1.228 4.125-3.13l-.049-.558zm6.31-5.717h-2.265c-.702 0-1.227.203-1.537.946l-4.37 8.054h2.488s.406-.888.498-1.081h3.059c.071.324.29 1.081.29 1.081h2.198l-1.92-9h.559zm-2.62 5.943c.196-.525.946-2.553.946-2.553s.193-.525.312-.866l.159.781s.451 2.182.546 2.638h-1.963zm-12.667-4.087l-2.364 6.116-.252-1.292c-.44-1.492-1.809-3.106-3.342-3.914l2.622 8.09h2.506l3.73-9h-2.5-.4z"
                        fill="#1434CB"
                      />
                    </svg>
                  </div>
                  {/* Mastercard Logo */}
                  <div className="w-12 h-8 bg-white rounded border flex items-center justify-center">
                    <svg className="w-8 h-5" viewBox="0 0 40 24" fill="none">
                      <rect width="40" height="24" rx="4" fill="white" />
                      <circle cx="15" cy="12" r="7" fill="#EB001B" />
                      <circle cx="25" cy="12" r="7" fill="#F79E1B" />
                      <path
                        d="M20 6.5c1.5 1.4 2.5 3.4 2.5 5.5s-1 4.1-2.5 5.5c-1.5-1.4-2.5-3.4-2.5-5.5s1-4.1 2.5-5.5z"
                        fill="#FF5F00"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Name on Card */}
              <div>
                <Label htmlFor="nameOnCard" className="text-gray-900">
                  Name on Card *
                </Label>
                <Input
                  id="nameOnCard"
                  value={paymentInfo.nameOnCard}
                  onChange={(e) => handlePaymentInputChange("nameOnCard", e.target.value)}
                  placeholder="Full name as shown on card"
                  required
                />
              </div>

              {/* Card Number */}
              <div>
                <Label htmlFor="cardNumber" className="text-gray-900">
                  Card Number *
                </Label>
                <Input
                  id="cardNumber"
                  value={paymentInfo.cardNumber}
                  onChange={(e) => handlePaymentInputChange("cardNumber", e.target.value)}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  required
                />
              </div>

              {/* Expiry Date and CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate" className="text-gray-900">
                    Expiry Date *
                  </Label>
                  <Input
                    id="expiryDate"
                    value={paymentInfo.expiryDate}
                    onChange={(e) => handlePaymentInputChange("expiryDate", e.target.value)}
                    placeholder="MM/YY"
                    maxLength={5}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cvv" className="text-gray-900">
                    CVV *
                  </Label>
                  <Input
                    id="cvv"
                    value={paymentInfo.cvv}
                    onChange={(e) => handlePaymentInputChange("cvv", e.target.value)}
                    placeholder="123"
                    maxLength={4}
                    required
                  />
                </div>
              </div>

              {/* Billing Zip Code */}
              <div>
                <Label htmlFor="billingZip" className="text-gray-900">
                  Billing ZIP Code *
                </Label>
                <Input
                  id="billingZip"
                  value={paymentInfo.zipCode}
                  onChange={(e) => handlePaymentInputChange("zipCode", e.target.value)}
                  placeholder="12345"
                  maxLength={5}
                  required
                />
              </div>

              {/* Payment Button */}
              <Button
                onClick={handleConfirmPayment}
                disabled={isProcessing || !validatePaymentInfo()}
                className="w-full bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white py-4 rounded-full font-medium flex items-center justify-center gap-2 text-lg transition-all disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5" />
                    Complete Payment - {selectedPlan.price}
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                Your payment information is encrypted and secure. By completing payment, you agree to our Terms of
                Service.
              </p>
            </CardContent>
          </Card>

          {/* Plan Summary & Benefits */}
          <div className="space-y-6">
            {/* Plan Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-sky-500" />
                  Your Credit Building Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{selectedPlan.planName}</h3>
                    <p className="text-gray-600 capitalize">{selectedPlan.planType.replace("-", " ")} Plan</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-sky-600">{selectedPlan.price}</div>
                    <div className="text-sm text-gray-500">/month</div>
                  </div>
                </div>

                <div className="bg-sky-50 rounded-lg p-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-sky-600 mb-1">
                      {selectedPlan.creditLimit || selectedPlan.loanAmount}
                    </div>
                    <div className="text-sm text-gray-600">
                      {selectedPlan.creditLimit ? "Credit Line Available" : "Loan Amount"}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Payment:</span>
                    <span className="font-medium">{selectedPlan.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Setup Fee:</span>
                    <span className="font-medium text-green-600">$0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Credit Bureau Reporting:</span>
                    <span className="font-medium">All 3 Bureaus</span>
                  </div>
                  <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                    <span>Total Due Today:</span>
                    <span className="text-sky-600">{selectedPlan.price}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What Happens Next */}
            <Card className="bg-green-50 border-green-200">
              <CardHeader>
                <CardTitle className="text-lg text-green-800">What Happens Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    1
                  </div>
                  <div>
                    <div className="font-medium text-green-800">Instant Account Activation</div>
                    <div className="text-sm text-green-700">Your credit building account activates immediately</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    2
                  </div>
                  <div>
                    <div className="font-medium text-green-800">Credit Reporting Begins</div>
                    <div className="text-sm text-green-700">We start reporting to all 3 bureaus within 24 hours</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    3
                  </div>
                  <div>
                    <div className="font-medium text-green-800">Track Your Progress</div>
                    <div className="text-sm text-green-700">Monitor your credit score improvements in real-time</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Badges */}
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span>256-bit SSL</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>PCI Compliant</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-green-500" />
                    <span>Bank-Level Security</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-sm mx-4 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">Processing Payment</h3>
            <p className="text-gray-600">Please wait while we activate your credit building account...</p>
          </div>
        </div>
      )}
    </div>
  )
}

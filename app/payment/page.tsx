"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Header from "@/components/header"
import { useRouter } from "next/navigation"
import { CreditCard, Lock, Shield, ArrowLeft, Check } from "lucide-react"
import Link from "next/link"

interface UserData {
  firstName: string
  lastName: string
  email: string
}

interface PaymentMethod {
  id: string
  brand: string
  last4: string
  expiryMonth: string
  expiryYear: string
  isDefault: boolean
}

export default function PaymentPage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([])
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("existing")
  const [selectedCardId, setSelectedCardId] = useState<string>("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [newCardData, setNewCardData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    zipCode: "",
  })
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated
    const authData = localStorage.getItem("takeoff_auth")
    if (!authData) {
      router.push("/signin")
      return
    }

    // Load user data
    const storedUser = localStorage.getItem("takeoff_user")
    if (storedUser) {
      const user = JSON.parse(storedUser)
      setUserData(user)
      setNewCardData((prev) => ({
        ...prev,
        cardholderName: `${user.firstName} ${user.lastName}`,
      }))
    }

    // Load existing payment methods (mock data)
    const mockPaymentMethods: PaymentMethod[] = [
      {
        id: "card_1",
        brand: "Visa",
        last4: "4242",
        expiryMonth: "12",
        expiryYear: "2027",
        isDefault: true,
      },
      {
        id: "card_2",
        brand: "Mastercard",
        last4: "8888",
        expiryMonth: "08",
        expiryYear: "2026",
        isDefault: false,
      },
    ]
    setPaymentMethods(mockPaymentMethods)

    // Set default card as selected
    const defaultCard = mockPaymentMethods.find((card) => card.isDefault)
    if (defaultCard) {
      setSelectedCardId(defaultCard.id)
    }
  }, [router])

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\D/g, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    setNewCardData((prev) => ({ ...prev, cardNumber: formatted }))
  }

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value)
    setNewCardData((prev) => ({ ...prev, expiryDate: formatted }))
  }

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").substring(0, 4)
    setNewCardData((prev) => ({ ...prev, cvv: value }))
  }

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").substring(0, 5)
    setNewCardData((prev) => ({ ...prev, zipCode: value }))
  }

  const handlePayment = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Redirect to dashboard with success parameter
    router.push("/dashboard?payment=success")
  }

  const isFormValid = () => {
    if (selectedPaymentMethod === "existing") {
      return selectedCardId !== ""
    } else {
      return (
        newCardData.cardNumber.replace(/\s/g, "").length >= 13 &&
        newCardData.expiryDate.length === 5 &&
        newCardData.cvv.length >= 3 &&
        newCardData.cardholderName.trim() !== "" &&
        newCardData.zipCode.length === 5
      )
    }
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4"></div>
          <p className="text-gray-300">Loading payment page...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <Header showAuth={false} />

      <main className="max-w-4xl mx-auto px-4 py-8 pt-24">
        <div className="mb-6">
          <Link href="/dashboard" className="flex items-center text-sky-400 hover:text-sky-300 mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Make a Payment</h1>
          <p className="text-gray-300">Complete your monthly payment to continue building your credit</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <CreditCard className="h-5 w-5 text-sky-500" />
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={selectedPaymentMethod}
                  onValueChange={setSelectedPaymentMethod}
                  className="space-y-4"
                >
                  {/* Existing Payment Methods */}
                  {paymentMethods.length > 0 && (
                    <div className="space-y-3">
                      <div className="font-medium text-white">Saved Payment Methods</div>
                      {paymentMethods.map((card) => (
                        <div key={card.id} className="flex items-center space-x-3">
                          <RadioGroupItem
                            value="existing"
                            id={`card-${card.id}`}
                            onClick={() => setSelectedCardId(card.id)}
                            className="border-gray-600 text-sky-500"
                          />
                          <Label htmlFor={`card-${card.id}`} className="flex-1 cursor-pointer">
                            <div className="flex items-center justify-between p-4 border border-gray-600 rounded-lg hover:bg-gray-800 transition-colors">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-6 bg-gradient-to-r from-blue-600 to-purple-600 rounded flex items-center justify-center">
                                  <span className="text-white text-xs font-bold">
                                    {card.brand === "Visa" ? "V" : "MC"}
                                  </span>
                                </div>
                                <div>
                                  <div className="font-medium text-white">
                                    {card.brand} •••• {card.last4}
                                  </div>
                                  <div className="text-sm text-gray-400">
                                    Expires {card.expiryMonth}/{card.expiryYear}
                                  </div>
                                </div>
                              </div>
                              {card.isDefault && (
                                <div className="text-xs bg-sky-900 text-sky-300 px-2 py-1 rounded-full">Default</div>
                              )}
                            </div>
                          </Label>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Add New Card */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="new" id="new-card" className="border-gray-600 text-sky-500" />
                      <Label htmlFor="new-card" className="font-medium text-white">
                        Add New Payment Method
                      </Label>
                    </div>

                    {selectedPaymentMethod === "new" && (
                      <div className="ml-6 space-y-4 p-4 border border-gray-600 rounded-lg bg-gray-800">
                        <div className="grid grid-cols-1 gap-4">
                          <div>
                            <Label htmlFor="cardNumber" className="text-white">
                              Card Number
                            </Label>
                            <Input
                              id="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              value={newCardData.cardNumber}
                              onChange={handleCardNumberChange}
                              maxLength={19}
                              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-sky-500 focus:ring-sky-500"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="expiryDate" className="text-white">
                                Expiry Date
                              </Label>
                              <Input
                                id="expiryDate"
                                placeholder="MM/YY"
                                value={newCardData.expiryDate}
                                onChange={handleExpiryDateChange}
                                maxLength={5}
                                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-sky-500 focus:ring-sky-500"
                              />
                            </div>
                            <div>
                              <Label htmlFor="cvv" className="text-white">
                                CVV
                              </Label>
                              <Input
                                id="cvv"
                                placeholder="123"
                                value={newCardData.cvv}
                                onChange={handleCvvChange}
                                maxLength={4}
                                className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-sky-500 focus:ring-sky-500"
                              />
                            </div>
                          </div>

                          <div>
                            <Label htmlFor="cardholderName" className="text-white">
                              Cardholder Name
                            </Label>
                            <Input
                              id="cardholderName"
                              placeholder="John Doe"
                              value={newCardData.cardholderName}
                              onChange={(e) => setNewCardData((prev) => ({ ...prev, cardholderName: e.target.value }))}
                              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-sky-500 focus:ring-sky-500"
                            />
                          </div>

                          <div>
                            <Label htmlFor="zipCode" className="text-white">
                              ZIP Code
                            </Label>
                            <Input
                              id="zipCode"
                              placeholder="12345"
                              value={newCardData.zipCode}
                              onChange={handleZipCodeChange}
                              maxLength={5}
                              className="bg-gray-700 border-gray-600 text-white placeholder:text-gray-400 focus:border-sky-500 focus:ring-sky-500"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </RadioGroup>

                {/* Security Information */}
                <div className="mt-6 p-4 bg-green-900/20 rounded-lg border border-green-700/30">
                  <div className="flex items-center gap-2 mb-2">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span className="font-medium text-green-300">Secure Payment</span>
                  </div>
                  <p className="text-sm text-green-200">
                    Your payment information is encrypted and secure. We use industry-standard SSL encryption to protect
                    your data.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Auto Pay Promotion */}
            <Card className="mt-6 bg-gray-900 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-sky-900 rounded-full flex items-center justify-center">
                    <Check className="h-5 w-5 text-sky-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white mb-2">Never Miss a Payment</h3>
                    <p className="text-gray-300 text-sm mb-3">
                      Set up AutoPay to ensure your payments are always on time and maintain your perfect payment
                      history.
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                    >
                      Enable AutoPay
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Summary */}
          <div>
            <Card className="bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Payment Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Amount Due</span>
                    <span className="font-semibold text-2xl text-white">$25.00</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Due Date</span>
                    <span className="font-medium text-white">July 15, 2024</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Account</span>
                    <span className="font-medium text-white">
                      {userData.firstName} {userData.lastName}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Payment For</span>
                    <span className="font-medium text-white">Monthly Plan</span>
                  </div>

                  <hr className="my-4 border-gray-700" />

                  <Button
                    onClick={handlePayment}
                    disabled={!isFormValid() || isProcessing}
                    className="w-full bg-sky-500 hover:bg-sky-600 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Processing...
                      </div>
                    ) : (
                      `Pay $25.00`
                    )}
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-xs text-gray-400 mt-4">
                    <Lock className="h-3 w-3" />
                    <span>Secured by 256-bit SSL encryption</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Information */}
            <Card className="mt-6 bg-gray-900 border-gray-700">
              <CardHeader>
                <CardTitle className="text-lg text-white">Account Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Name</span>
                    <span className="font-medium text-white">
                      {userData.firstName} {userData.lastName}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Email</span>
                    <span className="font-medium text-white">{userData.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Status</span>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-green-400 font-medium">Active</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Processing Overlay */}
      {isProcessing && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold mb-2 text-white">Processing Payment</h3>
            <p className="text-gray-300">Please wait while we process your payment...</p>
          </div>
        </div>
      )}
    </div>
  )
}

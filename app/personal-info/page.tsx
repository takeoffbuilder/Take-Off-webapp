"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Header from "@/components/header"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, Shield, Lock, CheckCircle } from "lucide-react"
import Link from "next/link"

interface PersonalInfo {
  firstName: string
  lastName: string
  ssn: string
  dateOfBirth: string
  phoneNumber: string
  address: {
    street: string
    city: string
    state: string
    zipCode: string
  }
}

interface SelectedPlan {
  planName: string
  planType: string
  price: string
  creditLimit?: string
  loanAmount?: string
}

export default function PersonalInfoPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [selectedPlan, setSelectedPlan] = useState<SelectedPlan | null>(null)
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 1

  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: "",
    lastName: "",
    ssn: "",
    dateOfBirth: "",
    phoneNumber: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
  })

  const states = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ]

  useEffect(() => {
    // Check if user is authenticated
    const authData = localStorage.getItem("takeoff_auth")
    if (!authData) {
      router.push("/signin")
      return
    }

    // Fetch query params once
    const sp = new URLSearchParams(window.location.search)
    const planFromUrl = sp.get("plan")
    const typeFromUrl = sp.get("type")
    const priceFromUrl = sp.get("price")
    const limitFromUrl = sp.get("limit")

    if (planFromUrl && typeFromUrl && priceFromUrl) {
      setSelectedPlan({
        planName: planFromUrl,
        planType: typeFromUrl,
        price: priceFromUrl,
        creditLimit: typeFromUrl === "credit-line" ? limitFromUrl : undefined,
        loanAmount: typeFromUrl === "secured-loan" ? limitFromUrl : undefined,
      })
    } else {
      router.push("/services")
    }

    const userData = localStorage.getItem("takeoff_user")
    if (userData) {
      const user = JSON.parse(userData)
      setPersonalInfo((prev) => ({
        ...prev,
        firstName: user.firstName === "User" ? "" : user.firstName || "",
        lastName: user.lastName || "",
        phoneNumber: user.phone || "",
      }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleInputChange = (field: string, value: string, section?: string) => {
    if (section) {
      setPersonalInfo((prev) => ({
        ...prev,
        [section]: {
          ...prev[section as keyof PersonalInfo],
          [field]: value,
        },
      }))
    } else {
      setPersonalInfo((prev) => ({
        ...prev,
        [field]: value,
      }))
    }
  }

  const formatSSN = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 5) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 5)}-${numbers.slice(5, 9)}`
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`
  }

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          personalInfo.firstName &&
          personalInfo.lastName &&
          personalInfo.ssn &&
          personalInfo.dateOfBirth &&
          personalInfo.phoneNumber &&
          personalInfo.address.street &&
          personalInfo.address.city &&
          personalInfo.address.state &&
          personalInfo.address.zipCode
        )
      default:
        return false
    }
  }

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) {
      setError("Please fill in all required fields")
      return
    }

    setIsLoading(true)
    setError("")

    try {
      // Simulate API call for identity verification and processing
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Store personal information
      localStorage.setItem("takeoff_personal_info", JSON.stringify(personalInfo))

      // Store selected plan with personal info completion
      if (selectedPlan) {
        localStorage.setItem(
          "takeoff_selected_plan",
          JSON.stringify({
            ...selectedPlan,
            selectedAt: new Date().toISOString(),
            paymentStatus: "pending",
            personalInfoCompleted: true,
            nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          }),
        )
      }

      // Update user data
      const existingUser = localStorage.getItem("takeoff_user")
      if (existingUser) {
        const userData = JSON.parse(existingUser)
        localStorage.setItem(
          "takeoff_user",
          JSON.stringify({
            ...userData,
            firstName: personalInfo.firstName,
            lastName: personalInfo.lastName,
            phone: personalInfo.phoneNumber,
            personalInfoCompleted: true,
          }),
        )
      }

      console.log("Personal information submitted:", personalInfo)

      // Redirect to payment/confirmation page
      router.push("/payment-confirmation")
    } catch (err) {
      setError("Something went wrong. Please try again.")
    }

    setIsLoading(false)
  }

  if (!selectedPlan) {
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
        {/* Back Button */}
        <Link href="/services" className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Plans
        </Link>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Complete Your Application</h1>
            <span className="text-sm text-gray-500">
              Step {currentStep} of {totalSteps}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-sky-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5 text-sky-500" />
                  Complete Personal Information
                </CardTitle>
                <p className="text-gray-600">
                  Please provide all your information to set up your credit building account.
                </p>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Step 1: Complete Personal Information */}
                {currentStep === 1 && (
                  <>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          value={personalInfo.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          placeholder="First Name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          value={personalInfo.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          placeholder="Last Name"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="ssn">Social Security Number *</Label>
                      <Input
                        id="ssn"
                        value={personalInfo.ssn}
                        onChange={(e) => handleInputChange("ssn", formatSSN(e.target.value))}
                        placeholder="XXX-XX-XXXX"
                        maxLength={11}
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">We use bank-level encryption to protect your SSN</p>
                    </div>

                    {/* Date of Birth Wheels */}
                    <div>
                      <Label>Date of Birth *</Label>
                      <div className="grid grid-cols-3 gap-4 mt-2">
                        {/* Month Wheel */}
                        <div>
                          <Label htmlFor="birthMonth" className="text-sm text-gray-600">
                            Month
                          </Label>
                          <Select
                            value={personalInfo.dateOfBirth.split("-")[1] || ""}
                            onValueChange={(value) => {
                              const currentDate = personalInfo.dateOfBirth.split("-")
                              const year = currentDate[0] || new Date().getFullYear().toString()
                              const day = currentDate[2] || "01"
                              handleInputChange("dateOfBirth", `${year}-${value.padStart(2, "0")}-${day}`)
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Month" />
                            </SelectTrigger>
                            <SelectContent className="max-h-60">
                              <SelectItem value="01">January</SelectItem>
                              <SelectItem value="02">February</SelectItem>
                              <SelectItem value="03">March</SelectItem>
                              <SelectItem value="04">April</SelectItem>
                              <SelectItem value="05">May</SelectItem>
                              <SelectItem value="06">June</SelectItem>
                              <SelectItem value="07">July</SelectItem>
                              <SelectItem value="08">August</SelectItem>
                              <SelectItem value="09">September</SelectItem>
                              <SelectItem value="10">October</SelectItem>
                              <SelectItem value="11">November</SelectItem>
                              <SelectItem value="12">December</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Day Wheel */}
                        <div>
                          <Label htmlFor="birthDay" className="text-sm text-gray-600">
                            Day
                          </Label>
                          <Select
                            value={personalInfo.dateOfBirth.split("-")[2] || ""}
                            onValueChange={(value) => {
                              const currentDate = personalInfo.dateOfBirth.split("-")
                              const year = currentDate[0] || new Date().getFullYear().toString()
                              const month = currentDate[1] || "01"
                              handleInputChange("dateOfBirth", `${year}-${month}-${value.padStart(2, "0")}`)
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Day" />
                            </SelectTrigger>
                            <SelectContent className="max-h-60">
                              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                                <SelectItem key={day} value={day.toString().padStart(2, "0")}>
                                  {day}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>

                        {/* Year Wheel */}
                        <div>
                          <Label htmlFor="birthYear" className="text-sm text-gray-600">
                            Year
                          </Label>
                          <Select
                            value={personalInfo.dateOfBirth.split("-")[0] || ""}
                            onValueChange={(value) => {
                              const currentDate = personalInfo.dateOfBirth.split("-")
                              const month = currentDate[1] || "01"
                              const day = currentDate[2] || "01"
                              handleInputChange("dateOfBirth", `${value}-${month}-${day}`)
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Year" />
                            </SelectTrigger>
                            <SelectContent className="max-h-60">
                              {Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - 18 - i).map((year) => (
                                <SelectItem key={year} value={year.toString()}>
                                  {year}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">You must be 18 or older to apply</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phoneNumber">Phone Number *</Label>
                        <Input
                          id="phoneNumber"
                          value={personalInfo.phoneNumber}
                          onChange={(e) => handleInputChange("phoneNumber", formatPhone(e.target.value))}
                          placeholder="(XXX) XXX-XXXX"
                          maxLength={14}
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="street">Street Address *</Label>
                      <Input
                        id="street"
                        value={personalInfo.address.street}
                        onChange={(e) => handleInputChange("street", e.target.value, "address")}
                        placeholder="Enter your street address"
                        required
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          value={personalInfo.address.city}
                          onChange={(e) => handleInputChange("city", e.target.value, "address")}
                          placeholder="City"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Select
                          value={personalInfo.address.state}
                          onValueChange={(value) => handleInputChange("state", value, "address")}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            {states.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="zipCode">ZIP Code *</Label>
                        <Input
                          id="zipCode"
                          value={personalInfo.address.zipCode}
                          onChange={(e) =>
                            handleInputChange("zipCode", e.target.value.replace(/\D/g, "").slice(0, 5), "address")
                          }
                          placeholder="12345"
                          maxLength={5}
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-end pt-6">
                  <Button
                    onClick={handleSubmit}
                    disabled={isLoading || !validateStep(currentStep)}
                    className="bg-sky-500 hover:bg-sky-600"
                  >
                    {isLoading ? "Processing..." : "Complete Application"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Selected Plan Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Selected Plan</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <div className="font-semibold text-gray-900">{selectedPlan.planName}</div>
                    <div className="text-sm text-gray-600 capitalize">
                      {selectedPlan.planType.replace("-", " ")} Plan
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-sky-600">{selectedPlan.price}/month</div>
                    <div className="text-sm text-gray-600">
                      {selectedPlan.creditLimit && `${selectedPlan.creditLimit} Credit Line`}
                      {selectedPlan.loanAmount && `${selectedPlan.loanAmount} Loan Amount`}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-green-800 mb-1">Your Information is Secure</h3>
                    <p className="text-sm text-green-700">
                      We use bank-level encryption and never share your personal information with third parties.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* What Happens Next */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">What Happens Next?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-sky-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">Identity Verification</div>
                    <div className="text-xs text-gray-600">We'll verify your information instantly</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-sky-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">Account Setup</div>
                    <div className="text-xs text-gray-600">Your credit building account will be created</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-sky-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-sm">Start Building</div>
                    <div className="text-xs text-gray-600">Begin your credit improvement journey</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-sm mx-4 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">Processing Your Information</h3>
            <p className="text-gray-600">Please wait while we verify your details and set up your account...</p>
          </div>
        </div>
      )}
    </div>
  )
}

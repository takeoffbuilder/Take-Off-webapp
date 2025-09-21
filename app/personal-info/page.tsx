"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, User, Phone, Mail, Calendar, MapPin, AlertCircle } from "lucide-react"

interface PersonalInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: {
    month: string
    day: string
    year: string
  }
  address: string
  city: string
  state: string
  zipCode: string
  ssn: string
}

export default function PersonalInfoPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: {
      month: "",
      day: "",
      year: "",
    },
    address: "",
    city: "",
    state: "",
    zipCode: "",
    ssn: "",
  })

  // Generate arrays for dropdowns
  const months = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ]

  const days = Array.from({ length: 31 }, (_, i) => {
    const day = (i + 1).toString().padStart(2, "0")
    return { value: day, label: day }
  })

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 100 }, (_, i) => {
    const year = (currentYear - i).toString()
    return { value: year, label: year }
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
    // Check if user came from signup or has selected plan
    const signupData = localStorage.getItem("takeoff_signup")
    const selectedPlanData = localStorage.getItem("takeoff_selected_plan")
    const userData = localStorage.getItem("takeoff_user")

    if (signupData) {
      const data = JSON.parse(signupData)
      setPersonalInfo((prev) => ({
        ...prev,
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
      }))
    }

    if (userData) {
      const data = JSON.parse(userData)
      setPersonalInfo((prev) => ({
        ...prev,
        firstName: data.firstName || "",
        lastName: data.lastName || "",
        email: data.email || "",
      }))
    }

    if (selectedPlanData) {
      const planData = JSON.parse(selectedPlanData)
      setSelectedPlan(planData.plan)
    }
  }, [])

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!personalInfo.firstName.trim()) {
      newErrors.firstName = "First name is required"
    }

    if (!personalInfo.lastName.trim()) {
      newErrors.lastName = "Last name is required"
    }

    if (!personalInfo.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(personalInfo.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!personalInfo.phone.trim()) {
      newErrors.phone = "Phone number is required"
    } else {
      // Extract only digits from phone number
      const phoneDigits = personalInfo.phone.replace(/\D/g, "")
      // Accept 7 digits as valid (local number) or 10 digits (full number)
      if (phoneDigits.length !== 7 && phoneDigits.length !== 10) {
        newErrors.phone = "Please enter a valid phone number (7 or 10 digits)"
      }
    }

    if (!personalInfo.dateOfBirth.month || !personalInfo.dateOfBirth.day || !personalInfo.dateOfBirth.year) {
      newErrors.dateOfBirth = "Date of birth is required"
    }

    if (!personalInfo.address.trim()) {
      newErrors.address = "Address is required"
    }

    if (!personalInfo.city.trim()) {
      newErrors.city = "City is required"
    }

    if (!personalInfo.state.trim()) {
      newErrors.state = "State is required"
    }

    if (!personalInfo.zipCode.trim()) {
      newErrors.zipCode = "ZIP code is required"
    } else if (!/^\d{5}(-\d{4})?$/.test(personalInfo.zipCode)) {
      newErrors.zipCode = "Please enter a valid ZIP code"
    }

    if (!personalInfo.ssn.trim()) {
      newErrors.ssn = "SSN is required"
    } else if (!/^\d{3}-\d{2}-\d{4}$/.test(personalInfo.ssn)) {
      newErrors.ssn = "Please enter a valid SSN (XXX-XX-XXXX)"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")

    // Handle 7-digit numbers (local format)
    if (numbers.length <= 7) {
      if (numbers.length <= 3) return numbers
      return `${numbers.slice(0, 3)}-${numbers.slice(3)}`
    }

    // Handle 10-digit numbers (full format with area code)
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`
  }

  const formatSSN = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 5) return `${numbers.slice(0, 3)}-${numbers.slice(3)}`
    return `${numbers.slice(0, 3)}-${numbers.slice(3, 5)}-${numbers.slice(5, 9)}`
  }

  const handleInputChange = (field: keyof PersonalInfo, value: string) => {
    if (field === "phone") {
      value = formatPhone(value)
    } else if (field === "ssn") {
      value = formatSSN(value)
    }

    setPersonalInfo((prev) => ({
      ...prev,
      [field]: value,
    }))

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }))
    }
  }

  const handleDateChange = (field: "month" | "day" | "year", value: string) => {
    setPersonalInfo((prev) => ({
      ...prev,
      dateOfBirth: {
        ...prev.dateOfBirth,
        [field]: value,
      },
    }))

    // Clear date error when user selects any date field
    if (errors.dateOfBirth) {
      setErrors((prev) => ({
        ...prev,
        dateOfBirth: "",
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Store user data
      localStorage.setItem("takeoff_user", JSON.stringify(personalInfo))
      localStorage.setItem("takeoff_auth", "true")

      // Track analytics
      if (typeof window !== "undefined" && (window as any).gtag) {
        ;(window as any).gtag("event", "personal_info_completed", {
          event_category: "signup",
          event_label: "personal_info_form",
          custom_parameters: {
            selected_plan: selectedPlan,
          },
        })
      }

      // Always redirect directly to payment page since plan is already selected
      router.push("/payment")
    } catch (error) {
      console.error("Error submitting personal info:", error)
      setErrors({ submit: "Something went wrong. Please try again." })
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back()
    } else {
      router.push("/")
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="inline-flex items-center text-sky-400 hover:text-sky-300 mb-4 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-white mb-2">Personal Information</h1>
          <p className="text-gray-300">We need some basic information to get you started</p>

          {/* Show selected plan */}
          {selectedPlan && (
            <div className="mt-4 p-3 bg-sky-900/20 border border-sky-700 rounded-lg">
              <p className="text-sm text-sky-300">
                Selected Plan: <span className="font-semibold capitalize">{selectedPlan} Boost</span>
              </p>
            </div>
          )}
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Step 2 of 3</span>
            <span>67% Complete</span>
          </div>
          <Progress value={67} className="h-2 bg-gray-800" />
        </div>

        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <User className="h-5 w-5 text-sky-400" />
              Personal Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-white">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    type="text"
                    value={personalInfo.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                    placeholder="Enter your first name"
                  />
                  {errors.firstName && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.firstName}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="lastName" className="text-white">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    type="text"
                    value={personalInfo.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                    placeholder="Enter your last name"
                  />
                  {errors.lastName && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-white flex items-center gap-2">
                    <Mail className="h-4 w-4 text-sky-400" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone" className="text-white flex items-center gap-2">
                    <Phone className="h-4 w-4 text-sky-400" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={personalInfo.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                    placeholder="555-1234 or (555) 123-4567"
                    maxLength={14}
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.phone}
                    </p>
                  )}
                  <p className="text-gray-400 text-xs mt-1">
                    Enter 7 digits for local number or 10 digits with area code
                  </p>
                </div>
              </div>

              {/* Date of Birth */}
              <div>
                <Label className="text-white flex items-center gap-2 mb-3">
                  <Calendar className="h-4 w-4 text-sky-400" />
                  Date of Birth
                </Label>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <Select
                      value={personalInfo.dateOfBirth.month}
                      onValueChange={(value) => handleDateChange("month", value)}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        {months.map((month) => (
                          <SelectItem key={month.value} value={month.value} className="text-white hover:bg-gray-700">
                            {month.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select
                      value={personalInfo.dateOfBirth.day}
                      onValueChange={(value) => handleDateChange("day", value)}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                        <SelectValue placeholder="Day" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        {days.map((day) => (
                          <SelectItem key={day.value} value={day.value} className="text-white hover:bg-gray-700">
                            {day.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Select
                      value={personalInfo.dateOfBirth.year}
                      onValueChange={(value) => handleDateChange("year", value)}
                    >
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        {years.map((year) => (
                          <SelectItem key={year.value} value={year.value} className="text-white hover:bg-gray-700">
                            {year.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                {errors.dateOfBirth && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.dateOfBirth}
                  </p>
                )}
              </div>

              {/* Address Information */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address" className="text-white flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-sky-400" />
                    Street Address
                  </Label>
                  <Input
                    id="address"
                    type="text"
                    value={personalInfo.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                    placeholder="Enter your street address"
                  />
                  {errors.address && (
                    <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.address}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-white">
                      City
                    </Label>
                    <Input
                      id="city"
                      type="text"
                      value={personalInfo.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                      placeholder="City"
                    />
                    {errors.city && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.city}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="state" className="text-white">
                      State
                    </Label>
                    <Select value={personalInfo.state} onValueChange={(value) => handleInputChange("state", value)}>
                      <SelectTrigger className="bg-gray-800 border-gray-600 text-white">
                        <SelectValue placeholder="State" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-600">
                        {states.map((state) => (
                          <SelectItem key={state} value={state} className="text-white hover:bg-gray-700">
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.state && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.state}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="zipCode" className="text-white">
                      ZIP Code
                    </Label>
                    <Input
                      id="zipCode"
                      type="text"
                      value={personalInfo.zipCode}
                      onChange={(e) => handleInputChange("zipCode", e.target.value)}
                      className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                      placeholder="12345"
                      maxLength={10}
                    />
                    {errors.zipCode && (
                      <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {errors.zipCode}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* SSN */}
              <div>
                <Label htmlFor="ssn" className="text-white">
                  Social Security Number
                </Label>
                <Input
                  id="ssn"
                  type="text"
                  value={personalInfo.ssn}
                  onChange={(e) => handleInputChange("ssn", e.target.value)}
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  placeholder="XXX-XX-XXXX"
                  maxLength={11}
                />
                {errors.ssn && (
                  <p className="text-red-400 text-sm mt-1 flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" />
                    {errors.ssn}
                  </p>
                )}
                <p className="text-gray-400 text-sm mt-1">
                  Your SSN is encrypted and used only for identity verification
                </p>
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <Alert className="bg-red-900/20 border-red-500/50">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <AlertDescription className="text-red-400">{errors.submit}</AlertDescription>
                </Alert>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-sky-600 hover:bg-sky-700 text-white py-3 text-lg font-semibold"
              >
                {isLoading ? "Processing..." : "Continue to Payment"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-gray-900 border border-gray-700 rounded-lg">
          <p className="text-gray-300 text-sm text-center">
            🔒 Your information is encrypted and secure. We use bank-level security to protect your data.
          </p>
        </div>
      </div>
    </div>
  )
}

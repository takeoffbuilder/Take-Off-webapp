"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface PersonalInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
  dateOfBirth: string
  ssn: string
  address: {
    street: string
    aptUnit: string
    city: string
    state: string
    zipCode: string
  }
}

export default function PersonalInfoPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    ssn: "",
    address: {
      street: "",
      aptUnit: "",
      city: "",
      state: "",
      zipCode: "",
    },
  })

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith("address.")) {
      const addressField = field.split(".")[1]
      setPersonalInfo((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }))
    } else {
      setPersonalInfo((prev) => ({
        ...prev,
        [field]: value,
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Store personal info in localStorage
    localStorage.setItem("personalInfo", JSON.stringify(personalInfo))

    setIsLoading(false)
    router.push("/plan-confirmation")
  }

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-card border-border">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-foreground">Complete Personal Information</CardTitle>
              <CardDescription className="text-muted-foreground">
                Please provide your personal details to continue with your credit building journey.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Personal Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-foreground">
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        type="text"
                        value={personalInfo.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required
                        className="bg-input border-border text-foreground"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-foreground">
                        Last Name *
                      </Label>
                      <Input
                        id="lastName"
                        type="text"
                        value={personalInfo.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
                        className="bg-input border-border text-foreground"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      required
                      className="bg-input border-border text-foreground"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-foreground">
                      Phone Number *
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={personalInfo.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                      className="bg-input border-border text-foreground"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dateOfBirth" className="text-foreground">
                      Date of Birth *
                    </Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={personalInfo.dateOfBirth}
                      onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                      required
                      className="bg-input border-border text-foreground"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ssn" className="text-foreground">
                      Social Security Number *
                    </Label>
                    <Input
                      id="ssn"
                      type="password"
                      value={personalInfo.ssn}
                      onChange={(e) => handleInputChange("ssn", e.target.value)}
                      required
                      className="bg-input border-border text-foreground"
                      placeholder="XXX-XX-XXXX"
                      maxLength={11}
                    />
                  </div>
                </div>

                {/* Address Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Address Information</h3>
                  <div className="space-y-2">
                    <Label htmlFor="street" className="text-foreground">
                      Street Address *
                    </Label>
                    <Input
                      id="street"
                      type="text"
                      value={personalInfo.address.street}
                      onChange={(e) => handleInputChange("address.street", e.target.value)}
                      required
                      className="bg-input border-border text-foreground"
                      placeholder="123 Main Street"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="aptUnit" className="text-foreground">
                      Apt/Unit#
                    </Label>
                    <Input
                      id="aptUnit"
                      type="text"
                      value={personalInfo.address.aptUnit}
                      onChange={(e) => handleInputChange("address.aptUnit", e.target.value)}
                      className="bg-input border-border text-foreground"
                      placeholder="Apt 4B, Unit 123, etc."
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city" className="text-foreground">
                        City *
                      </Label>
                      <Input
                        id="city"
                        type="text"
                        value={personalInfo.address.city}
                        onChange={(e) => handleInputChange("address.city", e.target.value)}
                        required
                        className="bg-input border-border text-foreground"
                        placeholder="City"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state" className="text-foreground">
                        State *
                      </Label>
                      <Select onValueChange={(value) => handleInputChange("address.state", value)}>
                        <SelectTrigger className="bg-input border-border text-foreground">
                          <SelectValue placeholder="State" />
                        </SelectTrigger>
                        <SelectContent className="bg-popover border-border">
                          {states.map((state) => (
                            <SelectItem key={state} value={state} className="text-foreground hover:bg-accent">
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode" className="text-foreground">
                        ZIP Code *
                      </Label>
                      <Input
                        id="zipCode"
                        type="text"
                        value={personalInfo.address.zipCode}
                        onChange={(e) => handleInputChange("address.zipCode", e.target.value)}
                        required
                        className="bg-input border-border text-foreground"
                        placeholder="12345"
                        maxLength={5}
                      />
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Continue to Plan Confirmation"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

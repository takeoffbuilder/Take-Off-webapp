"use client"

import type React from "react"

import { useState } from "react"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [step, setStep] = useState<"email" | "verification">("email")
  const [email, setEmail] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get plan details from URL params if coming from services page
  const planFromUrl = searchParams.get("plan")
  const planType = searchParams.get("type")
  const planPrice = searchParams.get("price")
  const planLimit = searchParams.get("limit")

  const handleBack = () => {
    if (step === "verification") {
      setStep("email")
      setError("")
    } else {
      if (window.history.length > 1) {
        router.back()
      } else {
        router.push("/")
      }
    }
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simulate API call for sending verification code
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Analytics event
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "signin_email_submitted", {
          event_category: "authentication",
          event_label: "email_verification_sent",
        })
      }

      setStep("verification")
    } catch (err) {
      setError("Failed to send verification code. Please try again.")
    }

    setIsLoading(false)
  }

  const handleVerificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simulate API call for verification
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Store auth data
      localStorage.setItem("takeoff_auth", "true")
      localStorage.setItem(
        "takeoff_user",
        JSON.stringify({
          email: email,
          firstName: "John",
          lastName: "Doe",
          isVerified: true,
          signupDate: new Date().toISOString(),
        }),
      )

      // Store plan details if coming from services page
      if (planFromUrl && planType && planPrice && planLimit) {
        localStorage.setItem(
          "takeoff_selected_plan",
          JSON.stringify({
            plan: planFromUrl,
            type: planType,
            price: planPrice,
            limit: planLimit,
          }),
        )
      }

      // Analytics event
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "signin_completed", {
          event_category: "authentication",
          event_label: "user_authenticated",
        })
      }

      // Redirect based on whether user has selected a plan
      if (planFromUrl) {
        router.push("/personal-info")
      } else {
        router.push("/services")
      }
    } catch (err) {
      setError("Invalid verification code. Please try again.")
    }

    setIsLoading(false)
  }

  const handleSocialSignIn = (provider: string) => {
    console.log(`Sign in with ${provider}`)
    setError("Social sign in coming soon!")
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-gray-900 border-gray-700">
        <CardHeader className="space-y-1">
          {/* Back Button */}
          <div className="flex justify-start mb-4">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-gray-400 hover:text-gray-300 transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="text-sm">Back</span>
            </button>
          </div>

          <CardTitle className="text-2xl font-bold text-center text-white">
            {step === "email" ? "Welcome Back" : "Verify Your Email"}
          </CardTitle>
          <CardDescription className="text-center text-gray-400">
            {step === "email" ? "Sign in to your Take Off account" : `We sent a verification code to ${email}`}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-400 bg-red-900/20 border border-red-800 rounded-md">{error}</div>
          )}

          {step === "email" ? (
            <>
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                  />
                </div>
                <Button type="submit" className="w-full bg-sky-500 hover:bg-sky-600 text-white" disabled={isLoading}>
                  {isLoading ? "Sending Code..." : "Continue"}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full bg-gray-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-gray-900 px-2 text-gray-400">Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  onClick={() => handleSocialSignIn("Google")}
                  className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
                >
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleSocialSignIn("Apple")}
                  className="bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
                >
                  <svg className="mr-2 h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C8.396 0 8.025.044 6.79.207 5.56.37 4.703.644 3.967 1.007c-.74.364-1.379.85-2.009 1.48C1.329 3.117.843 3.756.48 4.496.116 5.231-.158 6.089-.32 7.318-.484 8.553-.528 8.924-.528 12.545s.044 3.992.207 5.227c.163 1.229.437 2.087.8 2.822.364.74.85 1.379 1.48 2.009.63.63 1.269 1.116 2.009 1.48.735.364 1.593.638 2.822.8 1.235.164 1.606.208 5.227.208s3.992-.044 5.227-.207c1.229-.163 2.087-.437 2.822-.8.74-.365 1.379-.85 2.009-1.48.63-.63 1.116-1.269 1.48-2.009.364-.735.638-1.593.8-2.822.164-1.235.208-1.606.208-5.227s-.044-3.992-.207-5.227c-.163-1.229-.437-2.087-.8-2.822-.365-.74-.85-1.379-1.48-2.009C20.883 1.329 20.244.843 19.504.48 18.769.116 17.911-.158 16.682-.32 15.447-.484 15.076-.528 11.455-.528s-3.992.044-5.227.207zm-.132 2.076c3.534 0 3.95.014 5.347.072 1.29.059 1.99.273 2.454.454.617.24 1.057.527 1.52.99.463.463.75.903.99 1.52.181.464.395 1.164.454 2.454.058 1.397.072 1.813.072 5.347s-.014 3.95-.072 5.347c-.059 1.29-.273 1.99-.454 2.454-.24.617-.527 1.057-.99 1.52-.463.463-.903.75-1.52.99-.464.181-1.164.395-2.454.454-1.397.058-1.813.072-5.347.072s-3.95-.014-5.347-.072c-1.29-.059-1.99-.273-2.454-.454-.617-.24-1.057-.527-1.52-.99-.463-.463-.75-.903-.99-1.52-.181-.464-.395-1.164-.454-2.454-.058-1.397-.072-1.813-.072-5.347s.014-3.95.072-5.347c.059-1.29.273-1.99.454-2.454.24-.617.527-1.057.99-1.52.463-.463.903-.75 1.52-.99.464-.181 1.164-.395 2.454-.454 1.397-.058 1.813-.072 5.347-.072z" />
                  </svg>
                  Apple
                </Button>
              </div>

              <div className="text-center text-sm text-gray-400">
                Don't have an account?{" "}
                <Link href="/signup" className="text-sky-400 hover:text-sky-300 transition-colors">
                  Sign up
                </Link>
              </div>
            </>
          ) : (
            <form onSubmit={handleVerificationSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code" className="text-white">
                  Verification Code
                </Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  required
                  maxLength={6}
                  className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 text-center text-lg tracking-widest"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-sky-500 hover:bg-sky-600 text-white"
                disabled={isLoading || verificationCode.length !== 6}
              >
                {isLoading ? "Verifying..." : "Verify & Sign In"}
              </Button>
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setStep("email")}
                  className="text-sm text-sky-400 hover:text-sky-300 transition-colors"
                >
                  Didn't receive a code? Try again
                </button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

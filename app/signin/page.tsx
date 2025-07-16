"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from "@/components/header"
import { useRouter } from "next/navigation"
import { Mail } from "lucide-react"

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [step, setStep] = useState<"email" | "verification">("email")
  const [email, setEmail] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [sentCode, setSentCode] = useState("")
  const router = useRouter()

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      // Simulate API call to send verification code
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Generate 6-digit code
      const code = Math.floor(100000 + Math.random() * 900000).toString()
      setSentCode(code)

      console.log(`Verification code sent to ${email}: ${code}`)

      // Move to verification step
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
      // Simulate verification delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (verificationCode !== sentCode) {
        setError("Invalid verification code. Please try again.")
        setIsLoading(false)
        return
      }

      // Check if user exists and has a plan
      const existingUser = localStorage.getItem("takeoff_user")
      const existingPlan = localStorage.getItem("takeoff_selected_plan")

      // Check if user came from plan selection (URL params should still be available)
      const urlParams = new URLSearchParams(window.location.search)
      const planFromUrl = urlParams.get("plan")
      const typeFromUrl = urlParams.get("type")
      const priceFromUrl = urlParams.get("price")
      const limitFromUrl = urlParams.get("limit")

      if (existingUser) {
        const userData = JSON.parse(existingUser)

        // Check if this is the same email
        if (userData.email === email) {
          // Set auth status
          localStorage.setItem(
            "takeoff_auth",
            JSON.stringify({
              isSignedIn: true,
              email: email,
              signInTime: new Date().toISOString(),
            }),
          )

          // If user has plan params from URL, go to personal info
          if (planFromUrl && typeFromUrl && priceFromUrl) {
            const params = new URLSearchParams({
              plan: planFromUrl,
              type: typeFromUrl,
              price: priceFromUrl,
              limit: limitFromUrl || "",
            })
            router.push(`/personal-info?${params.toString()}`)
          }
          // Otherwise route based on existing plan status
          else if (existingPlan) {
            router.push("/dashboard")
          } else {
            router.push("/services")
          }
        } else {
          // Different email - treat as new user
          createNewUser()
        }
      } else {
        // No existing user - create new one
        createNewUser()
      }
    } catch (err) {
      setError("Verification failed. Please try again.")
    }

    setIsLoading(false)
  }

  const createNewUser = () => {
    // Create new user profile
    localStorage.setItem(
      "takeoff_user",
      JSON.stringify({
        firstName: "User", // We'll collect this later if needed
        lastName: "",
        email: email,
        phone: "",
        isVerified: true,
        signupDate: new Date().toISOString(),
      }),
    )

    // Set auth status
    localStorage.setItem(
      "takeoff_auth",
      JSON.stringify({
        isSignedIn: true,
        email: email,
        signInTime: new Date().toISOString(),
      }),
    )

    // Check if user came from plan selection
    const urlParams = new URLSearchParams(window.location.search)
    const planFromUrl = urlParams.get("plan")
    const typeFromUrl = urlParams.get("type")
    const priceFromUrl = urlParams.get("price")
    const limitFromUrl = urlParams.get("limit")

    if (planFromUrl && typeFromUrl && priceFromUrl) {
      // User came from plan selection - go directly to personal info
      const params = new URLSearchParams({
        plan: planFromUrl,
        type: typeFromUrl,
        price: priceFromUrl,
        limit: limitFromUrl || "",
      })
      router.push(`/personal-info?${params.toString()}`)
    } else {
      // New users without plan selection go to services page
      router.push("/services")
    }
  }

  const resendCode = async () => {
    setIsLoading(true)

    // Generate new code
    const newCode = Math.floor(100000 + Math.random() * 900000).toString()
    setSentCode(newCode)

    // Simulate sending
    await new Promise((resolve) => setTimeout(resolve, 500))

    console.log(`New verification code sent to ${email}: ${newCode}`)
    setError("")
    setIsLoading(false)
  }

  const handleSocialSignIn = (provider: string) => {
    console.log(`Sign in with ${provider}`)

    // For demo purposes, simulate successful social login
    const demoEmail = `demo@${provider.toLowerCase()}.com`

    localStorage.setItem(
      "takeoff_auth",
      JSON.stringify({
        isSignedIn: true,
        email: demoEmail,
        signInTime: new Date().toISOString(),
        provider: provider,
      }),
    )

    localStorage.setItem(
      "takeoff_user",
      JSON.stringify({
        firstName: "Demo",
        lastName: "User",
        email: demoEmail,
        phone: "+1 (555) 123-4567",
        isVerified: true,
        signupDate: new Date().toISOString(),
      }),
    )

    // Check if user has selected a plan
    const selectedPlan = localStorage.getItem("takeoff_selected_plan")
    if (selectedPlan) {
      router.push("/dashboard")
    } else {
      router.push("/services")
    }
  }

  if (step === "verification") {
    return (
      <div className="min-h-screen bg-black">
        <Header showAuth={false} />

        <main className="flex items-center justify-center py-12 px-4 pt-24">
          <div className="w-full max-w-md">
            <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-lg p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-sky-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-sky-400" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">Check Your Email</h1>
                <p className="text-gray-400">
                  We've sent a 6-digit verification code to
                  <br />
                  <span className="font-medium text-white">{email}</span>
                </p>
              </div>

              {/* Demo Code Display */}
              <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4 mb-6">
                <p className="text-sm text-yellow-300 mb-2">
                  <strong>Demo Mode:</strong> Your verification code is:
                </p>
                <p className="text-2xl font-bold text-yellow-200 text-center">{sentCode}</p>
              </div>

              <form onSubmit={handleVerificationSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="code" className="text-white">
                    Verification Code
                  </Label>
                  <Input
                    id="code"
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                    placeholder="Enter 6-digit code"
                    className="text-center text-2xl tracking-widest bg-gray-800 border-gray-600 text-white placeholder-gray-500"
                    maxLength={6}
                    required
                  />
                </div>

                {error && (
                  <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                    <p className="text-sm text-red-300">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-full"
                  disabled={isLoading || verificationCode.length !== 6}
                >
                  {isLoading ? "Verifying..." : "Verify & Continue"}
                </Button>
              </form>

              <div className="mt-6 text-center space-y-4">
                <p className="text-gray-400 text-sm">
                  Didn't receive the code?{" "}
                  <button
                    onClick={resendCode}
                    disabled={isLoading}
                    className="text-sky-400 hover:underline font-medium disabled:opacity-50"
                  >
                    {isLoading ? "Sending..." : "Resend Code"}
                  </button>
                </p>

                <button
                  onClick={() => setStep("email")}
                  className="flex items-center justify-center gap-2 text-gray-400 hover:text-gray-300 mx-auto"
                >
                  ← Back to Email
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <Header showAuth={false} />

      <main className="flex items-center justify-center py-12 px-4 pt-24">
        <div className="w-full max-w-md">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Welcome to Take Off</h1>
              <p className="text-gray-400">Enter your email to sign in or create an account</p>
            </div>

            <form onSubmit={handleEmailSubmit} className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-white">
                  Email Address
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-600 text-white placeholder-gray-500"
                    placeholder="Enter your email"
                    required
                  />
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                </div>
              </div>

              {error && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                  <p className="text-sm text-red-300">{error}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-full"
                disabled={isLoading}
              >
                {isLoading ? "Sending Code..." : "Continue with Email"}
              </Button>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="w-full bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
                  onClick={() => handleSocialSignIn("Google")}
                  type="button"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
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
                  className="w-full bg-gray-800 border-gray-600 text-white hover:bg-gray-700"
                  onClick={() => handleSocialSignIn("Facebook")}
                  type="button"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </Button>
              </div>
            </div>

            {/* Demo Instructions */}
            <div className="mt-8 bg-blue-500/20 border border-blue-500/30 rounded-lg p-4">
              <p className="text-sm text-blue-300">
                <strong>Demo Mode:</strong> Enter any email address to receive a verification code!
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

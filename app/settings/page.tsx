"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import Header from "@/components/header"
import FooterNavigation from "@/components/footer-navigation"
import { useRouter } from "next/navigation"
import {
  User,
  Bell,
  CreditCard,
  Shield,
  Edit,
  Save,
  X,
  Star,
  DollarSign,
  ArrowRight,
  Smartphone,
  Check,
  Lock,
} from "lucide-react"
import Link from "next/link"

interface UserData {
  firstName: string
  lastName: string
  email: string
  phone: string
  streetAddress?: string
  city?: string
  state?: string
  zipCode?: string
  isVerified: boolean
  signupDate: string
  twoFactorEnabled?: boolean
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

interface PaymentMethod {
  cardNumber: string
  expiryMonth: string
  expiryYear: string
  cvv: string
  cardholderName: string
  cardType?: string
  zipCode?: string
}

export default function SettingsPage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [editedData, setEditedData] = useState<UserData | null>(null)
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    marketing: false,
  })
  const router = useRouter()

  const [showCancelDialog, setShowCancelDialog] = useState<string | null>(null)
  const [showToast, setShowToast] = useState<string | null>(null)

  // 2FA States
  const [show2FADialog, setShow2FADialog] = useState(false)
  const [twoFactorStep, setTwoFactorStep] = useState<"setup" | "verify" | "disable">("setup")
  const [verificationCode, setVerificationCode] = useState("")
  const [sentCode, setSentCode] = useState("")
  const [is2FALoading, setIs2FALoading] = useState(false)

  // Payment Method States
  const [showUpdateCardDialog, setShowUpdateCardDialog] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    cardNumber: "4242424242424242",
    expiryMonth: "12",
    expiryYear: "2028",
    cvv: "",
    cardholderName: "",
    cardType: "Visa",
    zipCode: "",
  })
  const [newPaymentMethod, setNewPaymentMethod] = useState<PaymentMethod>({
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    cardholderName: "",
    zipCode: "",
  })
  const [isUpdatingCard, setIsUpdatingCard] = useState(false)

  // Delete Account States
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteConfirmText, setDeleteConfirmText] = useState("")

  useEffect(() => {
    // Check if user is authenticated
    const authData = localStorage.getItem("takeoff_auth")
    const storedUser = localStorage.getItem("takeoff_user")

    if (!authData) {
      router.push("/signin")
      return
    }

    if (storedUser) {
      const user = JSON.parse(storedUser)

      // Load personal info from signup (includes address)
      const personalInfoData = localStorage.getItem("takeoff_personal_info")
      if (personalInfoData) {
        const personalInfo = JSON.parse(personalInfoData)
        const mergedUserData = {
          ...user,
          streetAddress: personalInfo.address?.street || user.streetAddress || "",
          city: personalInfo.address?.city || user.city || "",
          state: personalInfo.address?.state || user.state || "",
          zipCode: personalInfo.address?.zipCode || user.zipCode || "",
        }
        setUserData(mergedUserData)
        setEditedData(mergedUserData)
      } else {
        setUserData(user)
        setEditedData(user)
      }

      setNewPaymentMethod((prev) => ({
        ...prev,
        cardholderName: `${user.firstName} ${user.lastName}`,
        zipCode: "",
      }))
    }

    // Load payment method from localStorage
    const storedPaymentMethod = localStorage.getItem("takeoff_payment_method")
    if (storedPaymentMethod) {
      setPaymentMethod(JSON.parse(storedPaymentMethod))
    } else {
      // Set default payment method
      const defaultPayment = {
        cardNumber: "4242424242424242",
        expiryMonth: "12",
        expiryYear: "2028",
        cvv: "",
        cardholderName: userData ? `${userData.firstName} ${userData.lastName}` : "",
        cardType: "Visa",
        zipCode: "",
      }
      localStorage.setItem("takeoff_payment_method", JSON.stringify(defaultPayment))
      setPaymentMethod(defaultPayment)
    }

    // Load all plans and create unified subscription list
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
          features: [
            "Credit monitoring",
            "Monthly credit reports",
            "Payment reminders",
            "Credit building tips",
            "Account management",
          ],
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

    // Listen for storage changes to update in real-time
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "takeoff_subscriptions" || e.key === "takeoff_selected_plan") {
        loadAllPlans()
      }
    }

    window.addEventListener("storage", handleStorageChange)
    setIsLoading(false)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [router])

  const handleSaveProfile = () => {
    if (editedData) {
      localStorage.setItem("takeoff_user", JSON.stringify(editedData))

      // Also update the personal info storage with address changes
      const personalInfoData = localStorage.getItem("takeoff_personal_info")
      if (personalInfoData) {
        const personalInfo = JSON.parse(personalInfoData)
        const updatedPersonalInfo = {
          ...personalInfo,
          address: {
            ...personalInfo.address,
            street: editedData.streetAddress || "",
            city: editedData.city || "",
            state: editedData.state || "",
            zipCode: editedData.zipCode || "",
          },
        }
        localStorage.setItem("takeoff_personal_info", JSON.stringify(updatedPersonalInfo))
      }

      setUserData(editedData)
      setIsEditing(false)
      setShowToast("Profile information has been successfully updated!")
      setTimeout(() => setShowToast(null), 5000)
    }
  }

  const handleCancelEdit = () => {
    setEditedData(userData)
    setIsEditing(false)
  }

  const mainPlan = subscriptions.find((sub) => sub.planType === "main-plan")
  const boostPlans = subscriptions.filter((sub) => sub.planType !== "main-plan")

  const getTotalMonthlyBilling = () => {
    return subscriptions.reduce((total, sub) => {
      const price = Number.parseFloat(sub.price.replace("$", ""))
      return total + price
    }, 0)
  }

  const getPlanIcon = (planType: string, originalPlanType?: string) => {
    const type = originalPlanType || planType
    if (type === "credit-line") {
      return <CreditCard className="h-5 w-5 text-sky-500" />
    } else if (type === "secured-loan") {
      return <Shield className="h-5 w-5 text-green-500" />
    }
    return <Star className="h-5 w-5 text-purple-500" />
  }

  const getPlanTypeLabel = (planType: string, originalPlanType?: string) => {
    const type = originalPlanType || planType
    if (type === "credit-line") return "Credit Line"
    if (type === "secured-loan") return "Secured Loan"
    if (type === "main-plan") return "Primary Credit Plan"
    return "Credit Booster"
  }

  const cancelSubscription = (planId: string) => {
    // Update subscription status to cancelled
    const updatedSubscriptions = subscriptions.filter((sub) => sub.id !== planId)
    setSubscriptions(updatedSubscriptions)

    // Update localStorage
    if (planId === "main-plan") {
      localStorage.removeItem("takeoff_selected_plan")
    } else {
      const remainingBoostPlans = updatedSubscriptions.filter((sub) => sub.planType !== "main-plan")
      localStorage.setItem("takeoff_subscriptions", JSON.stringify(remainingBoostPlans))
    }

    // Close dialog and show success toast
    setShowCancelDialog(null)
    const cancelledPlan = subscriptions.find((sub) => sub.id === planId)
    setShowToast(`Your ${cancelledPlan?.planName} subscription has been successfully cancelled.`)

    // Trigger storage event to update other pages
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: planId === "main-plan" ? "takeoff_selected_plan" : "takeoff_subscriptions",
        newValue:
          planId === "main-plan"
            ? null
            : JSON.stringify(updatedSubscriptions.filter((sub) => sub.planType !== "main-plan")),
      }),
    )

    // Hide toast after 5 seconds
    setTimeout(() => setShowToast(null), 5000)
  }

  const handleCancelClick = (planId: string) => {
    setShowCancelDialog(planId)
  }

  const getSubscriptionToCancel = () => {
    return subscriptions.find((sub) => sub.id === showCancelDialog)
  }

  // 2FA Functions
  const handle2FASetup = () => {
    if (!userData?.phone) {
      setShowToast("Please add a phone number to your profile before enabling 2FA.")
      setTimeout(() => setShowToast(null), 5000)
      return
    }
    setTwoFactorStep("setup")
    setShow2FADialog(true)
  }

  const handle2FADisable = () => {
    setTwoFactorStep("disable")
    setShow2FADialog(true)
  }

  const sendVerificationCode = async () => {
    setIs2FALoading(true)

    try {
      // Simulate API call to send verification code
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Generate 6-digit code
      const code = Math.floor(100000 + Math.random() * 900000).toString()
      setSentCode(code)

      console.log(`2FA verification code sent to ${userData?.phone}: ${code}`)
      setTwoFactorStep("verify")
    } catch (err) {
      setShowToast("Failed to send verification code. Please try again.")
      setTimeout(() => setShowToast(null), 5000)
    }

    setIs2FALoading(false)
  }

  const verifyAndEnable2FA = async () => {
    setIs2FALoading(true)

    try {
      // Simulate verification delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (verificationCode !== sentCode) {
        setShowToast("Invalid verification code. Please try again.")
        setTimeout(() => setShowToast(null), 5000)
        setIs2FALoading(false)
        return
      }

      // Enable 2FA
      const updatedUserData = { ...userData!, twoFactorEnabled: true }
      localStorage.setItem("takeoff_user", JSON.stringify(updatedUserData))
      setUserData(updatedUserData)
      setEditedData(updatedUserData)

      // Close dialog and show success
      setShow2FADialog(false)
      setVerificationCode("")
      setSentCode("")
      setShowToast("Two-factor authentication has been successfully enabled!")
      setTimeout(() => setShowToast(null), 5000)
    } catch (err) {
      setShowToast("Failed to enable 2FA. Please try again.")
      setTimeout(() => setShowToast(null), 5000)
    }

    setIs2FALoading(false)
  }

  const disable2FA = async () => {
    setIs2FALoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Disable 2FA
      const updatedUserData = { ...userData!, twoFactorEnabled: false }
      localStorage.setItem("takeoff_user", JSON.stringify(updatedUserData))
      setUserData(updatedUserData)
      setEditedData(updatedUserData)

      // Close dialog and show success
      setShow2FADialog(false)
      setShowToast("Two-factor authentication has been disabled.")
      setTimeout(() => setShowToast(null), 5000)
    } catch (err) {
      setShowToast("Failed to disable 2FA. Please try again.")
      setTimeout(() => setShowToast(null), 5000)
    }

    setIs2FALoading(false)
  }

  const close2FADialog = () => {
    setShow2FADialog(false)
    setVerificationCode("")
    setSentCode("")
    setTwoFactorStep("setup")
  }

  // Payment Method Functions
  const handleUpdateCard = () => {
    setNewPaymentMethod({
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      cardholderName: userData ? `${userData.firstName} ${userData.lastName}` : "",
      zipCode: "",
    })
    setShowUpdateCardDialog(true)
  }

  const formatCardNumber = (value: string) => {
    // Remove all non-digits
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    // Add spaces every 4 digits
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

  const getCardType = (cardNumber: string) => {
    const number = cardNumber.replace(/\s/g, "")
    if (number.startsWith("4")) return "Visa"
    if (number.startsWith("5") || number.startsWith("2")) return "Mastercard"
    if (number.startsWith("3")) return "American Express"
    return "Unknown"
  }

  const updatePaymentMethod = async () => {
    setIsUpdatingCard(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Validate card details
      if (
        !newPaymentMethod.cardNumber ||
        !newPaymentMethod.expiryMonth ||
        !newPaymentMethod.expiryYear ||
        !newPaymentMethod.cvv ||
        !newPaymentMethod.cardholderName ||
        !newPaymentMethod.zipCode
      ) {
        setShowToast("Please fill in all card details.")
        setTimeout(() => setShowToast(null), 5000)
        setIsUpdatingCard(false)
        return
      }

      const cardNumber = newPaymentMethod.cardNumber.replace(/\s/g, "")
      if (cardNumber.length < 13 || cardNumber.length > 19) {
        setShowToast("Please enter a valid card number.")
        setTimeout(() => setShowToast(null), 5000)
        setIsUpdatingCard(false)
        return
      }

      // Update payment method
      const updatedPaymentMethod = {
        ...newPaymentMethod,
        cardType: getCardType(newPaymentMethod.cardNumber),
      }

      localStorage.setItem("takeoff_payment_method", JSON.stringify(updatedPaymentMethod))
      setPaymentMethod(updatedPaymentMethod)

      // Close dialog and show success
      setShowUpdateCardDialog(false)
      setShowToast("Payment method has been successfully updated!")
      setTimeout(() => setShowToast(null), 5000)
    } catch (err) {
      setShowToast("Failed to update payment method. Please try again.")
      setTimeout(() => setShowToast(null), 5000)
    }

    setIsUpdatingCard(false)
  }

  const closeUpdateCardDialog = () => {
    setShowUpdateCardDialog(false)
    setNewPaymentMethod({
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      cardholderName: userData ? `${userData.firstName} ${userData.lastName}` : "",
      zipCode: "",
    })
  }

  const maskCardNumber = (cardNumber: string) => {
    const lastFour = cardNumber.slice(-4)
    return `•••• •••• •••• ${lastFour}`
  }

  // Delete Account Function
  const handleDeleteAccount = async () => {
    setIsDeleting(true)

    try {
      // Simulate API call to delete account
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Clear all user data from localStorage
      localStorage.removeItem("takeoff_auth")
      localStorage.removeItem("takeoff_user")
      localStorage.removeItem("takeoff_selected_plan")
      localStorage.removeItem("takeoff_subscriptions")
      localStorage.removeItem("takeoff_payment_method")
      localStorage.removeItem("takeoff_personal_info")

      // Clear any other related data
      const keysToRemove = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key && key.startsWith("takeoff_")) {
          keysToRemove.push(key)
        }
      }
      keysToRemove.forEach((key) => localStorage.removeItem(key))

      // Show success message briefly before redirect
      setShowDeleteDialog(false)
      setShowToast("Your account has been permanently deleted.")

      // Redirect to home page after brief delay
      setTimeout(() => {
        router.push("/")
      }, 2000)
    } catch (err) {
      setShowToast("Failed to delete account. Please try again.")
      setTimeout(() => setShowToast(null), 5000)
    }

    setIsDeleting(false)
  }

  const closeDeleteDialog = () => {
    setShowDeleteDialog(false)
    setDeleteConfirmText("")
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header showAuth={false} />

      <main className="max-w-4xl mx-auto px-4 py-8 pt-24">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Account Settings</h1>
            <p className="text-gray-600">Manage your account preferences and billing information</p>
          </div>
        </div>

        <div className="grid gap-8">
          {/* Profile Information */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
                {!isEditing ? (
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(true)} className="bg-transparent">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleCancelEdit} className="bg-transparent">
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </Button>
                    <Button size="sm" onClick={handleSaveProfile} className="bg-sky-500 hover:bg-sky-600">
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  {isEditing ? (
                    <Input
                      id="firstName"
                      value={editedData?.firstName || ""}
                      onChange={(e) => setEditedData((prev) => (prev ? { ...prev, firstName: e.target.value } : null))}
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{userData?.firstName}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  {isEditing ? (
                    <Input
                      id="lastName"
                      value={editedData?.lastName || ""}
                      onChange={(e) => setEditedData((prev) => (prev ? { ...prev, lastName: e.target.value } : null))}
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{userData?.lastName}</p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                {isEditing ? (
                  <Input
                    id="email"
                    type="email"
                    value={editedData?.email || ""}
                    onChange={(e) => setEditedData((prev) => (prev ? { ...prev, email: e.target.value } : null))}
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{userData?.email}</p>
                )}
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                {isEditing ? (
                  <Input
                    id="phone"
                    type="tel"
                    value={editedData?.phone || ""}
                    onChange={(e) => setEditedData((prev) => (prev ? { ...prev, phone: e.target.value } : null))}
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{userData?.phone}</p>
                )}
              </div>

              {/* Address Fields */}
              <div>
                <Label htmlFor="streetAddress">Street Address</Label>
                {isEditing ? (
                  <Input
                    id="streetAddress"
                    type="text"
                    value={editedData?.streetAddress || ""}
                    onChange={(e) =>
                      setEditedData((prev) => (prev ? { ...prev, streetAddress: e.target.value } : null))
                    }
                    placeholder="123 Main Street"
                  />
                ) : (
                  <p className="mt-1 text-gray-900">{userData?.streetAddress || "Not provided"}</p>
                )}
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  {isEditing ? (
                    <Input
                      id="city"
                      type="text"
                      value={editedData?.city || ""}
                      onChange={(e) => setEditedData((prev) => (prev ? { ...prev, city: e.target.value } : null))}
                      placeholder="New York"
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{userData?.city || "Not provided"}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  {isEditing ? (
                    <Input
                      id="state"
                      type="text"
                      value={editedData?.state || ""}
                      onChange={(e) => setEditedData((prev) => (prev ? { ...prev, state: e.target.value } : null))}
                      placeholder="NY"
                      maxLength={2}
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{userData?.state || "Not provided"}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  {isEditing ? (
                    <Input
                      id="zipCode"
                      type="text"
                      value={editedData?.zipCode || ""}
                      onChange={(e) => setEditedData((prev) => (prev ? { ...prev, zipCode: e.target.value } : null))}
                      placeholder="10001"
                      maxLength={10}
                    />
                  ) : (
                    <p className="mt-1 text-gray-900">{userData?.zipCode || "Not provided"}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-600 font-medium">Account Verified</span>
              </div>
            </CardContent>
          </Card>

          {/* My Plans Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  My Plans ({subscriptions.length})
                </CardTitle>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">${getTotalMonthlyBilling().toFixed(2)}</div>
                    <div className="text-sm text-gray-500">Total monthly</div>
                  </div>
                  <Link href="/my-plans">
                    <Button variant="outline" size="sm" className="bg-transparent">
                      View All
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Main Plan */}
                {mainPlan && (
                  <div className="p-4 bg-sky-50 rounded-lg border border-sky-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        {getPlanIcon(mainPlan.planType, mainPlan.originalPlanType)}
                        <div>
                          <div className="font-semibold text-sky-800">{mainPlan.planName}</div>
                          <div className="text-sm text-sky-600">
                            {getPlanTypeLabel(mainPlan.planType, mainPlan.originalPlanType)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="text-xs bg-sky-100 text-sky-700 px-2 py-1 rounded-full font-medium mb-1">
                            Main Plan
                          </div>
                          <div className="text-sm font-semibold text-sky-800">{mainPlan.price}/month</div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleCancelClick(mainPlan.id)}
                          className="border-red-500 text-red-600 hover:bg-red-500 hover:text-white transition-colors"
                        >
                          <X className="h-4 w-4 mr-1" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <Badge variant="outline" className="text-green-600 border-green-200 text-xs">
                          {mainPlan.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Next Billing:</span>
                        <span className="font-medium">{new Date(mainPlan.nextBillingDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Additional Booster Plans */}
                {boostPlans.length > 0 && (
                  <div className="space-y-3">
                    <div className="text-sm font-semibold text-gray-700 flex items-center gap-2 border-t pt-3">
                      <Star className="h-4 w-4 text-yellow-500" />
                      Additional Booster Plans ({boostPlans.length})
                    </div>
                    {boostPlans.map((boost) => (
                      <div key={boost.id} className="p-4 bg-green-50 rounded-lg border border-green-200">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            {getPlanIcon(boost.planType)}
                            <div>
                              <div className="font-semibold text-green-800">{boost.planName}</div>
                              <div className="text-sm text-green-600">{getPlanTypeLabel(boost.planType)}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="text-right">
                              <div className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium mb-1">
                                Booster Plan
                              </div>
                              <div className="text-sm font-semibold text-green-800">{boost.price}/month</div>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCancelClick(boost.id)}
                              className="border-red-500 text-red-600 hover:bg-red-500 hover:text-white transition-colors"
                            >
                              <X className="h-4 w-4 mr-1" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Status:</span>
                            <Badge variant="outline" className="text-green-600 border-green-200 text-xs">
                              {boost.status}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Activated:</span>
                            <span className="font-medium">{new Date(boost.activatedAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        {(boost.creditLimit || boost.loanAmount) && (
                          <div className="mt-2 pt-2 border-t border-green-200">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-600">
                                {boost.creditLimit ? "Credit Limit:" : "Loan Amount:"}
                              </span>
                              <span className="font-medium text-green-700">
                                {boost.creditLimit || boost.loanAmount}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {subscriptions.length === 0 && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CreditCard className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Active Plans</h3>
                    <p className="text-gray-600 mb-4">You don't have any active credit building plans yet.</p>
                    <Link href="/services">
                      <Button className="bg-sky-500 hover:bg-sky-600">Choose Your Plan</Button>
                    </Link>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-gray-600">Receive updates about your credit score and payments</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={notifications.email}
                  onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, email: checked }))}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="sms-notifications">SMS Notifications</Label>
                  <p className="text-sm text-gray-600">Get text alerts for important account updates</p>
                </div>
                <Switch
                  id="sms-notifications"
                  checked={notifications.sms}
                  onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, sms: checked }))}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-gray-600">Receive push notifications on your mobile device</p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={notifications.push}
                  onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, push: checked }))}
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="marketing-notifications">Marketing Communications</Label>
                  <p className="text-sm text-gray-600">Receive tips and offers to improve your credit</p>
                </div>
                <Switch
                  id="marketing-notifications"
                  checked={notifications.marketing}
                  onCheckedChange={(checked) => setNotifications((prev) => ({ ...prev, marketing: checked }))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Security */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-gray-600">
                    Add an extra layer of security to your account using SMS verification
                  </p>
                  {userData?.twoFactorEnabled && (
                    <div className="flex items-center gap-2 mt-2">
                      <Check className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-600 font-medium">2FA is enabled for {userData.phone}</span>
                    </div>
                  )}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-transparent"
                  onClick={userData?.twoFactorEnabled ? handle2FADisable : handle2FASetup}
                >
                  {userData?.twoFactorEnabled ? (
                    <>
                      <X className="h-4 w-4 mr-2" />
                      Disable 2FA
                    </>
                  ) : (
                    <>
                      <Smartphone className="h-4 w-4 mr-2" />
                      Enable 2FA
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Billing Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Billing Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Payment Method</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <CreditCard className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">{maskCardNumber(paymentMethod.cardNumber)}</span>
                    <Badge variant="outline" className="text-xs">
                      {paymentMethod.cardType}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Expires {paymentMethod.expiryMonth}/{paymentMethod.expiryYear}
                  </p>
                </div>
                <Button variant="outline" size="sm" className="bg-transparent" onClick={handleUpdateCard}>
                  <Edit className="h-4 w-4 mr-2" />
                  Update Card
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Next Billing Date</Label>
                  <p className="text-sm text-gray-600">
                    {new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${getTotalMonthlyBilling().toFixed(2)}</div>
                  <div className="text-sm text-gray-600">Total amount</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-red-600">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-red-600">Delete Account</Label>
                  <p className="text-sm text-gray-600">Permanently delete your account and all data</p>
                </div>
                <Button variant="destructive" size="sm" onClick={() => setShowDeleteDialog(true)}>
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <FooterNavigation />

      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-4 right-4 bg-green-100 text-green-800 p-4 rounded-lg shadow-lg z-50 border border-green-200">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            {showToast}
          </div>
        </div>
      )}

      {/* Cancel Confirmation Dialog */}
      {showCancelDialog && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <Card className="max-w-md mx-4 bg-white rounded-lg shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-red-600 flex items-center gap-2">
                <X className="h-5 w-5" />
                Cancel Subscription
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="text-red-800 font-medium mb-2">
                  Are you sure you want to cancel your {getSubscriptionToCancel()?.planName} subscription?
                </p>
                <p className="text-red-600 text-sm">
                  This action will immediately stop your subscription and you will lose access to all plan benefits.
                  This cannot be undone.
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => cancelSubscription(showCancelDialog)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                >
                  <X className="h-4 w-4 mr-2" />
                  Yes, Cancel Plan
                </Button>
                <Button onClick={() => setShowCancelDialog(null)} variant="outline" className="flex-1 bg-transparent">
                  Keep Plan
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* 2FA Setup/Disable Dialog */}
      {show2FADialog && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <Card className="max-w-md mx-4 bg-white rounded-lg shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-5 w-5 text-sky-500" />
                {twoFactorStep === "disable" ? "Disable Two-Factor Authentication" : "Enable Two-Factor Authentication"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {twoFactorStep === "setup" && (
                <>
                  <div className="p-4 bg-sky-50 rounded-lg border border-sky-200">
                    <p className="text-sky-800 font-medium mb-2">Secure Your Account</p>
                    <p className="text-sky-600 text-sm mb-3">
                      We'll send a verification code to your phone number whenever you sign in.
                    </p>
                    <div className="flex items-center gap-2 text-sm">
                      <Smartphone className="h-4 w-4 text-sky-600" />
                      <span className="font-medium">{userData?.phone}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={sendVerificationCode}
                      disabled={is2FALoading}
                      className="flex-1 bg-sky-500 hover:bg-sky-600 text-white"
                    >
                      {is2FALoading ? "Sending..." : "Send Verification Code"}
                    </Button>
                    <Button onClick={close2FADialog} variant="outline" className="flex-1 bg-transparent">
                      Cancel
                    </Button>
                  </div>
                </>
              )}

              {twoFactorStep === "verify" && (
                <>
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <p className="text-yellow-800 font-medium mb-2">
                      <strong>Demo Mode:</strong> Your verification code is:
                    </p>
                    <p className="text-2xl font-bold text-yellow-900 text-center">{sentCode}</p>
                  </div>

                  <div>
                    <Label htmlFor="2fa-code">Enter Verification Code</Label>
                    <Input
                      id="2fa-code"
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                      placeholder="Enter 6-digit code"
                      className="text-center text-2xl tracking-widest"
                      maxLength={6}
                    />
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={verifyAndEnable2FA}
                      disabled={is2FALoading || verificationCode.length !== 6}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white"
                    >
                      {is2FALoading ? "Verifying..." : "Enable 2FA"}
                    </Button>
                    <Button onClick={close2FADialog} variant="outline" className="flex-1 bg-transparent">
                      Cancel
                    </Button>
                  </div>
                </>
              )}

              {twoFactorStep === "disable" && (
                <>
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <p className="text-red-800 font-medium mb-2">Disable Two-Factor Authentication</p>
                    <p className="text-red-600 text-sm">
                      This will remove the extra security layer from your account. You can re-enable it at any time.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      onClick={disable2FA}
                      disabled={is2FALoading}
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white"
                    >
                      {is2FALoading ? "Disabling..." : "Disable 2FA"}
                    </Button>
                    <Button onClick={close2FADialog} variant="outline" className="flex-1 bg-transparent">
                      Keep Enabled
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Update Card Dialog */}
      {showUpdateCardDialog && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <Card className="max-w-lg mx-4 bg-white rounded-lg shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-sky-500" />
                Update Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-sky-50 rounded-lg border border-sky-200">
                <div className="flex items-center gap-2 mb-2">
                  <Lock className="h-4 w-4 text-sky-600" />
                  <span className="text-sky-800 font-medium text-sm">Secure Payment</span>
                </div>
                <p className="text-sky-600 text-sm">
                  Your payment information is encrypted and secure. We never store your CVV.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardholder-name">Cardholder Name</Label>
                  <Input
                    id="cardholder-name"
                    type="text"
                    value={newPaymentMethod.cardholderName}
                    onChange={(e) =>
                      setNewPaymentMethod((prev) => ({ ...prev, cardholderName: e.target.value.toUpperCase() }))
                    }
                    placeholder="JOHN DOE"
                    className="uppercase"
                  />
                </div>

                <div>
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input
                    id="card-number"
                    type="text"
                    value={newPaymentMethod.cardNumber}
                    onChange={(e) =>
                      setNewPaymentMethod((prev) => ({ ...prev, cardNumber: formatCardNumber(e.target.value) }))
                    }
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                  {newPaymentMethod.cardNumber && (
                    <p className="text-xs text-gray-500 mt-1">Card Type: {getCardType(newPaymentMethod.cardNumber)}</p>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="expiry-month">Month</Label>
                    <Input
                      id="expiry-month"
                      type="text"
                      value={newPaymentMethod.expiryMonth}
                      onChange={(e) =>
                        setNewPaymentMethod((prev) => ({
                          ...prev,
                          expiryMonth: e.target.value.replace(/\D/g, "").slice(0, 2),
                        }))
                      }
                      placeholder="MM"
                      maxLength={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="expiry-year">Year</Label>
                    <Input
                      id="expiry-year"
                      type="text"
                      value={newPaymentMethod.expiryYear}
                      onChange={(e) =>
                        setNewPaymentMethod((prev) => ({
                          ...prev,
                          expiryYear: e.target.value.replace(/\D/g, "").slice(0, 4),
                        }))
                      }
                      placeholder="YYYY"
                      maxLength={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      type="text"
                      value={newPaymentMethod.cvv}
                      onChange={(e) =>
                        setNewPaymentMethod((prev) => ({
                          ...prev,
                          cvv: e.target.value.replace(/\D/g, "").slice(0, 4),
                        }))
                      }
                      placeholder="123"
                      maxLength={4}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="zip-code">ZIP Code</Label>
                  <Input
                    id="zip-code"
                    type="text"
                    value={newPaymentMethod.zipCode || ""}
                    onChange={(e) =>
                      setNewPaymentMethod((prev) => ({
                        ...prev,
                        zipCode: e.target.value.replace(/\D/g, "").slice(0, 10),
                      }))
                    }
                    placeholder="12345"
                    maxLength={10}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={updatePaymentMethod}
                  disabled={isUpdatingCard}
                  className="flex-1 bg-sky-500 hover:bg-sky-600 text-white"
                >
                  {isUpdatingCard ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <Check className="h-4 w-4 mr-2" />
                      Update Card
                    </>
                  )}
                </Button>
                <Button onClick={closeUpdateCardDialog} variant="outline" className="flex-1 bg-transparent">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Delete Account Confirmation Dialog */}
      {showDeleteDialog && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <Card className="max-w-lg mx-4 bg-white rounded-lg shadow-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-red-600 flex items-center gap-2">
                <X className="h-5 w-5" />
                Delete Account Permanently
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <X className="h-4 w-4 text-red-600" />
                  </div>
                  <span className="text-red-800 font-bold">Warning: This action cannot be undone!</span>
                </div>
                <div className="space-y-2 text-red-700 text-sm">
                  <p>• All your account data will be permanently deleted</p>
                  <p>• Your credit building progress will be lost</p>
                  <p>• All active subscriptions will be cancelled immediately</p>
                  <p>• Your payment history and reports will be removed</p>
                  <p>• You will not be able to recover this account</p>
                </div>
              </div>

              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <p className="text-yellow-800 font-medium mb-2">Before you delete your account:</p>
                <div className="space-y-1 text-yellow-700 text-sm">
                  <p>• Download any important data you want to keep</p>
                  <p>• Cancel any active subscriptions if needed</p>
                  <p>• Consider contacting support if you're having issues</p>
                </div>
              </div>

              <div>
                <Label htmlFor="delete-confirm">
                  Type <strong>DELETE</strong> to confirm account deletion:
                </Label>
                <Input
                  id="delete-confirm"
                  type="text"
                  value={deleteConfirmText}
                  onChange={(e) => setDeleteConfirmText(e.target.value.toUpperCase())}
                  placeholder="Type DELETE to confirm"
                  className="mt-2"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleDeleteAccount}
                  disabled={isDeleting || deleteConfirmText !== "DELETE"}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                >
                  {isDeleting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Deleting Account...
                    </>
                  ) : (
                    <>
                      <X className="h-4 w-4 mr-2" />
                      Delete My Account Forever
                    </>
                  )}
                </Button>
                <Button
                  onClick={closeDeleteDialog}
                  variant="outline"
                  className="flex-1 bg-transparent"
                  disabled={isDeleting}
                >
                  Cancel
                </Button>
              </div>

              <div className="text-center pt-2">
                <p className="text-xs text-gray-500">
                  Need help?{" "}
                  <Link href="/support" className="text-sky-600 hover:underline">
                    Contact Support
                  </Link>{" "}
                  instead
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

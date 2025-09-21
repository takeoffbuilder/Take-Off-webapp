"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { User, Bell, Shield, CreditCard, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Settings() {
  const router = useRouter()

  const handleSignOut = () => {
    // Clear all localStorage items
    localStorage.removeItem("takeoff_auth")
    localStorage.removeItem("takeoff_user")
    localStorage.removeItem("takeoff_selected_plan")
    localStorage.removeItem("takeoff_payment_completed")

    // Redirect to landing page
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
          <p className="text-gray-300">Manage your account preferences</p>
        </div>

        {/* Profile Settings */}
        <Card className="bg-gray-900 border-gray-700 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <User className="h-5 w-5 text-sky-400" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-gray-300">
                  First Name
                </Label>
                <Input
                  id="firstName"
                  defaultValue="John"
                  className="bg-gray-800 border-gray-600 text-white focus:border-sky-400"
                />
              </div>
              <div>
                <Label htmlFor="lastName" className="text-gray-300">
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  defaultValue="Doe"
                  className="bg-gray-800 border-gray-600 text-white focus:border-sky-400"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="email" className="text-gray-300">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                defaultValue="john.doe@example.com"
                className="bg-gray-800 border-gray-600 text-white focus:border-sky-400"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-gray-300">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                defaultValue="+1 (555) 123-4567"
                className="bg-gray-800 border-gray-600 text-white focus:border-sky-400"
              />
            </div>
            <Button className="bg-sky-600 hover:bg-sky-700">Update Profile</Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="bg-gray-900 border-gray-700 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Bell className="h-5 w-5 text-sky-400" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">Email Notifications</div>
                <div className="text-sm text-gray-400">Receive updates via email</div>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-gray-700" />
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">SMS Notifications</div>
                <div className="text-sm text-gray-400">Receive text message alerts</div>
              </div>
              <Switch />
            </div>
            <Separator className="bg-gray-700" />
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">Credit Score Updates</div>
                <div className="text-sm text-gray-400">Get notified when your score changes</div>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator className="bg-gray-700" />
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">Payment Reminders</div>
                <div className="text-sm text-gray-400">Reminders before payment due dates</div>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="bg-gray-900 border-gray-700 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="h-5 w-5 text-sky-400" />
              Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="currentPassword" className="text-gray-300">
                Current Password
              </Label>
              <Input
                id="currentPassword"
                type="password"
                className="bg-gray-800 border-gray-600 text-white focus:border-sky-400"
              />
            </div>
            <div>
              <Label htmlFor="newPassword" className="text-gray-300">
                New Password
              </Label>
              <Input
                id="newPassword"
                type="password"
                className="bg-gray-800 border-gray-600 text-white focus:border-sky-400"
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword" className="text-gray-300">
                Confirm New Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                className="bg-gray-800 border-gray-600 text-white focus:border-sky-400"
              />
            </div>
            <Button className="bg-sky-600 hover:bg-sky-700">Update Password</Button>
            <Separator className="bg-gray-700" />
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">Two-Factor Authentication</div>
                <div className="text-sm text-gray-400">Add an extra layer of security</div>
              </div>
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent">
                Enable
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Payment Settings */}
        <Card className="bg-gray-900 border-gray-700 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-sky-400" />
              Payment Methods
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">•••• •••• •••• 4567</div>
                  <div className="text-sm text-gray-400">Expires 12/26</div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                >
                  Edit
                </Button>
              </div>
            </div>
            <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 w-full bg-transparent">
              Add New Payment Method
            </Button>
          </CardContent>
        </Card>

        {/* Account Actions */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">Account Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white w-full bg-transparent"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
            <Button
              variant="outline"
              className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white w-full bg-transparent"
            >
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

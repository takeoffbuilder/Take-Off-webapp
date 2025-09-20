"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, CreditCard, Target, Award } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-300">Track your credit building progress</p>
        </div>

        {/* Credit Score Overview */}
        <Card className="bg-gray-900 border-gray-700 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-sky-400" />
              Credit Score Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-3xl font-bold text-sky-400">720</div>
                <div className="text-sm text-gray-400">Current Score</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-green-400">+45</div>
                <div className="text-sm text-gray-400">This Month</div>
              </div>
            </div>
            <Progress value={72} className="h-2 bg-gray-800" />
            <div className="flex justify-between text-sm text-gray-400 mt-2">
              <span>Poor</span>
              <span>Fair</span>
              <span>Good</span>
              <span>Excellent</span>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-sky-400/20 rounded-lg">
                  <CreditCard className="h-5 w-5 text-sky-400" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-white">$2,500</div>
                  <div className="text-sm text-gray-400">Credit Limit</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-400/20 rounded-lg">
                  <Target className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-white">15%</div>
                  <div className="text-sm text-gray-400">Utilization</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-700">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-400/20 rounded-lg">
                  <Award className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <div className="text-lg font-semibold text-white">98%</div>
                  <div className="text-sm text-gray-400">On-time Payments</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="bg-gray-900 border-gray-700 mb-6">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-gray-800">
                <div>
                  <div className="text-white font-medium">Payment Processed</div>
                  <div className="text-sm text-gray-400">Credit card payment of $150</div>
                </div>
                <div className="text-sm text-gray-400">2 days ago</div>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-800">
                <div>
                  <div className="text-white font-medium">Credit Score Updated</div>
                  <div className="text-sm text-gray-400">Score increased by 5 points</div>
                </div>
                <div className="text-sm text-gray-400">1 week ago</div>
              </div>
              <div className="flex items-center justify-between py-2">
                <div>
                  <div className="text-white font-medium">Account Opened</div>
                  <div className="text-sm text-gray-400">New credit builder account</div>
                </div>
                <div className="text-sm text-gray-400">2 weeks ago</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button className="bg-sky-600 hover:bg-sky-700 text-white h-12">Make a Payment</Button>
          <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800 h-12 bg-transparent">
            View Credit Report
          </Button>
        </div>
      </div>
    </div>
  )
}

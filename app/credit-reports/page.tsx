"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Eye, AlertCircle } from "lucide-react"

export default function CreditReports() {
  return (
    <div className="min-h-screen bg-black text-white pb-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Credit Reports</h1>
          <p className="text-gray-300">Monitor your credit history and reports</p>
        </div>

        {/* Current Credit Score */}
        <Card className="bg-gray-900 border-gray-700 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <FileText className="h-5 w-5 text-sky-400" />
              Current Credit Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-4xl font-bold text-sky-400 mb-2">720</div>
                <div className="text-sm text-gray-400">Last updated: January 15, 2024</div>
              </div>
              <div className="text-right">
                <Badge className="bg-green-600 text-white mb-2">Good</Badge>
                <div className="text-sm text-gray-400">Range: 670-739</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Reports */}
        <Card className="bg-gray-900 border-gray-700 mb-6">
          <CardHeader>
            <CardTitle className="text-white">Available Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-sky-400" />
                  <div>
                    <div className="text-white font-medium">Experian Credit Report</div>
                    <div className="text-sm text-gray-400">Updated monthly</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" className="bg-sky-600 hover:bg-sky-700">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-sky-400" />
                  <div>
                    <div className="text-white font-medium">Equifax Credit Report</div>
                    <div className="text-sm text-gray-400">Updated monthly</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" className="bg-sky-600 hover:bg-sky-700">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-sky-400" />
                  <div>
                    <div className="text-white font-medium">TransUnion Credit Report</div>
                    <div className="text-sm text-gray-400">Updated monthly</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" className="bg-sky-600 hover:bg-sky-700">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Credit Factors */}
        <Card className="bg-gray-900 border-gray-700 mb-6">
          <CardHeader>
            <CardTitle className="text-white">Credit Score Factors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-white">Payment History</span>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-semibold">Excellent</div>
                  <div className="text-sm text-gray-400">35% of score</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <span className="text-white">Credit Utilization</span>
                </div>
                <div className="text-right">
                  <div className="text-yellow-400 font-semibold">Fair</div>
                  <div className="text-sm text-gray-400">30% of score</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-sky-400 rounded-full"></div>
                  <span className="text-white">Credit History Length</span>
                </div>
                <div className="text-right">
                  <div className="text-sky-400 font-semibold">Good</div>
                  <div className="text-sm text-gray-400">15% of score</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-white">Credit Mix</span>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-semibold">Good</div>
                  <div className="text-sm text-gray-400">10% of score</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  <span className="text-white">New Credit</span>
                </div>
                <div className="text-right">
                  <div className="text-green-400 font-semibold">Excellent</div>
                  <div className="text-sm text-gray-400">10% of score</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts */}
        <Card className="bg-gray-900 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
              Credit Monitoring Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-yellow-400/10 border border-yellow-400/20 rounded-lg">
                <div className="text-yellow-400 font-medium">Credit Utilization Alert</div>
                <div className="text-sm text-gray-300 mt-1">
                  Your credit utilization is at 25%. Consider paying down balances to improve your score.
                </div>
              </div>
              <div className="p-3 bg-green-400/10 border border-green-400/20 rounded-lg">
                <div className="text-green-400 font-medium">Payment Recorded</div>
                <div className="text-sm text-gray-300 mt-1">
                  Your recent payment has been recorded and will positively impact your credit score.
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

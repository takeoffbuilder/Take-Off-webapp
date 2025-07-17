"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/header"
import FooterNavigation from "@/components/footer-navigation"
import { useRouter } from "next/navigation"
import {
  Search,
  MessageCircle,
  Mail,
  Phone,
  Clock,
  Users,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  FileText,
  Video,
  Send,
} from "lucide-react"
import Link from "next/link"

interface UserData {
  firstName: string
  lastName: string
  email: string
  phone: string
  isVerified: boolean
  signupDate: string
}

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

export default function SupportPage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null)
  const [contactForm, setContactForm] = useState({
    subject: "",
    message: "",
    priority: "medium",
  })
  const router = useRouter()

  const faqs: FAQ[] = [
    {
      id: "faq_001",
      question: "How long does it take to see credit score improvements?",
      answer:
        "Most users see initial improvements within 30-60 days of consistent payments. Significant improvements typically occur within 3-6 months of active credit building.",
      category: "credit_building",
    },
    {
      id: "faq_002",
      question: "What happens if I miss a payment?",
      answer:
        "Missing a payment can negatively impact your credit score. We recommend setting up automatic payments to avoid missed payments. If you do miss a payment, contact us immediately to discuss options.",
      category: "payments",
    },
    {
      id: "faq_003",
      question: "How do I cancel my subscription?",
      answer:
        "You can cancel your subscription anytime through your account settings or by contacting our support team. Cancellations take effect at the end of your current billing cycle.",
      category: "account",
    },
    {
      id: "faq_004",
      question: "Is my personal information secure?",
      answer:
        "Yes, we use bank-level encryption and security measures to protect your personal and financial information. We are SOC 2 compliant and follow industry best practices for data security.",
      category: "security",
    },
    {
      id: "faq_005",
      question: "Can I upgrade or downgrade my plan?",
      answer:
        "Yes, you can change your plan at any time through your account settings. Changes will be prorated and take effect on your next billing cycle.",
      category: "account",
    },
    {
      id: "faq_006",
      question: "How often is my credit score updated?",
      answer:
        "Your credit score is updated monthly. You'll receive notifications when new scores are available, and you can view your score history in your dashboard.",
      category: "credit_building",
    },
  ]

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "credit_building", label: "Credit Building" },
    { value: "payments", label: "Payments" },
    { value: "account", label: "Account" },
    { value: "security", label: "Security" },
  ]

  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Contact form submitted:", contactForm)
    // Reset form
    setContactForm({ subject: "", message: "", priority: "medium" })
    // Show success message (in real app)
    alert("Your message has been sent! We'll get back to you within 24 hours.")
  }

  useEffect(() => {
    // Check if user is authenticated
    const authData = localStorage.getItem("takeoff_auth")
    const storedUser = localStorage.getItem("takeoff_user")

    if (!authData) {
      router.push("/signin")
      return
    }

    if (storedUser) {
      setUserData(JSON.parse(storedUser))
    }

    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto mb-4"></div>
          <p className="text-sky-500">Loading support center...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header showAuth={false} />

      <main className="max-w-6xl mx-auto px-4 py-8 pt-24">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-sky-500 mb-2">Support Center</h1>
              <p className="text-sky-500">Get help with your account and credit building journey</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Contact Options */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-6 w-6 text-green-500" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Live Chat</h3>
                  <p className="text-sm text-sky-500 mb-4">Get instant help from our support team</p>
                  <Badge variant="outline" className="text-green-600 border-green-200">
                    Available Now
                  </Badge>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Email Support</h3>
                  <p className="text-sm text-sky-500 mb-4">Send us a detailed message</p>
                  <Badge variant="outline" className="text-blue-600 border-blue-200">
                    24h Response
                  </Badge>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-6 w-6 text-purple-500" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">Phone Support</h3>
                  <p className="text-sm text-sky-500 mb-4">Speak directly with our team</p>
                  <Badge variant="outline" className="text-purple-600 border-purple-200">
                    Mon-Fri 9-6 EST
                  </Badge>
                </CardContent>
              </Card>
            </div>

            {/* FAQ Section */}
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <p className="text-sm text-sky-500">Find quick answers to common questions</p>
              </CardHeader>
              <CardContent>
                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search FAQs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="md:w-64">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 text-black"
                    >
                      {categories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                  {filteredFAQs.map((faq) => (
                    <div key={faq.id} className="border border-gray-200 rounded-lg">
                      <button
                        onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                        className="w-full px-4 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-white">{faq.question}</span>
                        {expandedFAQ === faq.id ? (
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        ) : (
                          <ChevronRight className="h-5 w-5 text-gray-500" />
                        )}
                      </button>
                      {expandedFAQ === faq.id && (
                        <div className="px-4 pb-4 text-white border-t border-gray-100">
                          <p className="pt-4">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}

                  {filteredFAQs.length === 0 && (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="h-8 w-8 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-semibold text-sky-500 mb-2">No FAQs found</h3>
                      <p className="text-sky-500">Try adjusting your search or contact us directly.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <p className="text-sm text-sky-500">Can't find what you're looking for? We're here to help!</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-sky-500 mb-1">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      value={contactForm.subject}
                      onChange={(e) => setContactForm((prev) => ({ ...prev, subject: e.target.value }))}
                      placeholder="What can we help you with?"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="priority" className="block text-sm font-medium text-sky-500 mb-1">
                      Priority
                    </label>
                    <select
                      id="priority"
                      value={contactForm.priority}
                      onChange={(e) => setContactForm((prev) => ({ ...prev, priority: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-sky-500 mb-1">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm((prev) => ({ ...prev, message: e.target.value }))}
                      placeholder="Please describe your issue or question in detail..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" className="bg-sky-500 hover:bg-sky-600 transition-colors">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Support Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Support Statistics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-sky-500">Avg Response Time</span>
                  </div>
                  <span className="font-semibold">2.5 hours</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-sky-500">Satisfaction Rate</span>
                  </div>
                  <span className="font-semibold">98.5%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-sky-500">Issues Resolved</span>
                  </div>
                  <span className="font-semibold">99.2%</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent hover:bg-gray-50 transition-colors"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  User Guide
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent hover:bg-gray-50 transition-colors"
                >
                  <Video className="h-4 w-4 mr-2" />
                  Video Tutorials
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent hover:bg-gray-50 transition-colors"
                >
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Getting Started
                </Button>
                <Link href="/credit-reports">
                  <Button
                    variant="outline"
                    className="w-full justify-start bg-transparent hover:bg-gray-50 transition-colors"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Credit Reports
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="font-medium text-gray-900">Email</div>
                  <div className="text-sm text-sky-500">support@takeoffcredit.com</div>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Phone</div>
                  <div className="text-sm text-sky-500">1-800-TAKEOFF</div>
                </div>
                <div>
                  <div className="font-medium text-gray-900">Hours</div>
                  <div className="text-sm text-sky-500">Monday - Friday: 9 AM - 6 PM EST</div>
                  <div className="text-sm text-sky-500">Saturday: 10 AM - 4 PM EST</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <FooterNavigation />
    </div>
  )
}

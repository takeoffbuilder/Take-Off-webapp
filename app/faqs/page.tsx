"use client"

import Header from "@/components/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useState } from "react"

export default function FAQsPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(0)

  const faqs = [
    {
      question: "How does Take Off build my credit?",
      answer:
        "Take Off reports your payment history to all three major credit bureaus (Equifax, Experian, and TransUnion). By making on-time payments, you demonstrate creditworthiness and build positive credit history. We offer both credit lines and secured loans to help diversify your credit mix.",
    },
    {
      question: "Is there a credit check to sign up?",
      answer:
        "No! We don't perform hard credit checks that could impact your credit score. We only use soft checks for identity verification, which don't affect your credit. This means you can get started regardless of your current credit situation.",
    },
    {
      question: "How quickly will I see results?",
      answer:
        "Most users see their first credit score update within 30-60 days of their first reported payment. Significant improvements typically occur within 3-6 months of consistent on-time payments. Users with starting credit under 600 see an average increase of +84 points in their first year.",
    },
    {
      question: "What's the difference between Credit Line and Secured Loan options?",
      answer:
        "Credit Line Booster provides a revolving credit line that you can use and pay back repeatedly, similar to a credit card. Secured Loan Booster is an installment loan with fixed monthly payments that helps build your payment history and credit mix. Both report to all three credit bureaus.",
    },
    {
      question: "Can I cancel anytime?",
      answer:
        "Yes, you can cancel your subscription at any time. There are no cancellation fees or long-term contracts. Your credit building progress will remain on your credit report even after cancellation, as the positive payment history becomes part of your permanent credit file.",
    },
    {
      question: "Are there any hidden fees?",
      answer:
        "No hidden fees! Our pricing is completely transparent. You pay only the monthly subscription fee for your chosen plan. There are no setup fees, maintenance fees, or surprise charges. What you see is what you pay.",
    },
    {
      question: "How much does Take Off cost?",
      answer:
        "Our plans start at just $10/month for the Starter Boost plan. We offer three tiers: Starter Boost ($10/month), Power Boost ($15/month), and Max Boost ($20/month). Each plan offers different credit limits and features to match your needs.",
    },
    {
      question: "Is my personal information secure?",
      answer:
        "Absolutely. We use bank-level encryption and security measures to protect your personal and financial information. We're committed to maintaining the highest standards of data security and privacy. We never sell your information to third parties.",
    },
    {
      question: "Can I switch plans later?",
      answer:
        "Yes! You can upgrade or downgrade your plan at any time. Changes will take effect on your next billing cycle. This flexibility allows you to adjust your credit building strategy as your needs change.",
    },
    {
      question: "What if I miss a payment?",
      answer:
        "We understand that life happens. If you miss a payment, we'll send you reminders and work with you to get back on track. However, missed payments may be reported to credit bureaus, which could negatively impact your credit score. We recommend setting up automatic payments to avoid this.",
    },
    {
      question: "Do you report to all three credit bureaus?",
      answer:
        "Yes! Take Off reports to all three major credit bureaus: Equifax, Experian, and TransUnion. This tri-bureau reporting ensures that your positive payment history appears on all your credit reports, maximizing the impact on your credit score.",
    },
    {
      question: "Is there a security deposit required?",
      answer:
        "For secured loan options, yes - the loan amount serves as your security deposit, which is held in a secure account. For credit lines, no deposit is required. The security deposit for loans is fully refundable when you complete your loan term or close your account in good standing.",
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 py-12 pt-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get answers to the most common questions about Take Off and credit building.
          </p>
        </div>

        <div className="space-y-4 mb-12">
          {faqs.map((faq, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader
                className="cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <CardTitle className="flex items-center justify-between text-lg">
                  <span>{faq.question}</span>
                  {openFAQ === index ? (
                    <ChevronUp className="h-5 w-5 text-sky-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </CardTitle>
              </CardHeader>
              {openFAQ === index && (
                <CardContent className="pt-0">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Still have questions CTA */}
        <div className="bg-gradient-to-r from-sky-500 to-sky-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-sky-100 mb-6">
            Our credit building experts are here to help you succeed on your journey to better credit.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signin">
              <Button variant="secondary" size="lg" className="px-8">
                Get Started Today
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="px-8 bg-transparent border-white text-white hover:bg-white hover:text-sky-600"
              >
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

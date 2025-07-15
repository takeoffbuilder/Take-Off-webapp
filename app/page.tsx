"use client"

import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Link from "next/link"
import { Home, FileText, Users, Settings } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <main className="px-4 md:px-6 pb-8 pt-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row-reverse items-center justify-center gap-8 lg:gap-16 mt-8 lg:mt-16">
            {/* Phone Mockup - Now on the right */}
            <div className="relative flex-shrink-0">
              {/* Phone Frame with New Image */}
              <div className="relative w-72 h-[580px] bg-black rounded-[3rem] p-2">
                <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                  {/* Status Bar */}
                  <div className="flex items-center justify-between px-6 py-3 text-xs font-medium">
                    <span>9:41</span>
                    <div className="w-20 h-6 bg-black rounded-full"></div>
                    <div className="flex items-center gap-1">
                      <div className="flex gap-1">
                        <div className="w-1 h-3 bg-black rounded-full"></div>
                        <div className="w-1 h-3 bg-black rounded-full"></div>
                        <div className="w-1 h-3 bg-black rounded-full"></div>
                        <div className="w-1 h-3 bg-gray-300 rounded-full"></div>
                      </div>
                      <div className="w-6 h-3 border border-black rounded-sm">
                        <div className="w-1/3 h-full bg-sky-500 rounded-sm"></div>
                      </div>
                    </div>
                  </div>

                  {/* Credit Score Section */}
                  <div className="px-6 py-3 pb-20">
                    <div className="text-center mb-5">
                      <h2 className="text-lg font-semibold mb-2">Your Credit Score</h2>
                      <div className="relative w-24 h-24 mx-auto mb-3">
                        <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 120 120">
                          <circle cx="60" cy="60" r="45" stroke="#e5e7eb" strokeWidth="6" fill="none" />
                          <circle
                            cx="60"
                            cy="60"
                            r="45"
                            stroke="#0ea5e9"
                            strokeWidth="6"
                            fill="none"
                            strokeDasharray={`${(720 / 850) * 283} 283`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="text-2xl font-bold">720</div>
                          <div className="text-xs text-sky-500">+45 pts</div>
                        </div>
                      </div>
                    </div>

                    {/* New Toggle Image */}
                    <div className="mb-4 flex justify-center">
                      <img
                        src="/replacement.png"
                        alt="Credit Line Booster and Secured Loan Booster options"
                        className="w-full max-w-sm h-auto"
                      />
                    </div>

                    {/* Specialized reported tradeline */}
                    <div className="text-center mb-3">
                      <p className="text-xs text-gray-600 mb-2">Specialized reported tradeline</p>
                      <div className="flex justify-center gap-4 mb-3">
                        <div className="text-sky-500 font-bold text-base">$1500</div>
                        <div className="text-sky-500 font-bold text-base">$2500</div>
                        <div className="text-sky-500 font-bold text-base">$3500</div>
                      </div>
                    </div>

                    {/* Tri-bureau reporting */}
                    <div className="mb-3">
                      <p className="text-center text-sm font-medium text-gray-900 mb-1">Tri-bureau reporting</p>
                      <p className="text-center text-xs text-sky-500 mb-3">Experian, Equifax, & TransUnion</p>
                    </div>

                    {/* Features */}
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-900">Improve key credit factors</span>
                        <div className="flex gap-8">
                          <div className="w-4 h-4 rounded-full bg-sky-500 flex items-center justify-center">
                            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="w-4 h-4 rounded-full bg-sky-500 flex items-center justify-center">
                            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-900 font-medium">Increase your scores fast</span>
                        <div className="flex gap-8">
                          <div className="w-4 h-4 rounded-full bg-sky-500 flex items-center justify-center">
                            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <div className="w-4 h-4 rounded-full bg-sky-500 flex items-center justify-center">
                            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Navigation */}
                  <div className="absolute bottom-0 left-0 right-0 bg-black px-6 py-4 rounded-b-[2rem]">
                    <div className="flex justify-between">
                      <div className="flex flex-col items-center">
                        <Home className="w-6 h-6 text-sky-500" />
                      </div>
                      <div className="flex flex-col items-center">
                        <FileText className="w-6 h-6 text-sky-500" />
                      </div>
                      <div className="flex flex-col items-center">
                        <Users className="w-6 h-6 text-sky-500" />
                      </div>
                      <div className="flex flex-col items-center">
                        <Settings className="w-6 h-6 text-sky-500" />
                      </div>
                    </div>
                  </div>

                  {/* Home Indicator */}
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Text Content - Now on the left */}
            <div className="text-center lg:text-left max-w-lg">
              <h1 className="text-4xl lg:text-6xl font-bold text-black mb-6 leading-tight">
                Take your credit to the <span className="italic underline decoration-2 underline-offset-4">moon</span>
                <br />
                with Take Off!
              </h1>

              {/* Add the astronaut rocket image */}
              <div className="flex justify-center lg:justify-start mb-8">
                <img
                  src="/astronaut-rocket.png"
                  alt="Astronaut on rocket ship"
                  className="w-96 h-96 lg:w-[500px] lg:h-[500px] xl:w-[600px] xl:h-[600px] object-contain"
                />
              </div>

              <p className="text-lg text-gray-700 mb-2">No credit checks, hidden fees, or interest.</p>

              <p className="text-lg font-semibold text-black mb-8">Plans from $10/month</p>

              <Link href="/plans">
                <Button className="w-full lg:w-auto bg-black hover:bg-gray-800 text-white px-12 py-6 text-lg rounded-full">
                  View Plans & Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* How It Works Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-16">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-sky-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Enter Your Email</h3>
              <p className="text-gray-600">
                Get started in seconds with just your email address - no passwords needed.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-sky-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose Your Plan</h3>
              <p className="text-gray-600">
                Select the perfect credit building option and we'll report to all 3 bureaus.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-sky-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Watch It Grow</h3>
              <p className="text-gray-600">Track your credit score improvements in real-time on your dashboard.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-16">
            Plans from <span className="font-bold">$10/month</span>
          </h2>

          <div className="flex justify-center">
            <div className="relative w-72 h-[600px] bg-black rounded-[3rem] p-2">
              <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden">
                {/* Status Bar */}
                <div className="flex items-center justify-between px-6 py-3 text-xs font-medium">
                  <span>9:41</span>
                  <div className="w-20 h-6 bg-black rounded-full"></div>
                  <div className="flex items-center gap-1">
                    <div className="flex gap-1">
                      <div className="w-1 h-3 bg-black rounded-full"></div>
                      <div className="w-1 h-3 bg-black rounded-full"></div>
                      <div className="w-1 h-3 bg-black rounded-full"></div>
                      <div className="w-1 h-3 bg-gray-300 rounded-full"></div>
                    </div>
                    <div className="w-6 h-3 border border-black rounded-sm">
                      <div className="w-1/3 h-full bg-sky-500 rounded-sm"></div>
                    </div>
                  </div>
                </div>

                {/* Pricing Content */}
                <div className="px-6 py-6">
                  {/* Plan Toggle */}
                  <div className="flex gap-2 mb-8">
                    <button className="flex-1 py-3 px-6 rounded-full border-2 border-sky-500 bg-sky-500 text-white font-medium">
                      Basic
                    </button>
                    <button className="flex-1 py-3 px-6 rounded-full border-2 border-gray-300 text-gray-600 font-medium">
                      Premium
                    </button>
                  </div>

                  {/* Specialized reported tradeline */}
                  <div className="text-center mb-6">
                    <p className="text-sm text-gray-600 mb-4">Specialized reported tradeline</p>
                    <div className="flex justify-center gap-8 mb-6">
                      <div className="text-sky-500 font-bold text-xl">$1500</div>
                      <div className="text-sky-500 font-bold text-xl">$2500</div>
                    </div>
                  </div>

                  {/* Tri-bureau reporting */}
                  <div className="mb-6">
                    <p className="text-center text-sm font-medium text-gray-900 mb-2">Tri-bureau reporting</p>
                    <p className="text-center text-xs text-sky-500 mb-4">Experian, Equifax, & TransUnion</p>
                  </div>

                  {/* Features */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-900">Improve key credit factors</span>
                      <div className="flex gap-8">
                        <div className="w-5 h-5 rounded-full bg-sky-500 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-900">Rent Reporting</span>
                      <div className="flex gap-8">
                        <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div className="w-5 h-5 rounded-full bg-sky-500 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Home Indicator */}
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-black rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link href="/plans">
              <Button className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 rounded-full">
                View Plans & Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 md:py-24 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-light text-gray-300 mb-4">Helping credit builders score.</h2>
            <h3 className="text-3xl md:text-5xl font-bold leading-tight">
              No credit checks, hidden fees, or interest.
            </h3>
          </div>

          <div className="space-y-8 max-w-2xl mx-auto">
            {/* Proven Results Card */}
            <div className="bg-white rounded-2xl p-8 text-black">
              <div className="flex items-center gap-3 mb-6">
                <div className="text-3xl font-bold text-sky-500">+84</div>
                <h4 className="text-xl font-semibold">Proven results</h4>
              </div>
              <p className="text-gray-700 leading-relaxed">
                Users with starting credit under 600 grew an average of{" "}
                <span className="font-bold text-black">+84pts</span> in just a year with on-time payments
                <sup className="text-sm">2</sup>
              </p>
            </div>

            {/* Trusted by Bureaus Card */}
            <div className="bg-white rounded-2xl p-8 text-black">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-sky-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <h4 className="text-xl font-semibold">Trusted by bureaus</h4>
              </div>
              <p className="text-gray-700 leading-relaxed">
                The power of Tri-bureau: Take Off reports to all 3 major credit bureaus:{" "}
                <span className="font-bold text-black">Equifax, Experian, & TransUnion</span>.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <div className="flex justify-center items-center gap-8 opacity-60">
            <div className="text-2xl font-bold">Equifax</div>
            <div className="text-2xl font-bold">Experian</div>
            <div className="text-2xl font-bold">TransUnion</div>
          </div>
        </div>
      </section>

      {/* Legal Verbiage */}
      <section className="py-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="text-xs text-gray-600 leading-relaxed space-y-4">
            <p>
              <sup>1</sup> Take Off Financial Inc. is a financial technology company, not a bank. Banking services are
              provided by Take Off Financial Inc.'s bank partner, Blue Ridge Bank, N.A.; Member FDIC. The Take Off Visa®
              Credit Card is issued by Blue Ridge Bank pursuant to a license from Visa U.S.A. Inc. and may be used
              everywhere Visa credit cards are accepted.
            </p>

            <p>
              <sup>2</sup> Based on an analysis of Take Off Financial Inc. Credit Builder Account data for customers who
              opened an account from Jan 2018 - Dec 2020 with a starting credit score below 600. Customers with a
              starting credit score below 600 saw an average increase of 84 points to their FICO® Score 8 based on
              Experian® data after 12 months of on-time payments. Individual results may vary. Some customers may not
              see score improvements. Credit score improvements are not guaranteed.
            </p>

            <p>
              <sup>3</sup> Take Off Financial Inc. reports payment history to the three major consumer reporting
              agencies – Equifax, Experian, and TransUnion. Late payments may negatively impact your credit score.
              Individual results may vary and some customers may not see score improvements.
            </p>

            <p>
              The Take Off Credit Builder Account is NOT a credit card. The account will not be approved based on credit
              history, so no credit check is required for approval. However, a soft credit pull that will not affect
              your credit score is performed to verify your identity and for fraud prevention purposes. Approval is also
              based on your ability to repay, which is determined by your income and certain debt obligations.
            </p>

            <p>
              Take Off Financial Inc. uses bank-level security measures to protect your personal information, including
              256-bit encryption.
            </p>

            <p>FICO is a registered trademark of Fair Isaac Corporation in the United States and other countries.</p>

            <p className="pt-4 border-t border-gray-300 text-center">
              © 2024 Take Off Financial Inc. All rights reserved.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

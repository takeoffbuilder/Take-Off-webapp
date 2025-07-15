import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Component() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between p-4 md:p-6 bg-black">
        <div className="flex items-center">
          <img src="/takeoff-logo.jpeg" alt="Take Off" className="h-8 md:h-10" />
        </div>
        <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
          <Menu className="h-6 w-6" />
        </Button>
      </header>

      {/* Main Content */}
      <main className="px-4 md:px-6 pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 mt-8 lg:mt-16">
            {/* Phone Mockup */}
            <div className="relative flex-shrink-0">
              {/* Credit Goals Text Box */}
              <div className="absolute -left-4 top-1/3 lg:-left-32 lg:top-1/2 lg:-translate-y-1/2 bg-white rounded-lg p-4 shadow-lg max-w-xs z-10">
                <h3 className="font-semibold text-gray-900 mb-2">Credit goals?</h3>
                <p className="text-sm text-gray-600">Whether you need a loan or new wheels, better credit can help.</p>
              </div>

              {/* Phone Frame */}
              <div className="relative w-72 h-[580px] bg-black rounded-[3rem] p-2">
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

                  {/* App Content */}
                  <div className="px-6 py-4">
                    <h1 className="text-xl font-semibold mb-4">Credit Report</h1>

                    {/* Tabs */}
                    <div className="flex gap-6 mb-6">
                      <div className="text-sm font-medium border-b-2 border-black pb-1">Equifax</div>
                      <div className="text-sm text-gray-500">Experian</div>
                      <div className="text-sm text-gray-500">Transunion</div>
                    </div>

                    {/* Credit Score Circle */}
                    <div className="flex justify-center mb-6">
                      <div className="relative w-32 h-32">
                        <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                          <circle cx="60" cy="60" r="50" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                          <circle
                            cx="60"
                            cy="60"
                            r="50"
                            stroke="#0ea5e9"
                            strokeWidth="8"
                            fill="none"
                            strokeDasharray={`${(675 / 850) * 314} 314`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                          <div className="text-xs text-sky-500 font-medium">+ 12 pts</div>
                          <div className="text-3xl font-bold">675</div>
                          <div className="text-xs text-gray-500">Updated today</div>
                          <div className="text-xs text-gray-500">SuperScore 3.0</div>
                        </div>
                      </div>
                    </div>

                    {/* Chart Area */}
                    <div className="bg-sky-50 rounded-lg p-4 mb-4">
                      <div className="h-16 relative">
                        <svg className="w-full h-full" viewBox="0 0 200 60">
                          <path d="M 20 40 Q 60 35 100 30 T 180 25" stroke="#0ea5e9" strokeWidth="2" fill="none" />
                          <circle cx="180" cy="25" r="3" fill="#0ea5e9" />
                        </svg>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>Mar</span>
                        <span>Apr</span>
                        <span>May</span>
                        <span>Jun</span>
                      </div>
                    </div>

                    {/* See what changed button */}
                    <div className="flex justify-center mb-6">
                      <button className="text-sm border border-gray-300 rounded-full px-4 py-1">
                        See what changed
                      </button>
                    </div>

                    {/* Credit report illustration */}
                    <div className="flex justify-center">
                      <div className="w-16 h-12 bg-gray-100 rounded border relative">
                        <div className="absolute top-2 left-2 w-3 h-1 bg-gray-400 rounded"></div>
                        <div className="absolute top-4 left-2 w-4 h-1 bg-gray-300 rounded"></div>
                        <div className="absolute top-6 left-2 w-2 h-1 bg-gray-300 rounded"></div>
                        <div className="absolute top-2 right-1 w-2 h-2 bg-sky-500 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Navigation */}
                  <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-3">
                    <div className="flex justify-between">
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 bg-gray-300 rounded"></div>
                        <span className="text-xs text-gray-500 mt-1">Overview</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 bg-black rounded"></div>
                        <span className="text-xs text-black mt-1 font-medium">Credit</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="w-6 h-6 bg-gray-300 rounded"></div>
                        <span className="text-xs text-gray-500 mt-1">Account</span>
                      </div>
                    </div>
                  </div>

                  {/* Home Indicator */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-black rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div className="text-center lg:text-left max-w-lg">
              <h1 className="text-4xl lg:text-6xl font-bold text-black mb-6 leading-tight">
                Take your credit to the <span className="italic underline decoration-2 underline-offset-4">moon</span>
                <br />
                with takeoff
              </h1>

              <p className="text-lg text-gray-700 mb-2">No credit checks, hidden fees, or interest.</p>

              <p className="text-lg font-semibold text-black mb-8">Plans from $5/month</p>

              <Button className="w-full lg:w-auto bg-black hover:bg-gray-800 text-white px-12 py-6 text-lg rounded-full">
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </main>
      {/* Pricing Section - White Background */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-black mb-16">
            Plans from <span className="font-bold">$5/month</span>
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
                      <div className="text-sky-500 font-bold text-xl">$750</div>
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
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-black rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section - Black Background */}
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
    </div>
  )
}

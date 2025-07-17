"use client"

import { useState } from "react"
import { Menu, X, HelpCircle, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface HeaderProps {
  showAuth?: boolean
}

export default function Header({ showAuth = true }: HeaderProps) {
  const isBrowser = typeof window !== "undefined"
  const [isAuthenticated, setIsAuthenticated] = useState(isBrowser && !!localStorage.getItem("takeoff_auth"))
  const [hasSelectedPlan, setHasSelectedPlan] = useState(isBrowser && !!localStorage.getItem("takeoff_selected_plan"))
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleSignOut = () => {
    localStorage.removeItem("takeoff_auth")
    localStorage.removeItem("takeoff_user")
    localStorage.removeItem("takeoff_selected_plan")
    setIsAuthenticated(false)
    setHasSelectedPlan(false)
    closeMenu()
    router.push("/")
  }

  const navigationLinks = [
    { href: "/plans", label: "Take Off Plans and Pricing" },
    { href: "/faqs", label: "FAQs" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/benefits", label: "Benefits" },
    { href: "/affiliate", label: "Affiliate Program" },
  ]

  // Authenticated user menu items
  const authenticatedMenuItems = [
    {
      href: "/support",
      label: "Support",
      icon: HelpCircle,
      description: "Get help with your account",
    },
    {
      action: handleSignOut,
      label: "Sign Out",
      icon: LogOut,
      description: "Sign out of your account",
    },
  ]

  return (
    <>
      <header className="fixed top-0 left-0 right-0 flex items-center justify-between p-4 md:p-6 bg-black z-50">
        <div className="flex items-center">
          <Link
            href={
              isAuthenticated && hasSelectedPlan && isBrowser && localStorage.getItem("takeoff_payment_completed")
                ? "/dashboard"
                : "/"
            }
            onClick={closeMenu}
          >
            <img src="/takeoff-logo.jpeg" alt="Take Off" className="h-8 md:h-10" />
          </Link>
        </div>
        <div className="flex items-center gap-4">
          {showAuth && !isAuthenticated && (
            <div className="flex items-center gap-2">
              <Link href="/signin" onClick={closeMenu}>
                <Button
                  variant="outline"
                  className="bg-transparent border border-sky-500 text-white hover:bg-sky-500/20 transition-colors"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/signup" onClick={closeMenu}>
                <Button className="bg-sky-400 hover:bg-sky-500 text-white transition-colors">Sign Up</Button>
              </Link>
            </div>
          )}
          {isAuthenticated && hasSelectedPlan && isBrowser && localStorage.getItem("takeoff_payment_completed") && (
            <Link href="/dashboard" onClick={closeMenu}>
              <Button variant="ghost" className="text-white hover:bg-gray-800 transition-colors">
                Dashboard
              </Button>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-gray-800 transition-colors relative z-50"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </header>

      {/* Mobile/Desktop Dropdown Menu */}
      {isMenuOpen && (
        <>
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={closeMenu} />

          {/* Dropdown Menu */}
          <div className="fixed top-16 left-0 right-0 bg-gray-900 shadow-xl border-t border-gray-700 z-40 max-h-[80vh] overflow-y-auto">
            <nav className="max-w-7xl mx-auto px-4 py-6">
              {/* Authenticated User Menu (Simplified) */}
              {isAuthenticated && hasSelectedPlan ? (
                <div className="space-y-2">
                  {authenticatedMenuItems.map((item, index) => (
                    <div key={index}>
                      {item.href ? (
                        <Link
                          href={item.href}
                          onClick={closeMenu}
                          className="group flex items-center p-4 rounded-lg hover:bg-gray-800 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-sky-500/20 group-hover:bg-sky-500/30 transition-colors">
                              <item.icon className="h-5 w-5 text-sky-400" />
                            </div>
                            <div>
                              <div className="font-medium text-white group-hover:text-sky-400 transition-colors">
                                {item.label}
                              </div>
                              <div className="text-sm text-gray-400">{item.description}</div>
                            </div>
                          </div>
                        </Link>
                      ) : (
                        <button
                          onClick={item.action}
                          className="group flex items-center p-4 rounded-lg hover:bg-gray-800 transition-colors w-full text-left"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-red-500/20 group-hover:bg-red-500/30 transition-colors">
                              <item.icon className="h-5 w-5 text-red-400" />
                            </div>
                            <div>
                              <div className="font-medium text-white group-hover:text-red-400 transition-colors">
                                {item.label}
                              </div>
                              <div className="text-sm text-gray-400">{item.description}</div>
                            </div>
                          </div>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                /* Non-authenticated User Menu (Full Navigation) */
                <>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {navigationLinks.map((link, index) => (
                      <Link
                        key={index}
                        href={link.href}
                        onClick={closeMenu}
                        className="group flex items-center p-4 rounded-lg hover:bg-gray-800 transition-colors"
                      >
                        <div>
                          <div className="font-medium text-white group-hover:text-sky-400 transition-colors">
                            {link.label}
                          </div>
                          <div className="text-sm text-gray-400 mt-1">
                            {link.href === "/plans" && "Choose the perfect credit building plan for your goals"}
                            {link.href === "/faqs" && "Get answers to frequently asked questions"}
                            {link.href === "/how-it-works" && "Learn how Take Off builds your credit"}
                            {link.href === "/benefits" && "Discover the advantages of using Take Off"}
                            {link.href === "/affiliate" && "Earn money by referring friends to Take Off"}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Call to Action */}
                  <div className="border-t border-gray-700 mt-6 pt-6">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold text-white mb-2">Ready to Take Off?</h3>
                      <p className="text-gray-400 mb-4">
                        Start building your credit today with no credit checks required.
                      </p>
                      <Link href="/signin" onClick={closeMenu}>
                        <Button className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-3 rounded-full transition-colors">
                          Get Started Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </nav>
          </div>
        </>
      )}
    </>
  )
}

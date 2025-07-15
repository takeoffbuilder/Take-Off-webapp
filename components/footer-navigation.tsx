"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Home, FileText, Users, Settings } from "lucide-react"

export default function FooterNavigation() {
  const pathname = usePathname()

  const navItems = [
    {
      href: "/dashboard",
      icon: Home,
      label: "Dashboard",
    },
    {
      href: "/credit-reports",
      icon: FileText,
      label: "Credit Reports",
    },
    {
      href: "/affiliate",
      icon: Users,
      label: "Affiliate",
    },
    {
      href: "/settings",
      icon: Settings,
      label: "Settings",
    },
  ]

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-50">
      <nav className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-2 px-3 rounded-lg transition-all duration-200 group ${
                isActive ? "text-sky-400" : "text-gray-400 hover:text-sky-400"
              }`}
            >
              <div
                className={`p-2 rounded-lg transition-all duration-200 ${
                  isActive ? "bg-sky-400/20 shadow-lg shadow-sky-400/25" : "group-hover:bg-sky-400/10"
                }`}
              >
                <Icon
                  className={`h-5 w-5 transition-all duration-200 ${
                    isActive ? "text-sky-400 drop-shadow-sm" : "text-gray-400 group-hover:text-sky-400"
                  }`}
                />
              </div>
              <span
                className={`text-xs mt-1 font-medium transition-all duration-200 ${
                  isActive ? "text-sky-400" : "text-gray-500 group-hover:text-sky-400"
                }`}
              >
                {item.label}
              </span>
            </Link>
          )
        })}
      </nav>
    </footer>
  )
}

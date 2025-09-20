"use client"

import type React from "react"
import ScrollToTop from "@/components/scroll-to-top"
import FooterNavigation from "@/components/footer-navigation"
import { usePathname } from "next/navigation"

function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const showFooterNav = ["/dashboard", "/credit-reports", "/affiliate", "/settings"].includes(pathname)

  return (
    <>
      {children}
      {showFooterNav && <FooterNavigation />}
    </>
  )
}

export default function ClientRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <body>
      <ScrollToTop />
      <LayoutContent>{children}</LayoutContent>
    </body>
  )
}

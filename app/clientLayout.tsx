"use client"

import { Inter } from "next/font/google"
import "./globals.css"
import React from "react"

const inter = Inter({ subsets: ["latin"] })

// Component to handle scroll restoration
function ScrollToTop() {
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return null
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ScrollToTop />
        {children}
      </body>
    </html>
  )
}

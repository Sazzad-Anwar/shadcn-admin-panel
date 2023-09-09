import React from "react"
import { Metadata } from "next"

import { siteConfig } from "@/config/site"
import AdminLayout from "@/components/admin-layout/page"

export const metadata: Metadata = {
  title: {
    default: "Admin Panel",
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return <AdminLayout>{children}</AdminLayout>
}

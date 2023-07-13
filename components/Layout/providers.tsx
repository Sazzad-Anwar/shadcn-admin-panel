"use client"

import React from "react"
import { usePathname } from "next/navigation"
import GlobalContextProvider from "@/context/GlobalContextProvider"
import { SessionProvider } from "next-auth/react"

import { Routes } from "@/config/routes"

import { ThemeProvider } from "../Theme/theme-provider"
import { TailwindIndicator } from "../tailwind-indicator"
import { Toaster } from "../ui/toaster"
import Layout from "./page"

export default function Providers({ children }: { children: React.ReactNode }) {
  let pathname = usePathname()
  return (
    <SessionProvider>
      <GlobalContextProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Layout>
            {pathname !== Routes.login.link ? (
              <div className="flex-1 space-y-4 py-8 pt-6">{children}</div>
            ) : (
              children
            )}
            <Toaster />
          </Layout>
          <TailwindIndicator />
        </ThemeProvider>
      </GlobalContextProvider>
    </SessionProvider>
  )
}

"use client"

import React from "react"
import { SessionProvider } from "next-auth/react"

import { ThemeProvider } from "./theme-provider"

export default function Providers({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </SessionProvider>
  )
}

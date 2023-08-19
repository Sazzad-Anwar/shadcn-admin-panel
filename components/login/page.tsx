"use client"

import React from "react"
import { Metadata } from "next"
import { redirect } from "next/navigation"
import { signIn, useSession } from "next-auth/react"

import { AppRoutes } from "@/config/routes"
import { siteConfig } from "@/config/site"

import { Button } from "../ui/button"

export const metadata: Metadata = {
  title: {
    default: "Login",
    template: `%s - ${siteConfig.name}`,
  },
  description: "Amdin panel",
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

export default function Login() {
  let session = useSession()
  const login = () => {
    signIn("credentials", {
      callbackUrl: AppRoutes.ADMIN,
      identifier: "sazzadzihan@gmail.com",
      password: "123456",
    })
  }

  if (session.status === "authenticated") {
    redirect(AppRoutes.ADMIN)
  } else {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <Button variant="secondary" onClick={() => login()}>
          Login
        </Button>
      </div>
    )
  }
}

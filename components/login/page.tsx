"use client"

import React from "react"
import { redirect } from "next/navigation"
import { signIn, useSession } from "next-auth/react"

import { AppRoutes } from "@/config/routes"

import { Button } from "../ui/button"

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

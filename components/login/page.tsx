"use client"

import React from "react"
import { redirect, useSearchParams } from "next/navigation"
import { signIn, useSession } from "next-auth/react"

import { BlogAppRoutes } from "@/config/routes"

import { Button } from "../ui/button"

export default function Login(): JSX.Element {
  let session = useSession()
  let params = useSearchParams()
  let redirectParam = params.get("redirectTo")
  const login = () => {
    signIn("credentials", {
      callbackUrl: redirectParam ?? BlogAppRoutes.ADMIN,
      identifier: "sazzadzihan@gmail.com",
      password: "123456",
    })
  }

  if (session.status === "authenticated") {
    redirect(BlogAppRoutes.ADMIN)
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

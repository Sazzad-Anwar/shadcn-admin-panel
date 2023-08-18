import React from "react"
import { signIn } from "next-auth/react"

import { Button } from "../ui/button"

export default function Login() {
  const login = () => {
    signIn("credentials", {
      identifier: "sazzadzihan@gmail.com",
      password: "123456",
    })
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <Button variant="secondary" onClick={() => login()}>
        Login
      </Button>
    </div>
  )
}

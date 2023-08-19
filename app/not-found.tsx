"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function NotFound(): JSX.Element {
  const router = useRouter()
  return (
    <div className="mx-auto flex h-screen flex-col items-center justify-center md:w-96">
      <AlertTriangle size={40} color="red" />
      <h1 className="mt-3 text-lg font-semibold">
        Sorry! The page is not found!
      </h1>
      <Button className="mt-5" variant="link" onClick={() => router.back()}>
        Go Back
      </Button>
    </div>
  )
}

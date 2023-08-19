"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function NotFound(): JSX.Element {
  const router = useRouter()
  return (
    <div className="flex flex-col items-center justify-center md:h-96 md:w-96">
      <AlertTriangle />
      <h1 className="text-base font-semibold">Sorry! The page is not found!</h1>
      <Button className="mt-5" variant="ghost" onClick={() => router.back()}>
        Go Back
      </Button>
    </div>
  )
}

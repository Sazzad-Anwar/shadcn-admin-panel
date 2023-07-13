import React from "react"
import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex h-[300px] w-full flex-col items-center justify-center md:h-[800px]">
      <Loader2 className="animate-spin" size={20} />
      <h1 className="animate-pulse text-lg">Loading</h1>
    </div>
  )
}

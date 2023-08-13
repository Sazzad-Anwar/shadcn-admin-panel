"use client"

// Error components must be Client Components
import { useEffect } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { errorImage } from "@/assets/images/image"

import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
  params,
  searchParams,
}: {
  error: Error
  reset: () => void
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  let searchError = useSearchParams()
  console.log(searchError.getAll("error"))
  // useEffect(() => {
  //   // Log the error to an error reporting service
  //   console.error(error)
  // }, [error])

  return (
    <div className="flex h-auto w-full items-center justify-center md:h-auto">
      <div className="text-center">
        <Image
          src={errorImage}
          height={600}
          width={300}
          alt="error-img"
          className="mx-auto"
        />
        <h2 className="mt-4 text-2xl font-medium">Something went wrong!</h2>
        <p className="mb-4 font-semibold text-red-500">{error.message}</p>
        <Button
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
        >
          Try again
        </Button>
      </div>
    </div>
  )
}

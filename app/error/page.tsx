import React from "react"
import Image from "next/image"
import Link from "next/link"
import { errorImage } from "@/assets/images/image"

import { Button } from "@/components/ui/button"

export default function Error({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  return (
    <div className="flex h-auto w-auto items-center justify-center">
      <div className="text-center">
        <Image
          src={errorImage}
          height={800}
          width={400}
          alt="error-page"
          className="h-auto w-60 sm:w-80 md:w-96"
        />
        <h1 className="mt-5 text-lg font-bold text-red-500 sm:text-lg md:text-2xl">
          Error Occurred
        </h1>
        <p className="text-sm sm:text-base">{searchParams?.error}</p>

        <Link href="/">
          <Button className="mt-5">Go Back</Button>
        </Link>
      </div>
    </div>
  )
}

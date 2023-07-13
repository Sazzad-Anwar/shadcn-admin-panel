import React, { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { X } from "lucide-react"
import QueryString from "qs"
import { useDebounce } from "usehooks-ts"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Search() {
  let searchParams = useSearchParams()
  let pathname = usePathname()
  let router = useRouter()
  const [value, setValue] = useState<string>(searchParams.get("search") ?? "")
  const debouncedValue = useDebounce<string>(value, 500)

  useEffect(() => {
    let param = QueryString.stringify({
      search: debouncedValue,
    })
    router.push(`${pathname}?${param}`)
  }, [debouncedValue, router, pathname])

  return (
    <div className="relative w-96">
      <Input
        placeholder="Search by username or email..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="h-10 w-96"
        type="text"
      />
      {value && (
        <Button
          className="absolute right-0 top-0"
          variant="link"
          onClick={() => setValue("")}
        >
          <X />
        </Button>
      )}
    </div>
  )
}

import React, { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { QueryProps } from "@/apiRequests/posts/filter"
import { X } from "lucide-react"
import QueryString from "qs"
import { useDebounce } from "usehooks-ts"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Search() {
  const searchParams = useSearchParams()
  const [value, setValue] = useState<string>(searchParams.get("search") ?? "")
  const debouncedValue = useDebounce<string>(value, 500)
  const router = useRouter()
  const pathname = usePathname()
  let [queryParams, setQueryParams] = useState<QueryProps>({
    page: searchParams.get("page") ? searchParams.get("page")! : "1",
    pageSize: searchParams.get("pageSize")
      ? searchParams.get("pageSize")!
      : "10",
    filters: searchParams.get("filters") ?? "",
    search: searchParams.get("search") ?? debouncedValue,
  })

  useEffect(() => {
    setQueryParams({
      page: searchParams.get("page") ? searchParams.get("page")! : "1",
      pageSize: searchParams.get("pageSize")
        ? searchParams.get("pageSize")!
        : "10",
      filters: searchParams.get("filters") ?? "",
      search: debouncedValue,
    })
  }, [debouncedValue, searchParams])

  useEffect(() => {
    router.push(
      `${pathname}?${QueryString.stringify(queryParams, {
        encodeValuesOnly: true,
      })}`
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams])

  return (
    <div className="relative">
      <Input
        placeholder="Search by title or details..."
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

import React, { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { QueryProps } from "@/apiRequests/posts/filter"
import { Table } from "@tanstack/react-table"
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react"
import qs from "qs"

import { Pagination, PaginationQuery } from "@/types/app"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DataTablePaginationProps<T> {
  table: Table<T>
  pagination?: Pagination
  queries?: QueryProps
}

export default function DataTablePagination<T>({
  table,
  pagination,
}: DataTablePaginationProps<T>) {
  let searchParams = useSearchParams()
  let router = useRouter()
  let pathname = usePathname()

  let [queryParams, setQueryParams] = useState<QueryProps>({
    page: searchParams.get("page") ? searchParams.get("page")! : "1",
    pageSize: searchParams.get("pageSize")
      ? searchParams.get("pageSize")!
      : "10",
    filters: searchParams.get("filters") ?? "",
    search: searchParams.get("search") ?? "",
  })

  useEffect(() => {
    setQueryParams({
      page: searchParams.get("page") ? searchParams.get("page")! : "1",
      pageSize: searchParams.get("pageSize")
        ? searchParams.get("pageSize")!
        : "10",
      filters: searchParams.get("filters") ?? "",
      search: searchParams.get("search") ?? "",
    })
  }, [searchParams])

  return (
    <div className="flex flex-col items-center justify-between px-2 lg:flex-row">
      <div className="mb-2 flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div className="space-6 flex flex-col items-center lg:flex-row lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={queryParams!.pageSize?.toString()}
            onValueChange={(value: string) => {
              setQueryParams(
                (params) => params && { ...params, pageSize: value }
              )
              let query = qs.stringify(
                {
                  ...queryParams,
                  pageSize: value,
                },
                { encodeValuesOnly: true }
              )
              router.push(`${pathname}?${query}`)
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={queryParams!.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center">
          <div className="my-4 flex w-[100px] items-center justify-center text-sm font-medium lg:m-0">
            Page {pagination?.page?.toString()} of{" "}
            {pagination?.pageCount?.toString()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => {
                let query = qs.stringify(
                  {
                    ...queryParams,
                    page: "1",
                  },
                  { encodeValuesOnly: true }
                )
                router.push(`${pathname}?${query}`)
              }}
              disabled={pagination?.page === 1}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => {
                let query = qs.stringify(
                  {
                    ...queryParams,
                    page: pagination?.page! - 1,
                  },
                  { encodeValuesOnly: true }
                )
                router.push(`${pathname}?${query}`)
              }}
              disabled={pagination?.page === 1}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => {
                let query = qs.stringify(
                  {
                    ...queryParams,
                    page: pagination?.page! + 1,
                  },
                  { encodeValuesOnly: true }
                )
                router.push(`${pathname}?${query}`)
              }}
              disabled={pagination?.page === pagination?.pageCount}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => {
                let query = qs.stringify(
                  {
                    ...queryParams,
                    page: pagination?.pageCount,
                  },
                  { encodeValuesOnly: true }
                )
                router.push(`${pathname}?${query}`)
              }}
              disabled={pagination?.pageCount === pagination?.page}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

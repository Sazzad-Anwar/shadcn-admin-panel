import React, { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { QueryProps } from "@/apiRequests/posts/filter"
import { Check, PlusCircle } from "lucide-react"
import { useSession } from "next-auth/react"
import QueryString from "qs"

import { UserType } from "@/types/app"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

interface FilterByUserProps {
  users: UserType[]
}

export default function FilterByUsers({ users }: FilterByUserProps) {
  let searchParams = useSearchParams()
  let session = useSession()
  let [selectedValues, setSelectedValues] = useState<number[]>(
    searchParams.get("filters") &&
      JSON.parse(searchParams.get("filters")!)?.users.length
      ? JSON.parse(searchParams.get("filters")!)?.users
      : [session?.data?.user?.id]
  )
  let router = useRouter()
  let pathname = usePathname()

  let [queryParams, setQueryParams] = useState<QueryProps>({
    page: searchParams.get("page") ? searchParams.get("page")! : "1",
    pageSize: searchParams.get("pageSize")
      ? searchParams.get("pageSize")!
      : "10",
    filters: JSON.stringify(selectedValues),
    search: searchParams.get("search") ?? "",
  })

  useEffect(() => {
    setQueryParams({
      page: searchParams.get("page") ? searchParams.get("page")! : "1",
      pageSize: searchParams.get("pageSize")
        ? searchParams.get("pageSize")!
        : "10",
      filters: QueryString.stringify(selectedValues),
      search: searchParams.get("search") ?? "",
    })
  }, [searchParams, selectedValues])

  useEffect(() => {
    router.push(
      `${pathname}?${QueryString.stringify(
        {
          ...queryParams,
          filters: JSON.stringify({ users: selectedValues }),
        },
        {
          encodeValuesOnly: true,
        }
      )}`
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValues, queryParams])

  return (
    <div className="ml-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="h-10 border-dashed">
            <PlusCircle className="mr-2 h-4 w-4" />
            Users
            {selectedValues?.length > 0 && (
              <>
                <Separator orientation="vertical" className="mx-2 h-4" />
                <Badge
                  variant="secondary"
                  className="rounded-sm px-1 font-normal lg:hidden"
                >
                  {
                    users.find((user) => selectedValues.includes(user?.id!))
                      ?.username
                  }
                </Badge>
                <div className="hidden space-x-1 lg:flex">
                  {selectedValues.length > 2 ? (
                    <Badge
                      variant="secondary"
                      className="rounded-sm px-1 font-normal"
                    >
                      {selectedValues.length} selected
                    </Badge>
                  ) : (
                    users
                      .filter((user) => selectedValues.includes(user?.id!))
                      .map((user) => (
                        <Badge
                          variant="secondary"
                          key={user.email}
                          className="rounded-sm px-1 font-normal"
                        >
                          {user.username}
                        </Badge>
                      ))
                  )}
                </div>
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[199px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Users" />
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {users.map((user) => {
                let isSelected = selectedValues.includes(user?.id!)
                return (
                  <CommandItem
                    key={user.username}
                    onSelect={() => {
                      if (isSelected) {
                        setSelectedValues(
                          selectedValues.filter((value) => value !== user.id)
                        )
                      } else {
                        setSelectedValues((prev) => [...prev, user?.id!])
                      }
                    }}
                  >
                    <div
                      className={cn(
                        "mr-3 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-51 [&_svg]:invisible"
                      )}
                    >
                      <Check className={cn("h-5 w-4")} />
                    </div>
                    <span>{user.username}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}

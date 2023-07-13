import React, { Fragment } from "react"
import Link from "next/link"
import { MoreHorizontal } from "lucide-react"
import { v4 as uuid } from "uuid"

import { DataTableRowOption } from "@/types/app"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DataTableRowActionsProps {
  options: DataTableRowOption[]
}

export function DataTableRowActions({ options }: DataTableRowActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <MoreHorizontal className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {options.map(({ name, icon, link, onClick, hasSeparator }) => (
          <Fragment key={uuid()}>
            <DropdownMenuItem onClick={onClick}>
              {link ? (
                <Link href={link} className="flex items-center">
                  {icon}
                  {name}
                </Link>
              ) : (
                <>
                  {icon}
                  {name}
                </>
              )}
            </DropdownMenuItem>
            {hasSeparator && <DropdownMenuSeparator />}
          </Fragment>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

import { ColumnDef } from "@tanstack/react-table"
import dayjs from "dayjs"
import { CheckCircle, CircleSlashed } from "lucide-react"

import { UserType } from "@/types/app"

import { DataTableColumnHeader } from "../DataTable/DataTableColumnHeader/page"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Checkbox } from "../ui/checkbox"
import RowAction from "./RowAction"

export const columns: ColumnDef<UserType>[] = [
  {
    id: "select",
    header: ({ table }) => {
      return (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value: boolean) =>
            table.toggleAllPageRowsSelected(!!value)
          }
          aria-label="Select all"
          className="mr-3 translate-x-1 translate-y-[2px]"
        />
      )
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-x-1 translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "username",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />
    },
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Avatar>
            <AvatarFallback>
              {row.original.username.split("")[0]}
            </AvatarFallback>
          </Avatar>
          <span className="ml-2">{row.getValue("username")}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Email" />
    },
  },
  {
    accessorKey: "confirmed",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Verified" />
    },
    cell: ({ row }) => {
      return (
        <span className="flex items-center">
          {row.getValue("confirmed") ? (
            <>
              <CheckCircle className="mr-1 h-4 w-4 text-green-600" />
              {"Yes"}
            </>
          ) : (
            <>
              <CircleSlashed className="mr-1 h-3.5 w-3.5 text-red-600" />
              {"No"}
            </>
          )}
        </span>
      )
    },
  },
  {
    accessorKey: "blocked",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Blocked" />
    },
    cell: ({ row }) => {
      return (
        <span className="flex items-center">
          {row.getValue("blocked") ? (
            <>
              <CheckCircle className="mr-1 h-4 w-4 text-green-600" />
              {"Yes"}
            </>
          ) : (
            <>
              <CircleSlashed className="mr-1 h-4 w-4 text-red-600" />
              {"No"}
            </>
          )}
        </span>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Registered At" />
    },
    cell: ({ row }) => {
      return (
        <span>{dayjs(row.getValue("createdAt")).format("DD MMM YYYY")}</span>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <RowAction row={row} />,
  },
]

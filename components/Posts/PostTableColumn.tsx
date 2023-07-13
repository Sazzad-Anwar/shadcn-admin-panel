import React from "react"
import { useRouter } from "next/navigation"
import { deletePost } from "@/apiRequests/posts/posts.api"
import { ShowApiError } from "@/utils/showApiError"
import { ColumnDef } from "@tanstack/react-table"
import { Pen, SquareGantt, Trash } from "lucide-react"

import { PostType } from "@/types/app"

import { DataTableColumnHeader } from "../DataTable/DataTableColumnHeader/page"
import { DataTableRowActions } from "../DataTable/DataTableRowActions/page"
import { Avatar, AvatarFallback } from "../ui/avatar"
import { Checkbox } from "../ui/checkbox"
import { useToast } from "../ui/use-toast"

export default function PostTableColumn() {
  const { toast } = useToast()
  const router = useRouter()
  const postTableColumns: ColumnDef<PostType>[] = [
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
    },
    {
      accessorKey: "user",
      header: ({ column }) => {
        return (
          <DataTableColumnHeader
            className="ml-3"
            column={column}
            title="User"
          />
        )
      },
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <Avatar>
              <AvatarFallback>
                {row.original.user?.username?.split("")[0]}
              </AvatarFallback>
            </Avatar>
            <span className="ml-2">{row.original.user?.username}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "title",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Title" />
      },
      cell: ({ row }) => {
        return row.original.title
      },
    },
    {
      accessorKey: "body",
      header: ({ column }) => {
        return <DataTableColumnHeader column={column} title="Details" />
      },
      cell: ({ row }) => {
        return row.original.body
      },
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <DataTableRowActions
          key={row.id}
          options={[
            {
              name: "Edit",
              link: `/posts/${row.original.id}`,
              icon: (
                <Pen className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              ),
            },
            {
              name: "View",
              link: `/posts/${row.original.id}`,
              icon: (
                <SquareGantt className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              ),
              hasSeparator: true,
            },
            {
              name: "Delete",
              link: "/posts",
              onClick: async () => {
                let res = await deletePost(row.original?.id!)
                let data = await res.json()
                if (data?.error?.message) {
                  ShowApiError(data.error)
                } else {
                  toast({
                    variant: "success",
                    title: "Post is deleted",
                  })
                  router.refresh()
                }
              },
              icon: (
                <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              ),
            },
          ]}
        />
      ),
    },
  ]
  return { postTableColumns }
}

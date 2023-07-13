import React from "react"
import { Table } from "@tanstack/react-table"

import { UserType } from "@/types/app"
import { DataTableViewOptions } from "@/components/DataTable/DataTableViewOptions/page"

import CreatePost from "./CreatePost/CreatePost"
import FilterByUsers from "./Filters/FilterByUsers"
import Search from "./Search/Search"

interface PostTableToolbarProps<TData> {
  table: Table<TData>
  users: UserType[]
}

export default function PostTableToolbar<TData>({
  table,
  users,
}: PostTableToolbarProps<TData>) {
  return (
    <div className="flex items-center">
      <Search />
      <FilterByUsers users={users} />
      <DataTableViewOptions table={table} />
      <CreatePost users={users} />
    </div>
  )
}

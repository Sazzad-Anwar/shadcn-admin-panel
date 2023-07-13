"use client"

import React from "react"
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { UserType } from "@/types/app"

import { DataTable } from "../DataTable/page"
import UserTableToolbar from "./TableToolbar/UserTableToolbar"
import { columns } from "./usersTableColumn"

interface UserListProps {
  users: UserType[]
}

export default function UserList({ users }: UserListProps) {
  let table = useReactTable({
    data: users,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })
  return (
    <>
      <UserTableToolbar />
      <DataTable table={table} columns={columns} />
    </>
  )
}

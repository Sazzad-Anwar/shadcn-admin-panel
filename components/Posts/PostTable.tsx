"use client"

import React from "react"
import { IError, ShowApiError } from "@/utils/showApiError"
import {
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Pagination, PostType, UserType } from "@/types/app"

import DataTablePagination from "../DataTable/DataTablePagination/page"
import { DataTable } from "../DataTable/page"
import PostTableColumn from "./PostTableColumn"
import PostTableToolbar from "./TableToolbar/PostTableToolbar"

interface PostTableProps {
  posts: PostType[]
  pagination?: Pagination
  users: UserType[]
}
export default function PostTable({
  posts,
  pagination,
  users,
}: PostTableProps) {
  const { postTableColumns } = PostTableColumn()
  const table = useReactTable({
    data: posts,
    columns: postTableColumns,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })
  return (
    <>
      <PostTableToolbar table={table} users={users} />
      <DataTable table={table} columns={postTableColumns} />
      <DataTablePagination table={table} pagination={pagination} />
    </>
  )
}

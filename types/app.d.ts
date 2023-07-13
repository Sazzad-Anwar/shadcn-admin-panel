import { ReactNode } from "react"
import { LucideIcon } from "lucide-react"
import * as z from "zod"

import { CreatePostSchema, PostSchema, UserSchema } from "./zod.type"

export type UserType = z.infer<typeof UserSchema>
export type PostType = z.infer<typeof PostSchema>
export type CreatePostType = z.infer<typeof CreatePostSchema>

export type GetPostApiResponse = {
  data: PostType[]
  meta: Meta
}

export interface PaginationQuery {
  page: string
  pageSize: string
}

export interface Meta {
  pagination: Pagination
}

export interface Pagination {
  page: number
  pageSize: number
  pageCount?: number
  total?: number
}

export interface NavigationType {
  id: string
  url: string
  name: string
  icon: ReactNode
  isLink: boolean
  navChildren?: Navigation[]
}

export interface DataTableRowOption {
  name: string
  link?: string
  icon: ReactNode
  onClick?: () => void
  hasSeparator?: boolean
}

export interface IUserDetails {
  jwt: string
  user: IUser
}

export interface IUser {
  id: number
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  createdAt: Date
  updatedAt: Date
}

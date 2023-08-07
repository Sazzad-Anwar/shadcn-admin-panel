import React, { Suspense } from "react"
import { cookies } from "next/headers"
import { userFilters } from "@/filters/users/filters"

import { PostType, UserType } from "@/types/app"
import { APIRoutes } from "@/config/routes"
import UserList from "@/components/UserList/page"

import Loading from "../loading"

export interface GetUserProps {
  search?: string
}

export async function getUsers(searchParams?: GetUserProps) {
  const token = cookies().get("token")?.value
  let users = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API_URL + APIRoutes.USERS}?${userFilters(
      searchParams?.search!
    )}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return users.json()
}

export default async function Users({
  searchParams,
}: {
  searchParams: GetUserProps
}) {
  const userList = await getUsers(searchParams)
  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight">Users</h2>
      <Suspense fallback={<Loading />}>
        <UserList users={userList} />
      </Suspense>
    </>
  )
}

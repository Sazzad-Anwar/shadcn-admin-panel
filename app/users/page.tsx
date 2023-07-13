import React, { Suspense } from "react"
import { GetUserProps, getUsers } from "@/apiRequests/users/users.api"

import { PostType, UserType } from "@/types/app"
import UserList from "@/components/UserList/page"

import Loading from "../loading"

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

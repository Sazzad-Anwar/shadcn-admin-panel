import React, { Suspense } from "react"
import { QueryProps } from "@/apiRequests/posts/filter"
import { getPosts } from "@/apiRequests/posts/posts.api"
import { getUsers } from "@/apiRequests/users/users.api"
import { IError } from "@/utils/showApiError"

import PostTable from "@/components/Posts/PostTable"

import Loading from "../loading"

export default async function Posts({
  searchParams,
}: {
  searchParams: QueryProps
}): Promise<React.JSX.Element> {
  let posts = await getPosts(searchParams)
  let users = await getUsers()

  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight">Posts</h2>
      <Suspense fallback={<Loading />}>
        <PostTable
          users={users ?? []}
          posts={posts?.data ?? []}
          pagination={posts?.meta?.pagination}
        />
      </Suspense>
    </>
  )
}

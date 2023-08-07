import React, { Suspense } from "react"
import { cookies } from "next/headers"
import { QueryProps, postQuery } from "@/filters/posts/filter"
import { IError } from "@/utils/showApiError"

import { CreatePostType } from "@/types/app"
import { APIRoutes } from "@/config/routes"
import PostTable from "@/components/Posts/PostTable"

import Loading from "../loading"
import { getUsers } from "../users/page"

async function getPosts(searchParams: QueryProps) {
  const token = cookies().get("token")?.value
  let res = await fetch(
    process.env.NEXT_PUBLIC_BASE_API_URL +
      APIRoutes.POST +
      `?${postQuery(searchParams!)}`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data")
  }
  let posts = await res.json()
  posts = {
    ...posts,
    data: posts.data?.map((post: any) => ({
      id: post.id,
      ...post.attributes,
      user: {
        id: post?.attributes?.user?.data?.id,
        ...post?.attributes?.user?.data?.attributes,
      },
    })),
  }
  return posts
}

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

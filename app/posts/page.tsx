import React, { Suspense } from "react"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { QueryProps, postQuery } from "@/filters/posts/filter"
import { IError } from "@/utils/showApiError"
import { signOut } from "next-auth/react"

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
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  let posts = await res.json()
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error(res.statusText)
  }
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

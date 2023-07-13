import {
  CreatePostType,
  GetPostApiResponse,
  Pagination,
  PostType,
} from "@/types/app"
import { APIRoutes } from "@/config/routes"

import { api } from "../api"
import { QueryProps, postQuery } from "./filter"

export const getPosts = async (
  postQueryProps?: QueryProps
): Promise<GetPostApiResponse> => {
  try {
    let res = await fetch(
      api.URL + APIRoutes.POST + `?${postQuery(postQueryProps!)}`,
      {
        cache: "no-store",
      }
    )
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
  } catch (error: any) {
    return error?.response
      ? error?.response?.data?.error?.message
      : error?.message
  }
}

export const createPostApi = async (data: CreatePostType) => {
  let res = await fetch(`${api.URL + APIRoutes.POST}`, {
    method: "POST",
    body: JSON.stringify({ data }),
    headers: {
      "Content-Type": "application/json",
      ...api.headers,
    },
  })
  let post = await res.json()
  return post
}

export const deletePost = async (id: number) => {
  let res = await fetch(`${api.URL + APIRoutes.POST}/${id}`, {
    method: "DELETE",
    headers: api.headers,
  })
  return res
}

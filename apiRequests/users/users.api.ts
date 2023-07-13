import { UserType } from "@/types/app"
import { APIRoutes } from "@/config/routes"

import { api } from "../api"
import { userFilters } from "./filters"

export interface GetUserProps {
  search?: string
}

export const getUsers = async (filter?: GetUserProps): Promise<UserType[]> => {
  try {
    let res = await fetch(
      `${api.URL + APIRoutes.USERS}?${userFilters(filter?.search!)}`
    )
    let data = await res.json()
    return data
  } catch (error: any) {
    return error?.response
      ? error?.response?.data?.error?.message
      : error?.message
  }
}

export const deleteUser = async () => {
  try {
  } catch (error) {}
}

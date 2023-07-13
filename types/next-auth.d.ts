import { AuthUserType } from "@/context/types/context.type"
import { DefaultSession } from "next-auth"
import NextAuth from "next-auth/next"

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      token: string
      id: number
    }
  }

  interface User {
    id: number
    name: string
    email: string
    image: string
    token: string
  }
}

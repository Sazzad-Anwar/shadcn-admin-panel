import { cookies } from "next/headers"
import axios from "axios"
import { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"

import { IUser, IUserDetails } from "@/types/app"
import { APIRoutes } from "@/config/routes"

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        identifier: {
          label: "Identifier",
          type: "text",
          placeholder: "example@mail.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "******",
        },
      },
      async authorize(credentials) {
        try {
          const { data: userDetails } = await axios.post<IUserDetails>(
            process.env.NEXT_PUBLIC_BASE_API_URL + APIRoutes.LOGIN,
            credentials
          )
          if (userDetails?.jwt) {
            let user: any = {
              id: userDetails?.user?.id,
              token: userDetails?.jwt,
              name: userDetails?.user?.username,
              email: userDetails?.user?.email,
              image: "https://github.com/sazzad-anwar.png?size=200",
            }
            return user
          } else {
            throw new Error("Invalid credentials")
          }
        } catch (error: any) {
          throw new Error(
            error?.response
              ? error?.response?.data?.error?.message
              : error?.message
          )
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  cookies: {},
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        // try {
        //   let res = await fetch(
        //     `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/auth/google/callback?id_token=${account?.id_token}&access_token=${account?.access_token}`
        //   )
        //   let data = await res.json()
        //   user.token = data?.jwt
        //   user.email = data?.user?.email
        //   user.id = data?.user?.id
        //   user.name = data?.user?.username
        //   cookies().set("token", data?.jwt, { maxAge: 60 * 60 * 24 * 30 })
        // } catch (error: any) {
        //   console.log(error)
        //   throw new Error(error?.message)
        // }
      }
      return true
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id
      }
      if (account) {
        token.accessToken = user.token
        token.access_token = account.access_token
        token.id_token = account.id_token
        token.provider = account.provider
      }
      return token
    },
    async session({ session, token, user }) {
      if (token?.provider) {
        try {
          let res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/auth/${token?.provider}/callback?id_token=${token?.id_token}&access_token=${token?.access_token}`
          )
          let data = await res.json()
          session.user.token = data?.jwt
          session.user.email = data?.user?.email
          session.user.id = data?.user?.id
          session.user.name = data?.user?.username
          cookies().set("token", data?.jwt, {
            maxAge: 60 * 60 * 24 * 30,
            sameSite: "lax",
            path: "/",
            httpOnly: true,
          })
          return session
        } catch (error: any) {
          console.log(error)
          throw new Error(error?.message)
        }
      } else {
        session.user.id = +token?.sub!
        session.user.token = token.accessToken as string
        return session
      }
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/login",
    newUser: "/",
    error: "/login",
  },
}

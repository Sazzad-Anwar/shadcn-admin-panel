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
      async authorize(credentials, req) {
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
    async signIn({ account }) {
      if (account?.provider === "google") {
        return true
      }
      return true
    },
    async session({ session, token, user }) {
      session.user.id = +token?.sub!
      session.user.token = token.accessToken as string
      return session
    },
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.id = user.id
      }
      if (account) {
        token.accessToken = user.token
      }
      return token
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/login",
    newUser: "/",
    error: "/error",
  },
}
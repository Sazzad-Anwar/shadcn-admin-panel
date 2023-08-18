import { cookies } from "next/headers"
import { faker } from "@faker-js/faker"
import axios from "axios"
import { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
    maxAge: Number(process.env.NEXT_PUBLIC_SESSION_EXPIRATION),
  },
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
          //   const { data: userDetails } = await axios.post<IUserDetails>(
          //     process.env.NEXT_PUBLIC_BASE_API_URL + APIRoutes.LOGIN,
          //     credentials
          //   )
          let userDetails = {
            jwt: faker.string.uuid(),
            user: {
              id: faker.string.alphanumeric(),
              name: faker.person.fullName(),
              email: faker.internet.email(),
              image: faker.internet.avatar(),
            },
          }
          if (userDetails?.jwt) {
            let user: any = {
              id: userDetails?.user?.id,
              token: userDetails?.jwt,
              name: userDetails?.user?.name,
              email: userDetails?.user?.email,
              image: userDetails?.user?.image,
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
        // return true
      }
      return true
    },
    async jwt({ token, user, account }) {
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
      if (token?.provider !== "credentials") {
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
            maxAge: Number(process.env.NEXT_PUBLIC_SESSION_EXPIRATION),
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

"use client"

import React, { Suspense, useEffect, useRef, useState } from "react"
import { redirect, usePathname, useRouter } from "next/navigation"
import { useGlobalContext } from "@/context/GlobalContextProvider"
import { signOut, useSession } from "next-auth/react"
import NextProgress from "next-progress"

import { APIRoutes, AppRoutes } from "@/config/routes"
import useMobileWidth from "@/hooks/useMobileWidth"
import Loading from "@/app/loading"

import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import NavPanel from "./nav-panel"
import { SiteHeader } from "./site-header"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const pathname = usePathname()
  const session = useSession()
  const { sideBar } = useGlobalContext()
  const [isMobileWidth] = useMobileWidth()
  const [isExpired, setIsExpired] = useState<boolean>(false)
  const pathName = usePathname()
  const router = useRouter()
  const dialogRef = useRef<null | HTMLButtonElement>(null)

  useEffect(() => {
    let checkAuth = async () => {
      try {
        let res = await fetch(
          process.env.NEXT_PUBLIC_BASE_API_URL + APIRoutes.USERS + "/me",
          {
            headers: {
              Authorization: `Bearer ${session?.data?.user?.token}`,
            },
          }
        )
        if (!res?.ok && pathName !== AppRoutes.LOGIN) {
          dialogRef?.current?.click()
          setIsExpired(true)
        } else {
          return null
        }
      } catch (error: any) {}
    }
    if (session.status === "authenticated") {
      checkAuth()
    }
  }, [session, pathName])

  let currentRoute =
    typeof window !== "undefined" &&
    window.location.href.split(window.location.origin)[1]

  if (
    pathname === "/login" ||
    pathname === "/error" ||
    pathname === "/provider" ||
    pathname.includes("/connect")
  ) {
    return (
      <div className="relative flex min-h-screen flex-1 flex-col">
        {children}
      </div>
    )
  }

  if (session.status === "loading") {
    return <Loading />
  }

  if (session.status === "unauthenticated") {
    redirect(AppRoutes.LOGIN)
  }

  if (session.status === "authenticated") {
    return (
      <>
        <NextProgress color="#9BD0F5" />
        <div className="flex">
          <NavPanel name="Admin panel" />
          <div
            className={`relative min-h-screen ${
              sideBar.isOpen && !isMobileWidth
                ? " ml-auto md:w-[calc(100%-250px)] lg:w-[calc(100%-300px)]"
                : sideBar.isOpen && isMobileWidth
                ? "w-0"
                : "w-full"
            } ml-auto transition-all duration-150 ease-in-out`}
          >
            <SiteHeader />
            <main className="m-5 md:mx-10">
              <Suspense fallback={<Loading />}>{children}</Suspense>
              <Dialog open={isExpired}>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Your session is expired!</DialogTitle>
                    <DialogDescription>
                      <Button
                        variant="outline"
                        onClick={() =>
                          signOut({
                            callbackUrl:
                              AppRoutes.LOGIN + "?forwardTo=" + currentRoute,
                          })
                        }
                      >
                        Login
                      </Button>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </main>
          </div>
        </div>
      </>
    )
  }

  return null
}

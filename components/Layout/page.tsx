"use client"

import React, { Suspense } from "react"
import { redirect, usePathname } from "next/navigation"
import { useGlobalContext } from "@/context/GlobalContextProvider"
import { useSession } from "next-auth/react"
import NextProgress from "next-progress"

import useMobileWidth from "@/hooks/useMobileWidth"
import Loading from "@/app/loading"

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

  console.log(session)

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
    redirect("/login")
  }

  if (session.status === "authenticated") {
    localStorage.setItem("token", session.data?.user?.token)
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
            </main>
          </div>
        </div>
      </>
    )
  }

  return null
}

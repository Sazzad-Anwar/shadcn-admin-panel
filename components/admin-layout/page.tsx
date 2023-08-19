"use client"

import React, { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import { AppRoutes } from "@/config/routes"
import useMobileWidth from "@/hooks/useMobileWidth"
import Loading from "@/app/loading"

import { AdminSiteHeader } from "../admin-site-header"
import SideNav from "../sideNav/page"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  let session = useSession()
  let pathName = usePathname()
  let router = useRouter()
  let [isMobileWidth] = useMobileWidth()
  let [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true)

  const toggleSideBar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  if (session.status === "loading") {
    return <Loading />
  }
  if (pathName === AppRoutes.LOGIN) {
    return <>{children}</>
  }
  if (session.status === "authenticated") {
    return (
      <main className="flex items-start">
        {isSidebarOpen ? (
          <SideNav
            toggleSideBar={toggleSideBar}
            isSidebarOpen={isSidebarOpen}
          />
        ) : null}
        <section
          className={`relative ${
            isSidebarOpen && !isMobileWidth
              ? " ml-auto md:w-[calc(100%-250px)] lg:w-[calc(100%-300px)]"
              : isSidebarOpen && isMobileWidth
              ? "w-0"
              : "w-full"
          } ml-auto h-screen overflow-hidden transition-all duration-150 ease-in-out`}
        >
          <AdminSiteHeader
            isSidebarOpen={isSidebarOpen}
            toggleSideBar={toggleSideBar}
          />
          <div className="ml-10 h-full w-auto overflow-y-auto">
            {children}
            <div className="h-16" />
          </div>
        </section>
      </main>
    )
  }
  if (session.status === "unauthenticated" && pathName !== AppRoutes.LOGIN) {
    return (
      <Dialog open={true}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Your session is expired! <br /> Please login again
            </DialogTitle>
            <DialogDescription>
              <Button
                variant="secondary"
                className="mt-4"
                onClick={() => router.push(AppRoutes.LOGIN)}
              >
                Ok
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    )
  }
  return <></>
}

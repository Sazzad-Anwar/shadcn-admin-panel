"use client"

import React, { useState } from "react"
import { useSession } from "next-auth/react"

import useMobileWidth from "@/hooks/useMobileWidth"
import Loading from "@/app/loading"

import { AdminSiteHeader } from "../admin-site-header"
import Login from "../login/page"
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
}) {
  let session = useSession()
  let [isMobileWidth] = useMobileWidth()
  let [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true)
  let [isShowingLogin, setIsShowingLogin] = useState<boolean>(false)

  const toggleSideBar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  if (session.status === "loading") {
    return <Loading />
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
  } else {
    return (
      <>
        {isShowingLogin && <Login />}

        <Dialog open={!isShowingLogin}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Your session is expired! <br /> Please login again
              </DialogTitle>
              <DialogDescription>
                <Button
                  variant="secondary"
                  className="mt-4"
                  onClick={() => setIsShowingLogin(true)}
                >
                  Ok
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </>
    )
  }
}

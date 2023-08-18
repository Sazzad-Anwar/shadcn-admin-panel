/* eslint-disable @next/next/no-head-element */
"use client"

import React, { useState } from "react"
import Head from "next/head"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { signOut, useSession } from "next-auth/react"

import { AppRoutes } from "@/config/routes"
import useMobileWidth from "@/hooks/useMobileWidth"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AdminSiteHeader } from "@/components/admin-site-header"
import { Icons } from "@/components/icons"
import Login from "@/components/login/page"
import SideNav from "@/components/sideNav/page"

import Loading from "../loading"

export default function RootLayout({
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
      <>
        <head>
          <title>Admin Panel</title>
        </head>
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
      </>
    )
  } else {
    return (
      <>
        {isShowingLogin && (
          <>
            <head>
              <title>Login</title>
            </head>
            <Login />
          </>
        )}

        <Dialog open={session.status === "unauthenticated" && !isShowingLogin}>
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

/* eslint-disable @next/next/no-head-element */
"use client"

import React, { useEffect, useState } from "react"
import { Metadata } from "next"
import { useSession } from "next-auth/react"

import { siteConfig } from "@/config/site"
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
import Login from "@/components/login/page"
import SideNav from "@/components/sideNav/page"

import Loading from "../loading"

export const metadata: Metadata = {
  title: {
    default: "Admin Panel",
    template: `%s - ${siteConfig.name}`,
  },
  description: "Amdin panel",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

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

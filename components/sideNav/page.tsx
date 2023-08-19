import React from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

import useMobileWidth from "@/hooks/useMobileWidth"

import { Icons } from "../icons"
import { Button } from "../ui/button"
import { SideNav, SideNavigation } from "./navigations"
import RenderNavigation from "./render-navigation"

export default function SideNav({
  isSidebarOpen,
  toggleSideBar,
}: {
  isSidebarOpen: boolean
  toggleSideBar: () => void
}):JSX.Element {
  let [isMobileWidth] = useMobileWidth()

  return (
    <aside
      className={
        (!isMobileWidth
          ? "md:w-[250px] lg:w-[300px]"
          : "fixed w-screen left-0 top-0") +
        "  h-screen border-r bg-background relative overflow-hidden"
      }
    >
      <div className=" sticky top-0 flex h-16 w-full items-center justify-between border-b bg-background px-5">
        <Link href="/" className="flex items-center space-x-2">
          <Icons.logo className="h-6 w-6" />
          <span className="inline-block font-bold">Admin Panel</span>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => toggleSideBar()}
        >
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>
      <div className="h-screen overflow-auto">
        {SideNavigation.map(nav=> <RenderNavigation key={nav.id} menu={nav} />)}
        <div className="h-16" />
      </div>
    </aside>
  )
}

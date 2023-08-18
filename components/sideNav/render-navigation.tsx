import React, { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"

import { Button, buttonVariants } from "../ui/button"
import { SideNav } from "./navigations"

interface RenderNavigationProps {
  menu: SideNav
}

export default function RenderNavigation({ menu }: RenderNavigationProps) {
  let pathName = usePathname()
  let [isExpanded, setIsExpanded] = useState<boolean>(false)

  useEffect(() => {
    if (menu?.children?.find((nav) => nav.route === pathName)) {
      setIsExpanded(true)
    } else {
      setIsExpanded(false)
    }
  }, [menu, pathName])

  if (!menu.hasChildren) {
    return (
      <Link
        key={menu?.routeName}
        href={menu?.route!}
        className={cn(
          buttonVariants({
            variant: "ghost",
          }),
          `link block w-full rounded-none ${
            pathName === menu.route && "bg-accent text-accent-foreground"
          }`
        )}
      >
        <div className="flex w-full justify-start">
          <span className="flex items-center text-base">
            {menu.icon ? <menu.icon size={18} className="mr-3" /> : null}
            {menu?.routeName}
          </span>
        </div>
      </Link>
    )
  } else {
    return (
      <>
        <Button
          variant="ghost"
          className={`w-full cursor-pointer rounded-none ${
            !isExpanded &&
            menu?.children?.find((nav) => nav.route === pathName) &&
            "bg-accent text-accent-foreground"
          }`}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <div className="flex w-full items-center justify-between">
            <span className="flex items-center text-base">
              {menu.icon ? <menu.icon size={18} className="mr-3" /> : null}
              {menu?.routeName}
            </span>
            <span>
              <ChevronRight
                size={15}
                className={
                  (isExpanded ? "rotate-90" : "") +
                  " transition-all duration-100 ease-linear"
                }
              />
            </span>
          </div>
        </Button>
        <div className="w-full">
          {isExpanded && (
            <div className="animate__animated animate__fadeIn child pl-6">
              {menu?.children?.map((subMenu) => (
                <RenderNavigation key={subMenu.id} menu={subMenu} />
              ))}
            </div>
          )}
        </div>
      </>
    )
  }
}

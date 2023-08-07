"use client"

import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useGlobalContext } from "@/context/GlobalContextProvider"
import { SIDE_BAR_TOGGLE } from "@/context/constants/SideBar.contatns"
import { Menu, X } from "lucide-react"
import { useSession } from "next-auth/react"
import { v4 as uuId } from "uuid"

import { NavigationType } from "@/types/app"
import { navigation } from "@/config/menu"
import useMobileWidth from "@/hooks/useMobileWidth"

import { Icons } from "../icons"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"
import { Button } from "../ui/button"

export default function NavPanel({ name }: { name: string }) {
  const { sideBar, sideBarDispatch } = useGlobalContext()
  const pathname = usePathname()
  const [isMobileWidth] = useMobileWidth()
  const session = useSession()

  if (sideBar.isOpen) {
    return (
      <aside
        className={
          (!isMobileWidth
            ? "md:w-[250px] lg:w-[300px]"
            : "fixed w-screen left-0 top-0") +
          "  h-screen border-r bg-background sticky top-0"
        }
      >
        <div className="flex h-16 items-center justify-between border-b px-5">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.logo className="h-6 w-6" />
            <span className="inline-block font-bold">{name}</span>
          </Link>
          <Button
            variant="ghost"
            onClick={() =>
              sideBarDispatch({
                type: SIDE_BAR_TOGGLE,
                payload: !sideBar.isOpen,
              })
            }
            className={`block rounded border bg-transparent px-1.5 py-0`}
          >
            {sideBar.isOpen ? <X /> : <Menu />}
          </Button>
        </div>

        {/* navigation links */}
        <section className="py-5">
          {navigation?.map((navigation) => {
            if (navigation.isLink) {
              return (
                <Link
                  className={`mb-1 flex w-full items-center px-5 py-2.5 hover:bg-gray-100 hover:text-primary dark:hover:bg-gray-900 ${
                    pathname === navigation.url &&
                    " bg-gray-100 text-primary dark:bg-gray-900"
                  }`}
                  key={uuId()}
                  href={navigation.url}
                >
                  <span className="mr-3">{navigation.icon}</span>
                  {navigation.name}
                </Link>
              )
            }
            return (
              <React.Fragment key={uuId()}>
                <Accordion
                  key={navigation.id}
                  type="single"
                  collapsible
                  className="block w-full rounded"
                >
                  <AccordionItem
                    value={navigation?.name}
                    className={`group border-b-0 px-5 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-900 ${
                      navigation?.navChildren?.find(
                        (nav: NavigationType) => nav.url === pathname
                      ) && " bg-gray-100 dark:bg-gray-900"
                    }`}
                  >
                    <AccordionTrigger className="h-5">
                      <div
                        className={`flex items-center group-hover:text-primary ${
                          navigation?.navChildren?.find(
                            (nav: NavigationType) => nav.url === pathname
                          ) && " text-primary"
                        }`}
                      >
                        <span className="mr-3">{navigation.icon}</span>
                        {navigation.name}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      {navigation.navChildren?.map((child: NavigationType) => (
                        <Link
                          key={uuId()}
                          href={child.url}
                          className={`ml-2 flex w-full items-center rounded px-5 pt-3 text-base hover:text-primary ${
                            pathname === child?.url && " text-primary"
                          }`}
                        >
                          <span className="mr-3">{child.icon}</span>
                          {child.name}
                        </Link>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </React.Fragment>
            )
          })}
        </section>
      </aside>
    )
  }
  return null
}

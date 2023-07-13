"use client"

import { useRouter } from "next/navigation"
import { useGlobalContext } from "@/context/GlobalContextProvider"
import { SIDE_BAR_TOGGLE } from "@/context/constants/SideBar.contatns"
import {
  CreditCard,
  LogOut,
  Menu,
  PlusCircle,
  Settings,
  User,
  X,
} from "lucide-react"
import { signOut, useSession } from "next-auth/react"

import useMobileWidth from "@/hooks/useMobileWidth"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/Theme/theme-toggle"

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

export function SiteHeader() {
  const { sideBar, sideBarDispatch } = useGlobalContext()
  const session = useSession()
  const [isMobileWidth] = useMobileWidth()
  const router = useRouter()

  return (
    <header
      className={
        isMobileWidth && sideBar.isOpen
          ? "hidden"
          : `sticky top-0 z-40 w-full border-b bg-background`
      }
    >
      <div className="mx-5 flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0 md:mx-10">
        <Button
          variant="ghost"
          onClick={() =>
            sideBarDispatch({
              type: SIDE_BAR_TOGGLE,
              payload: !sideBar.isOpen,
            })
          }
          className={`rounded border bg-transparent px-1.5 py-0 ${
            sideBar.isOpen ? "hidden" : "block"
          }`}
        >
          <Menu />
        </Button>
        {isMobileWidth && sideBar.isOpen ? null : (
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={session?.data?.user?.image!}
                        alt={session?.data?.user?.name!}
                      />
                      <AvatarFallback>
                        {session?.data?.user?.name?.split("")[0].toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {session?.data?.user?.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session?.data?.user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Billing</span>
                      <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <PlusCircle className="mr-2 h-4 w-4" />
                      <span>New Team</span>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer"
                    onClick={() => {
                      signOut()
                      router.push("/login")
                    }}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <ThemeToggle />
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}

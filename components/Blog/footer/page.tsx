import React from "react"
import Link from "next/link"
import { Facebook, MoveRight, Twitter, Youtube } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="grid grid-cols-1 gap-5 bg-[#212529] px-8 py-12 md:grid-cols-2 md:px-16 md:py-24 lg:grid-cols-4">
      <ul>
        <li className="mb-4 text-lg font-bold text-white">
          Contact the Publisher
        </li>
        <li className="mb-4 text-sm text-[#E5E5E5]">
          <Link href="mailTo:sazzadzihan@gmail.com">sazzadzihan@gmail.com</Link>
        </li>
        <li className="mb-4 text-sm text-[#E5E5E5]">
          <Link href="callTo:+8801834766949">+8801834766949</Link>
        </li>
      </ul>

      <ul>
        <li className="mb-4 text-lg font-bold text-white">Explorate</li>
        <li className="mb-4 text-sm text-[#E5E5E5]">
          <Link href="/blog/about">About</Link>
        </li>
        <li className="mb-4 text-sm text-[#E5E5E5]">
          <Link href="/blog/partners">Partners</Link>
        </li>
        <li className="mb-4 text-sm text-[#E5E5E5]">
          <Link href="/blog/advertise">Advertise</Link>
        </li>
      </ul>

      <div>
        <h1 className="mb-4 text-lg font-bold text-white">Headquarter</h1>
        <address className="mb-4 break-words text-sm text-[#E5E5E5]">
          191 Middleville Road, NY 1001, Sydney Australia
        </address>
      </div>

      <div>
        <h1 className="mb-4 text-lg font-bold text-white">Connections</h1>
        <div className="flex items-center gap-4">
          <Link
            href="https://facebook.com"
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "icon",
              }),
              "text-white hover:text-black"
            )}
          >
            <Facebook />
          </Link>
          <Link
            href="http://twitter.com"
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "icon",
              }),
              "text-white hover:text-black"
            )}
          >
            <Twitter />
          </Link>
          <Link
            href="http://twitter.com"
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "icon",
              }),
              "text-white hover:text-black"
            )}
          >
            <Youtube />
          </Link>
        </div>
      </div>
    </footer>
  )
}

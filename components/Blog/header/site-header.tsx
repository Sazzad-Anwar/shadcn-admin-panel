import React from "react"
import Link from "next/link"

import { BlogAppRoutes } from "@/config/routes"

export default function BlogSiteHeader() {
  return (
    <header className="sticky inset-x-0 top-0 z-10 flex justify-between bg-black/40 px-4 py-3 shadow-2xl md:px-[70px] md:py-5">
      <Link
        href={BlogAppRoutes.HOME}
        className="text-base font-bold text-white md:text-xl"
      >
        RUNO
      </Link>
      <nav className="flex items-center gap-x-3">
        <Link
          href={BlogAppRoutes.HOME}
          className="border-b-2 border-transparent pb-1 text-sm font-bold text-white transition-all duration-200 ease-linear hover:border-[#D4A373]"
        >
          Home
        </Link>
        <Link
          href={BlogAppRoutes.HOME}
          className="border-b-2 border-transparent pb-1 text-sm font-bold text-white transition-all duration-200 ease-linear hover:border-[#D4A373]"
        >
          About
        </Link>
        <Link
          href={BlogAppRoutes.HOME}
          className="border-b-2 border-transparent pb-1 text-sm font-bold text-white transition-all duration-200 ease-linear hover:border-[#D4A373]"
        >
          Article
        </Link>
      </nav>
    </header>
  )
}

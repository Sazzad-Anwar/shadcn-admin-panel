"use client"

import React, { useEffect } from "react"
import AOS from "aos"
import { SessionProvider } from "next-auth/react"

import { ThemeProvider } from "./theme-provider"
import "aos/dist/aos.css"
// Import Swiper styles
import "swiper/css"
import "swiper/css/bundle"
import "swiper/css/effect-fade"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/scrollbar"
import "swiper/css/autoplay"

export default function Providers({
  children,
}: {
  children: React.ReactNode
}): JSX.Element {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    })
  }, [])
  return <SessionProvider>{children}</SessionProvider>
}

"use client"

import React, { useState } from "react"
import { A11y } from "swiper/modules"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

import "swiper/css"
import "swiper/css/bundle"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

import { categories } from "@/types/category"
import { BlogAppRoutes } from "@/config/routes"
import { Button, buttonVariants } from "@/components/ui/button"

export default function PopularTopics() {
  let router = useRouter()
  let params = useSearchParams()
  let categoryParam = params.get("category")
  let [activeCat, setActiveCat] = useState<string>(categoryParam ?? "all")

  let id: string = "popular-topics"

  return (
    <section
      id={id}
      className="mt-16 scroll-m-14 px-4 md:mt-20 md:scroll-m-20 md:px-[70px]"
    >
      <div data-aos="fade-up" className="flex items-start justify-between">
        <h1 className="mb-4 text-3xl font-bold text-[#495057] md:mb-7">
          Popular Topics
        </h1>
        <Link
          className={buttonVariants({ variant: "link" })}
          href={BlogAppRoutes.VIEW_ALL_BLOGS}
        >
          View All
        </Link>
      </div>
      <Swiper
        modules={[A11y]}
        spaceBetween={5}
        breakpoints={{
          300: {
            width: 320,
            slidesPerView: 4,
          },
          414: {
            width: 414,
            slidesPerView: 4,
          },
          920: {
            width: 920,
            slidesPerView: 4,
          },
          1200: {
            width: 1200,
            slidesPerView: 16,
          },
          1400: {
            width: 1400,
            slidesPerView: 16,
          },
        }}
      >
        {categories.map((category) => (
          <SwiperSlide key={category.value}>
            <Button
              onClick={() => {
                router.push(`?category=${category.value}#${id}`)
                setActiveCat(category.value)
              }}
              variant={activeCat === category.value ? "secondary" : "ghost"}
              className={`w-full text-base ${
                activeCat === category.value ? "border" : ""
              }`}
              size="sm"
            >
              {category.name}
            </Button>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

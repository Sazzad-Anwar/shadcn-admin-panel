"use client"

import React from "react"
import Image from "next/image"
import { useKeenSlider } from "keen-slider/react"
import {
  A11y,
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper/modules"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

import "keen-slider/keen-slider.min.css"
import { cn } from "@/lib/utils"

import { BlogAssets } from "../assets"

const HeroCarousel = () => {
  let blogs = [
    {
      id: "blog-1",
      banner: BlogAssets.heroImage1,
      category: "Adventure",
      title: "Richird Norton photorealistic rendering as real photos",
      time: "08.08.2022",
      details: `Progressively incentivize cooperative systems through
                  technically sound functionalities. The credibly productivate
                  seamless data.`,
    },
    {
      id: "blog-2",
      banner: BlogAssets.heroImage2,
      category: "Adventure",
      title: "Richird Norton photorealistic rendering as real photos",
      time: "08.08.2022",
      details: `Progressively incentivize cooperative systems through
                  technically sound functionalities. The credibly productivate
                  seamless data.`,
    },
    {
      id: "blog-3",
      banner: BlogAssets.heroImage3,
      category: "Adventure",
      title: "Richird Norton photorealistic rendering as real photos",
      time: "08.08.2022",
      details: `Progressively incentivize cooperative systems through
                  technically sound functionalities. The credibly productivate
                  seamless data.`,
    },
  ]

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    slides: {
      perView: 1,
      spacing: 15,
    },
    loop: true,
    mode: "free-snap",
    defaultAnimation: {
      duration: 2000,
    },
  })

  return (
    <Swiper
      modules={[EffectFade, Navigation, Pagination, A11y, Autoplay]}
      spaceBetween={0}
      slidesPerView={1}
      autoplay={{
        delay: 4000,
      }}
      loop={true}
      effect="fade"
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      className="-mt-20 h-96 w-full overflow-x-hidden md:h-[600px]"
    >
      {blogs.map((blog) => (
        <SwiperSlide key={blog.id}>
          {({ isActive }) => (
            <>
              <Image
                src={blog.banner}
                height={600}
                width={1440}
                className="h-full w-full object-cover md:h-[600px]"
                alt={blog.title}
                priority
                quality={30}
              />
              <div
                className={cn(
                  "absolute top-2/4 block w-full px-4 md:left-16 md:top-1/2 md:w-[500px] md:-translate-y-1/2 md:px-0",
                  isActive && "animate__animated animate__fadeInUp"
                )}
              >
                <span className="rounded-[8px] bg-black/30 px-3 py-1.5 text-xs font-bold uppercase text-white backdrop-blur-3xl">
                  {blog.category}
                </span>
                <h1 className="my-4 block text-lg text-white md:text-4xl">
                  {blog.title}
                </h1>
                <div className="flex items-start">
                  <span className="text-xs font-normal text-white">
                    {blog.time}
                  </span>
                  <div className="mx-3 mt-1 h-px w-10 bg-white" />
                  <p className="text-xs font-normal text-white">
                    {blog.details}
                  </p>
                </div>
              </div>
            </>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  )
}

export default HeroCarousel

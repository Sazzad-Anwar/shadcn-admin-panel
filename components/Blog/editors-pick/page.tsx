"use client"

import React from "react"
import { A11y, Autoplay, EffectCards } from "swiper/modules"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

import { BlogAssets } from "../assets"
import EditorsPickCard from "./editors-pick-card/page"

export default function EditorsPick() {
  let editorsPicks = [
    {
      id: "editors-1",
      banner: BlogAssets.editorsPick1,
      tags: ["Adventure", "Fashion"],
      date: "08.08.2021",
      title: "Richird Norton photorealistic rendering as real photos",
      details:
        "Progressively incentivize cooperative systems through technically sound functionalities. The credibly productivate seamless data.",
    },
    {
      id: "editors-2",
      banner: BlogAssets.editorsPick2,
      tags: ["Adventure", "Fashion"],
      date: "08.08.2021",
      title: "Richird Norton photorealistic rendering as real photos",
      details:
        "Progressively incentivize cooperative systems through technically sound functionalities. The credibly productivate seamless data.",
    },
    {
      id: "editors-3",
      banner: BlogAssets.editorsPick1,
      tags: ["Adventure", "Fashion"],
      date: "08.08.2021",
      title: "Richird Norton photorealistic rendering as real photos",
      details:
        "Progressively incentivize cooperative systems through technically sound functionalities. The credibly productivate seamless data.",
    },
    {
      id: "editors-4",
      banner: BlogAssets.editorsPick2,
      tags: ["Adventure", "Fashion"],
      date: "08.08.2021",
      title: "Richird Norton photorealistic rendering as real photos",
      details:
        "Progressively incentivize cooperative systems through technically sound functionalities. The credibly productivate seamless data.",
    },
  ]

  return (
    <section className="mb-16 px-7 md:mb-36 md:px-[70px]">
      <h1 data-aos="fade-up" className="mb-16 text-4xl text-[#495057]">
        Editor’s Pick
      </h1>
      <Swiper
        modules={[A11y, Autoplay, EffectCards]}
        spaceBetween={30}
        autoplay={{
          delay: 2000,
        }}
        loop={true}
        effect="card"
        breakpoints={{
          300: {
            width: 300,
            slidesPerView: 1,
            spaceBetween: 15,
          },
          920: {
            width: 920,
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1200: {
            width: 1200,
            slidesPerView: 2,
          },
          1400: {
            width: 1400,
            slidesPerView: 2,
          },
        }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
        className="h-[350px] w-full"
      >
        {editorsPicks.map((post) => (
          <SwiperSlide key={post.id}>
            {({ isActive }) => (
              <EditorsPickCard post={post} isActive={isActive} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}

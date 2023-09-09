"use client"

import React, { useEffect } from "react"
import Image from "next/image"

import { fontLora } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

import { BlogAssets } from "../assets"
import "aos/dist/aos.css"

export default function Testimonial() {
  return (
    <section
      className={cn(
        "relative my-14 overflow-hidden md:my-36 md:h-[600px]",
        fontLora.className
      )}
    >
      <figure>
        <Image
          src={BlogAssets.testimonialImage}
          height={600}
          width={1440}
          className="w-full object-cover"
          alt="testimonial-img"
        />
      </figure>
      <div className="z-10 flex flex-col items-center justify-center px-7 md:absolute md:inset-0 md:px-0">
        <Badge
          data-aos="fade-up"
          className="mt-3 bg-black/20 backdrop-blur-3xl md:mt-0"
        >
          Fashion
        </Badge>
        <h1
          data-aos-delay="100"
          data-aos="fade-up"
          className="my-6 text-lg font-bold md:w-[530px] md:text-center md:text-4xl md:text-white"
        >
          Richird Norton photorealistic rendering as real photos
        </h1>
        <p
          data-aos="fade-up"
          data-aos-delay="200"
          className="mt-3 text-sm font-normal md:w-[530px] md:text-center md:text-[#E5E5E5]"
        >
          Progressively incentivize cooperative systems through technically
          sound functionalities. The credibly productivate seamless data.
        </p>
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="my-5 h-px w-7 md:bg-white"
        />
        <p
          data-aos="fade-up"
          data-aos-delay="400"
          className="text-sm md:text-[#E5E5E5]"
        >
          08.08.2023
        </p>
      </div>
    </section>
  )
}

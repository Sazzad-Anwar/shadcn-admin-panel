import React from "react"
import Image from "next/image"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

import { BlogAssets } from "../../assets"

interface BlogPosts {
  posts?: string
  index: number
}
export default function BlogCard({ posts, index }: BlogPosts) {
  return (
    <article
      data-aos="fade-up"
      data-aos-delay={`${100 * index}`}
      className="w-full rounded-t-sm shadow-lg"
    >
      <figure className="relative">
        <Image
          src={BlogAssets.blogImage1}
          height={280}
          width={310}
          className="w-full"
          alt="blog-image"
        />
        <Badge className="absolute right-5 top-5 bg-black/20 backdrop-blur-2xl">
          Adventure
        </Badge>
      </figure>
      <div className="p-5">
        <span className="mb-4 text-xs text-[#6C757D]">08.08.2023</span>
        <h1 className="mb-4 text-lg font-bold text-[#495057]">
          Dream destinations to visit this year in Paris
        </h1>
        <p className="mb-4 text-xs font-normal text-[#6C757D]">
          Progressively incentivize cooperative systems through technically
          sound functionalities. The credibly productive seamless data.
        </p>
        <hr className="bg-[#E5E5E5]" />
        <div className="mt-5 flex items-center">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="ml-4">
            <h2 className="text-xs font-bold text-[#343A40]">
              By Jennifer Lawrence
            </h2>
            <p className="text-xs font-normal text-[#6C757D]">
              Thinker & designer
            </p>
          </div>
        </div>
      </div>
    </article>
  )
}

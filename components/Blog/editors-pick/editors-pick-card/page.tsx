import React from "react"
import Image from "next/image"

import { fontLora } from "@/lib/fonts"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface EditorsPickCardProps {
  post: {
    id: string
    banner: string
    tags: string[]
    date: string
    title: string
    details: string
  }
  className?: string
  isActive?: boolean
}
export default function EditorsPickCard({
  post,
  className,
  isActive,
}: EditorsPickCardProps) {
  return (
    <article
      className={cn(
        "relative h-[350px] w-full overflow-hidden rounded-xl",
        fontLora.className,
        className
      )}
    >
      <Image
        className="absolute inset-0 h-full w-full object-cover"
        src={post.banner}
        height={350}
        width={640}
        alt={post.title}
      />
      <div className="absolute inset-0 opacity-40 backdrop-blur-md" />
      <div className="absolute right-5 top-5 z-10 flex items-center gap-2">
        {post.tags.map((tag) => (
          <Badge
            key={tag}
            className={cn(
              "bg-black/20 text-sm backdrop-blur-2xl",
              isActive && "animate__animated animate__fadeInRight"
            )}
          >
            {tag}
          </Badge>
        ))}
      </div>
      <div className="absolute top-20 z-20 px-5 md:bottom-10 md:top-36 md:px-10">
        <p
          className={cn(
            "font-sm mb-3 font-normal text-[#E5E5E5]",
            isActive && "animate__animated animate__fadeInUp"
          )}
        >
          {post.date}
        </p>
        <h1
          className={cn(
            "mb-3 text-lg font-bold text-white md:w-2/4",
            isActive && "animate__animated animate__fadeInUp"
          )}
        >
          {post.title}
        </h1>
        <p
          className={cn(
            "text-sm font-normal text-[#E5E5E5] md:w-3/4",
            isActive && "animate__animated animate__fadeInUp"
          )}
        >
          {post.details}
        </p>
      </div>
    </article>
  )
}

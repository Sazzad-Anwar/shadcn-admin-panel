import React from "react"

import BlogCard from "./blog-card/page"

interface BlogPosts {
  posts?: string
}
export default function BlogPage({ posts }: BlogPosts) {
  return (
    <section className="mt-4 grid grid-cols-1 gap-5 px-4 sm:grid-cols-2 md:mt-7 md:grid-cols-3 md:px-[70px] lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((_, index) => (
        <BlogCard key={index} index={index} />
      ))}
    </section>
  )
}

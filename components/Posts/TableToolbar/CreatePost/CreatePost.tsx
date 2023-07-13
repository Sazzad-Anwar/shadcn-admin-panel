import React, { useState } from "react"

import { UserType } from "@/types/app"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

import PostForm from "../../PostForm"

interface CreatePostProp {
  users: UserType[]
}

export default function CreatePost({ users }: CreatePostProp) {
  let [open, setOpen] = useState<boolean>(false)
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="ml-2">
          Create Post
        </Button>
      </SheetTrigger>
      <SheetContent className="w-96">
        <SheetHeader>
          <SheetTitle>Create Post</SheetTitle>
        </SheetHeader>
        <PostForm users={users} setOpen={setOpen} />
      </SheetContent>
    </Sheet>
  )
}

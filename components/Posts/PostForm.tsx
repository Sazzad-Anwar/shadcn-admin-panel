import React, { Dispatch, SetStateAction } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { X } from "lucide-react"
import { useSession } from "next-auth/react"
import { useForm } from "react-hook-form"

import { CreatePostType, UserType } from "@/types/app"
import { CreatePostSchema } from "@/types/zod.type"
import { APIRoutes } from "@/config/routes"
import { cn } from "@/lib/utils"

import { Button } from "../ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Textarea } from "../ui/textarea"
import { useToast } from "../ui/use-toast"

interface PostFormProp {
  users: UserType[]
  setOpen: Dispatch<SetStateAction<boolean>>
}
export default function PostForm({ users, setOpen }: PostFormProp) {
  const form = useForm<CreatePostType>({
    resolver: zodResolver(CreatePostSchema),
  })
  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = form

  const { toast } = useToast()
  const router = useRouter()

  const onSubmit = handleSubmit(async (data) => {
    let token =
      typeof window !== "undefined" ? window.localStorage.getItem("token") : ""
    try {
      let res = await fetch(
        process.env.NEXT_PUBLIC_BASE_API_URL + APIRoutes.POST,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      )
      let resData = await res.json()

      if (resData?.error?.status) {
        toast({
          variant: "destructive",
          title: resData?.error?.message,
        })
      } else {
        toast({
          variant: "success",
          title: "Post is created successfully!",
        })
        router.refresh()
        setOpen(false)
      }
    } catch (error: any) {
      console.log(error)
      toast({
        variant: "destructive",
        title: error?.response?.error?.status
          ? error?.response?.error?.message
          : error?.message,
      })
    }
  })

  return (
    <Form {...form}>
      <form onSubmit={onSubmit} noValidate>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="my-3">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Input title"
                    className={errors.title && "border-destructive"}
                    value={field.value ?? ""}
                    onChange={field.onChange}
                  />
                  {watch("title") && (
                    <Button
                      className="absolute right-0 top-[2px] z-10"
                      onClick={() =>
                        setValue("title", "", { shouldValidate: true })
                      }
                      variant="link"
                      size="sm"
                    >
                      <X size={20} />
                    </Button>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="body"
          render={({ field }) => (
            <FormItem className="my-3">
              <FormLabel>Body</FormLabel>
              <FormControl>
                <div className="relative">
                  <Textarea
                    rows={10}
                    placeholder="Input body"
                    className={errors.body && "border-destructive"}
                    {...field}
                  />
                  {watch("body") && (
                    <Button
                      className="absolute right-0 top-[2px] z-10"
                      onClick={() =>
                        setValue("body", "", { shouldValidate: true })
                      }
                      variant="link"
                      size="sm"
                    >
                      <X size={20} />
                    </Button>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="user"
          render={({ field }) => (
            <FormItem className="my-3">
              <FormLabel>Email</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger
                    className={cn(
                      "h-10",
                      errors?.user ? "border-destructive" : ""
                    )}
                  >
                    <SelectValue placeholder="Select a user" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {users &&
                    users?.map((userList) => (
                      <SelectItem
                        key={userList?.email}
                        value={userList?.id!.toString()}
                      >
                        {userList?.username}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant="secondary">Create</Button>
      </form>
    </Form>
  )
}

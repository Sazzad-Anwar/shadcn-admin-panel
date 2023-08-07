"use client"

import React, { useEffect, useState } from "react"
import Image, { StaticImageData } from "next/image"
import { redirect, useRouter, useSearchParams } from "next/navigation"
import { loginImages } from "@/assets/images/image"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { signIn, useSession } from "next-auth/react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/icons"
import Loading from "@/app/loading"

const FormSchema = z.object({
  identifier: z
    .string()
    .email({
      message: "Email is not valid",
    })
    .nonempty({
      message: "Email cannot be empty",
    }),
  password: z
    .string()
    .min(6, { message: "Must be 6 characters long" })
    .nonempty({
      message: "Password cannot be empty",
    }),
})

type FormInput = z.infer<typeof FormSchema>

export default function Login() {
  const form = useForm<FormInput>({
    resolver: zodResolver(FormSchema),
  })
  const {
    handleSubmit,
    formState: { errors },
  } = form
  const session = useSession()
  const searchParams = useSearchParams()
  const [isShowingPassword, setIsShowingPassword] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  let error = searchParams.get("error")

  uesEffect(() => {}, [session, router])

  const onSubmit = (data: FormInput) => {
    setIsLoading(true)
    signIn("credentials", { ...data, callbackUrl: "/" })
  }

  if (session.status === "authenticated") {
    redirect("/")
  }

  if (session.status === "loading") {
    return <Loading />
  }

  const ImageRender = () => {
    return (
      <div className="animate__animated animate__fadeIn animate__slower absolute inset-0 z-0 h-full w-full">
        <Image
          src={loginImages[3]}
          fill
          className="object-fill md:object-cover"
          alt="login-image"
        />
      </div>
    )
  }

  return (
    <div className="relative h-screen w-screen">
      <ImageRender />
      <div className="absolute inset-0 z-10 mr-auto hidden h-screen items-center justify-center rounded-none backdrop-blur-sm backdrop-brightness-50 md:flex lg:w-2/3 xl:w-3/4 2xl:w-4/5">
        <h1 className="font-mono text-lg font-bold md:text-xl lg:text-5xl">
          Admin Panel
        </h1>
      </div>
      <Card className="absolute inset-0 z-10 ml-auto flex h-screen w-full items-center rounded-none backdrop-brightness-50 lg:w-1/3 xl:w-1/4 2xl:w-1/5">
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="mx-auto">
            <Card className="lg:min-w-96 w-full rounded-none border-0 md:min-w-[350px] xl:min-w-[350px]">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Login Here</CardTitle>
                <CardDescription>
                  Use any of the login methods below
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-6">
                  <Button type="button" variant="outline">
                    <Icons.gitHub className="mr-2 h-4 w-4" />
                    Github
                  </Button>
                  <Button
                    onClick={() => signIn("google")}
                    type="button"
                    variant="outline"
                  >
                    <Icons.google className="mr-2 h-4 w-4" />
                    Google
                  </Button>
                </div>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                <div className="grid gap-1">
                  <FormField
                    control={form.control}
                    name="identifier"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="Input email or username"
                              className={
                                errors.identifier && "border-destructive"
                              }
                              value={field.value ?? ""}
                              onChange={field.onChange}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-1">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={isShowingPassword ? "text" : "password"}
                              placeholder="******"
                              className={
                                errors.password && "border-destructive"
                              }
                              value={field.value ?? ""}
                              onChange={field.onChange}
                            />
                            <Button
                              type="button"
                              className="absolute right-0 top-[2px] z-10"
                              onClick={() =>
                                setIsShowingPassword(!isShowingPassword)
                              }
                              variant="link"
                              size="sm"
                            >
                              {isShowingPassword ? (
                                <EyeOff size={20} />
                              ) : (
                                <Eye size={20} />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {error && (
                    <p className="mt-4 text-center text-sm font-semibold text-red-600">
                      {error}
                    </p>
                  )}
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  disabled={isLoading}
                  type="submit"
                  variant="outline"
                  className="w-full"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin" size={15} />
                  ) : (
                    "Login"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
      </Card>
    </div>
  )
}

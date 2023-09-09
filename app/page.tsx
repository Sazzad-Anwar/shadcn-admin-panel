import Link from "next/link"

import { BlogAppRoutes } from "@/config/routes"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export default function IndexPage(): JSX.Element {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Beautifully designed web apps <br className="hidden sm:inline" />
          built with Radix UI and Tailwind CSS.
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          Developed by{" "}
          <Link href="mailTo:sazzadzihan@gmail.com">
            Mohammad Sazzad Bin Anwar
          </Link>
        </p>
      </div>
    </section>
  )
}

import { Home, LayoutList, Text, Users } from "lucide-react"

import { NavigationType } from "@/types/app"

import { Routes } from "./routes"

export const navigation: NavigationType[] = [
  {
    id: Routes.home.id,
    url: Routes.home.link,
    name: Routes.home.name,
    icon: <Home size={15} />,
    isLink: true,
    navChildren: [],
  },
  {
    id: Routes.post.id,
    url: Routes.post.link,
    name: Routes.post.name,
    icon: <Text size={15} />,
    isLink: true,
    navChildren: [],
  },
  // {
  //   id: "tasks",
  //   url: "/tasks",
  //   name: "Tasks",
  //   icon: <LayoutList size={15} />,
  //   isLink: true,
  //   navChildren: [],
  // },
  {
    id: "user-accordion",
    url: "/users",
    name: "Users",
    icon: <Users size={15} />,
    isLink: true,
    navChildren: [],
  },
]

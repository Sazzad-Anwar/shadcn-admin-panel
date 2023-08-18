import { KanbanSquare, LayoutDashboard, LucideIcon } from "lucide-react"
import { v4 as uuid } from "uuid"

import { AppRoutes } from "@/config/routes"

export interface SideNav {
  id: string
  routeName: string
  route?: string
  hasChildren: boolean
  icon?: LucideIcon
  children?: SideNav[]
}

export const SideNavigation: SideNav[] = [
  {
    id: uuid(),
    routeName: "Dashboard",
    route: AppRoutes.ADMIN,
    hasChildren: false,
    icon: LayoutDashboard,
  },
  {
    id: uuid(),
    routeName: "Products",
    hasChildren: true,
    icon: KanbanSquare,
    children: [
      {
        id: uuid(),
        routeName: "All Products",
        route: "/admin/all-products",
        hasChildren: false,
      },
      {
        id: uuid(),
        routeName: "New Products",
        route: "/admin/new-products",
        hasChildren: false,
      },
    ],
  },
]

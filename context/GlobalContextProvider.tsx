"use client"

import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react"

import { useLocalStorage } from "../hooks/useLocalStorage"
import AuthReducer, { AuthActionType } from "./reducers/Auth.reducer"
import SideBarToggleReducer, {
  SideBarActionType,
} from "./reducers/SideBare.reducer"
import ThemeReducer, { ThemeActionType } from "./reducers/Theme.reducer"
import {
  AuthUserType,
  InitialSideBarStateType,
  InitialThemeStateType,
  InitialUserStateType,
} from "./types/context.type"

type GlobalContextProviderChildrenType = {
  children: ReactNode
}

type AuthContextPropsTypes = {
  auth: InitialUserStateType
  authDispatch: Dispatch<AuthActionType>
}

type SideBarContextPropsTypes = {
  sideBar: InitialSideBarStateType
  sideBarDispatch: Dispatch<SideBarActionType>
}

type ThemeContextPropsTypes = {
  theme: InitialThemeStateType
  themeDispatch: Dispatch<ThemeActionType>
}

type ContextPropsTypes = AuthContextPropsTypes &
  SideBarContextPropsTypes &
  ThemeContextPropsTypes

const GlobalContext = createContext<ContextPropsTypes>({} as ContextPropsTypes)

export const useGlobalContext = () => useContext(GlobalContext)

const GlobalContextProvider = ({
  children,
}: GlobalContextProviderChildrenType) => {
  const { item: isOpen } = useLocalStorage<boolean>("isSidBarOpen", false)
  const { item: user } = useLocalStorage<AuthUserType>("user", {
    userName: "",
    email: "",
    avatar: "",
    id: "",
  })

  let sideBarInitialState = {
    isOpen:
      typeof window !== "undefined" &&
      window.localStorage.getItem("isSideBarOpen")
        ? JSON.parse(window.localStorage.getItem("isSideBarOpen")!)
        : false,
  }
  let initialUserState = {
    user,
  }
  let initialThemeState =
    typeof window !== "undefined" && window.localStorage.getItem("theme")
      ? window.localStorage.getItem("theme")
      : "light"

  const [auth, authDispatch] = useReducer(AuthReducer, initialUserState)
  const [sideBar, sideBarDispatch] = useReducer(
    SideBarToggleReducer,
    sideBarInitialState
  )
  const [theme, themeDispatch] = useReducer(ThemeReducer, initialThemeState!)

  return (
    <GlobalContext.Provider
      value={{
        auth,
        authDispatch,
        sideBar,
        theme,
        sideBarDispatch,
        themeDispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export default GlobalContextProvider

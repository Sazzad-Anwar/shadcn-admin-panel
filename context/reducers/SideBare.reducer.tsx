import { useLocalStorage } from "../../hooks/useLocalStorage"
import { SIDE_BAR_TOGGLE } from "../constants/SideBar.contatns"
import { InitialSideBarStateType } from "../types/context.type"

export type SideBarActionType = {
  type: "SIDE_BAR_TOGGLE"
  payload: boolean
}

const SideBarToggleReducer = (
  state: InitialSideBarStateType,
  action: SideBarActionType
) => {
  switch (action.type) {
    case SIDE_BAR_TOGGLE:
      typeof window !== "undefined" &&
        window.localStorage.setItem("isSideBarOpen", action.payload.toString())
      return { ...state, isOpen: action.payload }
    default:
      return state
  }
}

export default SideBarToggleReducer

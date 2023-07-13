import axios from "axios"

let URL = process.env.NEXT_PUBLIC_BASE_API_URL
const headers = {
  Authorization: `Bearer ${
    typeof window !== "undefined" && localStorage.getItem("token")
  }`,
}
export const api = {
  URL,
  headers,
}

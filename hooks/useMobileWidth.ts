import React, { useEffect, useState } from "react"

export default function useMobileWidth() {
  const [isMobileWidth, setIsMobileWidth] = useState<boolean>(false)

  useEffect(() => {
    let detectMobileWidth = () => {
      if (typeof window !== "undefined" && window.innerWidth < 768) {
        setIsMobileWidth(true)
      } else {
        setIsMobileWidth(false)
      }
    }

    typeof window !== "undefined" &&
      window.addEventListener("resize", () => {
        detectMobileWidth()
      })

    detectMobileWidth()

    return () => window.removeEventListener("resize", () => {})
  }, [])

  return [isMobileWidth]
}

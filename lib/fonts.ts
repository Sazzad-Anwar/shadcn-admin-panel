import {
  JetBrains_Mono as FontMono,
  Roboto_Condensed as FontSans,
} from "next/font/google"

export const fontSans = FontSans({
  weight: "700",
  style: "normal",
  subsets: ["cyrillic"],
  variable: "--font-sans",
})

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
})

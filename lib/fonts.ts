import {
  JetBrains_Mono as FontMono,
  Roboto_Condensed as FontSans,
  Lora,
  League_Spartan as Spartan,
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

export const fontLora = Lora({
  weight: "500",
  style: "normal",
  subsets: ["cyrillic"],
  variable: "--font-lora",
})

export const fontSpartan = Spartan({
  weight: "500",
  style: "normal",
  subsets: ["latin"],
  variable: "--font-spartan",
})

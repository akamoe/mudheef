import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"

const sans = localFont({
  src: [
    { path: "./fonts/thmanyahsans-Regular.woff2", weight: "400" },
    { path: "./fonts/thmanyahsans-Medium.woff2", weight: "500" },
  ],
  variable: "--font-thmanyah-sans",
  display: "swap",
})
const serif = localFont({
  src: "./fonts/thmanyahserifdisplay-Regular.woff2",
  weight: "400",
  variable: "--font-thmanyah-serif",
  display: "swap",
})
export const metadata: Metadata = {
  title: "Mudheef — A land of stories",
  description:
    "Explore Iraq’s timeless places, living culture, and generous spirit. Discover a different side of Iraq with Mudheef.",
}
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${serif.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  )
}

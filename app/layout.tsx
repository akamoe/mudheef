import type { Metadata } from "next"
import { cookies } from "next/headers"
import localFont from "next/font/local"

import { LanguageProvider } from "@/components/language-provider"
import { ThemeProvider } from "@/components/theme-provider"
import {
  defaultLocale,
  directionFor,
  getDictionary,
  isLocale,
  localeCookieName,
  type Locale,
} from "@/lib/i18n"
import "./globals.css"

const sans = localFont({
  src: [
    { path: "./fonts/thmanyahsans-Light.woff2", weight: "300" },
    { path: "./fonts/thmanyahsans-Regular.woff2", weight: "400" },
    { path: "./fonts/thmanyahsans-Medium.woff2", weight: "500" },
    { path: "./fonts/thmanyahsans-Bold.woff2", weight: "700" },
  ],
  variable: "--font-thmanyah-sans",
  display: "swap",
})

// Headings use Thmanyah Serif Display, the "خط ثمانية للعناوين" cut, at the
// weights the type settings call for (regular + semibold/bold).
const serif = localFont({
  src: [
    { path: "./fonts/thmanyahserifdisplay-Regular.woff2", weight: "400" },
    { path: "./fonts/thmanyahserifdisplay-Bold.woff2", weight: "700" },
  ],
  variable: "--font-thmanyah-serif",
  display: "swap",
})

async function readLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const value = cookieStore.get(localeCookieName)?.value

  return isLocale(value) ? value : defaultLocale
}

export async function generateMetadata(): Promise<Metadata> {
  const { meta } = getDictionary(await readLocale())

  return { title: meta.title, description: meta.description }
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = await readLocale()

  return (
    <html
      lang={locale}
      dir={directionFor(locale)}
      className={`${sans.variable} ${serif.variable} antialiased`}
      // next-themes writes the theme class onto this element before React
      // hydrates, so the server markup is expected to differ here.
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <LanguageProvider initialLocale={locale}>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

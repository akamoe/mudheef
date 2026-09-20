import { cookies } from "next/headers"

import {
  defaultLocale,
  isLocale,
  localeCookieName,
  type Locale,
} from "@/lib/i18n"

/**
 * Reads the locale cookie on the server so the first paint is already in the
 * right language.
 *
 * Server-only, and separate from `lib/i18n.ts` for that reason: `next/headers`
 * cannot be pulled into a module the client components (the language provider,
 * every toggle) also import. Every server layout that renders language-specific
 * metadata reads the locale through here.
 */
export async function readLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  const value = cookieStore.get(localeCookieName)?.value

  return isLocale(value) ? value : defaultLocale
}

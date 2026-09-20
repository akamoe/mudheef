import type { Metadata } from "next"

import { getDictionary } from "@/lib/i18n"
import { readLocale } from "@/lib/server-locale"

/**
 * The Karbala route names itself for the first paint and for crawlers. The page
 * itself is a client component (it reads the dictionary from context), so it
 * cannot export `generateMetadata`; it sets the same title on the client with
 * `<DocumentTitle>` once the visitor switches language.
 */
export async function generateMetadata(): Promise<Metadata> {
  const { karbala } = getDictionary(await readLocale())

  return {
    title: karbala.meta.title,
    description: karbala.meta.description,
  }
}

export default function KarbalaLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children
}

"use client"

import { useEffect } from "react"

/**
 * Names the open tab, in the current language.
 *
 * The language provider cannot do this: it is rendered by the root layout and
 * has no idea which route is on screen, and a page cannot export
 * `generateMetadata` because these pages are client components. So each page
 * declares its own title here, and `app/<route>/layout.tsx` declares the same
 * string server-side for the first paint and for crawlers.
 */
function DocumentTitle({ title }: { title: string }) {
  useEffect(() => {
    document.title = title
  }, [title])

  return null
}

export { DocumentTitle }

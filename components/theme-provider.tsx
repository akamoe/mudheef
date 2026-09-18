"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"

function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  /**
   * next-themes renders its no-flash script *inside* the provider, so React sees
   * a `<script>` created during a client render and errors: "Encountered a
   * script tag while rendering React component". Upstream has no opt-out and the
   * issue is still open (pacocoursey/next-themes#387).
   *
   * Typing the client copy as JSON makes React treat it as data instead of a
   * script, and it stops complaining. That costs nothing, because the script only
   * has a job on the server pass: that copy goes into the HTML verbatim and
   * applies the theme before first paint. The client has no reason to run it
   * again.
   *
   * The `typeof window` test is the whole point. Pass this unconditionally and
   * the *server* copy is neutered too, so the theme is only applied after
   * hydration — a flash of the wrong theme, which is the exact thing the script
   * exists to prevent. That variant does the rounds in the issue thread; it is
   * wrong.
   */
  const scriptProps =
    typeof window === "undefined"
      ? undefined
      : ({ type: "application/json" } as const)

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      scriptProps={scriptProps}
      {...props}
    >
      <ThemeHotkey />
      {children}
    </NextThemesProvider>
  )
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  )
}

function ThemeHotkey() {
  const { resolvedTheme, setTheme } = useTheme()

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.repeat) {
        return
      }

      if (event.metaKey || event.ctrlKey || event.altKey) {
        return
      }

      if (event.key.toLowerCase() !== "d") {
        return
      }

      if (isTypingTarget(event.target)) {
        return
      }

      setTheme(resolvedTheme === "dark" ? "light" : "dark")
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [resolvedTheme, setTheme])

  return null
}

export { ThemeProvider }

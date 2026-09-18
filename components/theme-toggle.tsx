"use client"

import { MoonStar, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { useLanguage } from "@/components/language-provider"

function ThemeToggle() {
  const { messages } = useLanguage()
  const { resolvedTheme, setTheme } = useTheme()

  // `resolvedTheme` is only read here, never rendered: next-themes resolves it
  // during the first client render while the server render has no theme yet, so
  // drawing it would tear the markup. Which icon shows is decided by the `dark`
  // class in CSS instead.
  const toggle = () => setTheme(resolvedTheme === "dark" ? "light" : "dark")

  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={messages.theme.label}
      title={messages.theme.label}
      onClick={toggle}
    >
      <Sun className="theme-icon-light" aria-hidden="true" />
      <MoonStar className="theme-icon-dark" aria-hidden="true" />
    </button>
  )
}

export { ThemeToggle }

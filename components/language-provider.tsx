"use client"

import * as React from "react"

import { DirectionProvider } from "@/components/ui/direction"
import {
  directionFor,
  getDictionary,
  localeCookieName,
  type Dictionary,
  type Locale,
} from "@/lib/i18n"

type LanguageContextValue = {
  locale: Locale
  dir: "ltr" | "rtl"
  messages: Dictionary
  setLocale: (locale: Locale) => void
}

const LanguageContext = React.createContext<LanguageContextValue | null>(null)

const ONE_YEAR = 60 * 60 * 24 * 365

function LanguageProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale
  children: React.ReactNode
}) {
  const [locale, setLocaleState] = React.useState<Locale>(initialLocale)
  const dir = directionFor(locale)
  const messages = getDictionary(locale)

  const setLocale = React.useCallback((next: Locale) => {
    // The cookie is what makes the *next* request render in this language on
    // the server, so the switch survives reloads without a client-side flash.
    document.cookie = `${localeCookieName}=${next};path=/;max-age=${ONE_YEAR};samesite=lax`
    setLocaleState(next)
  }, [])

  React.useEffect(() => {
    const root = document.documentElement
    root.lang = locale
    root.dir = dir
    // The tab title is not set here: the provider does not know which page it
    // is rendering. Each page names itself with `<DocumentTitle>`.
  }, [locale, dir])

  const value = React.useMemo(
    () => ({ locale, dir, messages, setLocale }),
    [locale, dir, messages, setLocale]
  )

  return (
    <LanguageContext.Provider value={value}>
      <DirectionProvider direction={dir}>{children}</DirectionProvider>
    </LanguageContext.Provider>
  )
}

function useLanguage() {
  const context = React.useContext(LanguageContext)

  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }

  return context
}

export { LanguageProvider, useLanguage }

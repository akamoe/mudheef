"use client"

import * as React from "react"

import { useLanguage } from "@/components/language-provider"
import { locales, type Locale } from "@/lib/i18n"

function LanguageToggle() {
  const { locale, messages, setLocale } = useLanguage()

  const labels: Record<Locale, string> = {
    en: "EN",
    ar: "ع",
  }
  const titles: Record<Locale, string> = {
    en: messages.language.english,
    ar: messages.language.arabic,
  }

  return (
    <div
      className="lang-toggle"
      role="group"
      aria-label={messages.language.label}
    >
      {locales.map((option) => (
        <button
          key={option}
          type="button"
          className="lang-option"
          lang={option}
          aria-pressed={locale === option}
          title={titles[option]}
          onClick={() => setLocale(option)}
        >
          {labels[option]}
        </button>
      ))}
    </div>
  )
}

export { LanguageToggle }

"use client"

import Link from "next/link"
import { Fragment } from "react"
import { ArrowUpRight } from "lucide-react"

import { LanguageToggle } from "@/components/language-toggle"
import { useLanguage } from "@/components/language-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"

/**
 * The header and footer every page wears, plus the two pieces of type they
 * share. Extracted from `app/page.tsx` once a second page needed them: the
 * markup is identical apart from which links a page owns, so a page passes its
 * own `links` and `cta` and gets the same chrome the landing page has.
 */

export type NavLink = { label: string; href: string; className?: string }

/**
 * In-page anchors stay plain `<a>` so the stylesheet's smooth scroll — and the
 * browser's own back/forward through hashes — keep working. A route change
 * wants `<Link>`, for the prefetch and the client-side transition. `render`
 * clones whatever element it is handed, which is why this returns one and not
 * a component wrapping one.
 */
function navRender(href: string) {
  return href.startsWith("/") ? <Link href={href} /> : <a href={href} />
}

/** The header mark is the Arabic wordmark on its own — the English lockup is
 *  only used in the footer. */
function Brand({ mark = false }: { mark?: boolean }) {
  const { messages } = useLanguage()

  return (
    <span className="brand">
      <span className="brand-name" lang={mark ? "ar" : undefined}>
        {mark ? messages.brand.logo : messages.brand.name}
      </span>
      {mark ? null : (
        <span className="brand-alt" lang={messages.brand.altLang}>
          {messages.brand.alt}
        </span>
      )}
    </span>
  )
}

function MarginNote({ lines }: { lines: string[] }) {
  return (
    <>
      {lines.map((line, index) => (
        <Fragment key={line}>
          {index > 0 ? <br /> : null}
          {line}
        </Fragment>
      ))}
      <span />
    </>
  )
}

function SiteHeader({ links, cta }: { links: NavLink[]; cta: NavLink }) {
  const { messages } = useLanguage()

  return (
    <header className="site-header">
      <nav className="header-nav" aria-label={messages.a11y.primaryNav}>
        {links.map((link) => (
          <Button
            key={link.href}
            variant="ghost"
            className={link.className}
            render={navRender(link.href)}
            nativeButton={false}
          >
            {link.label}
          </Button>
        ))}
      </nav>
      <Link href="/" className="brand-link" aria-label={messages.a11y.home}>
        <Brand mark />
      </Link>
      <div className="header-actions">
        <LanguageToggle />
        <ThemeToggle />
        <Button
          className="header-cta"
          variant="ghost"
          render={navRender(cta.href)}
          nativeButton={false}
        >
          {cta.label} <ArrowUpRight data-icon="inline-end" />
        </Button>
      </div>
    </header>
  )
}

function SiteFooter({ links = [] }: { links?: NavLink[] }) {
  const { messages } = useLanguage()

  return (
    <footer className="site-footer">
      <Link href="/" aria-label={messages.a11y.home}>
        <Brand />
      </Link>
      <p>{messages.footer.tagline}</p>
      {/* The footer carries whatever the header had to drop to stay on one
          row. See the mobile rule for `.nav-wide` in `globals.css`. */}
      {links.length > 0 ? (
        <nav className="footer-nav" aria-label={messages.a11y.footerNav}>
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      ) : null}
      <span>
        © {new Date().getFullYear()} {messages.footer.name}
      </span>
    </footer>
  )
}

export { Brand, MarginNote, SiteFooter, SiteHeader }

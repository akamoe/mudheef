import { type ComponentPropsWithoutRef, type ReactNode } from "react"
import { ArrowRightIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode
  className?: string
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string
  className: string
  background: ReactNode
  Icon: React.ElementType
  description: string
  href: string
  cta: string
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  ...props
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card p-6",
      // light styles
      "[box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.04),0_12px_24px_rgba(0,0,0,.04)]",
      // dark styles
      "dark:border-border/80 dark:bg-card transform-gpu dark:[box-shadow:0_-20px_80px_-20px_#ffffff0d_inset]",
      className
    )}
    {...props}
  >
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">{background}</div>
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1.5 transition-all duration-300 lg:group-hover:-translate-y-10 lg:group-focus-within:-translate-y-10">
      <Icon className="h-10 w-10 origin-start transform-gpu text-foreground/80 transition-all duration-300 ease-in-out group-hover:scale-90 group-hover:text-foreground" />
      <h3 className="font-heading text-xl font-semibold text-foreground">
        {name}
      </h3>
      <p className="max-w-lg text-sm leading-relaxed text-muted-foreground">{description}</p>
    </div>

    <div
      className={cn(
        "pointer-events-none z-10 flex w-full translate-y-0 transform-gpu flex-row items-center transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:hidden"
      )}
    >
      <Button
        variant="link"
        size="sm"
        className="pointer-events-auto p-0 font-medium text-foreground hover:text-orange dark:text-foreground dark:hover:text-orange"
        render={<a href={href} />}
        nativeButton={false}
      >
        {cta}
        <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" />
      </Button>
    </div>

    <div
      className={cn(
        "pointer-events-none z-10 absolute bottom-0 hidden w-full translate-y-10 transform-gpu flex-row items-center p-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 lg:flex"
      )}
    >
      <Button
        variant="link"
        size="sm"
        className="pointer-events-auto p-0 font-medium text-foreground hover:text-orange dark:text-foreground dark:hover:text-orange"
        render={<a href={href} />}
        nativeButton={false}
      >
        {cta}
        <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" />
      </Button>
    </div>

    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-foreground/[0.02] dark:group-hover:bg-white/[0.04]" />
  </div>
)

export { BentoCard, BentoGrid }

import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export interface Destination {
  era: string
  title: string
  description: string
  gradient: string
  tags: string[]
  Icon: LucideIcon
}

export function DestinationCard({ destination }: { destination: Destination }) {
  const { Icon } = destination

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
      <div
        className="relative flex h-48 w-full items-center justify-center"
        style={{ background: destination.gradient }}
      >
        <Icon size={52} className="text-white/20" strokeWidth={1} />
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
        <span className="absolute right-4 top-4 rounded-full border border-primary/30 bg-background/60 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm">
          {destination.era}
        </span>
      </div>

      <div className="p-6">
        <h3 className="mb-2 font-display text-2xl font-light text-foreground">
          {destination.title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          {destination.description}
        </p>
        <div className="mb-5 flex flex-wrap gap-2">
          {destination.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-primary/15 bg-primary/8 px-2.5 py-0.5 text-xs text-primary/80"
            >
              {tag}
            </span>
          ))}
        </div>
        <a
          href="#chatbot"
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'w-full transition-colors group-hover:border-primary group-hover:text-primary',
          )}
        >
          Explorer
        </a>
      </div>
    </div>
  )
}

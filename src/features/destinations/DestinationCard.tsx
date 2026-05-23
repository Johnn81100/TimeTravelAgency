import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import type { DestinationData } from './destinationsData'

export function DestinationCard({ destination }: { destination: DestinationData }) {
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
      <div className="relative h-48 w-full overflow-hidden">
        <img
          src={destination.image}
          alt={destination.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
        <span className="absolute right-4 top-4 rounded-full border border-primary/30 bg-background/60 px-3 py-1 text-xs font-medium text-primary backdrop-blur-sm">
          {destination.era}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 font-display text-2xl font-light text-foreground">
          {destination.title}
        </h3>
        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
          {destination.shortDescription}
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
        <Link
          to={`/destination/${destination.id}`}
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'mt-auto w-full transition-colors group-hover:border-primary group-hover:text-primary',
          )}
        >
          Explorer
        </Link>
      </div>
    </div>
  )
}

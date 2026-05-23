import { cn } from '@/lib/utils'
import { useInView } from '@/hooks/useInView'
import { DestinationCard } from './DestinationCard'
import { DESTINATIONS } from './destinationsData'

export function DestinationsSection() {
  const { ref: titleRef, inView: titleInView } = useInView()
  const { ref: gridRef, inView: gridInView } = useInView()

  return (
    <section id="destinations" className="px-6 py-24 [scroll-margin-top:80px]">
      <div className="mx-auto max-w-6xl">
        <div
          ref={titleRef}
          className={cn(
            'mb-12 text-center',
            titleInView && 'animate-in fade-in slide-in-from-bottom-4 duration-700',
          )}
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
            Nos Destinations
          </p>
          <h2 className="font-display text-4xl font-light text-foreground md:text-5xl">
            Choisissez votre époque
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Trois voyages extraordinaires sélectionnés par nos experts en temporalité.
          </p>
        </div>

        <div id="destination-cards" ref={gridRef} className="grid gap-6 md:grid-cols-3 [scroll-margin-top:80px]">
          {DESTINATIONS.map((d, i) => (
            <div
              key={d.id}
              className={cn(
                'h-full',
                !gridInView && 'opacity-0',
                gridInView && 'animate-in fade-in slide-in-from-bottom-6 duration-700 [animation-fill-mode:both]',
              )}
              style={{ animationDelay: gridInView ? `${i * 120}ms` : '0ms' }}
            >
              <DestinationCard destination={d} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

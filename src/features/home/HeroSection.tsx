import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center px-6 text-center">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[600px] w-[600px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-3xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
          Agence de Voyages Temporels
        </p>
        <h1 className="mb-6 text-5xl font-bold tracking-tight text-foreground md:text-7xl">
          Voyagez à travers{' '}
          <span className="text-primary">les époques</span>
        </h1>
        <p className="mb-10 text-lg text-muted-foreground md:text-xl">
          Découvrez des destinations uniques, inédites, impossibles.
          De la Belle Époque au Crétacé, chaque voyage est une expérience hors du temps.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="#destinations"
            className={cn(buttonVariants({ size: 'lg' }), 'px-8')}
          >
            Découvrir les destinations
          </a>
          <a
            href="#chatbot"
            className={cn(buttonVariants({ variant: 'outline', size: 'lg' }), 'px-8')}
          >
            Parler à notre assistant
          </a>
        </div>
      </div>
    </section>
  )
}

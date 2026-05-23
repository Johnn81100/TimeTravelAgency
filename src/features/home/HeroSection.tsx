import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-6 text-center">
      {/* Glow 3 couches */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="absolute h-[700px] w-[700px] rounded-full blur-[120px]"
          style={{ background: 'oklch(0.75 0.15 75 / 0.06)' }}
        />
        <div
          className="absolute h-[400px] w-[400px] rounded-full blur-[80px]"
          style={{ background: 'oklch(0.75 0.15 75 / 0.10)' }}
        />
        <div
          className="absolute h-[200px] w-[200px] rounded-full blur-[60px]"
          style={{ background: 'oklch(0.75 0.15 75 / 0.08)' }}
        />
      </div>

      <div className="relative z-10 max-w-3xl">
        <p className="animate-in fade-in slide-in-from-bottom-4 mb-4 text-sm font-medium uppercase tracking-widest text-primary duration-500 [animation-delay:0ms] [animation-fill-mode:both]">
          Agence de Voyages Temporels
        </p>
        <h1 className="animate-in fade-in slide-in-from-bottom-4 mb-6 font-display text-5xl font-light tracking-tight text-foreground duration-700 md:text-7xl [animation-delay:120ms] [animation-fill-mode:both]">
          Voyagez à travers{' '}
          <span className="italic text-primary">les époques</span>
        </h1>
        <p className="animate-in fade-in slide-in-from-bottom-4 mb-10 text-lg text-muted-foreground duration-700 md:text-xl [animation-delay:240ms] [animation-fill-mode:both]">
          Découvrez des destinations uniques, inédites, impossibles.
          De la Belle Époque au Crétacé, chaque voyage est une expérience hors du temps.
        </p>
        <div className="animate-in fade-in slide-in-from-bottom-4 flex flex-col items-center justify-center gap-4 duration-700 sm:flex-row [animation-delay:360ms] [animation-fill-mode:both]">
          <a
            href="#destinations"
            className={cn(buttonVariants({ size: 'lg' }), 'px-8')}
          >
            Découvrir les destinations
          </a>
          <a
            href="#chatbot"
            className="inline-flex h-9 items-center justify-center rounded-lg border border-white/20 bg-white/5 px-8 text-sm font-medium text-foreground backdrop-blur-sm transition-all hover:border-primary/40 hover:text-primary"
          >
            Parler à notre assistant
          </a>
        </div>
      </div>
    </section>
  )
}

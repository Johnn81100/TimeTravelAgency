import { useParams, Link, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { ArrowLeft, Clock, Sun, Shield, Coins } from 'lucide-react'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { getDestinationById } from './destinationsData'

export function DestinationPage() {
  const { id } = useParams<{ id: string }>()
  const destination = getDestinationById(id ?? '')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!destination) return <Navigate to="/" replace />

  const { Icon } = destination

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative flex min-h-[50vh] flex-col items-center justify-center px-6 text-center">
        <img
          src={destination.image}
          alt={destination.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background" />

        <div className="relative z-10 max-w-3xl">
          <Icon size={64} className="mx-auto mb-6 text-white/30" strokeWidth={1} />
          <span className="mb-4 inline-block rounded-full border border-primary/30 bg-background/60 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
            {destination.era}
          </span>
          <h1 className="mt-4 font-display text-5xl font-light text-foreground md:text-6xl">
            {destination.title}
          </h1>
        </div>
      </div>

      {/* Contenu */}
      <div className="mx-auto max-w-4xl px-6 py-16">
        {/* Retour */}
        <Link
          to="/"
          className={cn(buttonVariants({ variant: 'ghost', size: 'sm' }), 'mb-10 -ml-2 gap-2')}
        >
          <ArrowLeft size={16} />
          Retour aux destinations
        </Link>

        {/* Tags */}
        <div className="mb-8 flex flex-wrap gap-2">
          {destination.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-primary/15 bg-primary/8 px-3 py-1 text-sm text-primary/80"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="mb-16 text-lg leading-relaxed text-muted-foreground">
          {destination.longDescription}
        </p>

        {/* Points clés */}
        <div className="mb-16">
          <h2 className="mb-8 font-display text-3xl font-light text-foreground">
            Points forts du voyage
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {destination.highlights.map((h, i) => (
              <div key={h.title} className="rounded-xl border border-border bg-card p-6">
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {i + 1}
                </div>
                <h3 className="mb-2 font-medium text-foreground">{h.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{h.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Infos pratiques */}
        <div className="mb-16 rounded-2xl border border-border bg-card p-8">
          <h2 className="mb-6 font-display text-3xl font-light text-foreground">Infos pratiques</h2>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary">
                <Clock size={16} />
                <span className="text-xs font-medium uppercase tracking-wider">Durée</span>
              </div>
              <p className="text-sm text-foreground">{destination.practical.duration}</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary">
                <Sun size={16} />
                <span className="text-xs font-medium uppercase tracking-wider">Saison</span>
              </div>
              <p className="text-sm text-foreground">{destination.practical.season}</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary">
                <Shield size={16} />
                <span className="text-xs font-medium uppercase tracking-wider">Risque</span>
              </div>
              <p className="text-sm text-foreground">{destination.practical.risk}</p>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary">
                <Coins size={16} />
                <span className="text-xs font-medium uppercase tracking-wider">Tarif</span>
              </div>
              <p className="text-sm text-foreground">{destination.practical.price}</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-8 text-center">
          <h3 className="mb-2 font-display text-2xl font-light text-foreground">
            Prêt à voyager dans le temps ?
          </h3>
          <p className="mb-6 text-muted-foreground">
            Notre assistant IA peut répondre à toutes vos questions et vous aider à réserver.
          </p>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))}
            className={cn(buttonVariants({ size: 'lg' }), 'cursor-pointer px-8')}
          >
            Parler à notre assistant
          </button>
        </div>
      </div>
    </div>
  )
}

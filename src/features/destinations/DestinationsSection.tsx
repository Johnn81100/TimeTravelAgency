import { DestinationCard, type Destination } from './DestinationCard'

const DESTINATIONS: Destination[] = [
  {
    era: '1889',
    title: 'Paris — Belle Époque',
    description:
      "Assistez à l'inauguration de la Tour Eiffel, flânez dans les salons de l'Exposition Universelle et découvrez Paris à son apogée artistique.",
    gradient:
      'radial-gradient(ellipse at top, oklch(0.35 0.12 75) 0%, oklch(0.19 0.02 255) 70%)',
    tags: ['Tour Eiffel', 'Art Nouveau', 'Exposition Universelle'],
  },
  {
    era: '-65 000 000',
    title: 'Crétacé — Âge des Dinosaures',
    description:
      'Observez les derniers titanosaures en toute sécurité depuis notre capsule blindée. Un voyage au cœur de la préhistoire pour les plus audacieux.',
    gradient:
      'radial-gradient(ellipse at top, oklch(0.28 0.08 170) 0%, oklch(0.19 0.02 255) 70%)',
    tags: ['Dinosaures', 'Nature préhistorique', 'Aventure'],
  },
  {
    era: '1504',
    title: 'Florence — Renaissance',
    description:
      "Côtoyez Michel-Ange dans son atelier, admirez les fresques en cours d'exécution et vivez l'effervescence de la Renaissance italienne.",
    gradient:
      'radial-gradient(ellipse at top, oklch(0.35 0.1 30) 0%, oklch(0.19 0.02 255) 70%)',
    tags: ['Michel-Ange', 'Art classique', 'Médicis'],
  },
]

export function DestinationsSection() {
  return (
    <section id="destinations" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-widest text-primary">
            Nos Destinations
          </p>
          <h2 className="text-4xl font-bold text-foreground md:text-5xl">
            Choisissez votre époque
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Trois voyages extraordinaires sélectionnés par nos experts en temporalité.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {DESTINATIONS.map((d) => (
            <DestinationCard key={d.era} destination={d} />
          ))}
        </div>
      </div>
    </section>
  )
}

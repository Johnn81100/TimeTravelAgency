export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <p className="font-semibold text-primary">✦ TimeTravel Agency</p>
            <p className="mt-1 text-xs italic text-muted-foreground">
              Le temps n'est pas une frontière, c'est une destination.
            </p>
          </div>
          <nav className="flex gap-6 text-sm text-muted-foreground">
            <a href="#destinations" className="transition-colors hover:text-foreground">
              Destinations
            </a>
            <a href="#chatbot" className="transition-colors hover:text-foreground">
              Assistant IA
            </a>
            <a href="#" className="transition-colors hover:text-foreground">
              Contact
            </a>
          </nav>
        </div>
        <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          <p>© 2026 TimeTravel Agency — Agence de voyages temporels agréée par le Ministère de la Chronologie</p>
          <p className="mt-1">Projet pédagogique M1/M2 Digital & IA</p>
        </div>
      </div>
    </footer>
  )
}

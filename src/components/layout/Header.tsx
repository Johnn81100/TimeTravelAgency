import { Button } from '@/components/ui/button'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <span className="text-lg font-semibold tracking-wide text-primary">
          ✦ TimeTravel Agency
        </span>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#destinations" className="transition-colors hover:text-foreground">
            Destinations
          </a>
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))}
            className="transition-colors hover:text-foreground"
          >
            Assistant IA
          </button>
        </nav>
        <Button size="sm">Réserver</Button>
      </div>
    </header>
  )
}

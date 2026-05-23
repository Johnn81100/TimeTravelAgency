import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  function openChatbot() {
    window.dispatchEvent(new CustomEvent('open-chatbot'))
    setMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <span className="text-lg font-semibold tracking-wide text-primary">
          ✦ TimeTravel Agency
        </span>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#destinations" className="transition-colors hover:text-foreground">
            Destinations
          </a>
          <button
            onClick={openChatbot}
            className="transition-colors hover:text-foreground"
          >
            Assistant IA
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <Button size="sm" className="hidden md:inline-flex">Réserver</Button>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center justify-center text-muted-foreground transition-colors hover:text-foreground md:hidden"
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-border bg-background/95 px-6 py-4 md:hidden">
          <nav className="flex flex-col gap-4 text-sm text-muted-foreground">
            <a
              href="#destinations"
              onClick={() => setMenuOpen(false)}
              className="py-1 transition-colors hover:text-foreground"
            >
              Destinations
            </a>
            <button
              onClick={openChatbot}
              className="py-1 text-left transition-colors hover:text-foreground"
            >
              Assistant IA
            </button>
            <Button size="sm" className="mt-2 w-full">Réserver</Button>
          </nav>
        </div>
      )}
    </header>
  )
}

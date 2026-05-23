import { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useChatbot } from './useChatbot'
import { ChatMessage } from './ChatMessage'

export function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const { messages, loading, error, send } = useChatbot()
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  useEffect(() => {
    function handleOpen() { setOpen(true) }
    window.addEventListener('open-chatbot', handleOpen)
    return () => window.removeEventListener('open-chatbot', handleOpen)
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || loading) return
    send(trimmed)
    setInput('')
  }

  return (
    <div id="chatbot" className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="flex h-[480px] w-80 flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-black/30">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-foreground">Assistant IA</p>
              <p className="text-xs text-muted-foreground">TimeTravel Agency</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="Fermer"
            >
              <X size={16} />
            </button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-4">
            {messages.length === 0 && (
              <p className="pt-8 text-center text-xs text-muted-foreground">
                Bonjour ! Je suis votre conseiller de voyage temporel.
                Comment puis-je vous aider ?
              </p>
            )}
            {messages.map((msg, i) => (
              <ChatMessage key={i} message={msg} />
            ))}
            {loading && (
              <div className="flex gap-1 px-3 py-2">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:0ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:300ms]" />
              </div>
            )}
            {error && (
              <p className="text-center text-xs text-destructive">{error}</p>
            )}
            <div ref={bottomRef} />
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex gap-2 border-t border-border p-3"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez votre question..."
              disabled={loading}
              className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary disabled:opacity-50"
            />
            <Button type="submit" size="icon" disabled={loading || !input.trim()}>
              <Send size={14} />
            </Button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:scale-105 hover:shadow-xl hover:shadow-primary/30"
        aria-label="Ouvrir le chat"
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
      </button>
    </div>
  )
}

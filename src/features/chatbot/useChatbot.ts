import { useState } from 'react'
import { sendMessage, type Message } from '@/lib/mistral'

export function useChatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function send(content: string) {
    const userMessage: Message = { role: 'user', content }
    const next = [...messages, userMessage]
    setMessages(next)
    setLoading(true)
    setError(null)

    try {
      const reply = await sendMessage(next)
      setMessages([...next, { role: 'assistant', content: reply }])
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setLoading(false)
    }
  }

  return { messages, loading, error, send }
}

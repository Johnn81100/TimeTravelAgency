import { cn } from '@/lib/utils'
import type { Message } from '@/lib/mistral'

export function ChatMessage({ message }: { message: Message }) {
  const isUser = message.role === 'user'

  return (
    <div className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed',
          isUser
            ? 'rounded-br-sm bg-primary text-primary-foreground'
            : 'rounded-bl-sm bg-secondary text-secondary-foreground',
        )}
      >
        {message.content}
      </div>
    </div>
  )
}

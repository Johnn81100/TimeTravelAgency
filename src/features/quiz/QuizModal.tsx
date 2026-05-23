import { useState, useEffect } from 'react'
import { X, Sparkles, ArrowRight, RotateCcw } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { QUIZ_QUESTIONS } from './quizData'
import { sendMessage } from '@/lib/mistral'
import { DESTINATIONS } from '@/features/destinations/destinationsData'

export function QuizModal() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [destinationId, setDestinationId] = useState<string | null>(null)

  useEffect(() => {
    function handleOpen() {
      setOpen(true)
    }
    window.addEventListener('open-quiz', handleOpen)
    return () => window.removeEventListener('open-quiz', handleOpen)
  }, [])

  function handleClose() {
    setOpen(false)
    setTimeout(() => {
      setStep(0)
      setAnswers([])
      setResult(null)
      setDestinationId(null)
    }, 300)
  }

  async function handleAnswer(option: string) {
    const newAnswers = [...answers, option]
    setAnswers(newAnswers)

    if (step < QUIZ_QUESTIONS.length - 1) {
      setStep(step + 1)
      return
    }

    setLoading(true)
    try {
      const prompt = `L'utilisateur a répondu à ce quiz de recommandation :
1. Type d'expérience : ${newAnswers[0]}
2. Période préférée : ${newAnswers[1]}
3. Préférence : ${newAnswers[2]}
4. Activité idéale : ${newAnswers[3]}

Recommande LA destination la plus adaptée parmi : Paris 1889, Crétacé -65M, Florence 1504.
Commence ta réponse par le nom exact de la destination recommandée, puis explique en 2 phrases pourquoi c'est le choix idéal pour ce profil.`

      const response = await sendMessage([{ role: 'user', content: prompt }])
      setResult(response)

      const lower = response.toLowerCase()
      if (lower.includes('paris')) setDestinationId('paris-1889')
      else if (lower.includes('crétacé') || lower.includes('cretace')) setDestinationId('cretace')
      else if (lower.includes('florence')) setDestinationId('florence-1504')
    } catch {
      setResult(
        'Notre conseiller est momentanément indisponible. Explorez nos destinations pour trouver votre époque idéale.',
      )
    } finally {
      setLoading(false)
    }
  }

  function handleReset() {
    setStep(0)
    setAnswers([])
    setResult(null)
    setDestinationId(null)
    setLoading(false)
  }

  if (!open) return null

  const recommended = destinationId ? DESTINATIONS.find((d) => d.id === destinationId) : null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

      <div className="animate-in fade-in zoom-in-95 relative w-full max-w-lg rounded-2xl border border-border bg-card shadow-2xl shadow-black/50 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-primary" />
            <p className="text-sm font-semibold text-foreground">Trouvez votre destination</p>
          </div>
          <button
            onClick={handleClose}
            className="text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Fermer"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6">
          {/* Quiz en cours */}
          {!result && !loading && (
            <>
              {/* Progress */}
              <div className="mb-6 flex gap-1.5">
                {QUIZ_QUESTIONS.map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      'h-1 flex-1 rounded-full transition-colors duration-300',
                      i <= step ? 'bg-primary' : 'bg-border',
                    )}
                  />
                ))}
              </div>

              <p className="mb-2 text-xs font-medium uppercase tracking-widest text-primary">
                Question {step + 1} / {QUIZ_QUESTIONS.length}
              </p>
              <h3 className="mb-6 font-display text-xl font-light text-foreground">
                {QUIZ_QUESTIONS[step].question}
              </h3>

              <div className="flex flex-col gap-3">
                {QUIZ_QUESTIONS[step].options.map((option) => (
                  <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    className="flex cursor-pointer items-center justify-between rounded-xl border border-border bg-background px-4 py-3 text-left text-sm text-foreground transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                  >
                    {option}
                    <ArrowRight size={14} className="shrink-0 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Loading */}
          {loading && (
            <div className="flex flex-col items-center gap-4 py-8">
              <div className="flex gap-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:0ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:150ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-primary [animation-delay:300ms]" />
              </div>
              <p className="text-sm text-muted-foreground">
                Notre conseiller analyse votre profil…
              </p>
            </div>
          )}

          {/* Résultat */}
          {result && !loading && (
            <div className="flex flex-col gap-5">
              {recommended && (
                <div
                  className="flex items-center gap-3 rounded-xl p-4"
                  style={{ background: recommended.gradient }}
                >
                  <recommended.Icon size={32} className="shrink-0 text-white/60" strokeWidth={1} />
                  <div>
                    <p className="text-xs font-medium uppercase tracking-widest text-white/60">
                      {recommended.era}
                    </p>
                    <p className="font-display text-lg font-light text-white">
                      {recommended.title}
                    </p>
                  </div>
                </div>
              )}

              <p className="text-sm leading-relaxed text-muted-foreground">{result}</p>

              <div className="flex flex-col gap-2 sm:flex-row">
                {recommended && (
                  <Link
                    to={`/destination/${recommended.id}`}
                    onClick={handleClose}
                    className={cn(buttonVariants({ size: 'sm' }), 'flex-1 justify-center')}
                  >
                    Explorer cette destination
                  </Link>
                )}
                <button
                  onClick={handleReset}
                  className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  <RotateCcw size={13} />
                  Recommencer
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

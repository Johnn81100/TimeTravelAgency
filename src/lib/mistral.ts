const SYSTEM_PROMPT = `Tu es le conseiller de voyage de TimeTravel Agency, une agence de luxe spécialisée dans les voyages temporels. Tu aides les clients à choisir entre 3 destinations : Paris 1889 (Belle Époque, Tour Eiffel, Exposition Universelle), le Crétacé -65 000 000 (dinosaures, nature préhistorique), et Florence 1504 (Renaissance, Michel-Ange, les Médicis). Tu parles de manière élégante, enthousiaste et rassurante. Tu réponds toujours en français. Sois concis (2-3 phrases maximum par réponse).`

export interface Message {
  role: 'user' | 'assistant'
  content: string
}

export async function sendMessage(messages: Message[]): Promise<string> {
  const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${import.meta.env.VITE_MISTRAL_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'mistral-small-latest',
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
    }),
  })

  if (!response.ok) {
    const body = await response.text().catch(() => '')
    throw new Error(`Mistral ${response.status}: ${body}`)
  }

  const data = await response.json()
  return data.choices[0].message.content as string
}

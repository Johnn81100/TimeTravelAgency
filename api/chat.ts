import type { VercelRequest, VercelResponse } from '@vercel/node'

const SYSTEM_PROMPT = `Tu es le conseiller de voyage de TimeTravel Agency, une agence de luxe spécialisée dans les voyages temporels. Tu aides les clients à choisir entre 3 destinations : Paris 1889 (Belle Époque, Tour Eiffel, Exposition Universelle), le Crétacé -65 000 000 (dinosaures, nature préhistorique), et Florence 1504 (Renaissance, Michel-Ange, les Médicis). Tu parles de manière élégante, enthousiaste et rassurante. Tu réponds toujours en français. Sois concis (2-3 phrases maximum par réponse).`

interface Message {
  role: 'user' | 'assistant'
  content: string
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { messages } = req.body as { messages: Message[] }

  const response = await fetch('https://api.mistral.ai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'mistral-small-latest',
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
    }),
  })

  if (!response.ok) {
    const body = await response.text().catch(() => '')
    return res.status(response.status).json({ error: `Mistral ${response.status}: ${body}` })
  }

  const data = await response.json()
  return res.status(200).json({ content: data.choices[0].message.content })
}

import { describe, it, expect, vi, beforeEach } from 'vitest'
import { sendMessage } from './mistral'

const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

beforeEach(() => {
  mockFetch.mockReset()
})

describe('sendMessage', () => {
  it('retourne le contenu de la réponse du proxy', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ content: 'Bonjour, voyageur temporel !' }),
    })

    const result = await sendMessage([{ role: 'user', content: 'Bonjour' }])
    expect(result).toBe('Bonjour, voyageur temporel !')
  })

  it('appelle le proxy /api/chat avec la bonne méthode', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ content: 'ok' }),
    })

    await sendMessage([{ role: 'user', content: 'test' }])

    expect(mockFetch).toHaveBeenCalledWith('/api/chat', expect.objectContaining({ method: 'POST' }))
  })

  it('envoie les messages utilisateur sans injecter de system prompt', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ content: 'ok' }),
    })

    await sendMessage([{ role: 'user', content: 'test' }])

    const body = JSON.parse(mockFetch.mock.calls[0][1].body)
    expect(body.messages).toEqual([{ role: 'user', content: 'test' }])
  })

  it("lève une erreur avec le message d'erreur du proxy en cas d'échec", async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      json: async () => ({ error: 'Mistral 401: Unauthorized' }),
    })

    await expect(sendMessage([{ role: 'user', content: 'test' }])).rejects.toThrow('Mistral 401')
  })

  it('lève une erreur 429 en cas de rate limit', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 429,
      json: async () => ({ error: 'Mistral 429: Too Many Requests' }),
    })

    await expect(sendMessage([{ role: 'user', content: 'test' }])).rejects.toThrow('Mistral 429')
  })
})

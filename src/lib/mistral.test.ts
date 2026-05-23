import { describe, it, expect, vi, beforeEach } from 'vitest'
import { sendMessage } from './mistral'

const mockFetch = vi.fn()
vi.stubGlobal('fetch', mockFetch)

beforeEach(() => {
  mockFetch.mockReset()
  vi.stubEnv('VITE_MISTRAL_API_KEY', 'test-key')
})

describe('sendMessage', () => {
  it('retourne le contenu de la réponse Mistral', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        choices: [{ message: { content: 'Bonjour, voyageur temporel !' } }],
      }),
    })

    const result = await sendMessage([{ role: 'user', content: 'Bonjour' }])
    expect(result).toBe('Bonjour, voyageur temporel !')
  })

  it('appelle le bon endpoint avec la bonne méthode', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ choices: [{ message: { content: 'ok' } }] }),
    })

    await sendMessage([{ role: 'user', content: 'test' }])

    expect(mockFetch).toHaveBeenCalledWith(
      'https://api.mistral.ai/v1/chat/completions',
      expect.objectContaining({ method: 'POST' }),
    )
  })

  it('inclut le system prompt dans les messages envoyés', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ choices: [{ message: { content: 'ok' } }] }),
    })

    await sendMessage([{ role: 'user', content: 'test' }])

    const body = JSON.parse(mockFetch.mock.calls[0][1].body)
    expect(body.messages[0].role).toBe('system')
    expect(body.messages[1]).toEqual({ role: 'user', content: 'test' })
  })

  it('lève une erreur avec le statut HTTP en cas d\'échec', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 401,
      text: async () => 'Unauthorized',
    })

    await expect(sendMessage([{ role: 'user', content: 'test' }])).rejects.toThrow('Mistral 401')
  })

  it('lève une erreur 429 en cas de rate limit', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 429,
      text: async () => 'Too Many Requests',
    })

    await expect(sendMessage([{ role: 'user', content: 'test' }])).rejects.toThrow('Mistral 429')
  })
})

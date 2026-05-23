import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useChatbot } from './useChatbot'

vi.mock('@/lib/mistral', () => ({
  sendMessage: vi.fn(),
}))

import { sendMessage } from '@/lib/mistral'
const mockSendMessage = vi.mocked(sendMessage)

beforeEach(() => {
  mockSendMessage.mockReset()
})

describe('useChatbot', () => {
  it('état initial : messages vides, pas de loading, pas d\'erreur', () => {
    const { result } = renderHook(() => useChatbot())
    expect(result.current.messages).toEqual([])
    expect(result.current.loading).toBe(false)
    expect(result.current.error).toBeNull()
  })

  it('ajoute le message utilisateur et la réponse assistant', async () => {
    mockSendMessage.mockResolvedValueOnce('Bienvenue à Paris 1889 !')

    const { result } = renderHook(() => useChatbot())

    await act(async () => {
      await result.current.send('Je veux visiter Paris')
    })

    expect(result.current.messages).toHaveLength(2)
    expect(result.current.messages[0]).toEqual({ role: 'user', content: 'Je veux visiter Paris' })
    expect(result.current.messages[1]).toEqual({ role: 'assistant', content: 'Bienvenue à Paris 1889 !' })
  })

  it('remet loading à false après la réponse', async () => {
    mockSendMessage.mockResolvedValueOnce('Réponse')

    const { result } = renderHook(() => useChatbot())

    await act(async () => {
      await result.current.send('test')
    })

    expect(result.current.loading).toBe(false)
  })

  it('stocke le message d\'erreur en cas d\'échec de l\'API', async () => {
    mockSendMessage.mockRejectedValueOnce(new Error('Mistral 401: Unauthorized'))

    const { result } = renderHook(() => useChatbot())

    await act(async () => {
      await result.current.send('test')
    })

    expect(result.current.error).toBe('Mistral 401: Unauthorized')
    expect(result.current.loading).toBe(false)
  })

  it('efface l\'erreur précédente au nouvel envoi', async () => {
    mockSendMessage.mockRejectedValueOnce(new Error('Erreur réseau'))
    const { result } = renderHook(() => useChatbot())
    await act(async () => { await result.current.send('premier') })
    expect(result.current.error).toBeTruthy()

    mockSendMessage.mockResolvedValueOnce('ok')
    await act(async () => { await result.current.send('deuxième') })
    expect(result.current.error).toBeNull()
  })
})

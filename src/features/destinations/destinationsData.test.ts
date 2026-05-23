import { describe, it, expect } from 'vitest'
import { getDestinationById, DESTINATIONS } from './destinationsData'

describe('getDestinationById', () => {
  it('retourne la bonne destination pour un id valide', () => {
    const result = getDestinationById('paris-1889')
    expect(result?.id).toBe('paris-1889')
    expect(result?.title).toBe('Paris — Belle Époque')
  })

  it('retourne undefined pour un id inconnu', () => {
    expect(getDestinationById('destination-inconnue')).toBeUndefined()
  })

  it('retourne undefined pour une chaîne vide', () => {
    expect(getDestinationById('')).toBeUndefined()
  })

  it('les 3 destinations sont bien définies', () => {
    expect(DESTINATIONS).toHaveLength(3)
    expect(getDestinationById('cretace')).toBeDefined()
    expect(getDestinationById('florence-1504')).toBeDefined()
  })

  it('chaque destination possède les champs requis', () => {
    for (const d of DESTINATIONS) {
      expect(d.id).toBeTruthy()
      expect(d.title).toBeTruthy()
      expect(d.highlights).toHaveLength(3)
      expect(d.practical.price).toBeTruthy()
    }
  })
})

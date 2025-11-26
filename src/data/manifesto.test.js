import { describe, it, expect } from 'vitest'
import { getManifestoText } from './manifesto'
import manifestoData from './manifesto.json'

describe('Manifesto Data Utility', () => {
  it('should retrieve nested text correctly', () => {
    const text = getManifestoText('about.school_definition')
    expect(text).toBe(manifestoData.about.school_definition)
    expect(text).toContain('A 42SP é uma escola')
  })

  it('should return empty string for invalid path', () => {
    const text = getManifestoText('invalid.path')
    expect(text).toBe('')
  })

  it('should return full object if path points to object', () => {
    const section = getManifestoText('mission')
    expect(section).toEqual(manifestoData.mission)
  })
})


import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Section from './Section'

describe('Section Component', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 800
    })
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0
    })
    Object.defineProperty(document.documentElement, 'scrollTop', {
      writable: true,
      configurable: true,
      value: 0
    })
  })

  it('deve renderizar título e texto', () => {
    render(<Section title="[ TESTE ]" text="Texto de teste" />)
    
    expect(screen.getByText('[ TESTE ]')).toBeInTheDocument()
    expect(screen.getByText('Texto de teste')).toBeInTheDocument()
  })

  it('deve começar invisível (opacity 0)', () => {
    const { container } = render(<Section title="[ TESTE ]" text="Texto" />)
    const text = container.querySelector('.section-text')
    const title = container.querySelector('.section-title')
    
    if (text) {
      const styles = window.getComputedStyle(text)
      expect(styles.opacity).toBe('0')
    }
    
    if (title) {
      const styles = window.getComputedStyle(title)
      expect(styles.opacity).toBe('0')
    }
  })

  it('deve ter min-height de 100vh', () => {
    const { container } = render(<Section title="[ TESTE ]" text="Texto" />)
    const sectionContainer = container.querySelector('.section-container')
    
    if (sectionContainer) {
      const styles = window.getComputedStyle(sectionContainer)
      expect(styles.minHeight).toBe('100vh')
    }
  })
})


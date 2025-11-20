import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from './Home'

describe('Home Component', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 800
    })
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200
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

  it('deve renderizar todas as seções', () => {
    render(<Home />)
    
    expect(screen.getByText('[ DISCLAIMER ]')).toBeInTheDocument()
    expect(screen.getByText('[ DESENVOLVEMOS SOLUÇÕES DIGITAIS ]')).toBeInTheDocument()
    expect(screen.getByText('[ MISSÃO ]')).toBeInTheDocument()
    expect(screen.getByText('[ O FLOW DO LAB42 ]')).toBeInTheDocument()
    expect(screen.getByText('[ TIPO DE MISSÃO ]')).toBeInTheDocument()
    expect(screen.getByText('[ FORMATO DE EXECUÇÃO ]')).toBeInTheDocument()
    expect(screen.getByText('[ LIFELONG IMPACT ]')).toBeInTheDocument()
    expect(screen.getByText('[ GOVERNANÇA ]')).toBeInTheDocument()
    expect(screen.getByText('[ CALL TO ACTION ]')).toBeInTheDocument()
  })

  it('deve verificar se as seções têm altura mínima auto', () => {
    const { container } = render(<Home />)
    const sections = container.querySelectorAll('.section-container')
    
    sections.forEach(section => {
      const styles = window.getComputedStyle(section)
      expect(styles.minHeight).toBe('auto')
    })
  })

  it('deve verificar se as seções começam invisíveis (opacity 0)', () => {
    const { container } = render(<Home />)
    const sectionTexts = container.querySelectorAll('.section-text')
    
    sectionTexts.forEach(text => {
      const styles = window.getComputedStyle(text)
      expect(styles.opacity).toBe('0')
    })
  })
})


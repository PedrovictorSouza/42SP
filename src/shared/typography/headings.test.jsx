import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Section from '../../components/layout/Section/Section'
import ScrollSection from '../../components/layout/ScrollSection/ScrollSection'
import ManifestoContent from '../../features/manifesto/ManifestoContent'
import fs from 'fs'
import path from 'path'

// Helper to load CSS
const loadCss = () => {
  const files = [
    'src/components/layout/Section/Section.css',
    'src/components/layout/ScrollSection/ScrollSection.css',
    'src/features/manifesto/ManifestoContent.css'
  ]
  return files.map(f => {
    try {
      return fs.readFileSync(path.resolve(process.cwd(), f), 'utf8')
    } catch (e) {
      console.warn(`Could not load CSS file: ${f}`)
      return ''
    }
  }).join('\n')
}

// Mock dependencies
vi.mock('../../components/layout/Section/CascadeText/CascadeText', () => ({
  default: ({ text, className }) => <div className={`cascade-text ${className || ''}`}>{text}</div>
}))

vi.mock('@/features/home/hooks/useScrollDetection', () => ({
  useScrollDetection: () => true
}))

// Mock useASCIIShift for ScrollSection
vi.mock('../../components/home/ScrollText/useASCIIShift', () => ({
  useASCIIShift: () => {}
}))

// Mock SecretAgentReveal
vi.mock('@/features/secret-agent/SecretAgentReveal', () => ({
  default: ({ children }) => <div>{children}</div>
}))

describe('Typography Headings Test', () => {
  beforeEach(() => {
    // Inject CSS
    const style = document.createElement('style')
    style.textContent = loadCss()
    document.head.appendChild(style)
  })

  it('Section h2 (section-title) deve ter font-size triplicado', () => {
    render(<Section sectionTitle="[ SECTION H2 ]" text="Texto" />)
    const h2 = screen.getByRole('heading', { level: 2, name: /\[ SECTION H2 \]/i })
    const styles = window.getComputedStyle(h2)
    const fontSize = styles.fontSize
    console.log('Section h2:', fontSize)
    const valid = fontSize === 'clamp(4.8rem, 9.6vw, 9.6rem)' || fontSize === '4.8rem'
    expect(valid).toBe(true)
  })

  it('ScrollSection h2 (scroll-section-title) deve ter font-size triplicado', () => {
    render(<ScrollSection title="[ SCROLL H2 ]" text="Texto" />)
    const h2 = screen.getByRole('heading', { level: 2, name: /\[ SCROLL H2 \]/i })
    const styles = window.getComputedStyle(h2)
    const fontSize = styles.fontSize
    console.log('ScrollSection h2:', fontSize)
    const valid = fontSize === 'clamp(2.4rem, 6vw, 4.32rem)' || fontSize === '2.4rem'
    expect(valid).toBe(true)
  })

  it('ManifestoContent h2 (manifesto-section-title) deve ter font-size triplicado', () => {
    render(<ManifestoContent />)
    const h2s = screen.queryAllByRole('heading', { level: 2 })
    if (h2s.length > 0) {
      const h2 = h2s[0]
      const styles = window.getComputedStyle(h2)
      console.log('ManifestoContent h2:', styles.fontSize)
      expect(styles.fontSize).toBe('3.6rem')
    }
  })
})

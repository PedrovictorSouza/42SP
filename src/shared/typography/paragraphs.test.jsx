import { describe, it, expect, beforeAll, vi } from 'vitest'
import { render } from '@testing-library/react'
import React from 'react'
import fs from 'fs'
import path from 'path'

// Mock components to ensure we can render enough structure to find the elements
vi.mock('@/features/secret-agent/SecretAgentReveal', () => ({
  default: ({ children }) => <div className="secret-agent-reveal">{children}</div>
}))

vi.mock('@/features/diagnostico/DiagnosticoContent', () => ({ default: () => <div>DiagnosticoContent</div> }))
vi.mock('@/features/preco-contrato/PrecoContratoContent', () => ({ default: () => <div>PrecoContratoContent</div> }))
vi.mock('@/features/squads/SetupSquadsContent', () => ({ default: () => <div>SetupSquadsContent</div> }))
vi.mock('@/features/ciclo-sprints/CicloSprintsContent', () => ({ default: () => <div>CicloSprintsContent</div> }))
vi.mock('@/features/delivery/DeliveryContent', () => ({ default: () => <div>DeliveryContent</div> }))
vi.mock('@/features/home/hooks/useParallax', () => ({ useParallax: () => {} }))
vi.mock('@/features/home/hooks/useScrollDetection', () => ({ useScrollDetection: () => true }))
vi.mock('@/components/layout/Section/AnimatedTextBackground', () => ({ default: () => <div>Bg</div> }))
vi.mock('@/assets/Jellyfish-1.png', () => ({ default: 'jellyfish.png' }))

// Load CSS
const loadCss = (filePath) => {
  const fullPath = path.resolve(process.cwd(), filePath)
  if (fs.existsSync(fullPath)) {
    return fs.readFileSync(fullPath, 'utf8')
  }
  return ''
}

// Import components
import Accordion from '@/components/ui/Accordion/Accordion'
import Section from '@/components/layout/Section/Section'
// We might need more imports depending on where cascade-text console-style is used.

describe('Typography Consistency: Paragraphs', () => {
  beforeAll(() => {
    const style = document.createElement('style')
    style.textContent = `
      ${loadCss('src/components/ui/Accordion/Accordion.css')}
      ${loadCss('src/components/layout/Section/Section.css')}
      ${loadCss('src/components/layout/Section/CascadeText/CascadeText.css')}
      ${loadCss('src/styles/paragraphs.css')} 
    `
    document.head.appendChild(style)
  })

  it('Accordion descriptions should be <p> with correct styling', () => {
    const { container } = render(<Accordion isVisible={true} />)
    // Accordion renders items. We need to look for accordion-description.
    const descriptions = container.querySelectorAll('.accordion-description')
    expect(descriptions.length).toBeGreaterThan(0)

    descriptions.forEach(desc => {
      expect(desc.tagName).toBe('P')
      
      const style = window.getComputedStyle(desc)
      expect(style.fontFamily).toContain('Space Grotesk')
      // Checking for exact font-size might be tricky with clamp, but we can check if it's applied via class
      // Or check computed value if we assume standard viewport.
      // Let's check if it has the class that enforces it.
      expect(desc.className).toContain('cascade-text')
      expect(desc.className).toContain('console-style')
      
      // Check centralized typography if applied
      // expect(style.fontWeight).toBe('400') // This is 400 in .app-paragraph
      // expect(style.lineHeight).toBe('1.6')
    })
  })

  it('Section (twoColumns/Plano de Voo) text should be <p> with correct styling', () => {
    const { container } = render(
      <Section 
        id="plano-de-voo" 
        twoColumns={true} 
        consoleStyle={true}
        firstColumnText="Text 1"
        secondColumnText="Text 2"
      />
    )
    
    const texts = container.querySelectorAll('.section-text-column .cascade-text.console-style')
    expect(texts.length).toBeGreaterThan(0)
    
    texts.forEach(text => {
      expect(text.tagName).toBe('P')
      const style = window.getComputedStyle(text)
      expect(style.fontFamily).toContain('Space Grotesk')
      expect(style.fontWeight).toBe('400')
    })
  })

  it('Disclaimer Section texts should be <p> (except hero description which is h3) with correct styling', () => {
    const { container } = render(
      <Section 
        id="disclaimer" 
        gridLayout={true} 
        consoleStyle={true}
        topRightText="Right"
        bottomRightText="Bottom"
      />
    )
    
    // Only checking standard paragraphs, not hero description
    // Disclaimer uses consoleStyle, so they are .cascade-text.console-style
    // Excluding hero-description
    const texts = Array.from(container.querySelectorAll('.cascade-text.console-style'))
      .filter(el => !el.classList.contains('hero-description'))
      
    expect(texts.length).toBeGreaterThan(0)
    
    texts.forEach(text => {
      expect(text.tagName).toBe('P')
      const style = window.getComputedStyle(text)
      expect(style.fontFamily).toContain('Space Grotesk')
      // Ensure consistent weight
      expect(style.fontWeight).toBe('400') // This should be 400 for regular console text
    })
  })
})


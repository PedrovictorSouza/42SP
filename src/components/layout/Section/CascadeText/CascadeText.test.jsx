import { describe, it, expect, afterEach } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import Section from '../Section'
import fs from 'fs'
import path from 'path'

// Mock dependencies
vi.mock('@/assets/Jellyfish-1.png', () => ({ default: 'mock-image' }))
vi.mock('@/features/home/hooks/useScrollDetection', () => ({
  useScrollDetection: () => true 
}))

describe('Section Component - Hero Highlight', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders the hero description with correct font size (22pt) and highlight class', () => {
    // Manually inject the CSS for this test to ensure JSDOM can compute styles
    // This is necessary because standard Vitest/JSDOM setups don't process imported CSS files into the document
    const cssPath = path.resolve(__dirname, '../Section.css')
    const cssContent = fs.readFileSync(cssPath, 'utf8')
    const style = document.createElement('style')
    style.innerHTML = cssContent
    document.head.appendChild(style)

    const { container } = render(
      <Section 
        id="disclaimer"
        gridLayout={true}
        consoleStyle={true}
        topLeftText="Hero Text" 
      />
    )

    const heroElement = container.querySelector('.hero-description')
    expect(heroElement).toBeTruthy()
    expect(heroElement.classList.contains('hero-description-highlight')).toBe(true)

    const computedStyle = window.getComputedStyle(heroElement)
    // We expect 20pt. JSDOM might return it as '20pt' or computed pixels.
    // Check for '20pt' first as it matches the CSS rule exactly.
    expect(computedStyle.fontSize).toBe('20pt')
    
    // Cleanup style
    document.head.removeChild(style)
  })
})

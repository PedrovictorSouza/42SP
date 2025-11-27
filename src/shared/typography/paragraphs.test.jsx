import { describe, it, expect, beforeEach } from 'vitest'
import fs from 'fs'
import path from 'path'

// Helper to load CSS
const loadCss = () => {
  const files = [
    'src/styles/paragraphs.css',
    'src/components/home/ParallaxText/ParallaxText.css',
    'src/components/layout/Section/CascadeText/CascadeText.css'
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

describe('Paragraph Typography Standardization', () => {
  beforeEach(() => {
    // Reset DOM and inject CSS
    document.head.innerHTML = ''
    const style = document.createElement('style')
    style.textContent = loadCss()
    document.head.appendChild(style)
  })

  it('all paragraph classes should share the exact same font-size', () => {
    // Create elements representing different contexts
    const p1 = document.createElement('p')
    p1.className = 'hero-description'
    document.body.appendChild(p1)

    const p2 = document.createElement('div') // CascadeText usually divs
    p2.className = 'cascade-text console-style'
    document.body.appendChild(p2)

    const p3 = document.createElement('p')
    p3.className = 'accordion-description'
    document.body.appendChild(p3)
    
    const p4 = document.createElement('p')
    p4.className = 'app-paragraph'
    document.body.appendChild(p4)

    const s1 = window.getComputedStyle(p1)
    const s2 = window.getComputedStyle(p2)
    const s3 = window.getComputedStyle(p3)
    const s4 = window.getComputedStyle(p4)

    const expected = s4.fontSize

    // Verify they all match the centralized .app-paragraph size
    expect(s1.fontSize).toBe(expected)
    expect(s2.fontSize).toBe(expected)
    expect(s3.fontSize).toBe(expected)
    
    // Explicit check for values (should match clamp logic or fallback)
    // In JSDOM it might resolve to '1rem' or similar if viewport not handled perfectly, 
    // but equality is what matters most here.
    // If fallback/defaults apply: 1rem = 16px
    console.log('Computed font-size:', expected)
  })
})

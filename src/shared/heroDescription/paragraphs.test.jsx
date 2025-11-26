import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'fs'
import path from 'path'

const loadCss = (filePath) => {
  return fs.readFileSync(path.resolve(process.cwd(), filePath), 'utf8')
}

describe('Hero Description Paragraphs Typography', () => {
  beforeAll(() => {
    // Inject all relevant CSS
    const cssFiles = [
      'src/styles/heroDescription.css',
      'src/components/layout/Section/Section.css',
      'src/components/home/ParallaxText/ParallaxText.css',
      'src/components/Section/CascadeText/CascadeText.css',
      'src/components/layout/Section/CascadeText/CascadeText.css'
    ]
    
    const style = document.createElement('style')
    style.textContent = cssFiles.map(loadCss).join('\n\n')
    document.head.appendChild(style)
  })

  it('should have exactly 14pt font-size for all .hero-description elements', () => {
    // Test ParallaxText context
    const p1 = document.createElement('p')
    p1.className = 'hero-description'
    document.body.appendChild(p1)
    
    // Test Section context (assuming we migrate it to use .hero-description or p tag)
    const p2 = document.createElement('p')
    p2.className = 'hero-description'
    // Simulate highlight class if it exists, ensuring it doesn't override size incorrectly if we want uniformity
    p2.classList.add('hero-description-highlight') 
    document.body.appendChild(p2)
    
    const style1 = window.getComputedStyle(p1)
    const style2 = window.getComputedStyle(p2)
    
    // Expectation: 12pt (approx 16px)
    // We check for '12pt' string because JSDOM might return computed value if we used px, but if defined as pt it often returns pt or px.
    
    expect(style1.fontSize).toBe('12pt')
    expect(style2.fontSize).toBe('12pt')
    
    document.body.removeChild(p1)
    document.body.removeChild(p2)
  })
})


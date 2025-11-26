import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'fs'
import path from 'path'

// Helper to load CSS content
const loadCss = (filePath) => {
  return fs.readFileSync(path.resolve(process.cwd(), filePath), 'utf8')
}

describe('Style Regression Tests', () => {
  beforeAll(() => {
    // Inject all relevant CSS files into the document head
    const cssFiles = [
      'src/components/layout/Section/Section.css',
      'src/components/layout/Section/CascadeText/CascadeText.css',
      'src/components/Section/CascadeText/CascadeText.css', // Legacy
      'src/components/home/ParallaxText/ParallaxText.css'
    ]

    const style = document.createElement('style')
    style.textContent = cssFiles.map(loadCss).join('\n\n')
    document.head.appendChild(style)
  })

  it('should apply 20pt font-size to hero-description-highlight even with legacy CSS loaded', () => {
    const element = document.createElement('h3')
    element.className = 'cascade-text console-style hero-description hero-description-highlight'
    // Simulate the structure found in the app
    document.body.appendChild(element)
    
    const computed = window.getComputedStyle(element)
    
    // Check font size. Note: JSDOM might not perfectly parse '20pt' to 'px' conversion reliably 
    // without a viewport, but it should respect the string value if set directly or via !important
    // In many JSDOM setups, 20pt = 26.6667px. 
    // Let's check if it matches the expected value from Section.css
    
    // If Section.css has 20pt !important, it should win.
    // If legacy CSS has #hero-description { font-size: 18pt }, and if we used ID...
    // Wait, we are using classes now. But if the user claimed legacy CSS has ID selector,
    // we should test if an element WITH ID (old usage) still breaks things OR if the class usage is safe.
    
    // The user's specific complaint: "CascadeText.css (line 31) mantém a regra antiga #hero-description"
    // Let's test if we add the ID (simulating legacy component behavior or accidental ID usage)
    // if it overrides our highlight class.
    element.id = 'hero-description' 
    
    // Re-evaluate computed style
    const computedWithId = window.getComputedStyle(element)
    
    // 20pt is approx 26.667px
    expect(computedWithId.fontSize).toBe('20pt') 
    
    document.body.removeChild(element)
  })

  it('should ensure ParallaxText hero-description does not override highlight if applied together', () => {
    // Scenario: An element has both ParallaxText's .hero-description and our .hero-description-highlight
    const element = document.createElement('p')
    element.className = 'hero-description hero-description-highlight'
    document.body.appendChild(element)
    
    const computed = window.getComputedStyle(element)
    
    // Should be 20pt from the highlight class, NOT the clamp(...) from ParallaxText
    expect(computed.fontSize).toBe('20pt')
    
    document.body.removeChild(element)
  })
})


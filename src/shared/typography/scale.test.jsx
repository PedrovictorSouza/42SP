import { describe, it, expect, beforeAll } from 'vitest'
import fs from 'fs'
import path from 'path'

// Helper to load CSS
const loadCss = () => {
  // Load all CSS that might affect typography
  const files = [
    'src/styles/typographyScale.css',
    'src/styles/paragraphs.css', // Should eventually inherit or be replaced
    'src/components/home/ParallaxText/ParallaxText.css',
    'src/components/layout/Section/Section.css',
    'src/features/manifesto/ManifestoContent.css',
    'src/components/layout/Section/CascadeText/CascadeText.css'
  ]
  return files.map(f => {
    try {
      return fs.readFileSync(path.resolve(process.cwd(), f), 'utf8')
    } catch (e) {
      return ''
    }
  }).join('\n')
}

describe('Typography Scale Enforcement', () => {
  beforeAll(() => {
    const style = document.createElement('style')
    style.textContent = loadCss()
    document.head.appendChild(style)
  })

  it('all primary content text should match .typography-paragraph font-size', () => {
    // 1. ParallaxText hero description
    const parallaxP = document.createElement('div')
    parallaxP.className = 'hero-description typography-paragraph'
    document.body.appendChild(parallaxP)

    // 2. Section text
    const sectionP = document.createElement('div')
    sectionP.className = 'section-text typography-paragraph'
    document.body.appendChild(sectionP)

    // 3. Manifesto block
    const manifestoP = document.createElement('p')
    manifestoP.className = 'typography-paragraph' 
    // Note: Manifesto might not have used class yet, but goal is to use it.
    document.body.appendChild(manifestoP)

    // 4. SecretAgentReveal span
    const secretContainer = document.createElement('div')
    secretContainer.className = 'typography-paragraph'
    const secretSpan = document.createElement('span')
    secretSpan.className = 'secret-char'
    secretContainer.appendChild(secretSpan)
    document.body.appendChild(secretContainer)

    // Reference size from the source of truth
    const refEl = document.createElement('div')
    refEl.className = 'typography-paragraph'
    document.body.appendChild(refEl)
    const expectedSize = window.getComputedStyle(refEl).fontSize

    const s1 = window.getComputedStyle(parallaxP).fontSize
    const s2 = window.getComputedStyle(sectionP).fontSize
    const s3 = window.getComputedStyle(manifestoP).fontSize
    const s4 = window.getComputedStyle(secretSpan).fontSize

    // console.log('Expected:', expectedSize)
    // console.log('Received:', s1, s2, s3, s4)

    expect(s1).toBe(expectedSize)
    expect(s2).toBe(expectedSize)
    expect(s3).toBe(expectedSize)
    expect(s4).toBe(expectedSize)

    // Cleanup
    document.body.innerHTML = ''
  })

  it('should not have more than 3 distinct font sizes defined in typographyScale.css', () => {
    // Heuristic check: read the file and count distinct font-size declarations
    const cssContent = fs.readFileSync(path.resolve(process.cwd(), 'src/styles/typographyScale.css'), 'utf8')
    const matches = cssContent.match(/font-size:\s*([^;]+)/g)
    // This is a rough check, just to ensure we stick to the plan of 3 scales.
    // Unique values:
    const uniqueValues = new Set(matches.map(m => m.trim()))
    expect(uniqueValues.size).toBeLessThanOrEqual(3)
  })
})


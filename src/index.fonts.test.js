import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

const loadCss = (filePath) => {
  return fs.readFileSync(path.resolve(process.cwd(), filePath), 'utf8')
}

describe('Index CSS Fonts', () => {
  it('should import Zen Kaku Gothic New with weights 400, 500, 700', () => {
    const cssContent = loadCss('src/index.css')
    
    // Check for Zen Kaku Gothic New import with required weights
    const hasZenKaku = cssContent.includes('Zen+Kaku+Gothic+New')
    const hasWeights = cssContent.includes('wght@400;500;700') || (cssContent.includes('400') && cssContent.includes('500') && cssContent.includes('700'))
    
    if (!hasZenKaku) {
        throw new Error('Zen Kaku Gothic New font is not imported in src/index.css')
    }
    
    if (!hasWeights) {
        // This check is a bit loose to allow different URL formats, but we want to ensure we have the weights.
        // Strict check for the provided URL format is better for TDD cycle.
        const expectedUrlPart = 'Zen+Kaku+Gothic+New:wght@400;500;700'
        if (!cssContent.includes(expectedUrlPart)) {
             throw new Error(`Zen Kaku Gothic New import does not include weights 400, 500, 700. Expected part: ${expectedUrlPart}`)
        }
    }
  })
})


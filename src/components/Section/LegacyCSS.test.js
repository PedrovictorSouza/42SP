import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

describe('Legacy CSS Cleanup', () => {
  it('should not contain #hero-description ID selector which causes conflicts', () => {
    const cssPath = path.resolve(__dirname, './CascadeText/CascadeText.css')
    const cssContent = fs.readFileSync(cssPath, 'utf8')
    
    // We expect this to fail if the rule exists
    expect(cssContent).not.toContain('#hero-description')
  })
})


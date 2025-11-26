import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

const loadCss = (filePath) => {
  return fs.readFileSync(path.resolve(process.cwd(), filePath), 'utf8')
}

describe('Secret Agent Reveal CSS', () => {
  it('should not contain !important in styling rules', () => {
    const cssContent = loadCss('src/features/secret-agent/SecretAgentReveal.css')
    
    if (cssContent.includes('!important')) {
        // Check if it's the specific rule we are targeting
        // Or fail on any !important
        throw new Error('Found !important in SecretAgentReveal.css')
    }
  })
})


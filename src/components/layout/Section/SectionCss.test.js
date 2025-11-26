import { describe, it, expect } from 'vitest'
import fs from 'fs'
import path from 'path'

const loadCss = (filePath) => {
  return fs.readFileSync(path.resolve(process.cwd(), filePath), 'utf8')
}

describe('Section CSS', () => {
  it('should not contain !important in media queries for height or min-height', () => {
    const cssContent = loadCss('src/components/layout/Section/Section.css')
    
    // Regex to capture media blocks
    const mediaBlocks = cssContent.match(/@media[^{]+\{([\s\S]+?})\s*}/g) || []
    
    mediaBlocks.forEach(block => {
        // Check for height or min-height with !important
        const heightImportant = /height:\s*[^;]+!important/.test(block)
        const minHeightImportant = /min-height:\s*[^;]+!important/.test(block)
        
        if (heightImportant || minHeightImportant) {
            throw new Error(`Found !important in media query for height/min-height:\n${block.substring(0, 100)}...`)
        }
    })
  })
})


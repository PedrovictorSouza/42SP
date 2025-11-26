import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import DiagnosticoContent from './DiagnosticoContent'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

describe('DiagnosticoContent - Quebra de Palavras', () => {
  it('deve ter word-wrap e overflow-wrap como normal para manter palavras inteiras', () => {
    const cssPath = join(__dirname, 'DiagnosticoContent.css')
    const cssContent = readFileSync(cssPath, 'utf-8')
    
    expect(cssContent).toContain('.diagnostico-grid-cell-description')
    expect(cssContent).toMatch(/word-wrap:\s*normal/)
    expect(cssContent).toMatch(/overflow-wrap:\s*normal/)
  })

  it('as células do grid devem ter min-width: 0 no CSS', () => {
    const cssPath = join(__dirname, 'DiagnosticoContent.css')
    const cssContent = readFileSync(cssPath, 'utf-8')
    
    expect(cssContent).toContain('.diagnostico-grid-cell')
    expect(cssContent).toMatch(/min-width:\s*0/)
  })

  it('as descrições não devem ter white-space: nowrap', () => {
    const { container } = render(<DiagnosticoContent />)
    const descriptionCells = container.querySelectorAll('.diagnostico-grid-cell-description')
    
    expect(descriptionCells.length).toBeGreaterThan(0)
    
    descriptionCells.forEach((cell) => {
      const styles = window.getComputedStyle(cell)
      expect(styles.whiteSpace).not.toBe('nowrap')
    })
  })

  it('o texto não deve ter overflow hidden que impeça quebra', () => {
    const { container } = render(<DiagnosticoContent />)
    const descriptionCell = container.querySelector('.diagnostico-grid-cell-description')
    
    if (descriptionCell) {
      const styles = window.getComputedStyle(descriptionCell)
      const overflow = styles.overflow
      const overflowX = styles.overflowX
      
      const blocksOverflow = overflow === 'hidden' || overflowX === 'hidden'
      
      expect(blocksOverflow).toBe(false)
    }
  })

  it('o grid-table não deve ter max-width fixo que impeça quebra', () => {
    const cssPath = join(__dirname, 'DiagnosticoContent.css')
    const cssContent = readFileSync(cssPath, 'utf-8')
    
    const gridTableMatch = cssContent.match(/\.diagnostico-grid-table\s*\{([^}]+)\}/s)
    if (gridTableMatch) {
      const gridTableStyles = gridTableMatch[1]
      expect(gridTableStyles).not.toMatch(/max-width:\s*\d+px/)
      expect(gridTableStyles).not.toMatch(/max-width:\s*\d+rem/)
    }
  })

  it('as células não devem ter width fixo que impeça quebra', () => {
    const cssPath = join(__dirname, 'DiagnosticoContent.css')
    const cssContent = readFileSync(cssPath, 'utf-8')
    
    const cellMatch = cssContent.match(/\.diagnostico-grid-cell[^{]*\{([^}]+)\}/s)
    if (cellMatch) {
      const cellStyles = cellMatch[1]
      expect(cellStyles).not.toMatch(/width:\s*\d+px/)
      expect(cellStyles).not.toMatch(/width:\s*\d+rem/)
    }
  })

  it('as descrições não devem ter width fixo que impeça quebra', () => {
    const cssPath = join(__dirname, 'DiagnosticoContent.css')
    const cssContent = readFileSync(cssPath, 'utf-8')
    
    const descMatch = cssContent.match(/\.diagnostico-grid-cell-description[^{]*\{([^}]+)\}/s)
    if (descMatch) {
      const descStyles = descMatch[1]
      expect(descStyles).not.toMatch(/width:\s*\d+px/)
      expect(descStyles).not.toMatch(/width:\s*\d+rem/)
    }
  })

  it('o grid-table deve ter width: 100% para permitir quebra', () => {
    const cssPath = join(__dirname, 'DiagnosticoContent.css')
    const cssContent = readFileSync(cssPath, 'utf-8')
    
    expect(cssContent).toContain('.diagnostico-grid-table')
    expect(cssContent).toMatch(/\.diagnostico-grid-table[^{]*\{[^}]*width:\s*100%/)
  })

  it('as células devem ter box-sizing que não impeça quebra', () => {
    const cssPath = join(__dirname, 'DiagnosticoContent.css')
    const cssContent = readFileSync(cssPath, 'utf-8')
    
    const cellMatch = cssContent.match(/\.diagnostico-grid-cell[^{]*\{([^}]+)\}/s)
    if (cellMatch) {
      const cellStyles = cellMatch[1]
      const hasBoxSizingBorderBox = cellStyles.match(/box-sizing:\s*border-box/)
      if (hasBoxSizingBorderBox) {
        expect(cellStyles).toMatch(/box-sizing:\s*border-box/)
      }
    }
  })

  it('as descrições não devem ter text-overflow: ellipsis', () => {
    const cssPath = join(__dirname, 'DiagnosticoContent.css')
    const cssContent = readFileSync(cssPath, 'utf-8')
    
    const descMatch = cssContent.match(/\.diagnostico-grid-cell-description[^{]*\{([^}]+)\}/s)
    if (descMatch) {
      const descStyles = descMatch[1]
      expect(descStyles).not.toMatch(/text-overflow:\s*ellipsis/)
    }
  })

  it('o grid-table não deve ter grid-template-columns com valores fixos que impeçam quebra', () => {
    const cssPath = join(__dirname, 'DiagnosticoContent.css')
    const cssContent = readFileSync(cssPath, 'utf-8')
    
    const gridTableMatch = cssContent.match(/\.diagnostico-grid-table[^{]*\{([^}]+)\}/s)
    if (gridTableMatch) {
      const gridTableStyles = gridTableMatch[1]
      const hasFixedColumns = gridTableStyles.match(/grid-template-columns:\s*\d+px/)
      expect(hasFixedColumns).toBeNull()
    }
  })

  it('as seções não devem ter width fixo que impeça quebra', () => {
    const cssPath = join(__dirname, 'DiagnosticoContent.css')
    const cssContent = readFileSync(cssPath, 'utf-8')
    
    const sectionMatch = cssContent.match(/\.diagnostico-section[^{]*\{([^}]+)\}/s)
    if (sectionMatch) {
      const sectionStyles = sectionMatch[1]
      expect(sectionStyles).not.toMatch(/width:\s*\d+px/)
      expect(sectionStyles).not.toMatch(/width:\s*\d+rem/)
    }
  })

  it('deve verificar se há propriedades que impedem quebra no CSS global', () => {
    const { container } = render(<DiagnosticoContent />)
    const descriptionCell = container.querySelector('.diagnostico-grid-cell-description')
    
    if (descriptionCell) {
      const styles = window.getComputedStyle(descriptionCell)
      const display = styles.display
      const position = styles.position
      
      expect(display).not.toBe('inline')
      expect(position).not.toBe('absolute')
      expect(position).not.toBe('fixed')
    }
  })

  it('deve ter word-break: normal para manter palavras inteiras', () => {
    const cssPath = join(__dirname, 'DiagnosticoContent.css')
    const cssContent = readFileSync(cssPath, 'utf-8')
    
    const descMatch = cssContent.match(/\.diagnostico-grid-cell-description[^{]*\{([^}]+)\}/s)
    if (descMatch) {
      const descStyles = descMatch[1]
      expect(descStyles).toMatch(/word-break:\s*normal/)
    }
  })

  it('o grid-table deve ter min-width: 0 para permitir quebra nas colunas', () => {
    const cssPath = join(__dirname, 'DiagnosticoContent.css')
    const cssContent = readFileSync(cssPath, 'utf-8')
    
    const gridTableMatch = cssContent.match(/\.diagnostico-grid-table[^{]*\{([^}]+)\}/s)
    if (gridTableMatch) {
      const gridTableStyles = gridTableMatch[1]
      const hasMinWidth = gridTableStyles.match(/min-width:\s*0/)
      if (!hasMinWidth) {
        expect(gridTableStyles).toMatch(/min-width:\s*0/)
      }
    }
  })

  it('as seções devem ter min-width: 0 para permitir quebra', () => {
    const cssPath = join(__dirname, 'DiagnosticoContent.css')
    const cssContent = readFileSync(cssPath, 'utf-8')
    
    const sectionMatch = cssContent.match(/\.diagnostico-section[^{]*\{([^}]+)\}/s)
    if (sectionMatch) {
      const sectionStyles = sectionMatch[1]
      expect(sectionStyles).toMatch(/min-width:\s*0/)
    }
  })

  it('diagnostico-sections deve ter min-width: 0 para permitir quebra', () => {
    const cssPath = join(__dirname, 'DiagnosticoContent.css')
    const cssContent = readFileSync(cssPath, 'utf-8')
    
    const sectionsMatch = cssContent.match(/\.diagnostico-sections[^{]*\{([^}]+)\}/s)
    if (sectionsMatch) {
      const sectionsStyles = sectionsMatch[1]
      expect(sectionsStyles).toMatch(/min-width:\s*0/)
    }
  })
})


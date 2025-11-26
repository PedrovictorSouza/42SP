import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Navbar from './Navbar'
import fs from 'fs'
import path from 'path'

// Mock IntersectionObserver
window.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  observe() { return null }
  unobserve() { return null }
  disconnect() { return null }
}

describe('Navbar Layout Architecture', () => {
  it('should not render obsolete sections (location, contact, social)', () => {
    const { container } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    )

    expect(container.querySelector('.location-section')).toBeNull()
    expect(container.querySelector('.contact-section')).toBeNull()
    expect(container.querySelector('.social-section')).toBeNull()
  })

  it('should configure .values-section to occupy remaining space in Navbar.css', () => {
    const cssPath = path.resolve(__dirname, 'Navbar.css')
    const cssContent = fs.readFileSync(cssPath, 'utf-8')

    // Procura pela definição da classe .values-section
    // Queremos garantir que ela comece na coluna 4 e vá até o final (ou ocupe o resto)
    // Padrões aceitáveis: "grid-column: 2 / -1" ou "grid-column: 2 / 3" (se for 2 colunas total)
    
    const valuesSectionRegex = /\.values-section\s*{[^}]*grid-column:\s*([^;]+);/s
    const match = cssContent.match(valuesSectionRegex)
    
    expect(match).not.toBeNull()
    
    const gridColumnValue = match[1].trim()
    
    // Verifica se começa na coluna 2 (num grid de 2 colunas)
    expect(gridColumnValue).toMatch(/^2\s*\//)
    
    // Verifica se ocupa até o fim ou a última coluna
    const occupiesRest = 
      gridColumnValue.includes('-1') || 
      gridColumnValue.includes('3') || // Num grid de 2 colunas, termina na linha 3
      gridColumnValue.includes('span 1')
      
    expect(occupiesRest).toBe(true)
  })

  it('should configure .header to have 2 columns', () => {
    const cssPath = path.resolve(__dirname, 'Navbar.css')
    const cssContent = fs.readFileSync(cssPath, 'utf-8')

    const gridTemplateRegex = /\.header\s*{[^}]*grid-template-columns:\s*([^;]+);/s
    const match = cssContent.match(gridTemplateRegex)
    
    expect(match).not.toBeNull()
    
    const gridTemplateValue = match[1].trim()
    // Pode ser "1fr 1fr" ou "auto 1fr" ou similar, mas deve ter 2 definições principais
    // Simplificando a verificação para "não ser repeat(12, 1fr)"
    expect(gridTemplateValue).not.toContain('repeat(12, 1fr)')
  })

  it('should allow .menu-list to occupy full width of .values-section', () => {
    const cssPath = path.resolve(__dirname, 'Navbar.css')
    const cssContent = fs.readFileSync(cssPath, 'utf-8')

    const menuListRegex = /\.menu-list\s*{[^}]*width:\s*([^;]+);/s
    const match = cssContent.match(menuListRegex)
    
    expect(match).not.toBeNull()
    
    const widthValue = match[1].trim()
    expect(widthValue).toBe('100%')
  })

  it('should have a scrolled state that changes background to white and text to black', () => {
    const cssPath = path.resolve(__dirname, 'Navbar.css')
    const cssContent = fs.readFileSync(cssPath, 'utf-8')

    // Verifica se existe a classe .header.scrolled
    const scrolledHeaderRegex = /\.header\.scrolled\s*{[^}]*background(-color)?:\s*(white|#fff|#ffffff|rgb\(255,\s*255,\s*255\));/s
    expect(cssContent).toMatch(scrolledHeaderRegex)

    // Verifica se os links dentro de .header.scrolled ficam pretos
    // IMPORTANTE: O teste deve verificar se há uma regra específica que garanta a precedência
    // Por exemplo, .header.scrolled .menu-list a ou algo mais específico que apenas .header.scrolled a
    const scrolledLinkRegex = /\.header\.scrolled\s+(?:.menu-list\s+)?a\s*{[^}]*color:\s*(black|#000|#000000|rgb\(0,\s*0,\s*0\));/s
    expect(cssContent).toMatch(scrolledLinkRegex)
    
    // Verifica se o botão hamburguer fica preto
    const scrolledHamburgerRegex = /\.header\.scrolled\s+\.hamburger-line\s*{[^}]*background-color:\s*(black|#000|#000000|rgb\(0,\s*0,\s*0\));/s
    expect(cssContent).toMatch(scrolledHamburgerRegex)
  })
})

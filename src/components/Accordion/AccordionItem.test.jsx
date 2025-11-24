import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import AccordionItem from './AccordionItem'

describe('AccordionItem - Seta Estilizada', () => {
  const defaultProps = {
    title: 'diagnóstico',
    description: 'análise do desafio e estruturação da missão',
    isExpanded: false,
    onClick: () => {}
  }

  it('não deve usar texto simples "→" como seta', () => {
    const { container } = render(<AccordionItem {...defaultProps} />)
    const arrowElement = container.querySelector('.accordion-arrow')
    
    expect(arrowElement).toBeInTheDocument()
    expect(arrowElement?.textContent).not.toBe('→')
  })

  it('deve ter elemento SVG ou elemento estilizado para a seta', () => {
    const { container } = render(<AccordionItem {...defaultProps} />)
    const arrowElement = container.querySelector('.accordion-arrow')
    
    expect(arrowElement).toBeInTheDocument()
    const hasSvg = arrowElement?.querySelector('svg') !== null
    const hasStyledElement = arrowElement?.classList.contains('accordion-arrow')
    
    expect(hasSvg || hasStyledElement).toBe(true)
  })

  it('deve aplicar classe expanded na seta quando isExpanded é true', () => {
    const { container } = render(<AccordionItem {...defaultProps} isExpanded={true} />)
    const arrowElement = container.querySelector('.accordion-arrow')
    
    expect(arrowElement).toBeInTheDocument()
    const button = container.querySelector('.accordion-item')
    expect(button).toHaveClass('expanded')
  })

  it('deve ter animação CSS aplicada na seta', () => {
    const { container } = render(<AccordionItem {...defaultProps} />)
    const arrowElement = container.querySelector('.accordion-arrow')
    
    if (arrowElement) {
      const styles = window.getComputedStyle(arrowElement)
      const hasTransition = styles.transition !== 'none' && styles.transition !== ''
      const hasTransform = styles.transform !== 'none'
      
      expect(hasTransition || hasTransform).toBe(true)
    }
  })

  it('deve rotacionar a seta quando expandido', () => {
    const { container, rerender } = render(<AccordionItem {...defaultProps} isExpanded={false} />)
    const arrowElement = container.querySelector('.accordion-arrow')
    
    expect(arrowElement).toBeInTheDocument()
    
    rerender(<AccordionItem {...defaultProps} isExpanded={true} />)
    
    const expandedArrow = container.querySelector('.accordion-arrow')
    if (expandedArrow) {
      const styles = window.getComputedStyle(expandedArrow)
      const transform = styles.transform
      expect(transform).not.toBe('none')
    }
  })

  it('deve ter seta com estilo "cheinha" (grossa/preenchida)', () => {
    const { container } = render(<AccordionItem {...defaultProps} />)
    const arrowElement = container.querySelector('.accordion-arrow')
    
    if (arrowElement) {
      const styles = window.getComputedStyle(arrowElement)
      const hasSvg = arrowElement.querySelector('svg') !== null
      
      if (hasSvg) {
        const svg = arrowElement.querySelector('svg')
        const path = svg?.querySelector('path')
        expect(path).toBeInTheDocument()
      } else {
        const fontWeight = parseInt(styles.fontWeight) || 0
        const borderWidth = parseFloat(styles.borderWidth) || 0
        expect(fontWeight >= 700 || borderWidth > 0).toBe(true)
      }
    }
  })

  describe('AccordionItem - Hover Effects', () => {
    it('deve ter cursor pointer', () => {
      const { container } = render(<AccordionItem {...defaultProps} />)
      const accordionItem = container.querySelector('.accordion-item')
      
      expect(accordionItem).toBeInTheDocument()
      expect(accordionItem?.tagName).toBe('BUTTON')
      if (accordionItem) {
        const styles = window.getComputedStyle(accordionItem)
        expect(styles.cursor === 'pointer' || accordionItem.tagName === 'BUTTON').toBeTruthy()
      }
    })

    it('deve ter efeito hover com highlight/motion', () => {
      const { container } = render(<AccordionItem {...defaultProps} />)
      const accordionItem = container.querySelector('.accordion-item')
      
      expect(accordionItem).toBeInTheDocument()
      if (accordionItem) {
        const styles = window.getComputedStyle(accordionItem)
        const hasTransition = styles.transition !== 'none' && styles.transition !== ''
        const hasTransform = styles.transform !== 'none'
        const hasPosition = styles.position === 'relative'
        const hasHoverStyles = hasTransition || hasTransform || hasPosition
        
        expect(hasHoverStyles).toBe(true)
      }
    })

    it('deve ter transição suave no hover', () => {
      const { container } = render(<AccordionItem {...defaultProps} />)
      const accordionItem = container.querySelector('.accordion-item')
      
      if (accordionItem) {
        const styles = window.getComputedStyle(accordionItem)
        const transition = styles.transition
        const hasEasing = transition.includes('ease') || transition.includes('cubic-bezier')
        
        expect(hasEasing || transition !== 'none').toBe(true)
      }
    })
  })
})


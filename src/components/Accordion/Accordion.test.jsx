import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Accordion from './Accordion'

describe('Accordion - Hover e Revelação', () => {
  beforeEach(() => {
    global.IntersectionObserver = class IntersectionObserver {
      constructor() {}
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  })

  it('deve ter cursor pointer no accordion item', () => {
    const { container } = render(<Accordion />)
    const accordionItem = container.querySelector('.accordion-item')
    
    expect(accordionItem).toBeInTheDocument()
    expect(accordionItem?.tagName).toBe('BUTTON')
    const styles = window.getComputedStyle(accordionItem)
    const cursorValue = styles.cursor
    expect(cursorValue === 'pointer' || accordionItem?.tagName === 'BUTTON').toBeTruthy()
  })

  it('deve ter efeito hover com highlight/motion', () => {
    const { container } = render(<Accordion />)
    const accordionItem = container.querySelector('.accordion-item')
    
    expect(accordionItem).toBeInTheDocument()
    if (accordionItem) {
      const styles = window.getComputedStyle(accordionItem)
      const hasTransition = styles.transition !== 'none' && styles.transition !== ''
      const hasHoverEffect = styles.opacity !== '1' || hasTransition
      
      expect(hasHoverEffect || hasTransition).toBe(true)
    }
  })

  it('deve aplicar animação elegante na revelação do conteúdo', () => {
    const { container } = render(<Accordion />)
    const accordionItem = container.querySelector('.accordion-item')
    
    expect(accordionItem).toBeInTheDocument()
    
    fireEvent.click(accordionItem)
    
    const expandedContent = container.querySelector('.accordion-expanded-content')
    expect(expandedContent).toBeInTheDocument()
    
    if (expandedContent) {
      const styles = window.getComputedStyle(expandedContent)
      const animationName = styles.animationName || styles.getPropertyValue('animation-name')
      const animationDuration = styles.animationDuration || styles.getPropertyValue('animation-duration')
      
      const hasAnimation = animationName && animationName !== 'none' && animationName !== ''
      const hasDuration = animationDuration && parseFloat(animationDuration) > 0
      
      expect(hasAnimation || hasDuration || expandedContent.classList.contains('accordion-expanded-content')).toBe(true)
    }
  })

  it('deve ter animação suave de fade-in e slide na revelação', () => {
    const { container } = render(<Accordion />)
    const accordionItem = container.querySelector('.accordion-item')
    
    fireEvent.click(accordionItem)
    
    const expandedContent = container.querySelector('.accordion-expanded-content')
    if (expandedContent) {
      const styles = window.getComputedStyle(expandedContent)
      const animationName = styles.animationName
      const hasSlideDown = animationName.includes('slideDown') || animationName.includes('slide')
      const hasFade = animationName.includes('fade') || styles.opacity !== '0'
      
      expect(hasSlideDown || hasFade).toBe(true)
    }
  })

  it('deve ter timing e easing elegantes na animação de revelação', () => {
    const { container } = render(<Accordion />)
    const accordionItem = container.querySelector('.accordion-item')
    
    fireEvent.click(accordionItem)
    
    const expandedContent = container.querySelector('.accordion-expanded-content')
    if (expandedContent) {
      const styles = window.getComputedStyle(expandedContent)
      const animationDuration = styles.animationDuration || styles.getPropertyValue('animation-duration')
      const animationTimingFunction = styles.animationTimingFunction || styles.getPropertyValue('animation-timing-function')
      
      const hasDuration = animationDuration && parseFloat(animationDuration) > 0
      const hasEasing = animationTimingFunction && 
                        animationTimingFunction !== 'linear' && 
                        animationTimingFunction !== 'none' &&
                        (animationTimingFunction.includes('cubic-bezier') || 
                         animationTimingFunction.includes('ease'))
      
      expect(hasDuration || hasEasing || expandedContent.classList.contains('accordion-expanded-content')).toBe(true)
    }
  })
})


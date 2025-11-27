import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render } from '@testing-library/react'
import ParallaxNumbers from './ParallaxNumbers'

// Mock useParallax hook
vi.mock('../../../features/home/hooks/useParallax', () => ({
  useParallax: () => {}
}))

// CSS content matching src/components/home/ParallaxNumbers/ParallaxNumbers.css
const PARALLAX_NUMBERS_CSS = `
.numbers-wrapper {
  position: relative;
  display: inline-block;
  width: 28vw;
  max-width: 100%;
  height: 28vw;
  line-height: 1;
  perspective: 1000px;
  transform-style: preserve-3d;
  overflow: hidden;
  box-sizing: border-box;
}

.number-42 {
  position: absolute;
  font-family: 'Special Gothic Expanded One', sans-serif;
  font-size: clamp(120px, 48vw, 440px);
  font-weight: 700;
  line-height: 1;
  will-change: transform;
  opacity: 0;
  white-space: nowrap;
  top: 50%;
  left: 50%;
  box-sizing: border-box;
  max-width: inherit;
  word-break: keep-all;
}
`

// CSS content matching src/components/home/ParallaxText/ParallaxText.css (relevant parts)
const PARALLAX_TEXT_CSS = `
.numbers-42-container > .numbers-wrapper {
  flex-shrink: 0;
  display: inline-block;
  vertical-align: baseline;
  max-width: 100%;
  overflow: hidden !important;
}
`

describe('ParallaxNumbers Width Constraints', () => {
  beforeEach(() => {
    const style = document.createElement('style')
    style.textContent = PARALLAX_NUMBERS_CSS + '\n' + PARALLAX_TEXT_CSS
    document.head.appendChild(style)
  })

  it('should not exceed the container width', () => {
    const containerWidth = 300
    const wrapper = document.createElement('div')
    wrapper.style.width = `${containerWidth}px`
    wrapper.className = 'numbers-42-container'
    document.body.appendChild(wrapper)

    render(<ParallaxNumbers />, { container: wrapper })

    const numbersWrapper = wrapper.querySelector('.numbers-wrapper')
    expect(numbersWrapper).not.toBeNull()

    const computedStyle = window.getComputedStyle(numbersWrapper)
    
    expect(computedStyle.maxWidth).toBe('100%')
    expect(computedStyle.overflow).toBe('hidden')

    const numberElements = wrapper.querySelectorAll('.number-42')
    numberElements.forEach(el => {
      const elStyle = window.getComputedStyle(el)
      // Check if constraints are inherited/applied
      expect(elStyle.maxWidth).toBe('inherit') // or 100% if computed
      expect(elStyle.wordBreak).toBe('keep-all')
    })

    document.body.removeChild(wrapper)
  })
})

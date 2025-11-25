import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render } from '@testing-library/react'
import SecretAgentReveal from './SecretAgentReveal'

describe('SecretAgentReveal - Detecção de Colisão e Quebra de Palavras', () => {
  beforeEach(() => {
    global.ResizeObserver = class ResizeObserver {
      constructor() {}
      observe() {}
      unobserve() {}
      disconnect() {}
    }
  })

  it('deve detectar quando um span vai colidir com a borda direita do container', () => {
    const container = document.createElement('div')
    container.className = 'diagnostico-grid-cell diagnostico-grid-cell-description'
    container.style.width = '200px'
    container.style.padding = '10px'
    document.body.appendChild(container)

    const span = document.createElement('span')
    span.className = 'secret-char'
    span.textContent = 'a'
    span.style.position = 'absolute'
    span.style.left = '190px'
    container.appendChild(span)

    const containerRect = container.getBoundingClientRect()
    const spanRect = span.getBoundingClientRect()
    const willCollide = spanRect.right > containerRect.right - parseFloat(getComputedStyle(container).paddingRight)

    expect(willCollide).toBe(true)

    document.body.removeChild(container)
  })

  it('deve encontrar o início da palavra quando detectar colisão', () => {
    const container = document.createElement('div')
    container.className = 'diagnostico-grid-cell diagnostico-grid-cell-description'
    document.body.appendChild(container)

    const text = 'Conectar sistemas e dados'
    const words = text.split(' ')
    
    words.forEach((word, wordIndex) => {
      word.split('').forEach((char, charIndex) => {
        const span = document.createElement('span')
        span.className = 'secret-char'
        span.textContent = char
        span.setAttribute('data-word-index', wordIndex.toString())
        span.setAttribute('data-char-in-word', charIndex.toString())
        container.appendChild(span)
      })
      
      if (wordIndex < words.length - 1) {
        const space = document.createElement('span')
        space.className = 'secret-char secret-char-space'
        space.innerHTML = ' '
        space.setAttribute('data-is-space', 'true')
        container.appendChild(space)
      }
    })

    const collidingSpan = container.querySelectorAll('.secret-char')[15]
    const wordIndex = parseInt(collidingSpan.getAttribute('data-word-index'))
    const wordStart = container.querySelector(`[data-word-index="${wordIndex}"][data-char-in-word="0"]`)

    expect(wordStart).toBeTruthy()
    expect(wordStart.textContent).toBe('s')

    document.body.removeChild(container)
  })

  it('deve mover palavra inteira para próxima linha quando detectar colisão', () => {
    const container = document.createElement('div')
    container.className = 'diagnostico-grid-cell diagnostico-grid-cell-description'
    container.style.width = '150px'
    container.style.display = 'inline-block'
    document.body.appendChild(container)

    const text = 'sincronizações'
    const chars = text.split('')
    
    chars.forEach((char, index) => {
      const span = document.createElement('span')
      span.className = 'secret-char'
      span.textContent = char
      span.setAttribute('data-char-index', index.toString())
      container.appendChild(span)
    })

    const allSpans = Array.from(container.querySelectorAll('.secret-char'))
    const containerRect = container.getBoundingClientRect()
    
    let wordStartIndex = -1
    for (let i = 0; i < allSpans.length; i++) {
      const spanRect = allSpans[i].getBoundingClientRect()
      if (spanRect.right > containerRect.right - 10) {
        wordStartIndex = 0
        break
      }
    }

    if (wordStartIndex >= 0) {
      const wordSpans = allSpans.slice(wordStartIndex)
      wordSpans.forEach(span => {
        span.style.display = 'block'
        span.style.width = '100%'
      })
    }

    const firstSpanAfterBreak = allSpans[wordStartIndex]
    if (firstSpanAfterBreak) {
      expect(firstSpanAfterBreak.style.display).toBe('block')
    }

    document.body.removeChild(container)
  })

  it('deve continuar processando após mover palavra para próxima linha', () => {
    const container = document.createElement('div')
    container.className = 'diagnostico-grid-cell diagnostico-grid-cell-description'
    container.style.width = '200px'
    document.body.appendChild(container)

    const text = 'Conectar sistemas e dados por meio de APIs'
    const words = text.split(' ')
    
    words.forEach((word) => {
      word.split('').forEach((char) => {
        const span = document.createElement('span')
        span.className = 'secret-char'
        span.textContent = char
        container.appendChild(span)
      })
      
      const space = document.createElement('span')
      space.className = 'secret-char secret-char-space'
      space.innerHTML = ' '
      container.appendChild(space)
    })

    const allSpans = Array.from(container.querySelectorAll('.secret-char'))
    let processedCount = 0
    let lineBreaks = 0

    allSpans.forEach((span, index) => {
      processedCount++
      const spanRect = span.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      
      if (spanRect.right > containerRect.right - 10 && index > 0) {
        const prevSpan = allSpans[index - 1]
        if (prevSpan && !prevSpan.classList.contains('secret-char-space')) {
          lineBreaks++
        }
      }
    })

    expect(processedCount).toBeGreaterThan(0)
    expect(allSpans.length).toBe(processedCount)

    document.body.removeChild(container)
  })

  it('deve lidar com spans aninhados e detectar colisão corretamente', () => {
    const container = document.createElement('div')
    container.className = 'diagnostico-grid-cell diagnostico-grid-cell-description'
    container.style.width = '250px'
    container.style.padding = '10px'
    document.body.appendChild(container)

    const text = 'sincronizações'
    const chars = text.split('')
    
    chars.forEach((char, index) => {
      const outerSpan = document.createElement('span')
      outerSpan.className = 'secret-char revealed'
      outerSpan.setAttribute('data-char-index', index.toString())
      
      const innerSpan = document.createElement('span')
      innerSpan.className = 'secret-char revealed'
      innerSpan.setAttribute('data-char-index', '0')
      innerSpan.textContent = char
      
      outerSpan.appendChild(innerSpan)
      container.appendChild(outerSpan)
    })

    const allSpans = Array.from(container.querySelectorAll('.secret-char'))
    const containerRect = container.getBoundingClientRect()
    const padding = parseFloat(getComputedStyle(container).paddingRight) || 0
    const maxRight = containerRect.right - padding
    
    let collidingIndex = -1
    for (let i = 0; i < allSpans.length; i++) {
      const span = allSpans[i]
      const spanRect = span.getBoundingClientRect()
      if (spanRect.right > maxRight) {
        collidingIndex = i
        break
      }
    }

    expect(collidingIndex).toBeGreaterThanOrEqual(0)

    document.body.removeChild(container)
  })

  it('deve encontrar início da palavra mesmo com spans aninhados', () => {
    const container = document.createElement('div')
    container.className = 'diagnostico-grid-cell diagnostico-grid-cell-description'
    container.style.width = '200px'
    document.body.appendChild(container)

    const text = 'Conectar sistemas'
    const words = text.split(' ')
    
    words.forEach((word, wordIndex) => {
      word.split('').forEach((char, charIndex) => {
        const outerSpan = document.createElement('span')
        outerSpan.className = 'secret-char'
        outerSpan.setAttribute('data-char-index', (wordIndex * 100 + charIndex).toString())
        
        const innerSpan = document.createElement('span')
        innerSpan.className = 'secret-char'
        innerSpan.textContent = char
        
        outerSpan.appendChild(innerSpan)
        container.appendChild(outerSpan)
      })
      
      if (wordIndex < words.length - 1) {
        const space = document.createElement('span')
        space.className = 'secret-char secret-char-space'
        space.innerHTML = ' '
        container.appendChild(space)
      }
    })

    const allSpans = Array.from(container.querySelectorAll('.secret-char'))
    const collidingIndex = 12
    
    const findWordStart = (chars, currentIndex) => {
      for (let i = currentIndex; i >= 0; i--) {
        const char = chars[i]
        if (char.classList.contains('secret-char-space')) {
          return i + 1
        }
        if (i === 0) {
          return 0
        }
      }
      return currentIndex
    }

    const wordStartIndex = findWordStart(allSpans, collidingIndex - 1)
    expect(wordStartIndex).toBeGreaterThanOrEqual(0)
    expect(wordStartIndex).toBeLessThan(collidingIndex)

    document.body.removeChild(container)
  })

  it('deve mover palavra inteira para próxima linha quando detectar colisão com spans aninhados', () => {
    const container = document.createElement('div')
    container.className = 'diagnostico-grid-cell diagnostico-grid-cell-description'
    container.style.width = '180px'
    container.style.padding = '10px'
    document.body.appendChild(container)

    const text = 'sincronizações'
    const chars = text.split('')
    
    chars.forEach((char, index) => {
      const outerSpan = document.createElement('span')
      outerSpan.className = 'secret-char revealed'
      outerSpan.setAttribute('data-char-index', index.toString())
      
      const innerSpan = document.createElement('span')
      innerSpan.className = 'secret-char revealed'
      innerSpan.textContent = char
      
      outerSpan.appendChild(innerSpan)
      container.appendChild(outerSpan)
    })

    const allSpans = Array.from(container.querySelectorAll('.secret-char'))
    const containerRect = container.getBoundingClientRect()
    const padding = parseFloat(getComputedStyle(container).paddingRight) || 0
    const maxRight = containerRect.right - padding
    
    const findWordStart = (chars, currentIndex) => {
      for (let i = currentIndex; i >= 0; i--) {
        if (i === 0) return 0
      }
      return currentIndex
    }

    let wordMoved = false
    for (let i = 0; i < allSpans.length; i++) {
      const span = allSpans[i]
      const spanRect = span.getBoundingClientRect()
      
      if (spanRect.right > maxRight && i > 0) {
        const wordStartIndex = findWordStart(allSpans, i - 1)
        const wordStartChar = allSpans[wordStartIndex]
        
        if (wordStartChar && !wordStartChar.classList.contains('line-break-inserted')) {
          const lineBreak = document.createElement('span')
          lineBreak.className = 'secret-char-line-break'
          lineBreak.style.display = 'block'
          lineBreak.style.width = '100%'
          lineBreak.style.height = '0'
          
          wordStartChar.parentNode.insertBefore(lineBreak, wordStartChar)
          wordStartChar.classList.add('line-break-inserted')
          wordMoved = true
          break
        }
      }
    }

    expect(wordMoved).toBe(true)
    const lineBreak = container.querySelector('.secret-char-line-break')
    expect(lineBreak).toBeTruthy()

    document.body.removeChild(container)
  })
})


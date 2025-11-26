import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import SecretAgentReveal from './SecretAgentReveal'

describe('SecretAgentReveal - Word Breaking', () => {
  it('should group characters into words to prevent breaking inside words', () => {
    const { container } = render(
      <SecretAgentReveal>
        <p>Lab42 Initiative</p>
      </SecretAgentReveal>
    )

    // Check for secret-word wrappers
    const words = container.querySelectorAll('.secret-word')
    expect(words.length).toBeGreaterThan(0)
    
    // "Lab42" should be in one word wrapper
    const firstWord = words[0]
    expect(firstWord.textContent).toBe('Lab42')
    expect(firstWord.className).toContain('secret-word')
    
    // "Initiative" should be in another
    const secondWord = words[1]
    expect(secondWord.textContent).toBe('Initiative')
  })

  it('should maintain individual secret-char spans inside secret-word', () => {
    const { container } = render(
      <SecretAgentReveal>
        <p>Test</p>
      </SecretAgentReveal>
    )

    const word = container.querySelector('.secret-word')
    expect(word).toBeTruthy()
    
    const chars = word.querySelectorAll('.secret-char')
    expect(chars.length).toBe(4)
    expect(chars[0].textContent).toBe('T')
    expect(chars[1].textContent).toBe('e')
    expect(chars[2].textContent).toBe('s')
    expect(chars[3].textContent).toBe('t')
  })

  it('should preserve spaces between words as individual secret-char spans outside of secret-word', () => {
    const { container } = render(
      <SecretAgentReveal>
        <p>Hello World</p>
      </SecretAgentReveal>
    )
    
    // The p tag content is replaced by the span structure
    // We need to find the container where the replacement happened.
    // SecretAgentReveal renders children inside .secret-agent-content
    // inside that, the <p> tag is preserved but its content is replaced.
    const p = container.querySelector('p')
    expect(p).toBeTruthy()

    const children = Array.from(p.children)
    
    // Should find:
    // 1. secret-word (Hello)
    // 2. secret-char (space)
    // 3. secret-word (World)
    
    const firstWord = children.find(c => c.textContent === 'Hello')
    expect(firstWord).toBeTruthy()
    expect(firstWord.classList.contains('secret-word')).toBe(true)
    
    const firstWordIndex = children.indexOf(firstWord)
    const spaceSpan = children[firstWordIndex + 1]
    
    expect(spaceSpan).toBeTruthy()
    expect(spaceSpan.classList.contains('secret-char')).toBe(true)
    expect(spaceSpan.classList.contains('secret-word')).toBe(false) // Space should NOT be inside a word wrapper
    expect(spaceSpan.innerHTML).toBe(' ') // Should be a normal space for wrapping
    
    const secondWord = children[firstWordIndex + 2]
    expect(secondWord).toBeTruthy()
    expect(secondWord.textContent).toBe('World')
    expect(secondWord.classList.contains('secret-word')).toBe(true)
  })
})

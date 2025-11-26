import { describe, it, expect, afterEach } from 'vitest'
import { render, cleanup, waitFor } from '@testing-library/react'
import SecretAgentReveal from './SecretAgentReveal'

describe('SecretAgentReveal - Espaçamento entre Palavras', () => {
  afterEach(() => {
    cleanup()
  })

  it('deve renderizar espaços como caracteres de espaço normal para permitir controle via CSS', async () => {
    const text = 'Teste de espaçamento'
    const { container } = render(
      <SecretAgentReveal>
        <p>{text}</p>
      </SecretAgentReveal>
    )

    // Wait for the effect to process the text and create spans
    await waitFor(() => {
      const chars = container.querySelectorAll('.secret-char')
      expect(chars.length).toBeGreaterThan(0)
    })

    const allSpans = Array.from(container.querySelectorAll('.secret-char'))
    
    // Filter spans that look like spaces
    const spaceSpans = allSpans.filter(span => 
      span.textContent === '\u00A0' || span.textContent === ' '
    )
    
    expect(spaceSpans.length).toBeGreaterThan(0)

    // Verify no NBSP
    const nbsps = spaceSpans.filter(span => span.textContent === '\u00A0')
    expect(nbsps.length).toBe(0)

    // Verify white-space: pre
    expect(spaceSpans.every(span => span.style.whiteSpace === 'pre')).toBe(true)
  })
})

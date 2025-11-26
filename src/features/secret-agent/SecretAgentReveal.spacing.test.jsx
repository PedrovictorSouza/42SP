import { describe, it, expect, afterEach } from 'vitest'
import { render, cleanup } from '@testing-library/react'
import SecretAgentReveal from './SecretAgentReveal'

describe('SecretAgentReveal - Espaçamento entre Palavras', () => {
  afterEach(() => {
    cleanup()
  })

  it('deve renderizar espaços como caracteres de espaço normal para permitir controle via CSS', () => {
    const text = 'Teste de espaçamento'
    const { container } = render(
      <SecretAgentReveal>
        <p>{text}</p>
      </SecretAgentReveal>
    )

    const allSpans = Array.from(container.querySelectorAll('.secret-char'))
    // Filter spans that look like spaces (either normal space or nbsp)
    // Note: checking textContent for nbsp (\u00A0) or space (' ')
    const spaceSpans = allSpans.filter(span => 
      span.textContent === '\u00A0' || span.textContent === ' '
    )
    
    // We assume there are spaces in the input text
    expect(spaceSpans.length).toBeGreaterThan(0)

    // We verify that NO space is rendered as Non-Breaking Space (\u00A0)
    // because NBSP creates fixed spacing issues and ignores some CSS spacing rules.
    const nbsps = spaceSpans.filter(span => span.textContent === '\u00A0')
    
    // This expectation is expected to FAIL currently, reproducing the issue
    expect(nbsps.length).toBe(0)
  })
})

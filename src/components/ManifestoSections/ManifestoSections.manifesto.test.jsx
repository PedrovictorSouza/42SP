import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ManifestoSections from './ManifestoSections'
import { getManifestoText } from '@/data/manifesto'

// Mocks
vi.mock('../ScrollSection/ScrollSection', () => ({
  default: ({ text, highlightText }) => (
    <div data-testid="scroll-section">
      <div data-testid="highlight">{highlightText}</div>
      <div data-testid="text">{text}</div>
    </div>
  )
}))
vi.mock('../Accordion/SecretAgentReveal', () => ({
  default: ({ children }) => <div data-testid="reveal">{children}</div>
}))
vi.mock('../../assets/Jellyfish-1.png', () => ({ default: 'mock-img' }))

describe('ManifestoSections Integration with Manifesto Data', () => {
  it('should render content from manifesto json', () => {
    render(<ManifestoSections />)

    const aboutSchool = getManifestoText('about.school_definition')
    const missionDiagnosis = getManifestoText('mission.diagnosis')
    
    // Verify highlight text matches JSON
    expect(screen.getByText(aboutSchool)).toBeInTheDocument()
    
    // Verify mission text matches JSON
    expect(screen.getByText(missionDiagnosis)).toBeInTheDocument()
  })
})


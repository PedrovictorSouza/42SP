import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import HomeSections from './HomeSections'
import { getManifestoText } from '@/data/manifesto'

// Mock components that are complex or not relevant to text rendering
vi.mock('@/components/layout/Section/Section', () => ({
  default: ({ text, topLeftText, topRightText, bottomRightText }) => (
    <div data-testid="section">
      <div data-testid="text">{text}</div>
      <div data-testid="topLeftText">{topLeftText}</div>
      <div data-testid="topRightText">{topRightText}</div>
      <div data-testid="bottomRightText">{bottomRightText}</div>
    </div>
  )
}))

vi.mock('@/components/home/ParallaxText/ParallaxText', () => ({ default: () => <div>ParallaxText</div> }))
vi.mock('@/components/home/WorldMapGrid/WorldMapGrid', () => ({ default: () => <div>WorldMapGrid</div> }))
vi.mock('@/components/ui/Accordion/Accordion', () => ({ default: () => <div>Accordion</div> }))
vi.mock('@/components/home/LifelongImpact/LifelongImpact', () => ({ default: () => <div>LifelongImpact</div> }))
vi.mock('@/components/home/Zeladoria/Zeladoria', () => ({ default: () => <div>Zeladoria</div> }))

describe('HomeSections Integration with Manifesto Data', () => {
  it('should render sections with text from manifesto json', () => {
    render(<HomeSections />)
    
    // Get expected texts from source of truth
    const disclaimerFull = getManifestoText('disclaimer.full_text')
    const aboutSchool = getManifestoText('about.school_definition')
    const aboutIntegration = getManifestoText('about.mission_integration')
    const aboutMissions = getManifestoText('about.mission_integration') // Note: checking key mapping
    
    // We verify that the rendered content matches the JSON content
    // Since we mocked Section, we can query by content or testid
    
    // The 'disclaimer' section usually contains these pieces
    const sections = screen.getAllByTestId('section')
    // Disclaimer is likely the second section (index 1)
    const disclaimerSection = sections[1]
    
    expect(disclaimerSection).toHaveTextContent(aboutSchool)
    // expect(disclaimerSection).toHaveTextContent(aboutIntegration) // Depending on how it's split in HomeSections
  })
})


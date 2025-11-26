import { describe, it, expect, beforeAll } from 'vitest'
import { render } from '@testing-library/react'
import React from 'react'
import { vi } from 'vitest'

// Mocking components to focus on DOM structure of the text
vi.mock('@/features/secret-agent/SecretAgentReveal', () => ({
  default: ({ children }) => <div className="secret-agent-reveal">{children}</div>
}))

vi.mock('@/components/layout/Section/CascadeText/CascadeText', () => ({
  default: ({ tag: Tag = 'p', className, text }) => <Tag className={className}>{text}</Tag>
}))

vi.mock('@/features/home/hooks/useParallax', () => ({
  useParallax: () => {}
}))

vi.mock('@/features/home/hooks/useScrollDetection', () => ({
  useScrollDetection: () => true
}))

vi.mock('../ParallaxNumbers/ParallaxNumbers', () => ({
  default: () => <div>Numbers</div>
}))

vi.mock('@/components/layout/Section/AnimatedTextBackground', () => ({
  default: () => <div>Bg</div>
}))

// Import components to test
import ParallaxText from '@/components/home/ParallaxText/ParallaxText'
import LayoutSection from '@/components/layout/Section/Section'
import LegacySection from '@/components/Section/Section'

describe('Hero Description Heading Tag', () => {
  it('ParallaxText should render hero-description as H3', () => {
    const { container } = render(<ParallaxText />)
    // Log html to debug
    console.log(container.innerHTML)
    const heroDesc = container.querySelector('.hero-description')
    expect(heroDesc).not.toBeNull()
    expect(heroDesc.tagName).toBe('H3')
  })

  it('Layout Section (consoleStyle=true) should render hero-description as H3', () => {
    const { container } = render(
      <LayoutSection 
        id="test" 
        topLeftText="Hero Text" 
        consoleStyle={true} 
        gridLayout={true} 
      />
    )
    const heroDesc = container.querySelector('.hero-description')
    expect(heroDesc).not.toBeNull()
    expect(heroDesc.tagName).toBe('H3')
  })

  it('Layout Section (consoleStyle=false) should render hero-description as H3', () => {
    const { container } = render(
      <LayoutSection 
        id="test" 
        topLeftText="Hero Text" 
        consoleStyle={false} 
        gridLayout={true} 
      />
    )
    const heroDesc = container.querySelector('.hero-description')
    expect(heroDesc).not.toBeNull()
    expect(heroDesc.tagName).toBe('H3')
  })

  it('Legacy Section (consoleStyle=false) should render hero-description as H3', () => {
     const { container } = render(
      <LegacySection 
        id="disclaimer" // Legacy section usually checks for specific IDs
        topLeftText="Hero Text" 
        consoleStyle={false} 
        gridLayout={true} 
      />
    )
    const heroDesc = container.querySelector('.hero-description')
    expect(heroDesc).not.toBeNull()
    expect(heroDesc.tagName).toBe('H3')
  })
})

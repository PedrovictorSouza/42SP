import { describe, it, expect, vi } from 'vitest'
import { render } from '@testing-library/react'
import HomeSections from './HomeSections'
import React from 'react'

// Mock child components
vi.mock('@/components/layout/Section/Section', () => ({
  default: () => <div data-testid="section">Section</div>
}))
vi.mock('@/components/home/ParallaxText/ParallaxText', () => ({ default: () => <div>Header</div> }))
vi.mock('@/components/home/WorldMapGrid/WorldMapGrid', () => ({ default: () => <div>WorldMap</div> }))
vi.mock('@/components/ui/Accordion/Accordion', () => ({ default: () => <div>Accordion</div> }))
vi.mock('@/components/home/LifelongImpact/LifelongImpact', () => ({ default: () => <div>LifelongImpact</div> }))
vi.mock('@/components/home/Zeladoria/Zeladoria', () => ({ default: () => <div>Zeladoria</div> }))

// Mock manifesto data
vi.mock('@/data/manifesto', () => ({
  getManifestoText: () => 'Mock Text'
}))

describe('HomeSections', () => {
  it('should use stable ID as key for sections instead of index', () => {
    // We need to spy on React.createElement or inspect the fiber nodes to verify keys strictly
    // Alternatively, we can inspect the calls to the mocked Section component if we pass the key prop down?
    // React doesn't pass 'key' as a prop to the component instance.
    // However, we can verify the key usage by inspecting the rendered VDOM or by mocking the map function if possible.
    
    // A robust way in testing-library is hard because keys are internal to React.
    // But we can check if re-rendering with different order preserves state (integration test).
    // OR, for a unit test enforcing the practice:
    
    const createElementSpy = vi.spyOn(React, 'createElement')
    
    render(<HomeSections />)
    
    // Filter calls that create the Section component
    // Note: This relies on how JSX compiles. 
    // The most reliable check for "key usage" in a test environment without deep fiber access
    // is to ensure the code logic uses the id.
    
    // Let's inspect the actual HomeSections component code via string analysis for a strict regression test 
    // OR create a scenario where index-key fails.
    
    // Since the prompt asks to "verify that each item receives key based on id", 
    // scanning the React element tree returned by the component function is possible if we call it directly.
    
    // Render the component function directly (not via React.render) to inspect props
    const result = HomeSections()
    
    // result is a Fragment containing an array of Section elements
    const children = result.props.children
    
    // We expect children to be an array
    expect(Array.isArray(children)).toBe(true)
    
    // Each child should have a key that is NOT a number (index) but a string (id)
    children.forEach((child, index) => {
      // If key is index, it will likely be the index number or "0", "1". 
      // If key is id, it will be "home", "disclaimer", etc.
      
      // Using index as key results in key being '0', '1', etc. cast to string, or int.
      // Using id results in 'home', 'disclaimer'.
      
      // Failure condition: Key equals the index (stringified or number)
      const isIndexKey = child.key === String(index) || child.key === index
      
      if (isIndexKey) {
        throw new Error(`Found section using index as key: ${child.key}. Should use section ID.`)
      }
      
      // Success condition: Key should match the section ID
      // We can't easily access the 'id' from the child props here unless we peek into props
      const expectedId = child.props.id
      expect(child.key).toBe(expectedId)
    })
    
    createElementSpy.mockRestore()
  })
})


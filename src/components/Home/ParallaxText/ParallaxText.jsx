import { useRef } from 'react'
import { useParallax } from '../hooks/useParallax'
import ParallaxNumbers from '../ParallaxNumbers/ParallaxNumbers'
import SecretAgentReveal from '../../Accordion/SecretAgentReveal'
import './ParallaxText.css'

function ParallaxText({ labText = 'LAB' }) {
  const containerRef = useRef(null)
  const labTextRef = useRef(null)
  const developingFuturesRef = useRef(null)

  const textRefs = [labTextRef, developingFuturesRef]
  const textParallaxSpeed = 0.4
  const parallaxSpeeds = [textParallaxSpeed, textParallaxSpeed]

  useParallax(textRefs, parallaxSpeeds)

  return (
    <div ref={containerRef} className="numbers-42-container">
      <div className="lab-42-wrapper">
        <h1 
          ref={labTextRef} 
          className="lab-text"
        >
          {labText}
        </h1>
        <ParallaxNumbers />
      </div>
      <SecretAgentReveal>
        <p ref={developingFuturesRef} className="developing-futures-text">
          DEVELOPING<br />FUTURES
        </p>
      </SecretAgentReveal>
      <div className="scroll-indicator">
        <svg 
          className="scroll-arrow" 
          width="72" 
          height="72" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M7 10L12 15L17 10" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="butt" 
            strokeLinejoin="miter"
          />
        </svg>
      </div>
    </div>
  )
}

export default ParallaxText


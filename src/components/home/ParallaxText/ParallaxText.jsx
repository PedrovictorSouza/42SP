import { useRef } from 'react'
import { useParallax } from '@/features/home/hooks/useParallax'
import ParallaxNumbers from '../ParallaxNumbers/ParallaxNumbers'
import SecretAgentReveal from '@/features/secret-agent/SecretAgentReveal'
import './ParallaxText.css'
import '@/styles/heroDescription.css'

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
          className="lab-text special-gothic-heading-hero"
        >
          {labText}
        </h1>
        <ParallaxNumbers />
      </div>
      <SecretAgentReveal>
        <div className="hero-text-container">
          <p ref={developingFuturesRef} className="developing-futures-text">
            DEVELOPING<br />FUTURES
          </p>
          <h3 className="hero-description">
            O Lab42 é uma iniciativa da 42 São Paulo, com apoio da Mastertech. Funciona como um laboratório de inovação aplicada que transforma desafios reais de negócios em soluções digitais desenvolvidas por squads de estudantes da 42SP.
          </h3>
        </div>
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

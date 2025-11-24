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
      <h1 
        ref={labTextRef} 
        className="lab-text"
      >
        {labText}
      </h1>
      <SecretAgentReveal>
        <p ref={developingFuturesRef} className="developing-futures-text">
          DEVELOPING<br />FUTURES
        </p>
        <p className="lab-description-text">
          O Lab42 é uma iniciativa da 42 São Paulo, com apoio da Mastertech. Funciona como um laboratório de inovação aplicada que transforma desafios reais de negócios em soluções digitais desenvolvidas por squads de estudantes da 42SP.
        </p>
      </SecretAgentReveal>
      <ParallaxNumbers />
    </div>
  )
}

export default ParallaxText


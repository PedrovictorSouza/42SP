import { useRef } from 'react'
import { useParallax } from '../hooks/useParallax'
import ParallaxNumbers from '../ParallaxNumbers/ParallaxNumbers'
import './ParallaxText.css'

function ParallaxText({ labText = 'LAB', developingText = 'DEVELOPING FUTURES' }) {
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
      <p ref={developingFuturesRef} className="developing-futures-text">
        DEVELOPING<br />FUTURES
      </p>
      <ParallaxNumbers />
    </div>
  )
}

export default ParallaxText


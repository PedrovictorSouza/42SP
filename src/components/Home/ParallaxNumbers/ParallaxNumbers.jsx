import { useRef } from 'react'
import { useParallax } from '../hooks/useParallax'
import './ParallaxNumbers.css'

function ParallaxNumbers() {
  const number42Refs = [
    useRef(null),
    useRef(null),
    useRef(null)
  ]

  const parallaxSpeeds = [0.3, 0.5, 0.7]
  useParallax(number42Refs, parallaxSpeeds)

  return (
    <div className="numbers-wrapper">
      <div 
        ref={number42Refs[0]}
        className="number-42 number-42-1"
      >
        42
      </div>
      <div
        ref={number42Refs[1]}
        className="number-42 number-42-2"
      >
        42
      </div>
      <div
        ref={number42Refs[2]}
        className="number-42 number-42-3"
      >
        42
      </div>
    </div>
  )
}

export default ParallaxNumbers


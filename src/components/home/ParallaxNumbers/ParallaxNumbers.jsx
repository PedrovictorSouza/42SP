import { useRef } from 'react'
import { useParallax } from '@/features/home/hooks/useParallax'
import './ParallaxNumbers.css'

function ParallaxNumbers() {
  // Create individual refs
  const ref1 = useRef(null)
  const ref2 = useRef(null)
  const ref3 = useRef(null)
  
  // Group them for parallax hook
  // Since useParallax takes an array of ref objects, not ref values, this is stable
  const number42Refs = [ref1, ref2, ref3]

  const parallaxSpeeds = [0.3, 0.5, 0.7]
  useParallax(number42Refs, parallaxSpeeds)

  return (
    <div className="numbers-wrapper">
      <div 
        ref={ref1}
        className="number-42 number-42-1"
      >
        42
      </div>
      <div
        ref={ref2}
        className="number-42 number-42-2"
      >
        42
      </div>
      <div
        ref={ref3}
        className="number-42 number-42-3"
      >
        42
      </div>
    </div>
  )
}

export default ParallaxNumbers


import { useRef } from 'react'
import { useParallax } from '../hooks/useParallax'
import './ParallaxIgnition.css'

function ParallaxIgnition() {
  const ignition1Ref = useRef(null)
  const ignition2Ref = useRef(null)
  const ignition3Ref = useRef(null)

  const ignitionRefs = [ignition1Ref, ignition2Ref, ignition3Ref]
  const parallaxSpeeds = [0.3, 0.4, 0.5]

  useParallax(ignitionRefs, parallaxSpeeds)

  return (
    <div className="ignition-wrapper">
      <div ref={ignition1Ref} className="ignition-text ignition-1" data-text="IGN">
        IGN
      </div>
      <div ref={ignition2Ref} className="ignition-text ignition-2" data-text="ITI">
        ITI
      </div>
      <div ref={ignition3Ref} className="ignition-text ignition-3" data-text="ON">
        ON
      </div>
    </div>
  )
}

export default ParallaxIgnition


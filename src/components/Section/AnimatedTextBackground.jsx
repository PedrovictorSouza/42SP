import { useEffect, useRef } from 'react'
import './AnimatedTextBackground.css'

function AnimatedTextBackground({ text = 'ignition', opacity = 0.3 }) {
  const pRef = useRef(null)
  const letters = text.split('')
  const letterCount = letters.length

  useEffect(() => {
    if (pRef.current) {
      const items = pRef.current.querySelectorAll('i')
      items.forEach((item, index) => {
        item.style.setProperty('--sibling-index', index)
        item.style.setProperty('--sibling-count', letterCount)
      })
    }
  }, [letterCount])

  return (
    <main className="animated-text-background" style={{ '--opacity': opacity }}>
      <p ref={pRef} data-text-start="no" data-text-end={text}>
        {letters.map((letter, i) => (
          <i key={i} data-text-start="no" data-text-end={letter}></i>
        ))}
      </p>
    </main>
  )
}

export default AnimatedTextBackground


import { useEffect, useRef, useState } from 'react'
import './ScrollSection.css'
import { useASCIIShift } from '../ScrollText/useASCIIShift'

const glitchChars = '.,·-─~+:;=*π""┐┌┘┴┬╗╔╝╚╬╠╣╩╦║░▒▓█▄▀▌▐■!?&#$@0123456789*'

function ScrollSection({ text, title, delay = 0 }) {
  const containerRef = useRef(null)
  const textRef = useRef(null)
  const titleRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)
  const autoGlitchIntervalRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let timeoutId = null

    const handleScroll = () => {
      const rect = container.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementTop = rect.top
      const elementBottom = rect.bottom
      const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop
      
      const triggerPoint = windowHeight * 0.9
      const isInViewport = elementTop < triggerPoint && elementBottom > -200
      
      if (isInViewport) {
        if (!isVisible) {
          if (timeoutId) clearTimeout(timeoutId)
          timeoutId = setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      } else if (scrollY === 0 && elementTop > windowHeight * 1.5) {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    handleScroll()

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [delay, isVisible])

  useEffect(() => {
    if (!textRef.current || !isVisible) return

    const triggerAutoGlitch = () => {
      if (!textRef.current) return

      const element = textRef.current
      const originalText = element.textContent
      const chars = originalText.split('')
      
      const glitchCount = Math.floor(Math.random() * 5) + 2
      const glitchPositions = []
      
      for (let i = 0; i < glitchCount; i++) {
        const pos = Math.floor(Math.random() * chars.length)
        if (chars[pos] !== ' ') {
          glitchPositions.push(pos)
        }
      }

      const glitchDuration = 200 + Math.random() * 300
      const startTime = Date.now()

      const animate = () => {
        const elapsed = Date.now() - startTime
        if (elapsed > glitchDuration) {
          element.textContent = originalText
          return
        }

        const newChars = [...chars]
        glitchPositions.forEach(pos => {
          if (newChars[pos] !== ' ') {
            const charIdx = Math.floor(Math.random() * glitchChars.length)
            newChars[pos] = glitchChars[charIdx]
          }
        })
        
        element.textContent = newChars.join('')
        requestAnimationFrame(animate)
      }

      requestAnimationFrame(animate)
    }

    const scheduleNextGlitch = () => {
      const delay = 3000 + Math.random() * 5000
      autoGlitchIntervalRef.current = setTimeout(() => {
        triggerAutoGlitch()
        scheduleNextGlitch()
      }, delay)
    }

    scheduleNextGlitch()

    return () => {
      if (autoGlitchIntervalRef.current) {
        clearTimeout(autoGlitchIntervalRef.current)
      }
    }
  }, [isVisible])

  useASCIIShift(isVisible ? textRef.current : null, { dur: 1000, spread: 1 })

  return (
    <div ref={containerRef} className="scroll-section-container">
      {title && (
        <h2 ref={titleRef} className={`scroll-section-title ${isVisible ? 'visible' : ''}`}>{title}</h2>
      )}
      <div ref={textRef} className={`scroll-section-text ${isVisible ? 'visible' : ''}`}>
        {text}
      </div>
    </div>
  )
}

export default ScrollSection


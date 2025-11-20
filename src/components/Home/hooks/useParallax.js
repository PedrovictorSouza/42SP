import { useEffect, useRef } from 'react'

export function useParallax(refs, parallaxSpeeds) {
  const refsRef = useRef(refs)
  const speedsRef = useRef(parallaxSpeeds)

  useEffect(() => {
    refsRef.current = refs
    speedsRef.current = parallaxSpeeds
  }, [refs, parallaxSpeeds])

  useEffect(() => {
    const baseTransformsY = [0, 15, 30]
    const baseTransformsX = [0, 5, 10]

    const handleScroll = () => {
      const scrolled = window.scrollY || window.pageYOffset || document.documentElement.scrollTop

      refsRef.current.forEach((ref, index) => {
        if (ref?.current) {
          const speed = speedsRef.current[index] || 0.5
          const offsetY = scrolled * speed
          const offsetX = scrolled * speed * 0.3
          const baseY = baseTransformsY[index] || 0
          const baseX = baseTransformsX[index] || 0
          ref.current.style.transform = `translateY(${baseY + offsetY}px) translateX(${baseX + offsetX}px) rotateY(-45deg)`
        }
      })
    }

    const handleMouseMove = (e) => {
      const vh = window.innerHeight
      const mouseY = e.clientY
      const normalizedY = (mouseY / vh - 0.5) * 2
      
      refsRef.current.forEach((ref, index) => {
        if (ref?.current) {
          const speed = speedsRef.current[index] || 0.5
          const offsetY = normalizedY * 100 * speed
          const offsetX = normalizedY * 30 * speed
          const baseY = baseTransformsY[index] || 0
          const baseX = baseTransformsX[index] || 0
          ref.current.style.transform = `translateY(${baseY + offsetY}px) translateX(${baseX + offsetX}px) rotateY(-45deg)`
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])
}


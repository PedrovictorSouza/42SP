import { useEffect, useRef } from 'react'

export function useParallax(refs, parallaxSpeeds, options = {}) {
  const refsRef = useRef(refs)
  const speedsRef = useRef(parallaxSpeeds)
  const optionsRef = useRef(options)

  useEffect(() => {
    refsRef.current = refs
    speedsRef.current = parallaxSpeeds
  }, [refs, parallaxSpeeds])

  useEffect(() => {
    optionsRef.current = options
  }, [options])

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY || window.pageYOffset || document.documentElement.scrollTop
      const settings = optionsRef.current || {}
      const baseTransformsY = settings.baseTransformsY || [0, 15, 30]
      const baseTransformsX = settings.baseTransformsX || [0, 5, 10]
      const rotation = settings.rotation ?? '-45deg'
      const scrollYMultiplier = settings.scrollYMultiplier ?? 1
      const scrollXMultiplier = settings.scrollXMultiplier ?? 0.3

      refsRef.current.forEach((ref, index) => {
        if (ref?.current) {
          const speed = speedsRef.current[index] || 0.5
          const offsetY = scrolled * speed * scrollYMultiplier
          const offsetX = scrolled * speed * scrollXMultiplier
          const baseY = baseTransformsY[index] || 0
          const baseX = baseTransformsX[index] || 0
          const rotationTransform = rotation ? ` rotateY(${rotation})` : ''
          ref.current.style.transform = `translateY(${baseY + offsetY}px) translateX(${baseX + offsetX}px)${rotationTransform}`
        }
      })
    }

    const handleMouseMove = (e) => {
      const vh = window.innerHeight
      const mouseY = e.clientY
      const normalizedY = (mouseY / vh - 0.5) * 2
      const settings = optionsRef.current || {}
      const baseTransformsY = settings.baseTransformsY || [0, 15, 30]
      const baseTransformsX = settings.baseTransformsX || [0, 5, 10]
      const rotation = settings.rotation ?? '-45deg'
      const mouseYMultiplier = settings.mouseYMultiplier ?? 100
      const mouseXMultiplier = settings.mouseXMultiplier ?? 30

      refsRef.current.forEach((ref, index) => {
        if (ref?.current) {
          const speed = speedsRef.current[index] || 0.5
          const offsetY = normalizedY * mouseYMultiplier * speed
          const offsetX = normalizedY * mouseXMultiplier * speed
          const baseY = baseTransformsY[index] || 0
          const baseX = baseTransformsX[index] || 0
          const rotationTransform = rotation ? ` rotateY(${rotation})` : ''
          ref.current.style.transform = `translateY(${baseY + offsetY}px) translateX(${baseX + offsetX}px)${rotationTransform}`
        }
      })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])
}


import { useEffect, useRef, useState } from 'react'

export function useScrollDetection(ref, options = {}) {
  const {
    delay = 0,
    offsetTop = 100,
    offsetBottom = -100,
    triggerPoint = null,
    autoShow = false,
    dependencies = []
  } = options

  const [isVisible, setIsVisible] = useState(autoShow)
  const timeoutRef = useRef(null)
  const isVisibleRef = useRef(autoShow)

  useEffect(() => {
    isVisibleRef.current = isVisible
  }, [isVisible])

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const handleScroll = () => {
      const rect = container.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementTop = rect.top
      const elementBottom = rect.bottom
      
      const trigger = triggerPoint !== null 
        ? triggerPoint 
        : windowHeight + offsetTop
      
      const isInViewport = elementTop < trigger && elementBottom > offsetBottom
      
      if (isInViewport) {
        if (!isVisibleRef.current) {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
          }
          timeoutRef.current = setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      } else {
        const scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop
        if (scrollY === 0 && elementTop > windowHeight * 1.5) {
          setIsVisible(false)
        } else if (elementTop > windowHeight * 2) {
          setIsVisible(false)
        }
      }
    }

    if (autoShow) {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true)
      }, delay)
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true })
      window.addEventListener('resize', handleScroll, { passive: true })
      handleScroll()
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      if (!autoShow) {
        window.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', handleScroll)
      }
    }
  }, [ref, delay, offsetTop, offsetBottom, triggerPoint, autoShow, ...dependencies])

  return isVisible
}


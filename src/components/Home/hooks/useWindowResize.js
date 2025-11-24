import { useEffect, useState } from 'react'

export function useWindowResize(options = {}) {
  const {
    mobileBreakpoint = 768,
    onResize = null
  } = options

  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
    isMobile: typeof window !== 'undefined' ? window.innerWidth < mobileBreakpoint : false
  })

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const isMobile = width < mobileBreakpoint

      setWindowSize({ width, height, isMobile })
      
      if (onResize) {
        onResize({ width, height, isMobile })
      }
    }

    window.addEventListener('resize', handleResize)
    handleResize()

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [mobileBreakpoint, onResize])

  return windowSize
}


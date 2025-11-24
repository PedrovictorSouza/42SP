import { useState, useEffect, useRef } from 'react'
import './ScrollProgressBar.css'

function ScrollProgressBar() {
  const [progress, setProgress] = useState(0)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [pathLength, setPathLength] = useState(0)
  const [rocketPosition, setRocketPosition] = useState({ x: 0, y: 0, angle: 0 })
  const pathRef = useRef(null)

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions, { passive: true })

    return () => {
      window.removeEventListener('resize', updateDimensions)
    }
  }, [])

  useEffect(() => {
    const calculateProgress = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      
      const footer = document.querySelector('.footer')
      let footerTop = documentHeight - windowHeight
      
      if (footer) {
        const footerRect = footer.getBoundingClientRect()
        footerTop = scrollTop + footerRect.top
      }
      
      const totalScrollable = footerTop
      const currentProgress = totalScrollable > 0 
        ? Math.min((scrollTop / totalScrollable) * 100, 100)
        : 0
      
      setProgress(currentProgress)
    }

    window.addEventListener('scroll', calculateProgress, { passive: true })
    calculateProgress()

    return () => {
      window.removeEventListener('scroll', calculateProgress)
    }
  }, [])

  const getPathD = () => {
    if (dimensions.width === 0 || dimensions.height === 0) return ''
    return `M 0 ${dimensions.height} Q ${dimensions.width / 2} ${dimensions.height * 0.3} ${dimensions.width} 0`
  }

  useEffect(() => {
    if (pathRef.current && dimensions.width > 0 && dimensions.height > 0) {
      const length = pathRef.current.getTotalLength()
      setPathLength(length)
      pathRef.current.style.strokeDasharray = length
    }
  }, [dimensions])

  useEffect(() => {
    if (pathRef.current && pathLength > 0 && progress > 0) {
      const rocketSize = 75
      const rocketTailOffset = rocketSize * 0.6
      const distance = (progress / 100) * pathLength
      const point = pathRef.current.getPointAtLength(distance)
      
      let angle = 0
      let pointBefore = point
      if (distance > 0 && distance < pathLength) {
        pointBefore = pathRef.current.getPointAtLength(Math.max(0, distance - 1))
        angle = Math.atan2(point.y - pointBefore.y, point.x - pointBefore.x) * (180 / Math.PI)
      } else if (distance >= pathLength) {
        pointBefore = pathRef.current.getPointAtLength(pathLength - 1)
        angle = Math.atan2(point.y - pointBefore.y, point.x - pointBefore.x) * (180 / Math.PI)
      }
      
      const angleRad = angle * (Math.PI / 180)
      const rocketX = point.x - Math.cos(angleRad) * rocketTailOffset
      const rocketY = point.y - Math.sin(angleRad) * rocketTailOffset
      
      setRocketPosition({
        x: rocketX,
        y: rocketY,
        angle: angle
      })
    } else if (progress === 0) {
      setRocketPosition({
        x: 0,
        y: dimensions.height,
        angle: 0
      })
    }
  }, [progress, pathLength, dimensions])

  const rocketSize = 75
  const rocketTailOffset = rocketSize * 0.6
  const dashOffset = pathLength - (progress / 100) * pathLength + rocketTailOffset

  if (dimensions.width === 0 || dimensions.height === 0) {
    return null
  }

  return (
    <div className="scroll-progress-bar-container">
      <svg 
        className="scroll-progress-svg" 
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          className="scroll-progress-path"
          d={getPathD()}
          fill="none"
          stroke="rgb(5, 178, 193)"
          strokeWidth="3"
          strokeLinecap="round"
          style={{
            strokeDashoffset: dashOffset
          }}
        />
        {progress > 0 && (
          <>
            <g
              transform={`translate(${rocketPosition.x}, ${rocketPosition.y}) rotate(${rocketPosition.angle + 90})`}
              className="rocket-container"
            >
              <svg
                width={rocketSize}
                height={rocketSize}
                viewBox="0 0 640 1280"
                x={-rocketSize / 2}
                y={-rocketSize / 2}
                className="rocket-svg"
              >
                <g transform="translate(0.000000,1280.000000) scale(0.100000,-0.100000)">
                  <path
                    d="M3180 12575 c0 -193 -2 -225 -15 -225 -13 0 -15 -27 -15 -185 l0 -185 -80 -196 -80 -197 0 -261 0 -261 -46 -220 c-25 -121 -64 -305 -87 -410 l-41 -190 -5 -910 -6 -910 -92 -348 -93 -348 0 -3317 0 -3317 -130 -130 -130 -130 0 -112 0 -113 131 0 130 0 -6 -54 -7 -53 33 -12 c17 -6 40 -11 50 -11 24 0 25 1 -15 -78 -18 -37 -36 -91 -40 -119 -6 -45 -50 -210 -71 -265 -7 -17 18 -18 434 -18 l441 0 0 28 c0 15 -9 67 -20 117 -19 85 -20 92 -4 127 17 37 16 39 -15 108 -38 85 -39 100 -7 100 14 0 27 4 30 8 2 4 -6 34 -19 65 l-23 57 70 0 70 0 -7 -65 -7 -64 33 9 c19 6 37 10 41 10 10 0 -14 -65 -55 -145 -32 -64 -33 -72 -20 -92 13 -19 12 -32 -6 -117 -12 -53 -21 -107 -21 -121 l0 -25 239 0 239 0 -23 79 c-13 44 -29 115 -36 158 -9 57 -25 100 -56 159 l-44 82 26 19 c25 18 26 19 10 55 -8 21 -15 42 -15 48 0 6 39 10 105 10 l105 0 0 99 0 98 -87 73 c-55 45 -92 84 -100 104 -9 23 -12 852 -12 3420 l-1 3388 -59 202 c-33 110 -78 264 -100 340 l-41 139 0 876 c0 725 -3 889 -15 951 -20 103 -66 320 -114 537 l-41 183 0 272 0 273 -62 170 -63 170 -5 230 c-5 229 -5 230 -27 233 l-23 3 0 215 0 214 -50 0 -50 0 0 -225z m-96 -11992 c-4 -16 -11 -38 -15 -51 -14 -37 -11 -52 11 -52 27 0 26 -20 -5 -110 -30 -89 -31 -100 -4 -100 19 0 20 -4 14 -42 -9 -59 -42 -188 -49 -196 -22 -21 -56 119 -56 227 0 67 -5 90 -30 147 -17 37 -29 68 -28 69 2 2 19 10 40 18 34 15 36 17 28 49 -4 18 -11 41 -15 51 -6 15 0 17 54 17 l61 0 -6 -27z"
                    fill="rgb(5, 178, 193)"
                    stroke="none"
                  />
                </g>
              </svg>
            </g>
            <text
              x={rocketPosition.x + Math.cos((rocketPosition.angle + 90) * (Math.PI / 180)) * (rocketSize / 2 + 15)}
              y={rocketPosition.y + Math.sin((rocketPosition.angle + 90) * (Math.PI / 180)) * (rocketSize / 2 + 15)}
              className="progress-percentage-text"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {Math.round(progress)}%
            </text>
          </>
        )}
      </svg>
    </div>
  )
}

export default ScrollProgressBar


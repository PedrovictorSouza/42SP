import { useEffect, useRef, useState } from 'react'
import './CascadeText.css'
import { useZeladoriaTextStyles } from '../../Zeladoria/useZeladoriaTextStyles'

function getTimestamp(baseTime = null, offsetSeconds = 0) {
  const now = baseTime || new Date()
  const totalSeconds = now.getSeconds() + offsetSeconds
  const seconds = totalSeconds % 60
  const additionalMinutes = Math.floor(totalSeconds / 60)
  const totalMinutes = now.getMinutes() + additionalMinutes
  const minutes = totalMinutes % 60
  const additionalHours = Math.floor(totalMinutes / 60)
  const hours = (now.getHours() + additionalHours) % 24
  
  return `[${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}]`
}

function CascadeText({ text, isVisible, delay = 0, charDelay = 0.02, consoleStyle = false, showTimestamps = false, applyZeladoriaStyles = false }) {
  const [displayedText, setDisplayedText] = useState('')
  const timeoutRef = useRef(null)
  const intervalRef = useRef(null)
  const zeladoriaStyles = applyZeladoriaStyles ? useZeladoriaTextStyles() : null

  useEffect(() => {
    if (!text) {
      setDisplayedText('')
      return
    }

    if (!isVisible) {
      setDisplayedText('')
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    setDisplayedText('')
    
    let processedText = text
    let lines = []
    
    if (consoleStyle) {
      const baseTime = new Date()
      const textLines = text.split('\n').filter(line => line.trim().length > 0)
      if (showTimestamps) {
        lines = textLines.map((line, index) => {
          const timestamp = getTimestamp(baseTime, index * 2)
          return `${timestamp} ${line.trim()}`
        })
      } else {
        lines = textLines.map((line) => line.trim())
      }
      processedText = lines.join('\n')
    }
    
    const allChars = processedText.split('')
    let currentIndex = 0

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    const startDelay = setTimeout(() => {
      const addNextChar = () => {
        if (currentIndex < allChars.length) {
          setDisplayedText(processedText.substring(0, currentIndex + 1))
          currentIndex++
        } else {
          if (intervalRef.current) {
            clearInterval(intervalRef.current)
            intervalRef.current = null
          }
        }
      }

      addNextChar()
      intervalRef.current = setInterval(addNextChar, charDelay * 1000)
    }, delay * 1000)

    timeoutRef.current = startDelay

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [text, isVisible, delay, charDelay, consoleStyle, showTimestamps])

  if (!text) return null

  const style = zeladoriaStyles ? { ...zeladoriaStyles, paddingLeft: 0 } : {}

  return (
    <p 
      className={`cascade-text ${consoleStyle ? 'console-style' : ''}`}
      style={style}
    >
      {displayedText}
    </p>
  )
}

export default CascadeText

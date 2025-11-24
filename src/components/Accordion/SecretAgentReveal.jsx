import { useEffect, useRef, useState } from 'react'
import './SecretAgentReveal.css'

function wrapTextInSpans(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent
    const fragment = document.createDocumentFragment()
    let charIndex = 0
    
    for (let i = 0; i < text.length; i++) {
      const char = text[i]
      if (char.trim() || char === ' ') {
        const span = document.createElement('span')
        span.className = 'secret-char'
        span.setAttribute('data-char-index', charIndex)
        span.textContent = char
        fragment.appendChild(span)
        charIndex++
      } else {
        const span = document.createElement('span')
        span.className = 'secret-char'
        span.setAttribute('data-char-index', charIndex)
        span.textContent = char
        fragment.appendChild(span)
        charIndex++
      }
    }
    
    return fragment
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    const clone = node.cloneNode(false)
    Array.from(node.childNodes).forEach(child => {
      const wrapped = wrapTextInSpans(child)
      if (wrapped) {
        clone.appendChild(wrapped)
      }
    })
    return clone
  }
  return null
}

function SecretAgentReveal({ children }) {
  const containerRef = useRef(null)
  const contentRef = useRef(null)
  const scannerRef = useRef(null)
  const [isRevealing, setIsRevealing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [totalChars, setTotalChars] = useState(0)
  const [scannerPosition, setScannerPosition] = useState({ left: 0, top: 0, height: 0 })

  const updateScannerPosition = (lastRevealedIndex) => {
    if (!contentRef.current || !containerRef.current || !scannerRef.current) return
    
    const chars = contentRef.current.querySelectorAll('.secret-char')
    if (chars.length === 0) return
    
    const targetChar = chars[Math.min(lastRevealedIndex, chars.length - 1)]
    if (!targetChar) return
    
    const containerRect = containerRef.current.getBoundingClientRect()
    const charRect = targetChar.getBoundingClientRect()
    
    const relativeLeft = charRect.left - containerRect.left
    const relativeTop = charRect.top - containerRect.top
    const charWidth = charRect.width
    const charHeight = charRect.height
    const scannerLeft = relativeLeft + charWidth
    const scannerTop = relativeTop
    const scannerHeight = charHeight * 1.2
    
    setScannerPosition({
      left: scannerLeft,
      top: scannerTop,
      height: scannerHeight
    })
  }

  useEffect(() => {
    if (contentRef.current) {
      const originalContent = contentRef.current.cloneNode(true)
      const wrappedContent = wrapTextInSpans(originalContent)
      
      if (wrappedContent) {
        contentRef.current.innerHTML = ''
        contentRef.current.appendChild(wrappedContent)
        
        const chars = contentRef.current.querySelectorAll('.secret-char')
        setTotalChars(chars.length)
        
        chars.forEach((char, index) => {
          char.style.setProperty('--char-index', index)
        })
      }
    }
  }, [children])

  useEffect(() => {
    if (totalChars === 0) return
    
    setIsRevealing(true)
    const scanDuration = 3000
    const startTime = Date.now()
    
    const chars = contentRef.current?.querySelectorAll('.secret-char')
    if (!chars || chars.length === 0) return
    
    setTimeout(() => {
      updateScannerPosition(0)
    }, 50)
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / scanDuration, 1)
      
      const revealedCount = Math.floor(progress * totalChars)
      
      chars.forEach((char, index) => {
        if (index < revealedCount) {
          char.classList.add('revealed')
        }
      })
      
      if (revealedCount > 0) {
        updateScannerPosition(revealedCount - 1)
      } else {
        updateScannerPosition(0)
      }
      
      if (progress >= 1) {
        clearInterval(interval)
        chars.forEach(char => char.classList.add('revealed'))
        updateScannerPosition(chars.length - 1)
        setTimeout(() => {
          setIsComplete(true)
        }, 100)
      }
    }, 16)

    return () => clearInterval(interval)
  }, [totalChars])

  return (
    <div 
      ref={containerRef}
      className={`secret-agent-reveal ${isRevealing ? 'revealing' : ''} ${isComplete ? 'complete' : ''}`}
    >
      <div 
        ref={scannerRef}
        className="secret-agent-scanner"
        style={{
          left: `${scannerPosition.left}px`,
          top: `${scannerPosition.top}px`,
          height: `${scannerPosition.height}px`
        }}
      ></div>
      <div 
        ref={contentRef}
        className="secret-agent-content"
      >
        {children}
      </div>
    </div>
  )
}

export default SecretAgentReveal


import { useEffect, useRef, useState, useCallback } from 'react'
import './SecretAgentReveal.css'

function wrapTextInSpans(node, isInDiagnosticoDescription = false) {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent
    const fragment = document.createDocumentFragment()
    
    // Split text into parts (words and delimiters)
    // We want to preserve spaces to wrap them in spans
    const parts = text.split(/(\s+)/)
    let charIndex = 0
    
    parts.forEach(part => {
      if (!part) return
      
      if (part.match(/^\s+$/)) {
        // Whitespace sequence
        const spaceSpan = document.createElement('span')
        spaceSpan.className = 'secret-char secret-char-space'
        spaceSpan.setAttribute('data-char-index', charIndex)
        
        // Always use a regular space for layout, but wrap it so it can be revealed/animated
        spaceSpan.textContent = part
        
        fragment.appendChild(spaceSpan)
        charIndex += part.length
      } else {
        // Word
        const wordSpan = document.createElement('span')
        wordSpan.className = 'secret-word'
        // white-space: nowrap and display: inline-block are in CSS
        
        for (let i = 0; i < part.length; i++) {
          const char = part[i]
          const span = document.createElement('span')
          span.className = 'secret-char'
          span.setAttribute('data-char-index', charIndex)
          span.textContent = char
          wordSpan.appendChild(span)
          charIndex++
        }
        fragment.appendChild(wordSpan)
      }
    })
    
    return fragment
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    const isDiagnosticoDesc = node.classList?.contains('diagnostico-grid-cell-description') || 
                              node.closest?.('.diagnostico-grid-cell-description')
    const clone = node.cloneNode(false)
    Array.from(node.childNodes).forEach(child => {
      const wrapped = wrapTextInSpans(child, isDiagnosticoDesc || isInDiagnosticoDescription)
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

  const findWordStart = useCallback((chars, currentIndex) => {
    for (let i = currentIndex; i >= 0; i--) {
      const char = chars[i]
      if (char.classList.contains('secret-char-space')) {
        return i + 1
      }
      if (i === 0) {
        return 0
      }
    }
    return currentIndex
  }, [])

  const handleWordWrapping = useCallback(() => {
    if (!contentRef.current || !containerRef.current) return
    
    const isInDiagnosticoDesc = containerRef.current.closest('.diagnostico-grid-cell-description')
    if (!isInDiagnosticoDesc) return
    
    const container = isInDiagnosticoDesc
    const allSpans = Array.from(contentRef.current.querySelectorAll('.secret-char'))
    if (allSpans.length === 0) return
    
    const containerRect = container.getBoundingClientRect()
    const padding = parseFloat(getComputedStyle(container).paddingRight) || 0
    const maxRight = containerRect.right - padding
    
    const getTopLevelSpans = () => {
      return Array.from(contentRef.current.children).filter(child => 
        (child.classList.contains('secret-char') || child.classList.contains('secret-word')) && 
        !child.classList.contains('secret-char-line-break')
      )
    }
    
    let processedIndices = new Set()
    let i = 0
    const topLevelSpans = getTopLevelSpans()
    
    while (i < topLevelSpans.length) {
      if (processedIndices.has(i)) {
        i++
        continue
      }
      
      const span = topLevelSpans[i]
      const spanRect = span.getBoundingClientRect()
      
      if (spanRect.right > maxRight && i > 0) {
        const wordStartIndex = findWordStart(topLevelSpans, i - 1)
        
        if (wordStartIndex < i && !processedIndices.has(wordStartIndex)) {
          const wordStartChar = topLevelSpans[wordStartIndex]
          
          if (wordStartChar && !wordStartChar.classList.contains('line-break-inserted')) {
            const lineBreak = document.createElement('span')
            lineBreak.className = 'secret-char-line-break'
            lineBreak.style.display = 'block'
            lineBreak.style.width = '100%'
            lineBreak.style.height = '0'
            lineBreak.setAttribute('data-line-break', 'true')
            
            wordStartChar.parentNode.insertBefore(lineBreak, wordStartChar)
            wordStartChar.classList.add('line-break-inserted')
            processedIndices.add(wordStartIndex)
            
            const updatedSpans = getTopLevelSpans()
            i = updatedSpans.indexOf(span)
            if (i === -1) break
            continue
          }
        }
      }
      
      processedIndices.add(i)
      i++
    }
  }, [findWordStart])

  const updateScannerPosition = (lastRevealedIndex) => {
    if (!contentRef.current || !containerRef.current || !scannerRef.current) return
    
    const chars = contentRef.current.querySelectorAll('.secret-char:not(.secret-char-line-break)')
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
    if (contentRef.current && containerRef.current) {
      const originalContent = contentRef.current.cloneNode(true)
      const isInDiagnosticoDesc = containerRef.current.closest('.diagnostico-grid-cell-description')
      const wrappedContent = wrapTextInSpans(originalContent, !!isInDiagnosticoDesc)
      
      if (wrappedContent) {
        contentRef.current.innerHTML = ''
        contentRef.current.appendChild(wrappedContent)
        
        const chars = contentRef.current.querySelectorAll('.secret-char:not(.secret-char-line-break)')
        setTotalChars(chars.length)
        
        // IMPORTANT: Letter-spacing invariants
        // - Letter-spacing for headings is defined ONLY in CSS (.special-gothic-heading-*).
        // - Do NOT compute letter-spacing in JS or call getComputedStyle for this.
        // - Do NOT set style.letterSpacing here.
        // Any AI/coder: if you need to fix spacing, edit the CSS utilities, not this file.
        chars.forEach((char, index) => {
          char.style.setProperty('--char-index', index)
        })
        
        if (isInDiagnosticoDesc) {
          setTimeout(() => {
            handleWordWrapping()
          }, 100)
        }
      }
    }
  }, [children, handleWordWrapping])

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

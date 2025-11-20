import React, { useEffect, useRef, useState } from 'react'
import './Section.css'
import { useASCIIShift } from '../ScrollText/useASCIIShift'
import jellyfishImage from '../../assets/Jellyfish-1.png'
import ParallaxIgnition from '../Home/ParallaxIgnition/ParallaxIgnition'
import CascadeText from './CascadeText/CascadeText'

const glitchChars = '.,·-─~+:;=*π""┐┌┘┴┬╗╔╝╚╬╠╣╩╦║░▒▓█▄▀▌▐■!?&#$@0123456789*'

function TextBlock({ text, isVisible, delay, isFirstBlock = false }) {
  const textRef = useRef(null)
  const autoGlitchIntervalRef = useRef(null)

  useASCIIShift(isVisible ? textRef.current : null, { dur: 1000, spread: 1 })

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

  return (
    <div className={`section-text-block ${isFirstBlock ? 'first-block' : ''}`}>
      <div 
        ref={textRef}
        className={`section-text ${isVisible ? 'visible' : ''} ${isFirstBlock ? 'first-text' : ''}`} 
        style={{ transitionDelay: `${delay}s` }}
      >
        {text}
      </div>
    </div>
  )
}

function Section({ text, secondParagraph, delay = 0, backgroundColor, headerContent, twoColumns = false, firstColumnText, secondColumnText, gridLayout = false, topLeftText, topRightText, bottomRightText, backgroundContent, sectionTitle, consoleStyle = false, customContent }) {
  const containerRef = useRef(null)
  const [isVisible, setIsVisible] = useState(!headerContent && !sectionTitle && !customContent)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let timeoutId = null

    const handleScroll = () => {
      const rect = container.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const elementTop = rect.top
      const elementBottom = rect.bottom
      
      const isInViewport = elementTop < windowHeight + 100 && elementBottom > -100
      
      if (isInViewport) {
        if (!isVisible) {
          if (timeoutId) clearTimeout(timeoutId)
          timeoutId = setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      } else if (elementTop > windowHeight * 2) {
        setIsVisible(false)
      }
    }

    if (sectionTitle || customContent) {
      setTimeout(() => {
        setIsVisible(true)
      }, delay)
    } else {
      window.addEventListener('scroll', handleScroll, { passive: true })
      window.addEventListener('resize', handleScroll, { passive: true })
      handleScroll()
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
      if (!sectionTitle && !customContent) {
        window.removeEventListener('scroll', handleScroll)
        window.removeEventListener('resize', handleScroll)
      }
    }
  }, [delay, isVisible, sectionTitle, customContent])

  const splitTextIntoBlocks = (textString) => {
    if (!textString) return []
    const sentences = textString.split(/\.(?=\s|$)/).filter(s => s.trim().length > 0)
    const blocks = []
    let currentBlock = ''
    
    sentences.forEach((sentence, index) => {
      const trimmed = sentence.trim()
      if (!trimmed) return
      
      if (currentBlock.length + trimmed.length > 120 && currentBlock.length > 0) {
        blocks.push(currentBlock.trim() + '.')
        currentBlock = trimmed
      } else {
        currentBlock += (currentBlock ? ' ' : '') + trimmed
      }
    })
    
    if (currentBlock) {
      blocks.push(currentBlock.trim() + (currentBlock.endsWith('.') ? '' : '.'))
    }
    
    return blocks.length > 0 ? blocks : [textString]
  }

  // Dividir texto em duas partes para layout de duas colunas
  const splitTextIntoTwoColumns = (textString) => {
    if (!textString) return ['', '']
    const sentences = textString.split(/\.(?=\s|$)/).filter(s => s.trim().length > 0)
    const midPoint = Math.ceil(sentences.length / 2)
    const firstHalf = sentences.slice(0, midPoint).join('. ').trim() + (sentences.slice(0, midPoint).length > 0 ? '.' : '')
    const secondHalf = sentences.slice(midPoint).join('. ').trim() + (sentences.slice(midPoint).length > 0 ? '.' : '')
    return [firstHalf, secondHalf]
  }

  const textBlocks = headerContent && secondParagraph 
    ? [text] 
    : [text] // Renderizar como um único parágrafo

  // Se firstColumnText e secondColumnText foram fornecidos, usar eles; caso contrário, dividir automaticamente
  let firstColText = text
  let secondColTextValue = ''
  if (twoColumns) {
    if (firstColumnText && secondColumnText) {
      firstColText = firstColumnText
      secondColTextValue = secondColumnText
    } else if (firstColumnText) {
      firstColText = firstColumnText
      // Remover o texto da primeira coluna do texto completo para obter a segunda coluna
      secondColTextValue = text.replace(firstColumnText, '').trim()
    } else {
      [firstColText, secondColTextValue] = splitTextIntoTwoColumns(text)
    }
  }

  return (
    <div 
      ref={containerRef} 
      className={`section-container ${headerContent ? 'with-header' : ''} ${backgroundContent ? 'with-background' : ''} ${customContent ? 'with-custom-content' : ''}`}
      style={backgroundColor ? { '--section-bg-color': backgroundColor } : {}}
    >
      {backgroundContent && (
        <div className="section-background-content">
          {backgroundContent}
        </div>
      )}
      {headerContent && (
        <div className="section-header">
          {headerContent}
        </div>
      )}
      <div className="section-content-wrapper">
        {headerContent && <div className="section-top-line"></div>}
        {sectionTitle && (
          <h1 className="section-title">{sectionTitle}</h1>
        )}
        <div className="section-left">
          {customContent ? (
            <div className="section-custom-content">
              {typeof customContent === 'object' && customContent !== null && 'type' in customContent
                ? React.cloneElement(customContent, { isVisible })
                : customContent}
            </div>
          ) : gridLayout ? (
            <div className="section-grid-2x2">
              <div className="section-grid-cell">
                {consoleStyle ? (
                  <CascadeText 
                    text={topLeftText || ''}
                    isVisible={isVisible}
                    delay={0}
                    charDelay={0.02}
                    consoleStyle={true}
                  />
                ) : (
                  <div 
                    className={`section-text ${isVisible ? 'visible' : ''}`}
                    style={{ transitionDelay: '0s' }}
                  >
                    {topLeftText || ''}
                  </div>
                )}
              </div>
              <div className="section-grid-cell">
                {consoleStyle ? (
                  <CascadeText 
                    text={topRightText || ''}
                    isVisible={isVisible}
                    delay={0.1}
                    charDelay={0.02}
                    consoleStyle={true}
                  />
                ) : (
                  <div 
                    className={`section-text ${isVisible ? 'visible' : ''}`}
                    style={{ transitionDelay: '0.1s' }}
                  >
                    {topRightText || ''}
                  </div>
                )}
              </div>
              <div className="section-grid-cell section-full-column">
                <ParallaxIgnition />
              </div>
              <div className="section-grid-cell section-image-placeholder">
                <img src={jellyfishImage} alt="" className="section-grid-image" />
              </div>
              <div className="section-grid-cell">
                {consoleStyle ? (
                  <CascadeText 
                    text={bottomRightText || ''}
                    isVisible={isVisible}
                    delay={0.2}
                    charDelay={0.02}
                    consoleStyle={true}
                  />
                ) : (
                  <div 
                    className={`section-text ${isVisible ? 'visible' : ''}`}
                    style={{ transitionDelay: '0.2s' }}
                  >
                    {bottomRightText || ''}
                  </div>
                )}
              </div>
            </div>
          ) : twoColumns ? (
            <div className="section-text-columns">
              <div className="section-text-column">
                <CascadeText 
                  text={firstColText}
                  isVisible={isVisible}
                  delay={0}
                  charDelay={0.02}
                  consoleStyle={consoleStyle}
                />
              </div>
              <div className="section-text-column">
                <CascadeText 
                  text={secondColTextValue}
                  isVisible={isVisible}
                  delay={0.1}
                  charDelay={0.02}
                  consoleStyle={consoleStyle}
                />
              </div>
            </div>
          ) : (
            <>
              {textBlocks.map((block, index) => (
                <TextBlock 
                  key={index}
                  text={block}
                  isVisible={isVisible}
                  delay={index * 0.1}
                  isFirstBlock={headerContent && index === 0}
                />
              ))}
              {headerContent && secondParagraph && (
                <TextBlock 
                  text={secondParagraph}
                  isVisible={isVisible}
                  delay={textBlocks.length * 0.1}
                  isFirstBlock={false}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Section


import React, { useRef } from 'react'
import './Section.css'
import jellyfishImage from '../../assets/Jellyfish-1.png'
import CascadeText from './CascadeText/CascadeText'
import { useScrollDetection } from '@/features/home/hooks/useScrollDetection'
import AnimatedTextBackground from '@/components/layout/Section/AnimatedTextBackground'

function TextBlock({ text, isVisible, delay, isFirstBlock = false }) {
  const textRef = useRef(null)

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

function Section({ id, text, secondParagraph, delay = 0, backgroundColor, headerContent, twoColumns = false, firstColumnText, secondColumnText, gridLayout = false, topLeftText, topRightText, bottomRightText, backgroundContent, sectionTitle, consoleStyle = false, customContent }) {
  const containerRef = useRef(null)
  const autoShow = !!(sectionTitle || customContent)
  
  const isVisible = useScrollDetection(containerRef, {
    delay,
    offsetTop: 100,
    offsetBottom: -100,
    autoShow,
    dependencies: [sectionTitle, customContent]
  })

  const splitTextIntoTwoColumns = (textString) => {
    if (!textString) return ['', '']
    const sentences = textString.split(/\.(?=\s|$)/).filter(s => s.trim().length > 0)
    const midPoint = Math.ceil(sentences.length / 2)
    const firstHalf = sentences.slice(0, midPoint).join('. ').trim() + (sentences.slice(0, midPoint).length > 0 ? '.' : '')
    const secondHalf = sentences.slice(midPoint).join('. ').trim() + (sentences.slice(midPoint).length > 0 ? '.' : '')
    return [firstHalf, secondHalf]
  }

  const textBlocks = [text]

  let firstColText = text
  let secondColTextValue = ''
  if (twoColumns) {
    if (firstColumnText && secondColumnText) {
      firstColText = firstColumnText
      secondColTextValue = secondColumnText
    } else if (firstColumnText) {
      firstColText = firstColumnText
      secondColTextValue = text.replace(firstColumnText, '').trim()
    } else {
      [firstColText, secondColTextValue] = splitTextIntoTwoColumns(text)
    }
  }

  return (
    <div 
      id={id}
      ref={containerRef} 
      className={`section-container ${headerContent ? 'with-header' : ''} ${backgroundContent ? 'with-background' : ''} ${customContent ? 'with-custom-content' : ''}`}
      style={backgroundColor ? { '--section-bg-color': backgroundColor } : {}}
    >
      {backgroundContent && (
        <div className="section-background-content">
          {backgroundContent}
        </div>
      )}
      {id === 'disclaimer' && gridLayout && (
        <>
        <div className="section-background-content disclaimer-background-image">
          <img src={jellyfishImage} alt="" className="disclaimer-jellyfish-bg" />
        </div>
          <AnimatedTextBackground text="ignition" opacity={0.3} />
        </>
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
              <div className="section-grid-cell section-full-column">
                <h1 className="section-title">IGNI<br />TION</h1>
              </div>
              <div className="section-grid-cell">
                {consoleStyle ? (
                  <CascadeText 
                    tag="h3"
                    className="hero-description"
                    text={topLeftText || ''}
                    isVisible={isVisible}
                    delay={0}
                    charDelay={0.02}
                    consoleStyle={true}
                    showTimestamps={false}
                    applyZeladoriaStyles={id === 'disclaimer'}
                  />
                ) : (
                  <h3 
                    className={`section-text hero-description ${isVisible ? 'visible' : ''}`}
                    style={{ transitionDelay: '0s' }}
                  >
                    {topLeftText || ''}
                  </h3>
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
                    showTimestamps={false}
                    applyZeladoriaStyles={id === 'disclaimer'}
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
              <div className="section-grid-cell">
                {consoleStyle ? (
                  <CascadeText 
                    text={bottomRightText || ''}
                    isVisible={isVisible}
                    delay={0.2}
                    charDelay={0.02}
                    consoleStyle={true}
                    showTimestamps={false}
                    applyZeladoriaStyles={id === 'disclaimer'}
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
                  showTimestamps={false}
                />
              </div>
              <div className="section-text-column">
                <CascadeText 
                  text={secondColTextValue}
                  isVisible={isVisible}
                  delay={0.1}
                  charDelay={0.02}
                  consoleStyle={consoleStyle}
                  showTimestamps={false}
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


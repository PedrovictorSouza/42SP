import { useState, useEffect } from 'react'
import './LoadingScreen.css'
import { useLoadingScreen } from './LoadingScreenContext'
import SecretAgentReveal from '../Accordion/SecretAgentReveal'
import { LOADING_SCREEN_EVENTS, dispatchLoadingScreenEvent } from './LoadingScreenEvents'

const loremIpsum1 = 'O Lab42 é uma iniciativa da 42 SãoPaulo,com apoio da Mastertech. Funciona como um laboratório de inovação aplicada que transforma desafios reais de negócios em soluções digitais desenvolvidas por squads de estudantes da 42SP.'
const loremIpsum2 = 'A dedicação dos alunos deverá ser reconhecida com uma compensação adequada ao contexto educacional.'

const ACT_1_DURATION = 8.0
const ACT_2_DURATION = 0.5

function TextBlock({ text, startDelay = 0, wordDelay = 0.05 }) {
  const words = text.split(' ').filter(word => word.length > 0)

  return (
    <div className="text-block">
      {words.map((word, index) => (
        <span
          key={index}
          className="word"
          style={{
            animationDelay: `${startDelay + index * wordDelay}s`
          }}
        >
          {word}
        </span>
      ))}
    </div>
  )
}

function Act1() {
  const totalWords1 = loremIpsum1.split(' ').length
  const totalWords2 = loremIpsum2.split(' ').length
  const totalWords = totalWords1 + totalWords2
  const maxRevealTime = 3.0
  const wordDelay = maxRevealTime / (totalWords - 1)
  const secondBlockStart = totalWords1 * wordDelay

  useEffect(() => {
    const textRevealCompleteTime = (totalWords * wordDelay + secondBlockStart) * 1000
    const textRevealTimer = setTimeout(() => {
      dispatchLoadingScreenEvent(LOADING_SCREEN_EVENTS.TEXT_REVEAL_COMPLETE, {
        totalWords,
        revealTime: textRevealCompleteTime
      })
    }, textRevealCompleteTime)

    return () => {
      clearTimeout(textRevealTimer)
    }
  }, [totalWords, wordDelay, secondBlockStart])

  return (
    <div className="act-1">
      <div className="text-blocks-wrapper">
        <SecretAgentReveal>
          <TextBlock text={loremIpsum1} startDelay={0} wordDelay={wordDelay} />
          <TextBlock text={loremIpsum2} startDelay={secondBlockStart} wordDelay={wordDelay} />
        </SecretAgentReveal>
      </div>
    </div>
  )
}

function Act2() {
  return (
    <div className="act-2">
      <div className="orange-square"></div>
    </div>
  )
}

function LoadingScreen() {
  const { isVisible, hide } = useLoadingScreen()
  const [currentAct, setCurrentAct] = useState(1)
  const [showLoadingIndicator, setShowLoadingIndicator] = useState(true)

  useEffect(() => {
    if (!isVisible) return

    const handleAct1Complete = () => {
      setShowLoadingIndicator(false)
      setCurrentAct(2)
      dispatchLoadingScreenEvent(LOADING_SCREEN_EVENTS.ACT_1_COMPLETE, {
        duration: ACT_1_DURATION
      })
    }

    const handleAct2Complete = () => {
      hide()
      dispatchLoadingScreenEvent(LOADING_SCREEN_EVENTS.ACT_2_COMPLETE, {
        duration: ACT_2_DURATION
      })
      dispatchLoadingScreenEvent(LOADING_SCREEN_EVENTS.LOADING_COMPLETE, {
        totalDuration: ACT_1_DURATION + ACT_2_DURATION
      })
    }

    const act1Timer = setTimeout(handleAct1Complete, ACT_1_DURATION * 1000)
    const act2Timer = setTimeout(handleAct2Complete, (ACT_1_DURATION + ACT_2_DURATION) * 1000)

    return () => {
      clearTimeout(act1Timer)
      clearTimeout(act2Timer)
    }
  }, [isVisible, hide])

  if (!isVisible) return null

  return (
    <div className="loading-screen-container">
      {showLoadingIndicator && (
        <div className="loading-indicator-wrapper">
          <div className="loading-indicator" />
          <div className="loading-text">
            {'carregando...'.split('').map((char, index) => (
              <span key={index} className="loading-char" style={{ '--char-index': index }}>
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>
        </div>
      )}
      {currentAct === 1 && <Act1 />}
      {currentAct === 2 && <Act2 />}
    </div>
  )
}

export default LoadingScreen

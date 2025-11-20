import { useState, useEffect } from 'react'
import './LoadingScreen.css'
import { useLoadingScreen } from './LoadingScreenContext'

const loremIpsum1 = 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'
const loremIpsum2 = 'Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat'

const ACT_1_DURATION = 0.3 + (loremIpsum2.split(' ').length * 0.05) + 0.6
const ACT_2_DURATION = 0.5
const ACT_3_DURATION = 0.8

function TextBlock({ text, startDelay = 0, wordDelay = 0.05 }) {
  const words = text.split(' ')

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
          {word}{' '}
        </span>
      ))}
    </div>
  )
}

function Act1() {
  return (
    <div className="act-1">
      <div className="text-blocks-wrapper">
        <TextBlock text={loremIpsum1} startDelay={0} wordDelay={0.05} />
        <TextBlock text={loremIpsum2} startDelay={0.3} wordDelay={0.05} />
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

function Act3() {
  return (
    <div className="act-3">
      <div className="curtain-stripes"></div>
    </div>
  )
}

function LoadingScreen() {
  const { isVisible, hide } = useLoadingScreen()
  const [currentAct, setCurrentAct] = useState(1)

  useEffect(() => {
    if (!isVisible) return

    const act1Timer = setTimeout(() => {
      setCurrentAct(2)
    }, ACT_1_DURATION * 1000)

    const act2Timer = setTimeout(() => {
      setCurrentAct(3)
    }, (ACT_1_DURATION + ACT_2_DURATION) * 1000)

    const act3Timer = setTimeout(() => {
      hide()
    }, (ACT_1_DURATION + ACT_2_DURATION + ACT_3_DURATION) * 1000)

    return () => {
      clearTimeout(act1Timer)
      clearTimeout(act2Timer)
      clearTimeout(act3Timer)
    }
  }, [isVisible, hide])

  if (!isVisible) return null

  return (
    <div className="loading-screen-container">
      {currentAct === 1 && <Act1 />}
      {currentAct === 2 && <Act2 />}
      {currentAct === 3 && <Act3 />}
    </div>
  )
}

export default LoadingScreen

import { useEffect, useRef } from 'react'

const WAVE_THRESH = 3
const CHAR_MULT = 3
const ANIM_STEP = 40
const WAVE_BUF = 5

export const useASCIIShift = (el, opts = {}) => {
  const stateRef = useRef({
    origTxt: '',
    origChars: [],
    isAnim: false,
    cursorPos: 0,
    waves: [],
    animId: null,
    isHover: false,
    origW: null
  })

  useEffect(() => {
    if (!el) return

    const state = stateRef.current
    state.origTxt = el.textContent
    state.origChars = state.origTxt.split('')

    const cfg = {
      dur: 600,
      chars: '.,·-─~+:;=*π""┐┌┘┴┬╗╔╝╚╬╠╣╩╦║░▒▓█▄▀▌▐■!?&#$@0123456789*',
      preserveSpaces: true,
      spread: 0.3,
      ...opts
    }

    const updateCursorPos = (e) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const len = state.origTxt.length
      const pos = Math.round((x / rect.width) * len)
      state.cursorPos = Math.max(0, Math.min(pos, len - 1))
    }

    const startWave = () => {
      state.waves.push({
        startPos: state.cursorPos,
        startTime: Date.now(),
        id: Math.random()
      })
      if (!state.isAnim) start()
    }

    const cleanupWaves = (t) => {
      state.waves = state.waves.filter((w) => t - w.startTime < cfg.dur)
    }

    const calcWaveEffect = (charIdx, t) => {
      let shouldAnim = false
      let resultChar = state.origChars[charIdx]

      for (const w of state.waves) {
        const age = t - w.startTime
        const prog = Math.min(age / cfg.dur, 1)
        const dist = Math.abs(charIdx - w.startPos)
        const maxDist = Math.max(w.startPos, state.origChars.length - w.startPos - 1)
        const rad = (prog * (maxDist + WAVE_BUF)) / cfg.spread

        if (dist <= rad) {
          shouldAnim = true
          const intens = Math.max(0, rad - dist)

          if (intens <= WAVE_THRESH && intens > 0) {
            const charIdx = (dist * CHAR_MULT + Math.floor(age / ANIM_STEP)) % cfg.chars.length
            resultChar = cfg.chars[charIdx]
          }
        }
      }

      return { shouldAnim, char: resultChar }
    }

    const genScrambledTxt = (t) =>
      state.origChars
        .map((char, i) => {
          if (cfg.preserveSpaces && char === ' ') return ' '
          const res = calcWaveEffect(i, t)
          return res.shouldAnim ? res.char : char
        })
        .join('')

    const stop = () => {
      el.textContent = state.origTxt
      el.classList.remove('as')

      if (state.origW !== null) {
        el.style.width = ''
        state.origW = null
      }
      state.isAnim = false
    }

    const start = () => {
      if (state.isAnim) return

      if (state.origW === null) {
        state.origW = el.getBoundingClientRect().width
        el.style.width = `${state.origW}px`
      }

      state.isAnim = true
      el.classList.add('as')

      const animate = () => {
        const t = Date.now()
        cleanupWaves(t)

        if (state.waves.length === 0) {
          stop()
          return
        }

        el.textContent = genScrambledTxt(t)
        state.animId = requestAnimationFrame(animate)
      }

      state.animId = requestAnimationFrame(animate)
    }

    const handleEnter = (e) => {
      state.isHover = true
      updateCursorPos(e)
      startWave()
    }

    const handleMove = (e) => {
      if (!state.isHover) return
      const old = state.cursorPos
      updateCursorPos(e)
      if (state.cursorPos !== old) startWave()
    }

    const handleLeave = () => {
      state.isHover = false
    }

    el.addEventListener('mouseenter', handleEnter)
    el.addEventListener('mousemove', handleMove)
    el.addEventListener('mouseleave', handleLeave)

    return () => {
      if (state.animId) {
        cancelAnimationFrame(state.animId)
      }
      el.removeEventListener('mouseenter', handleEnter)
      el.removeEventListener('mousemove', handleMove)
      el.removeEventListener('mouseleave', handleLeave)
      stop()
    }
  }, [el, opts])
}

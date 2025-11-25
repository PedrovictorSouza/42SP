export const LOADING_SCREEN_EVENTS = {
  TEXT_REVEAL_COMPLETE: 'loadingScreen:textRevealComplete',
  ACT_1_COMPLETE: 'loadingScreen:act1Complete',
  ACT_2_COMPLETE: 'loadingScreen:act2Complete',
  LOADING_COMPLETE: 'loadingScreen:complete'
}

export function dispatchLoadingScreenEvent(eventName, detail = {}) {
  const event = new CustomEvent(eventName, {
    detail,
    bubbles: true,
    cancelable: true
  })
  window.dispatchEvent(event)
}


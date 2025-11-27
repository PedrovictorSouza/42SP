import { createContext, useContext, useState } from 'react'

const LoadingScreenContext = createContext(null)

export function useLoadingScreen() {
  const context = useContext(LoadingScreenContext)
  if (!context) {
    throw new Error('useLoadingScreen deve ser usado dentro de LoadingScreenProvider')
  }
  return context
}

export function LoadingScreenProvider({ children }) {
  const [isVisible, setIsVisible] = useState(true)

  const hide = () => {
    setIsVisible(false)
  }

  const show = () => {
    setIsVisible(true)
  }

  const value = {
    isVisible,
    hide,
    show
  }

  return (
    <LoadingScreenContext.Provider value={value}>
      {children}
    </LoadingScreenContext.Provider>
  )
}


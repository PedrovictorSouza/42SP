import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import FeedbackMarker from './FeedbackMarker/FeedbackMarker'
import { LoadingScreenProvider, useLoadingScreen, LoadingScreen } from './LoadingScreen'
import GlobalGradientOverlay from './GlobalGradientOverlay/GlobalGradientOverlay'

function LayoutContent() {
  const { isVisible } = useLoadingScreen()

  useEffect(() => {
    if (!isVisible) {
      const header = document.querySelector('.header')
      const footer = document.querySelector('.footer')
      const viewport = document.querySelector('.viewport')

      if (header) {
        setTimeout(() => {
          header.style.transition = 'opacity 1.2s ease'
          header.style.opacity = '1'
        }, 800)
      }

      if (footer) {
        setTimeout(() => {
          footer.style.transition = 'opacity 1.4s ease'
          footer.style.opacity = '1'
        }, 1000)
      }

      if (viewport) {
        setTimeout(() => {
          viewport.style.transition = 'opacity 0.6s ease'
          viewport.style.opacity = '1'
        }, 600)
      }
    }
  }, [isVisible])

  return (
    <>
      <LoadingScreen />
      <GlobalGradientOverlay />
      {!isVisible && (
        <>
          <Navbar />
          <Outlet />
          <Footer />
          <FeedbackMarker />
        </>
      )}
    </>
  )
}

function Layout() {
  return (
    <LoadingScreenProvider>
      <LayoutContent />
    </LoadingScreenProvider>
  )
}

export default Layout




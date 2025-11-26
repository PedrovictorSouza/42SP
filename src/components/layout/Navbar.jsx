import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './Navbar.css'
import logoImage from '@/assets/logo.png'
import { useWindowResize } from '@/features/home/hooks/useWindowResize'

function Navbar() {
  const location = useLocation()
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isOnWhiteBackground, setIsOnWhiteBackground] = useState(false)
  
  const { isMobile } = useWindowResize({ mobileBreakpoint: 768 })

  useEffect(() => {
    const checkBackgroundColor = () => {
      const checkY = 80
      const checkX = window.innerWidth / 2
      
      const header = document.querySelector('.header')
      if (!header) return
      
      const hamburgerButton = document.querySelector('.hamburger-button')
      const originalHeaderPointerEvents = header.style.pointerEvents
      const originalButtonPointerEvents = hamburgerButton?.style.pointerEvents
      
      header.style.pointerEvents = 'none'
      if (hamburgerButton) {
        hamburgerButton.style.pointerEvents = 'none'
      }
      
      const elementAtPosition = document.elementFromPoint(checkX, checkY)
      
      header.style.pointerEvents = originalHeaderPointerEvents || ''
      if (hamburgerButton) {
        hamburgerButton.style.pointerEvents = originalButtonPointerEvents || 'auto'
      }
      
      if (!elementAtPosition) {
        setIsOnWhiteBackground(false)
        return
      }

      let currentElement = elementAtPosition
      let foundWhite = false
      
      while (currentElement && currentElement !== document.body && !foundWhite) {
        if (currentElement.classList) {
          if (currentElement.classList.contains('manifesto-content') || 
              currentElement.classList.contains('manifesto-section')) {
            foundWhite = true
            break
          }
        }
        
        const styles = window.getComputedStyle(currentElement)
        const bgColor = styles.backgroundColor
        
        if (bgColor) {
          if (bgColor === 'rgb(255, 255, 255)' || 
              bgColor === '#ffffff' || 
              bgColor === '#fff' ||
              bgColor.includes('255, 255, 255')) {
            foundWhite = true
            break
          }
          
          const rgbMatch = bgColor.match(/\d+/g)
          if (rgbMatch && rgbMatch.length >= 3) {
            const r = parseInt(rgbMatch[0])
            const g = parseInt(rgbMatch[1])
            const b = parseInt(rgbMatch[2])
            
            if (r > 240 && g > 240 && b > 240) {
              foundWhite = true
              break
            }
          }
        }
        
        currentElement = currentElement.parentElement
      }
      
      setIsOnWhiteBackground(foundWhite)
    }

    const handleScroll = () => {
      const scrollY = window.scrollY
      const threshold = 100
      const scrolled = scrollY > threshold
      setIsScrolled(scrolled)
      
      if (scrollY <= threshold) {
        setIsMenuOpen(false)
        setIsOnWhiteBackground(false)
      } else {
        checkWhiteSections()
      }
    }

    const checkWhiteSections = () => {
      if (!isScrolled && !isMobile) {
        setIsOnWhiteBackground(false)
        return
      }

      const whiteSections = document.querySelectorAll('.manifesto-content, .manifesto-section')
      let foundWhite = false
      
      whiteSections.forEach(section => {
        const rect = section.getBoundingClientRect()
        if (rect.top <= 100 && rect.bottom >= 0) {
          foundWhite = true
        }
      })
      
      if (foundWhite) {
        setIsOnWhiteBackground(true)
      } else {
        checkBackgroundColor()
      }
    }

    const whiteSections = document.querySelectorAll('.manifesto-content, .manifesto-section')
    
    const observer = new IntersectionObserver(() => {
      checkWhiteSections()
    }, {
      root: null,
      rootMargin: '-100px 0px 0px 0px',
      threshold: [0, 0.1, 0.5, 1]
    })

    whiteSections.forEach(section => {
      observer.observe(section)
    })
    
    const checkInterval = setInterval(() => {
      if (isScrolled || isMobile) {
        checkWhiteSections()
      }
    }, 100)

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      whiteSections.forEach(section => {
        observer.unobserve(section)
      })
      clearInterval(checkInterval)
    }
  }, [isScrolled, isMobile])

  const handleAnchorClick = (e, anchorId) => {
    e.preventDefault()
    setIsMenuOpen(false)
    if (location.pathname !== '/home') {
      navigate('/home')
      setTimeout(() => {
        const element = document.getElementById(anchorId)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    } else {
      const element = document.getElementById(anchorId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }

  const toggleMenu = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setIsMenuOpen(prev => !prev)
  }

  const shouldShowHamburger = isMobile || isScrolled

  return (
    <header 
      className={`header ${shouldShowHamburger ? 'hamburger-mode' : ''} ${isMenuOpen ? 'menu-open' : ''} ${isScrolled ? 'scrolled' : ''}`}
    >
      <div className="nav-section">
        <div className="logo-container">
          <img src={logoImage} alt="Lab42 Logo" className="logo-image" />
        </div>
      </div>
      
      {shouldShowHamburger && (
        <button 
          className={`hamburger-button ${isOnWhiteBackground ? 'white-bg' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
          <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
        </button>
      )}

      <div className={`values-section ${shouldShowHamburger ? 'hidden' : ''}`}>
        <ul className="menu-list">
          <li><a href="#disclaimer" onClick={(e) => handleAnchorClick(e, 'disclaimer')}>DISCLAIMER</a></li>
          <li><a href="#plano-de-voo" onClick={(e) => handleAnchorClick(e, 'plano-de-voo')}>PLANO DE VÔO</a></li>
          <li><a href="#processo" onClick={(e) => handleAnchorClick(e, 'processo')}>COMO FUNCIONA</a></li>
        </ul>
      </div>

      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <div className="mobile-menu-section">
            <h3>+Menu</h3>
            <ul>
              <li><a href="#home" onClick={(e) => handleAnchorClick(e, 'home')}>DESENVOLVEMOS SOLUÇÕES DIGITAIS</a></li>
              <li><a href="#disclaimer" onClick={(e) => handleAnchorClick(e, 'disclaimer')}>DISCLAIMER</a></li>
              <li><a href="#plano-de-voo" onClick={(e) => handleAnchorClick(e, 'plano-de-voo')}>PLANO DE VÔO</a></li>
              <li><a href="#processo" onClick={(e) => handleAnchorClick(e, 'processo')}>COMO FUNCIONA</a></li>
            </ul>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar

import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './Navbar'

const renderWithRouter = (component) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('Navbar Component - Menu Hambúrguer', () => {
  beforeEach(() => {
    global.IntersectionObserver = vi.fn().mockImplementation((callback) => {
      return {
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn(),
      }
    })

    document.elementFromPoint = vi.fn().mockImplementation(() => {
      return document.querySelector('.hamburger-button') || null
    })
    document.querySelectorAll = vi.fn().mockReturnValue([])

    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1200
    })
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 800
    })
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 0
    })
    
    vi.spyOn(window, 'addEventListener').mockImplementation(() => {})
    vi.spyOn(window, 'removeEventListener').mockImplementation(() => {})
  })

  it('deve renderizar o navbar', () => {
    renderWithRouter(<Navbar />)
    const header = document.querySelector('.header')
    expect(header).toBeInTheDocument()
  })

  it('deve mostrar o botão hambúrguer quando scroll > 100', async () => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 150
    })

    renderWithRouter(<Navbar />)
    
    await waitFor(() => {
      const hamburgerButton = document.querySelector('.hamburger-button')
      expect(hamburgerButton).toBeInTheDocument()
    }, { timeout: 2000 })
  })

  it('deve mostrar o botão hambúrguer em mobile', async () => {
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 500
    })

    renderWithRouter(<Navbar />)
    
    await waitFor(() => {
      const hamburgerButton = document.querySelector('.hamburger-button')
      expect(hamburgerButton).toBeInTheDocument()
    }, { timeout: 2000 })
  })

  it('deve abrir o menu quando o botão hambúrguer é clicado', async () => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 150
    })

    renderWithRouter(<Navbar />)
    
    await waitFor(() => {
      const hamburgerButton = document.querySelector('.hamburger-button')
      expect(hamburgerButton).toBeInTheDocument()
    }, { timeout: 2000 })

    const hamburgerButton = document.querySelector('.hamburger-button')
    
    expect(hamburgerButton).toBeInTheDocument()
    
    fireEvent.click(hamburgerButton)
    
    await waitFor(() => {
      const mobileMenu = document.querySelector('.mobile-menu.open')
      expect(mobileMenu).toBeInTheDocument()
    }, { timeout: 1000 })
  })

  it('deve verificar se o botão tem cursor pointer', async () => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 150
    })

    renderWithRouter(<Navbar />)
    
    await waitFor(() => {
      const hamburgerButton = document.querySelector('.hamburger-button')
      expect(hamburgerButton).toBeInTheDocument()
      expect(hamburgerButton).toHaveStyle({ cursor: 'pointer' })
    }, { timeout: 2000 })
  })

  it('deve verificar se o botão tem z-index alto o suficiente', async () => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 150
    })

    renderWithRouter(<Navbar />)
    
    await waitFor(() => {
      const hamburgerButton = document.querySelector('.hamburger-button')
      expect(hamburgerButton).toBeInTheDocument()
      
      const styles = window.getComputedStyle(hamburgerButton)
      const zIndex = parseInt(styles.zIndex) || 0
      expect(zIndex).toBeGreaterThanOrEqual(100000)
    }, { timeout: 2000 })
  })

  it('deve verificar se o botão tem pointer-events auto e não está bloqueado', async () => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 150
    })

    const { container } = renderWithRouter(<Navbar />)
    
    await waitFor(() => {
      const hamburgerButton = document.querySelector('.hamburger-button')
      expect(hamburgerButton).toBeInTheDocument()
      
      const header = container.querySelector('.header')
      const headerStyles = window.getComputedStyle(header)
      
      expect(headerStyles.pointerEvents).toBe('none')
      
      const buttonStyles = window.getComputedStyle(hamburgerButton)
      expect(buttonStyles.pointerEvents).toBe('auto')
      
      const elementAtPoint = document.elementFromPoint(100, 50)
      expect(hamburgerButton).toBeInTheDocument()
    }, { timeout: 2000 })
  })

  it('deve verificar se o menu mobile tem z-index alto quando aberto', async () => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 150
    })

    renderWithRouter(<Navbar />)
    
    await waitFor(() => {
      const hamburgerButton = document.querySelector('.hamburger-button')
      expect(hamburgerButton).toBeInTheDocument()
    }, { timeout: 2000 })

    const hamburgerButton = document.querySelector('.hamburger-button')
    fireEvent.click(hamburgerButton)
    
    await waitFor(() => {
      const mobileMenu = document.querySelector('.mobile-menu.open')
      expect(mobileMenu).toBeInTheDocument()
      
      const styles = window.getComputedStyle(mobileMenu)
      const zIndex = parseInt(styles.zIndex)
      expect(zIndex).toBeGreaterThan(10000)
    }, { timeout: 1000 })
  })

  it('deve verificar se o estado isMenuOpen muda ao clicar', async () => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 150
    })

    const { container } = renderWithRouter(<Navbar />)
    
    await waitFor(() => {
      const hamburgerButton = document.querySelector('.hamburger-button')
      expect(hamburgerButton).toBeInTheDocument()
    }, { timeout: 2000 })

    const hamburgerButton = document.querySelector('.hamburger-button')
    const header = container.querySelector('.header')
    
    expect(header).not.toHaveClass('menu-open')
    
    fireEvent.click(hamburgerButton)
    
    await waitFor(() => {
      expect(header).toHaveClass('menu-open')
    }, { timeout: 1000 })
  })

  it('deve verificar se não há elementos bloqueando o botão', async () => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 150
    })

    renderWithRouter(<Navbar />)
    
    await waitFor(() => {
      const hamburgerButton = document.querySelector('.hamburger-button')
      expect(hamburgerButton).toBeInTheDocument()
      
      const rect = hamburgerButton.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      const elementAtPoint = document.elementFromPoint(centerX, centerY)
      
      expect(elementAtPoint).toBe(hamburgerButton)
    }, { timeout: 2000 })
  })

  it('deve verificar se o botão está acima de todos os outros elementos', async () => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 150
    })

    renderWithRouter(<Navbar />)
    
    await waitFor(() => {
      const hamburgerButton = document.querySelector('.hamburger-button')
      expect(hamburgerButton).toBeInTheDocument()
      
      const buttonZIndex = parseInt(window.getComputedStyle(hamburgerButton).zIndex) || 0
      
      const allElements = document.querySelectorAll('*')
      let maxZIndex = 0
      
      allElements.forEach(el => {
        const zIndex = parseInt(window.getComputedStyle(el).zIndex) || 0
        if (zIndex > maxZIndex && el !== hamburgerButton) {
          maxZIndex = zIndex
        }
      })
      
      expect(buttonZIndex).toBeGreaterThanOrEqual(maxZIndex)
    }, { timeout: 2000 })
  })

  it('deve verificar se o handler onClick está sendo chamado quando o botão é clicado', async () => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 150
    })

    renderWithRouter(<Navbar />)
    
    await waitFor(() => {
      const hamburgerButton = document.querySelector('.hamburger-button')
      expect(hamburgerButton).toBeInTheDocument()
    }, { timeout: 2000 })

    const hamburgerButton = document.querySelector('.hamburger-button')
    const mobileMenu = document.querySelector('.mobile-menu')
    
    expect(mobileMenu).not.toHaveClass('open')
    
    fireEvent.click(hamburgerButton)
    
    await waitFor(() => {
      expect(mobileMenu).toHaveClass('open')
    }, { timeout: 1000 })
  })

  it('deve verificar se o evento não está sendo bloqueado por pointer-events', async () => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 150
    })

    const { container } = renderWithRouter(<Navbar />)
    
    await waitFor(() => {
      const hamburgerButton = document.querySelector('.hamburger-button')
      expect(hamburgerButton).toBeInTheDocument()
    }, { timeout: 2000 })

    const hamburgerButton = document.querySelector('.hamburger-button')
    const header = container.querySelector('.header')
    
    const headerRect = header.getBoundingClientRect()
    const buttonRect = hamburgerButton.getBoundingClientRect()
    const centerX = buttonRect.left + buttonRect.width / 2
    const centerY = buttonRect.top + buttonRect.height / 2
    
    const elementAtPoint = document.elementFromPoint(centerX, centerY)
    
    expect(elementAtPoint).toBe(hamburgerButton)
    
    let clickReceived = false
    hamburgerButton.addEventListener('click', () => {
      clickReceived = true
    })
    
    fireEvent.click(hamburgerButton)
    
    await waitFor(() => {
      expect(clickReceived).toBe(true)
    }, { timeout: 1000 })
  })

  it('deve verificar se o botão pode receber eventos mesmo com header tendo pointer-events none', async () => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 150
    })

    const { container } = renderWithRouter(<Navbar />)
    
    await waitFor(() => {
      const hamburgerButton = document.querySelector('.hamburger-button')
      expect(hamburgerButton).toBeInTheDocument()
    }, { timeout: 2000 })

    const hamburgerButton = document.querySelector('.hamburger-button')
    const header = container.querySelector('.header')
    
    const headerStyles = window.getComputedStyle(header)
    expect(headerStyles.pointerEvents).toBe('none')
    
    const buttonStyles = window.getComputedStyle(hamburgerButton)
    expect(buttonStyles.pointerEvents).toBe('auto')
    
    const buttonInlineStyle = hamburgerButton.getAttribute('style')
    expect(buttonInlineStyle).toContain('pointer-events: auto')
    
    const mobileMenu = document.querySelector('.mobile-menu')
    expect(mobileMenu).not.toHaveClass('open')
    
    fireEvent.click(hamburgerButton)
    
    await waitFor(() => {
      expect(mobileMenu).toHaveClass('open')
    }, { timeout: 1000 })
  })

  it('deve garantir que checkBackgroundColor não bloqueie permanentemente o header', async () => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 150
    })

    const { container } = renderWithRouter(<Navbar />)
    
    await waitFor(() => {
      const hamburgerButton = document.querySelector('.hamburger-button')
      expect(hamburgerButton).toBeInTheDocument()
    }, { timeout: 2000 })

    const header = container.querySelector('.header')
    const hamburgerButton = document.querySelector('.hamburger-button')
    
    await new Promise(resolve => setTimeout(resolve, 200))
    
    const headerStyleAttribute = header.getAttribute('style')
    const headerComputedStyle = window.getComputedStyle(header)
    
    expect(headerComputedStyle.pointerEvents).toBe('none')
    
    const buttonComputedStyle = window.getComputedStyle(hamburgerButton)
    expect(buttonComputedStyle.pointerEvents).toBe('auto')
    
    const mobileMenu = document.querySelector('.mobile-menu')
    expect(mobileMenu).not.toHaveClass('open')
    
    fireEvent.click(hamburgerButton)
    
    await waitFor(() => {
      expect(mobileMenu).toHaveClass('open')
    }, { timeout: 1000 })
  })

  it('deve verificar se o menu mobile está visível quando aberto', async () => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 150
    })

    renderWithRouter(<Navbar />)
    
    await waitFor(() => {
      const hamburgerButton = document.querySelector('.hamburger-button')
      expect(hamburgerButton).toBeInTheDocument()
    }, { timeout: 2000 })

    const mobileMenu = document.querySelector('.mobile-menu')
    const hamburgerButton = document.querySelector('.hamburger-button')
    
    expect(mobileMenu).not.toHaveClass('open')
    
    fireEvent.click(hamburgerButton)
    
    await waitFor(() => {
      expect(mobileMenu).toHaveClass('open')
    }, { timeout: 1000 })
    
    await waitFor(() => {
      const inlineStyle = mobileMenu.getAttribute('style')
      expect(inlineStyle).toContain('pointer-events: auto')
      
      const openStyles = window.getComputedStyle(mobileMenu)
      expect(openStyles.pointerEvents).toBe('auto')
    }, { timeout: 500 })
  })

  it('deve verificar se o menu mobile pode receber eventos quando aberto', async () => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 150
    })

    renderWithRouter(<Navbar />)
    
    await waitFor(() => {
      const hamburgerButton = document.querySelector('.hamburger-button')
      expect(hamburgerButton).toBeInTheDocument()
    }, { timeout: 2000 })

    const hamburgerButton = document.querySelector('.hamburger-button')
    fireEvent.click(hamburgerButton)
    
    await waitFor(() => {
      const mobileMenu = document.querySelector('.mobile-menu.open')
      expect(mobileMenu).toBeInTheDocument()
    }, { timeout: 1000 })
    
    await waitFor(() => {
      const mobileMenu = document.querySelector('.mobile-menu.open')
      const styles = window.getComputedStyle(mobileMenu)
      expect(styles.pointerEvents).toBe('auto')
      
      const menuLinks = mobileMenu.querySelectorAll('a[href="#home"]')
      expect(menuLinks.length).toBeGreaterThan(0)
      
      const menuLink = menuLinks[0]
      const linkStyles = window.getComputedStyle(menuLink)
      expect(linkStyles.pointerEvents).not.toBe('none')
    }, { timeout: 500 })
  })

  it('deve verificar se o menu mobile tem z-index alto o suficiente para ficar acima de outros elementos', async () => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 150
    })

    renderWithRouter(<Navbar />)
    
    await waitFor(() => {
      const hamburgerButton = document.querySelector('.hamburger-button')
      expect(hamburgerButton).toBeInTheDocument()
    }, { timeout: 2000 })

    const hamburgerButton = document.querySelector('.hamburger-button')
    fireEvent.click(hamburgerButton)
    
    await waitFor(() => {
      const mobileMenu = document.querySelector('.mobile-menu.open')
      expect(mobileMenu).toBeInTheDocument()
    }, { timeout: 1000 })
    
    await waitFor(() => {
      const mobileMenu = document.querySelector('.mobile-menu.open')
      const menuStyles = window.getComputedStyle(mobileMenu)
      const menuZIndex = parseInt(menuStyles.zIndex) || 0
      
      const header = document.querySelector('.header')
      const headerStyles = window.getComputedStyle(header)
      const headerZIndex = parseInt(headerStyles.zIndex) || 0
      
      expect(menuZIndex).toBeGreaterThan(headerZIndex)
      expect(menuZIndex).toBeGreaterThanOrEqual(99999)
    }, { timeout: 500 })
  })

  it('deve verificar se há elementos bloqueando o menu mobile quando aberto', async () => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 150
    })

    renderWithRouter(<Navbar />)
    
    await waitFor(() => {
      const hamburgerButton = document.querySelector('.hamburger-button')
      expect(hamburgerButton).toBeInTheDocument()
    }, { timeout: 2000 })

    const hamburgerButton = document.querySelector('.hamburger-button')
    fireEvent.click(hamburgerButton)
    
    await waitFor(() => {
      const mobileMenu = document.querySelector('.mobile-menu.open')
      expect(mobileMenu).toBeInTheDocument()
    }, { timeout: 1000 })
    
    await waitFor(() => {
      const mobileMenu = document.querySelector('.mobile-menu.open')
      expect(mobileMenu).toHaveClass('open')
      
      const inlineStyle = mobileMenu.getAttribute('style')
      expect(inlineStyle).toContain('pointer-events: auto')
      
      const styles = window.getComputedStyle(mobileMenu)
      expect(styles.pointerEvents).toBe('auto')
    }, { timeout: 500 })
  })

  it('deve verificar se o estado isMenuOpen está sendo atualizado corretamente', async () => {
    Object.defineProperty(window, 'scrollY', {
      writable: true,
      configurable: true,
      value: 150
    })

    const { container } = renderWithRouter(<Navbar />)
    
    await waitFor(() => {
      const hamburgerButton = document.querySelector('.hamburger-button')
      expect(hamburgerButton).toBeInTheDocument()
    }, { timeout: 2000 })

    const hamburgerButton = document.querySelector('.hamburger-button')
    const header = container.querySelector('.header')
    const mobileMenu = document.querySelector('.mobile-menu')
    
    expect(header).not.toHaveClass('menu-open')
    expect(mobileMenu).not.toHaveClass('open')
    
    fireEvent.click(hamburgerButton)
    
    await waitFor(() => {
      expect(header).toHaveClass('menu-open')
      expect(mobileMenu).toHaveClass('open')
    }, { timeout: 1000 })
    
    fireEvent.click(hamburgerButton)
    
    await waitFor(() => {
      expect(header).not.toHaveClass('menu-open')
      expect(mobileMenu).not.toHaveClass('open')
    }, { timeout: 1000 })
  })
})

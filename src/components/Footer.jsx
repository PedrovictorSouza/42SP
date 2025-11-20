import { useLocation, useNavigate } from 'react-router-dom'
import './Footer.css'

function Footer() {
  const location = useLocation()
  const navigate = useNavigate()

  const handleAnchorClick = (e, anchorId) => {
    e.preventDefault()
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

  return (
    <footer className="footer">
      <div className="nav-section">
        <div className="logo-container">
          <div className="logo-circles">
            <div className="circle circle-1"></div>
            <div className="circle circle-2"></div>
          </div>
        </div>
      </div>
      <div className="values-section">
        <h3>+Menu</h3>
        <ul>
          <li><a href="#home" onClick={(e) => handleAnchorClick(e, 'home')}>Home</a></li>
          <li><a href="#disclaimer" onClick={(e) => handleAnchorClick(e, 'disclaimer')}>Disclaimer</a></li>
          <li><a href="#plano-de-voo" onClick={(e) => handleAnchorClick(e, 'plano-de-voo')}>Plano de Voo</a></li>
          <li><a href="#processo" onClick={(e) => handleAnchorClick(e, 'processo')}>Processo</a></li>
        </ul>
      </div>
      <div className="location-section">
        <h3>+Studio</h3>
        <p>São Paulo</p>
        <p>Brasil</p>
      </div>
      <div className="contact-section">
        <h3>+Connect</h3>
        <p><a href="mailto:contato@lab42.com.br">contato@lab42.com.br</a></p>
      </div>
      <div className="social-section">
        <h3>+Follow</h3>
        <ul>
          <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a></li>
          <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer


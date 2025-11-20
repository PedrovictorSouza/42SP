import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const location = useLocation()

  return (
    <header className="header">
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
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/badges">Badges</Link></li>
          <li><Link to="/missions">Missões</Link></li>
          <li><Link to="/ide">IDE</Link></li>
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
    </header>
  )
}

export default Navbar


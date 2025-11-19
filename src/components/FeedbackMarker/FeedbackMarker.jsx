import { useState } from 'react'
import './FeedbackMarker.css'

function FeedbackMarker() {
  const [isActive, setIsActive] = useState(false)
  const [markers, setMarkers] = useState([])
  const [editingMarkerId, setEditingMarkerId] = useState(null)
  const [inputValue, setInputValue] = useState('')
  const [hoveredMarkerId, setHoveredMarkerId] = useState(null)

  const handleOverlayClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    setInputValue('')
    setMarkers(prev => {
      const newMarker = {
        id: Date.now(),
        x: e.pageX,
        y: e.pageY,
        number: prev.length + 1,
        description: ''
      }
      setEditingMarkerId(newMarker.id)
      return [...prev, newMarker]
    })
  }

  const handleRemoveMarker = (markerId, e) => {
    e.preventDefault()
    e.stopPropagation()
    setMarkers(prev => prev.filter(marker => marker.id !== markerId))
    if (editingMarkerId === markerId) {
      setEditingMarkerId(null)
      setInputValue('')
    }
  }

  const handleInputKeyDown = (e, markerId) => {
    if (e.key === 'Enter') {
      setMarkers(prev => prev.map(marker => 
        marker.id === markerId 
          ? { ...marker, description: inputValue }
          : marker
      ))
      setEditingMarkerId(null)
      setInputValue('')
    }
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const toggleActive = () => {
    setIsActive(!isActive)
  }

  const clearMarkers = () => {
    setMarkers([])
  }

  return (
    <>
      {isActive && (
        <div 
          className="feedback-overlay"
          onClick={handleOverlayClick}
        />
      )}
      
      <div className="feedback-toggle-container">
        <button 
          className={`feedback-toggle ${isActive ? 'active' : ''}`}
          onClick={toggleActive}
          aria-label="Ativar marcador de feedback"
        >
          <span className="feedback-toggle-slider"></span>
        </button>
        <span className="feedback-toggle-label">alterações ui</span>
      </div>
      
      {isActive && markers.length > 0 && (
        <button 
          className="feedback-clear"
          onClick={clearMarkers}
          aria-label="Limpar marcadores"
        >
          Limpar
        </button>
      )}

      {markers.map(marker => (
        <div key={marker.id}>
          <div
            className={`feedback-marker ${isActive ? 'visible' : 'hidden'} ${editingMarkerId !== marker.id ? 'hoverable' : ''}`}
            style={{
              left: `${marker.x}px`,
              top: `${marker.y}px`
            }}
            onMouseEnter={() => marker.description && setHoveredMarkerId(marker.id)}
            onMouseLeave={() => setHoveredMarkerId(null)}
          >
            {marker.number}
          </div>
          {isActive && (
            <button
              className="feedback-marker-remove"
              style={{
                left: `${marker.x + 12}px`,
                top: `${marker.y - 12}px`
              }}
              onClick={(e) => handleRemoveMarker(marker.id, e)}
              aria-label="Remover marcador"
            >
              ×
            </button>
          )}
          {isActive && editingMarkerId === marker.id && (
            <input
              type="text"
              className="feedback-input"
              style={{
                left: `${marker.x + 20}px`,
                top: `${marker.y - 10}px`
              }}
              placeholder="Descreva a alteração desejada..."
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={(e) => handleInputKeyDown(e, marker.id)}
              onClick={(e) => e.stopPropagation()}
              autoFocus
            />
          )}
          {isActive && hoveredMarkerId === marker.id && marker.description && (
            <div
              className="feedback-tooltip"
              style={{
                left: `${marker.x + 20}px`,
                top: `${marker.y - 20}px`
              }}
            >
              {marker.description}
            </div>
          )}
        </div>
      ))}
    </>
  )
}

export default FeedbackMarker


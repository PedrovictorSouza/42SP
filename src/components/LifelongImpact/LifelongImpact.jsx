import { useState } from 'react'
import './LifelongImpact.css'

const impactItems = [
  {
    id: 'fundos-bolsas',
    text: '70% do valor recebido pelo LAB vai para o fundo de bolsas da 42SP'
  },
  {
    id: 'remuneracao-alunos',
    text: '15% remunera os alunos participantes'
  },
  {
    id: 'operacao-laboratorio',
    text: '15% custeia a operação do laboratório'
  }
]

function LifelongImpact({ isVisible = true }) {
  const [expandedId, setExpandedId] = useState(null)

  const handleItemClick = (itemId) => {
    setExpandedId(expandedId === itemId ? null : itemId)
  }

  return (
    <div className={`lifelong-impact-container ${isVisible ? 'visible' : ''}`}>
      <div className="lifelong-impact-content">
        <div className="lifelong-impact-left">
          <div className="lifelong-impact-title-wrapper">
            <div className="lifelong-impact-title-line">42</div>
            <div className="lifelong-impact-title-line">pra</div>
            <div className="lifelong-impact-title-line">sempre</div>
          </div>
          <div className="lifelong-impact-subtitle">
            <span className="lifelong-impact-line"></span>
            <span className="lifelong-impact-subtitle-text">[ LIFELONG IMPACT ]</span>
            <span className="lifelong-impact-line"></span>
          </div>
        </div>
        <div className="lifelong-impact-right">
          <div className="lifelong-impact-items">
            {impactItems.map((item, index) => {
              const isExpanded = expandedId === item.id
              return (
                <div key={item.id} className="lifelong-impact-item-wrapper">
                  <button
                    className={`lifelong-impact-item ${isExpanded ? 'expanded' : ''}`}
                    onClick={() => handleItemClick(item.id)}
                    aria-expanded={isExpanded}
                  >
                    <span className="lifelong-impact-arrow">→</span>
                    <span className="lifelong-impact-text">{item.text}</span>
                  </button>
                  {index < impactItems.length - 1 && (
                    <div className="lifelong-impact-divider"></div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LifelongImpact


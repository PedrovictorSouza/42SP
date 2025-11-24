import { useState } from 'react'
import './Accordion.css'
import DiagnosticoContent from './DiagnosticoContent'
import PrecoContratoContent from './PrecoContratoContent'
import SetupSquadsContent from './SetupSquadsContent'
import CicloSprintsContent from './CicloSprintsContent'
import DeliveryContent from './DeliveryContent'

const accordionItems = [
  {
    id: 'diagnostico',
    title: 'diagnóstico',
    description: 'análise do desafio e estruturação da missão'
  },
  {
    id: 'preco-contrato',
    title: 'preço e contrato',
    description: 'definição do investimento e formalização da parceria.'
  },
  {
    id: 'setup-squads',
    title: 'setup de squads',
    description: 'conexão entre alunos e desafios'
  },
  {
    id: 'ciclo-sprints',
    title: 'ciclo de sprints',
    description: 'gestão de projetos pela Mastertech'
  },
  {
    id: 'delivery',
    title: 'delivery',
    description: 'finalização do projeto e relatório de fechamento.'
  }
]

function Accordion({ isVisible = true }) {
  const [expandedId, setExpandedId] = useState(null)

  return (
    <div className={`accordion-container ${isVisible ? 'visible' : ''}`}>
      {accordionItems.map((item, index) => {
        const isExpanded = expandedId === item.id
        const ContentComponent = {
          'diagnostico': DiagnosticoContent,
          'preco-contrato': PrecoContratoContent,
          'setup-squads': SetupSquadsContent,
          'ciclo-sprints': CicloSprintsContent,
          'delivery': DeliveryContent
        }[item.id]

        return (
          <div key={item.id} className="accordion-item-wrapper">
            <button
              className={`accordion-item ${isExpanded ? 'expanded' : ''}`}
              onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
              aria-expanded={isExpanded}
            >
              <div className="accordion-title">
                <span className="accordion-arrow">→</span>
                <span className="accordion-title-text">{item.title}</span>
              </div>
              <div className="accordion-description">
                {item.description}
              </div>
            </button>
            {isExpanded && ContentComponent && (
              <div className="accordion-expanded-content">
                <ContentComponent />
              </div>
            )}
            {index < accordionItems.length - 1 && (
              <div className="accordion-divider"></div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default Accordion


import { useState } from 'react'
import './Accordion.css'
import { accordionItems } from './Accordion.data'
import DiagnosticoContent from './DiagnosticoContent'
import PrecoContratoContent from './PrecoContratoContent'
import SetupSquadsContent from './SetupSquadsContent'
import CicloSprintsContent from './CicloSprintsContent'
import DeliveryContent from './DeliveryContent'
import AccordionItem from './AccordionItem'
import AccordionDivider from './AccordionDivider'
import SecretAgentReveal from './SecretAgentReveal'

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
            <AccordionItem
              title={item.title}
              description={item.description}
              isExpanded={isExpanded}
              onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
            />
            {isExpanded && ContentComponent && (
              <div className="accordion-expanded-content">
                <SecretAgentReveal>
                  <ContentComponent />
                </SecretAgentReveal>
              </div>
            )}
            {index < accordionItems.length - 1 && <AccordionDivider />}
          </div>
        )
      })}
    </div>
  )
}

export default Accordion


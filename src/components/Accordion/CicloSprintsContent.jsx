import './CicloSprintsContent.css'
import { sections } from './CicloSprintsContent.data'

function CicloSprintsContent({ sections: sectionsProp }) {
  const sectionsData = sectionsProp || sections
  return (
    <div className="ciclo-sprints-content">
      <div className="ciclo-sprints-sections">
        {sectionsData.map((section, index) => (
          <div key={index} className="ciclo-sprints-section">
            <h3 className={`ciclo-sprints-section-title special-gothic-heading-primary ${section.uppercase ? 'uppercase' : ''}`}>{section.title}</h3>
            <div className="ciclo-sprints-text-wrapper">
              <div className="ciclo-sprints-text">{section.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CicloSprintsContent


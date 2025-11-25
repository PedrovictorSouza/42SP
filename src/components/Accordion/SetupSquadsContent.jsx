import './SetupSquadsContent.css'
import { sections } from './SetupSquadsContent.data'

function SetupSquadsContent({ sections: sectionsProp }) {
  const sectionsData = sectionsProp || sections
  return (
    <div className="setup-squads-content">
      <h2 className="setup-squads-title special-gothic-heading-primary">→ setup de squads</h2>
      <div className="setup-squads-sections">
        {sectionsData.map((section, index) => (
          <div key={index} className="setup-squads-section">
            <h3 className="setup-squads-section-title special-gothic-heading-primary">{section.title}</h3>
            <div className="setup-squads-text-wrapper">
              <div className="setup-squads-text">{section.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SetupSquadsContent





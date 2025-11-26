import './DeliveryContent.css'
import { sections } from './DeliveryContent.data'

function DeliveryContent({ sections: sectionsProp }) {
  const sectionsData = sectionsProp || sections
  return (
    <div className="delivery-content">
      <div className="delivery-sections">
        {sectionsData.map((section, index) => (
          <div key={index} className="delivery-section">
            <h3 className="delivery-section-title special-gothic-heading-primary">{section.title}</h3>
            <div className="delivery-text-wrapper">
              <div className="delivery-text">{section.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DeliveryContent





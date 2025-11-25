import './DiagnosticoContent.css'
import { missionTypes, executionFormats } from './DiagnosticoContent.data'

function DiagnosticoContent({ missionTypes: missionTypesProp, executionFormats: executionFormatsProp }) {
  const missionTypesData = missionTypesProp || missionTypes
  const executionFormatsData = executionFormatsProp || executionFormats
  return (
    <div className="diagnostico-content">
      <h2 className="diagnostico-title special-gothic-heading-primary">→ diagnóstico</h2>
      <div className="diagnostico-sections">
        <div className="diagnostico-section mission-types-section">
          <h3 className="diagnostico-section-title special-gothic-heading-primary">TIPO DE MISSÃO</h3>
          <div className="diagnostico-items">
            {missionTypesData.map((item, index) => (
              <div key={index} className="diagnostico-item">
                <div className="diagnostico-item-title special-gothic-heading-primary">{item.title}</div>
                <div className="diagnostico-item-description">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="diagnostico-section execution-formats-section">
          <h3 className="diagnostico-section-title special-gothic-heading-primary">FORMATO DE EXECUÇÃO</h3>
          <div className="diagnostico-items">
            {executionFormatsData.map((item, index) => (
              <div key={index} className="diagnostico-item">
                <div className="diagnostico-item-title special-gothic-heading-primary">{item.title}</div>
                <div className="diagnostico-item-description">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DiagnosticoContent





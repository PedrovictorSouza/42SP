import './DiagnosticoContent.css'
import { missionTypes, executionFormats } from './DiagnosticoContent.data'

function DiagnosticoContent() {
  return (
    <section className="diagnostico-content">
      <h2 className="diagnostico-title">diagnóstico</h2>

      <div className="diagnostico-sections">
        <div className="diagnostico-section mission-types-section">
          <h3 className="diagnostico-section-title">TIPO DE MISSÃO</h3>

          <div className="diagnostico-grid-table">
            <div className="diagnostico-grid-header">Tipo</div>
            <div className="diagnostico-grid-header">Descrição</div>

            {missionTypes.map((mission) => [
              <div
                key={`${mission.title}-title`}
                className="diagnostico-grid-cell diagnostico-grid-cell-title"
              >
                {mission.title}
              </div>,
              <div
                key={`${mission.title}-description`}
                className="diagnostico-grid-cell diagnostico-grid-cell-description"
              >
                {mission.description}
              </div>
            ])}
          </div>
        </div>

        <div className="diagnostico-section execution-formats-section">
          <h3 className="diagnostico-section-title">FORMATO DE EXECUÇÃO</h3>

          <div className="diagnostico-grid-table">
            <div className="diagnostico-grid-header">Formato</div>
            <div className="diagnostico-grid-header">Descrição</div>

            {executionFormats.map((format) => [
              <div
                key={`${format.title}-title`}
                className="diagnostico-grid-cell diagnostico-grid-cell-title"
              >
                {format.title}
              </div>,
              <div
                key={`${format.title}-description`}
                className="diagnostico-grid-cell diagnostico-grid-cell-description"
              >
                {format.description}
              </div>
            ])}
          </div>
        </div>
      </div>
    </section>
  )
}

export default DiagnosticoContent





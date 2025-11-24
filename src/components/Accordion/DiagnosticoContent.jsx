import './DiagnosticoContent.css'

const missionTypes = [
  {
    title: 'COMPONENTE',
    description: 'ajustes ou melhorias em partes específicas de um sistema (automações, scripts, testes).'
  },
  {
    title: 'INTEGRAÇÃO',
    description: 'conexão entre sistemas, criação de APIs ou sincronização de bancos de dados.'
  },
  {
    title: 'PRODUTO',
    description: 'desenvolvimento de soluções funcionais como MVPs, painéis ou microsserviços.'
  },
  {
    title: 'INFRA',
    description: 'criação de pipelines, configuração de deploys e automações.'
  },
  {
    title: 'PESQUISA',
    description: 'exploração de novas tecnologias, IA generativa ou linguagens emergentes.'
  }
]

const executionFormats = [
  {
    title: 'QUICK WIN',
    description: '10 a 30 horas, missões curtas executadas por um ou dois alunos.'
  },
  {
    title: 'SPRINT STUDIO',
    description: '2 a 4 semanas, projetos de média complexidade conduzidos por squads de 3 a 5 pessoas.'
  },
  {
    title: 'RESIDENCY',
    description: '6 a 8 semanas, imersões longas para desafios estruturais ou experimentais.'
  }
]

function DiagnosticoContent() {
  return (
    <div className="diagnostico-content">
      <h2 className="diagnostico-title">→ diagnóstico</h2>
      <div className="diagnostico-sections">
        <div className="diagnostico-section mission-types-section">
          <h3 className="diagnostico-section-title">TIPO DE MISSÃO</h3>
          <div className="diagnostico-items">
            {missionTypes.map((item, index) => (
              <div key={index} className="diagnostico-item">
                <div className="diagnostico-item-title">{item.title}</div>
                <div className="diagnostico-item-description">{item.description}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="diagnostico-section execution-formats-section">
          <h3 className="diagnostico-section-title">FORMATO DE EXECUÇÃO</h3>
          <div className="diagnostico-items">
            {executionFormats.map((item, index) => (
              <div key={index} className="diagnostico-item">
                <div className="diagnostico-item-title">{item.title}</div>
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





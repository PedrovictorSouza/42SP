import './PrecoContratoContent.css'

const detalhes = [
  {
    title: 'Tempo estimado de execução',
    subtitle: '(em horas de trabalho)'
  },
  {
    title: 'Especificação das entregas',
    subtitle: 'previstas'
  },
  {
    title: 'Composição do squad',
    subtitle: ''
  }
]

function PrecoContratoContent() {
  return (
    <div className="preco-contrato-content">
      <h2 className="preco-contrato-title">→ preço e contrato</h2>
      <div className="preco-contrato-sections">
        <div className="preco-contrato-text-section">
          <div className="preco-contrato-text">
            Com base no diagnóstico, a<br />
            42SP e a Mastertech<br />
            apresentam a proposta de<br />
            investimento ao parceiro,<br />
            detalhando:
          </div>
        </div>
        <div className="preco-contrato-details-section">
          <div className="preco-contrato-details">
            {detalhes.map((item, index) => (
              <div key={index} className="preco-contrato-detail-box">
                <div className="preco-contrato-detail-title">{item.title}</div>
                {item.subtitle && (
                  <div className="preco-contrato-detail-subtitle">{item.subtitle}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrecoContratoContent



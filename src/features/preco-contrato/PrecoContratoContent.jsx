import './PrecoContratoContent.css'
import { detalhes } from './PrecoContratoContent.data'

function PrecoContratoContent({ detalhes: detalhesProp }) {
  const detalhesData = detalhesProp || detalhes
  return (
    <div className="preco-contrato-content">
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
        <div className="preco-contrato-details">
          {detalhesData.map((item, index) => (
            <div key={index} className="preco-contrato-detail-box">
              <div className="preco-contrato-detail-title special-gothic-heading-primary">{item.title}</div>
              {item.subtitle && (
                <div className="preco-contrato-detail-subtitle">{item.subtitle}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PrecoContratoContent





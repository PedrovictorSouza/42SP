import './DeliveryContent.css'

const sections = [
  {
    title: 'entrega técnica',
    text: 'Ao final da missão, o projeto é entregue ao parceiro junto com a documentação técnica.'
  },
  {
    title: 'lessons learned',
    text: 'Um relatório de fechamento registra o processo, as entregas realizadas e os aprendizados do squad no projeto.'
  }
]

function DeliveryContent() {
  return (
    <div className="delivery-content">
      <h2 className="delivery-title">→ delivery</h2>
      <div className="delivery-sections">
        {sections.map((section, index) => (
          <div key={index} className="delivery-section">
            <h3 className="delivery-section-title">{section.title}</h3>
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



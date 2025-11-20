import './CicloSprintsContent.css'

const sections = [
  {
    title: 'gestão',
    text: 'Durante a execução, a Mastertech conduz a gestão de projetos, com P.O. dedicado e encontros semanais de alinhamento.',
    uppercase: false
  },
  {
    title: 'ritmo',
    text: 'Os squads trabalham em ciclos curtos, com revisão de código e documentação colaborativa.',
    uppercase: false
  },
  {
    title: 'QA',
    text: 'As entregas passam por checagens funcionais e revisão de código, com documentação do que foi implementado.',
    uppercase: true
  }
]

function CicloSprintsContent() {
  return (
    <div className="ciclo-sprints-content">
      <h2 className="ciclo-sprints-title">→ ciclo de sprints</h2>
      <div className="ciclo-sprints-sections">
        {sections.map((section, index) => (
          <div key={index} className="ciclo-sprints-section">
            <h3 className={`ciclo-sprints-section-title ${section.uppercase ? 'uppercase' : ''}`}>{section.title}</h3>
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


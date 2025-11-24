import './SetupSquadsContent.css'

const sections = [
  {
    title: 'match',
    text: 'O sistema de gestão do lab conecta alunos aos desafios considerando disponibilidade, stack técnica e momento de aprendizagem.'
  },
  {
    title: 'seleção',
    text: 'O aluno escolhe participar, o sistema verifica aderência e o conselho supervisiona a composição dos squads.'
  }
]

function SetupSquadsContent() {
  return (
    <div className="setup-squads-content">
      <h2 className="setup-squads-title">→ setup de squads</h2>
      <div className="setup-squads-sections">
        {sections.map((section, index) => (
          <div key={index} className="setup-squads-section">
            <h3 className="setup-squads-section-title">{section.title}</h3>
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





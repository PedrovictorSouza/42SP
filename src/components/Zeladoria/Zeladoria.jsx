import './Zeladoria.css'

const supervisionContent = {
  header: 'O Lab42 é supervisionado por um time de governança',
  text: 'formado por representantes da 42 São Paulo, da Mastertech e da comunidade 42 (alunos e alumni).'
}

const councilFrentes = [
  {
    title: 'Filtro',
    text: 'avalia quais desafios são aceitos, considerando se oferecem aprendizado relevante e mantêm a coerência pedagógica.'
  },
  {
    title: 'Setup',
    text: 'revisa as estruturas de missão, supervisiona a formação dos squads e monitora a distribuição de oportunidades.'
  },
  {
    title: 'Documentação',
    text: 'publica relatórios periódicos sobre os projetos realizados, o investimento distribuído e o impacto no fundo de bolsas.'
  }
]

const principios = [
  {
    title: 'Aderência',
    text: 'cada missão precisa agregar à formação, além das entregas.'
  },
  {
    title: 'Sustentabilidade',
    text: 'o modelo precisa se manter financeiramente.'
  },
  {
    title: 'Equidade',
    text: 'as oportunidades são distribuídas de forma justa, respeitando diferentes perfis e momentos de aprendizado.'
  }
]

function Zeladoria({ isVisible = true }) {
  return (
    <section className={`zeladoria ${isVisible ? 'visible' : ''}`}>
      <div className="zeladoria-panel left">
        <div className="zeladoria-governanca">
          <span>[ GOVERNANÇA ]</span>
        </div>
        <div className="zeladoria-title">
          <span className="zeladoria-title-line">ZEL</span>
          <span className="zeladoria-title-line">ADO</span>
          <span className="zeladoria-title-line">RIA</span>
        </div>
      </div>
      <div className="zeladoria-panel right">
        <div className="zeladoria-content">
          <div className="zeladoria-section">
            <div className="zeladoria-section-header">
              <span className="zeladoria-arrow">→</span>
              <span className="zeladoria-header-text">{supervisionContent.header}</span>
            </div>
            <p className="zeladoria-section-text">{supervisionContent.text}</p>
          </div>

          <div className="zeladoria-section">
            <div className="zeladoria-section-header">
              <span className="zeladoria-arrow">→</span>
              <span className="zeladoria-header-text">O conselho atua em 3 frentes</span>
            </div>
            <div className="zeladoria-table">
              {councilFrentes.map((frente, index) => (
                <div key={index} className="zeladoria-table-cell">
                  <div className="zeladoria-table-title">{frente.title}</div>
                  <div className="zeladoria-table-text">{frente.text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="zeladoria-section">
            <div className="zeladoria-section-header">
              <span className="zeladoria-arrow">→</span>
              <span className="zeladoria-header-text">Princípios das decisões:</span>
            </div>
            <div className="zeladoria-table">
              {principios.map((principio, index) => (
                <div key={index} className="zeladoria-table-cell">
                  <div className="zeladoria-table-title">{principio.title}</div>
                  <div className="zeladoria-table-text">{principio.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Zeladoria


import './LifelongImpact.css'
import jellyfishImage from '../../assets/Jellyfish-1.png'
import CascadeText from '../Section/CascadeText/CascadeText'

const impactItems = [
  {
    id: 'fundos-bolsas',
    text: '70% do valor recebido pelo LAB vai para o fundo de bolsas da 42SP'
  },
  {
    id: 'remuneracao-alunos',
    text: '15% remunera os alunos participantes'
  },
  {
    id: 'operacao-laboratorio',
    text: '15% custeia a operação do laboratório'
  }
]

function LifelongImpact({ isVisible = true }) {
  return (
    <section className={`lifelong-impact ${isVisible ? 'visible' : ''}`}>
      <div className="lifelong-impact-panel left">
        <div className="lifelong-impact-jellyfish">
          <img src={jellyfishImage} alt="" />
        </div>
      </div>
      <div className="lifelong-impact-panel right">
        <div className="lifelong-impact-content-wrapper">
          <div className="lifelong-impact-title">
            <span className="lifelong-impact-title-line">42</span>
            <span className="lifelong-impact-title-line">PRA</span>
            <span className="lifelong-impact-title-line">SEMPRE</span>
          </div>
          <div className="lifelong-impact-items">
            {impactItems.map((item, index) => (
              <div key={item.id} className="lifelong-impact-item">
                <span className="lifelong-impact-arrow">→</span>
                <CascadeText 
                  text={item.text}
                  isVisible={isVisible}
                  delay={index * 0.1}
                  charDelay={0.02}
                  consoleStyle={true}
                  showTimestamps={false}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="lifelong-impact-footer">
          <span className="lifelong-impact-footer-line" />
          <span className="lifelong-impact-footer-text">[ LIFELONG IMPACT ]</span>
          <span className="lifelong-impact-footer-line" />
        </div>
      </div>
    </section>
  )
}

export default LifelongImpact


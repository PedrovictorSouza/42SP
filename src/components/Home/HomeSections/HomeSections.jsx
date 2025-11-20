import Section from '../../Section/Section'
import ParallaxText from '../ParallaxText/ParallaxText'
import WorldMapGrid from '../WorldMapGrid/WorldMapGrid'
import Accordion from '../../Accordion/Accordion'
import LifelongImpact from '../../LifelongImpact/LifelongImpact'

const sections = [
      {
        id: 'home',
        title: '[ DESENVOLVEMOS SOLUÇÕES DIGITAIS ]',
        text: 'O Lab42 é uma iniciativa da 42 São Paulo, com apoio da Mastertech. Funciona como um laboratório de inovação aplicada que transforma desafios reais de negócios em soluções digitais desenvolvidas por squads de estudantes da 42SP.',
        delay: 0,
        headerContent: <ParallaxText />
      },
  {
    id: 'disclaimer',
    title: '[ DISCLAIMER ]',
    text: 'A 42SP é uma escola de programação baseada em autonomia e aprendizado entre pares. Os alunos avançam por missões progressivas, aprendendo uns com os outros e regulando o próprio percurso. As missões do Lab42 são planejadas para se integrar naturalmente a essa rotina de aprendizado, sem interferir no andamento da formação. A participação dos estudantes é voluntária e leva em conta seus momentos acadêmicos, sua prontidão técnica e disponibilidade.',
    delay: 200,
    gridLayout: true,
    consoleStyle: true,
    topLeftText: 'A 42SP é uma escola de programação baseada em autonomia e aprendizado entre pares.',
    topRightText: 'Os alunos avançam por missões progressivas, aprendendo uns com os outros e regulando o próprio percurso.',
    bottomRightText: 'As missões do Lab42 são planejadas para se integrar naturalmente a essa rotina de aprendizado, sem interferir no andamento da formação. A participação dos estudantes é voluntária e leva em conta seus momentos acadêmicos, sua prontidão técnica e disponibilidade.'
  },
  {
    id: 'plano-de-voo',
    title: '[ MISSÃO ]',
    text: 'Cada missão começa com um diagnóstico técnico e pedagógico que permite compreender a natureza do desafio e estimar seu tamanho, complexidade e duração. Com base nesse entendimento, o conselho do laboratório valida a missão e forma os squads, combinando perfis e expertises de acordo com as exigências de cada caso.',
    delay: 400,
    backgroundContent: <WorldMapGrid />,
    sectionTitle: <>PLANO DE<br />VÔO</>,
    twoColumns: true,
    consoleStyle: true,
    firstColumnText: 'Cada missão começa\ncom um diagnóstico\ntécnico e pedagógico que\npermite compreender a\nnatureza do desafio e\nestimar seu tamanho,\ncomplexidade e duração.',
    secondColumnText: 'Com base nesse\nentendimento, o\nconselho do laboratório\nvalida a missão e forma\nos squads, combinando\nperfis e expertises de\nacordo com as exigências\nde cada caso'
  },
  {
    id: 'processo',
    title: '',
    text: '',
    delay: 500,
    customContent: <Accordion />
  },
  {
    title: '',
    text: '',
    delay: 1200,
    customContent: <LifelongImpact />
  }
]

function HomeSections() {
  return (
    <>
      {sections.map((section, index) => (
        <Section
          key={index}
          id={section.id}
          text={section.text}
          secondParagraph={section.secondParagraph}
          delay={section.delay}
          backgroundColor={section.backgroundColor}
          headerContent={section.headerContent}
          twoColumns={section.twoColumns}
          firstColumnText={section.firstColumnText}
          secondColumnText={section.secondColumnText}
          gridLayout={section.gridLayout}
          topLeftText={section.topLeftText}
          topRightText={section.topRightText}
          bottomRightText={section.bottomRightText}
          backgroundContent={section.backgroundContent}
          sectionTitle={section.sectionTitle}
          consoleStyle={section.consoleStyle}
          customContent={section.customContent}
        />
      ))}
    </>
  )
}

export default HomeSections


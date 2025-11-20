import Section from '../../Section/Section'
import ParallaxText from '../ParallaxText/ParallaxText'

const sections = [
      {
        title: '[ DESENVOLVEMOS SOLUÇÕES DIGITAIS ]',
        text: 'O Lab42 é uma iniciativa da 42 São Paulo, com apoio da Mastertech. Funciona como um laboratório de inovação aplicada que transforma desafios reais de negócios em soluções digitais desenvolvidas por squads de estudantes da 42SP.',
        delay: 0,
        headerContent: <ParallaxText />
      },
  {
    title: '[ DISCLAIMER ]',
    text: 'A 42SP é uma escola de programação baseada em autonomia e aprendizado entre pares. Os alunos avançam por missões progressivas, aprendendo uns com os outros e regulando o próprio percurso. As missões do Lab42 são planejadas para se integrar naturalmente a essa rotina de aprendizado, sem interferir no andamento da formação. A participação dos estudantes é voluntária e leva em conta seus momentos acadêmicos, sua prontidão técnica e disponibilidade.',
    delay: 200,
    gridLayout: true,
    topLeftText: 'A 42SP é uma escola de programação baseada em autonomia e aprendizado entre pares.',
    topRightText: 'Os alunos avançam por missões progressivas, aprendendo uns com os outros e regulando o próprio percurso.',
    bottomRightText: 'As missões do Lab42 são planejadas para se integrar naturalmente a essa rotina de aprendizado, sem interferir no andamento da formação. A participação dos estudantes é voluntária e leva em conta seus momentos acadêmicos, sua prontidão técnica e disponibilidade.'
  },
  {
    title: '[ MISSÃO ]',
    text: 'Cada missão começa com um diagnóstico técnico e pedagógico que permite compreender a natureza do desafio e estimar seu tamanho, complexidade e duração. Com base nesse entendimento, o conselho do laboratório valida a missão e forma os squads, combinando perfis e expertises de acordo com as exigências de cada caso.',
    delay: 400,
    backgroundColor: 'rgba(0, 0, 255, 0.2)'
  },
  {
    title: '[ O FLOW DO LAB42 ]',
    text: 'diagnóstico: análise do desafio e estruturação da missão. preço e contrato: definição do investimento e formalização da parceria. Com base no diagnóstico, a 42SP e a Mastertech apresentam a proposta de investimento ao parceiro, detalhando tempo estimado de execução, especificação das entregas previstas e composição do squad. setup de squads: conexão entre alunos e desafios. O sistema de gestão do lab conecta alunos aos desafios considerando disponibilidade, stack técnica e momento de aprendizagem. O aluno escolhe participar, o sistema verifica aderência e o conselho supervisiona a composição dos squads. ciclo de sprints: gestão de projetos pela Mastertech. Durante a execução, a Mastertech conduz a gestão de projetos, com P.O. dedicado e encontros semanais de alinhamento. Os squads trabalham em ciclos curtos, com revisão de código e documentação colaborativa. As entregas passam por checagens funcionais e revisão de código, com documentação do que foi implementado. Um relatório de fechamento registra o processo, as entregas realizadas e os aprendizados do squad no projeto. delivery: finalização do projeto e relatório de fechamento. Ao final da missão, o projeto é entregue ao parceiro junto com a documentação técnica.',
    delay: 600,
    backgroundColor: 'rgba(255, 255, 0, 0.2)'
  },
  {
    title: '[ TIPO DE MISSÃO ]',
    text: 'COMPONENTE: ajustes ou melhorias em partes específicas de um sistema (automações, scripts, testes). INTEGRAÇÃO: conexão entre sistemas, criação de APIs ou sincronização de bancos de dados. PRODUTO: desenvolvimento de soluções funcionais como MVPs, painéis ou microsserviços. INFRA: criação de pipelines, configuração de deploys e automações. PESQUISA: exploração de novas tecnologias, IA generativa ou linguagens emergentes.',
    delay: 800,
    backgroundColor: 'rgba(255, 0, 255, 0.2)'
  },
  {
    title: '[ FORMATO DE EXECUÇÃO ]',
    text: 'QUICK WIN: 10 a 30 horas, missões curtas executadas por um ou dois alunos. SPRINT STUDIO: 2 a 4 semanas, projetos de média complexidade conduzidos por squads de 3 a 5 pessoas. RESIDENCY: 6 a 8 semanas, imersões longas para desafios estruturais ou experimentais.',
    delay: 1000,
    backgroundColor: 'rgba(0, 255, 255, 0.2)'
  },
  {
    title: '[ LIFELONG IMPACT ]',
    text: '70% do valor recebido pelo LAB vai para o fundo de bolsas da 42SP. 15% remunera os alunos participantes. 15% custeia a operação do laboratório.',
    delay: 1200,
    backgroundColor: 'rgba(255, 165, 0, 0.2)'
  },
  {
    title: '[ GOVERNANÇA ]',
    text: 'O Lab42 é supervisionado por um time de governança formado por representantes da 42 São Paulo, da Mastertech e da comunidade 42 (alunos e alumni). O conselho atua em 3 frentes: Filtro (avalia quais desafios são aceitos, considerando se oferecem aprendizado relevante e mantêm a coerência pedagógica), Setup (revisa as estruturas de missão, supervisiona a formação dos squads e monitora a distribuição de oportunidades) e Documentação (publica relatórios periódicos sobre os projetos realizados, o investimento distribuído e o impacto no fundo de bolsas). Princípios das decisões: Sustentabilidade (o modelo precisa se manter financeiramente), Equidade (as oportunidades são distribuídas de forma justa, respeitando diferentes perfis e momentos de aprendizado) e Aderência (cada missão precisa agregar à formação, além das entregas).',
    delay: 1400,
    backgroundColor: 'rgba(128, 0, 128, 0.2)'
  },
  {
    title: '[ CALL TO ACTION ]',
    text: 'O Lab42 é uma iniciativa da 42 São Paulo, com apoio da Mastertech. DESENVOLVA FUTUROS. ENTRE EM CONTATO.',
    delay: 1600,
    backgroundColor: 'rgba(255, 192, 203, 0.2)'
  }
]

function HomeSections() {
  return (
    <>
      {sections.map((section, index) => (
        <Section
          key={index}
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
        />
      ))}
    </>
  )
}

export default HomeSections


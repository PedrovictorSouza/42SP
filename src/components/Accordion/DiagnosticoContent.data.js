// LETTER-SPACING CONTRACT
// - Os títulos de missionTypes e executionFormats SÓ podem ser renderizados
//   dentro de componentes que apliquem classes de heading com tracking correto,
//   por exemplo: .diagnostico-item-title + .special-gothic-heading-primary.
// - Nunca renderize esses titles como texto puro sem essas classes.
// - Qualquer IA / dev que use esses arrays deve respeitar esse contrato.

export const missionTypes = [
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

export const executionFormats = [
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


// LETTER-SPACING CONTRACT
// - Os títulos de missionTypes e executionFormats SÓ podem ser renderizados
//   dentro de componentes que apliquem classes de heading com tracking correto,
//   por exemplo: .diagnostico-item-title + .special-gothic-heading-primary.
// - Nunca renderize esses titles como texto puro sem essas classes.
// - Qualquer IA / dev que use esses arrays deve respeitar esse contrato.

export const missionTypes = [
  {
    title: 'COMPONENTE',
    description: 'Ajustes pontuais em partes do sistema (scripts, automações, testes).'
  },
  {
    title: 'INTEGRAÇÃO',
    description: 'Conectar sistemas e dados por meio de APIs e sincronizações.'
  },
  {
    title: 'PRODUTO',
    description: 'Criar uma solução funcional completa (MVP, painel ou microsserviço).'
  },
  {
    title: 'INFRA',
    description: 'Configurar pipelines, deploy e automações de infraestrutura.'
  },
  {
    title: 'PESQUISA',
    description: 'Explorar novas tecnologias, IA generativa e linguagens emergentes.'
  }
]

export const executionFormats = [
  {
    title: 'QUICK WIN',
    description: '10–30h · Missão curta executada por 1–2 alunos.'
  },
  {
    title: 'SPRINT STUDIO',
    description: '2–4 semanas · Projeto de média complexidade com squad de 3–5 pessoas.'
  },
  {
    title: 'RESIDENCY',
    description: '6–8 semanas · Imersão longa para desafios estruturais ou experimentais.'
  }
]


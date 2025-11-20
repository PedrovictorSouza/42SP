import './ManifestoContent.css'

function ManifestoContent() {
  return (
    <section className="manifesto-content">
      <div className="manifesto-container">
        <h1 className="manifesto-title">LAB42</h1>
        
        <div className="manifesto-text">
          <h2 className="manifesto-section-title">[ DISCLAIMER ]</h2>
          
          <p>
            Os projetos deverão se integrar ao fluxo natural de aprendizado da 42SP, 
            respeitando o momento de cada aluno.
          </p>
          
          <p>
            A definição e a distribuição dos valores recebidos pelo LAB deverão seguir 
            critérios claros e previamente estabelecidos.
          </p>
          
          <p>
            A dedicação dos alunos deverá ser reconhecida com uma compensação adequada 
            ao contexto educacional.
          </p>
          
          <h2 className="manifesto-section-title">[ DESENVOLVEMOS SOLUÇÕES DIGITAIS ]</h2>
          
          <p>
            O Lab42 é uma iniciativa da 42 São Paulo, com apoio da Mastertech. 
            Funciona como um laboratório de inovação aplicada que transforma desafios 
            reais de negócios em soluções digitais desenvolvidas por squads de estudantes 
            da 42SP.
          </p>
          
          <p>
            A 42SP é uma escola de programação baseada em autonomia e aprendizado entre 
            pares. Os alunos avançam por missões progressivas, aprendendo uns com os 
            outros e regulando o próprio percurso.
          </p>
          
          <p>
            As missões do Lab42 são planejadas para se integrar naturalmente a essa 
            rotina de aprendizado, sem interferir no andamento da formação. A participação 
            dos estudantes é voluntária e leva em conta seus momentos acadêmicos, sua 
            prontidão técnica e disponibilidade.
          </p>
          
          <h2 className="manifesto-section-title">[ MISSÃO ]</h2>
          <h3 className="manifesto-subtitle">COMO FUNCIONA</h3>
          
          <h4 className="manifesto-subsection">diagnóstico</h4>
          <p>
            Cada missão começa com um diagnóstico técnico e pedagógico que permite 
            compreender a natureza do desafio e estimar seu tamanho, complexidade e duração.
          </p>
          <p>
            Com base nesse entendimento, o conselho do laboratório valida a missão e forma 
            os squads, combinando perfis e expertises de acordo com as exigências de cada caso.
          </p>
          
          <h4 className="manifesto-subsection">preço e contrato</h4>
          <p>
            Com base no diagnóstico, a 42SP e a Mastertech apresentam a proposta de 
            investimento ao parceiro, detalhando tempo estimado de execução (em horas de 
            trabalho), especificação das entregas previstas e composição do squad.
          </p>
          
          <h4 className="manifesto-subsection">setup de squads</h4>
          <p>
            O sistema de gestão do lab conecta alunos aos desafios considerando disponibilidade, 
            stack técnica e momento de aprendizado. O aluno escolhe participar, o sistema 
            verifica aderência e o conselho supervisiona a composição dos squads.
          </p>
          
          <h4 className="manifesto-subsection">ciclo de sprints</h4>
          <p>
            Durante a execução, a Mastertech conduz a gestão de projetos, com P.O. dedicado e 
            encontros semanais de alinhamento. Os squads trabalham em ciclos curtos, com revisão 
            de código e documentação colaborativa. As entregas passam por checagens funcionais 
            e revisão de código, com documentação do que foi implementado.
          </p>
          
          <h4 className="manifesto-subsection">delivery</h4>
          <p>
            Ao final da missão, o projeto é entregue ao parceiro junto com a documentação técnica. 
            Um relatório de fechamento registra o processo, as entregas realizadas e os 
            aprendizados do squad no projeto.
          </p>
          
          <h2 className="manifesto-section-title">TIPO DE MISSÃO</h2>
          
          <div className="mission-types">
            <div className="mission-type-item">
              <strong>COMPONENTE</strong>
              <p>ajustes ou melhorias em partes específicas de um sistema (automações, scripts, testes).</p>
            </div>
            <div className="mission-type-item">
              <strong>INTEGRAÇÃO</strong>
              <p>conexão entre sistemas, criação de APIs ou sincronização de bancos de dados.</p>
            </div>
            <div className="mission-type-item">
              <strong>PRODUTO</strong>
              <p>desenvolvimento de soluções funcionais como MVPs, painéis ou microsserviços.</p>
            </div>
            <div className="mission-type-item">
              <strong>INFRA</strong>
              <p>criação de pipelines, configuração de deploys e automações.</p>
            </div>
            <div className="mission-type-item">
              <strong>PESQUISA</strong>
              <p>exploração de novas tecnologias, IA generativa ou linguagens emergentes.</p>
            </div>
          </div>
          
          <h2 className="manifesto-section-title">FORMATO DE EXECUÇÃO</h2>
          
          <div className="execution-formats">
            <div className="format-item">
              <strong>QUICK WIN</strong>
              <p>10 a 30 horas, missões curtas executadas por um ou dois alunos.</p>
            </div>
            <div className="format-item">
              <strong>SPRINT STUDIO</strong>
              <p>2 a 4 semanas, projetos de média complexidade conduzidos por squads de 3 a 5 pessoas.</p>
            </div>
            <div className="format-item">
              <strong>RESIDENCY</strong>
              <p>6 a 8 semanas, imersões longas para desafios estruturais ou experimentais.</p>
            </div>
          </div>
          
          <h2 className="manifesto-section-title">DISTRIBUIÇÃO DE VALORES</h2>
          
          <div className="value-distribution">
            <p><strong>70%</strong> do valor recebido pelo LAB vai para o fundo de bolsas da 42SP</p>
            <p><strong>15%</strong> remunera os alunos participantes</p>
            <p><strong>15%</strong> custeia a operação do laboratório</p>
          </div>
          
          <h2 className="manifesto-section-title">[ GOVERNANÇA ]</h2>
          
          <p>
            O Lab42 é supervisionado por um time de governança formado por representantes da 
            42 São Paulo, da Mastertech e da comunidade 42 (alunos e alumni).
          </p>
          
          <p>
            O conselho atua em 3 frentes:
          </p>
          
          <div className="governance-items">
            <div className="governance-item">
              <strong>Filtro</strong>
              <p>avalia quais desafios são aceitos, considerando se oferecem aprendizado relevante e mantêm a coerência pedagógica.</p>
            </div>
            <div className="governance-item">
              <strong>Setup</strong>
              <p>revisa as estruturas de missão, supervisiona a formação dos squads e monitora a distribuição de oportunidades.</p>
            </div>
            <div className="governance-item">
              <strong>Documentação</strong>
              <p>publica relatórios periódicos sobre os projetos realizados, o investimento distribuído e o impacto no fundo de bolsas.</p>
            </div>
          </div>
          
          <h3 className="manifesto-subtitle">Princípios das decisões:</h3>
          
          <div className="principles">
            <div className="principle-item">
              <strong>Aderência</strong>
              <p>cada missão precisa agregar à formação, além das entregas.</p>
            </div>
            <div className="principle-item">
              <strong>Sustentabilidade</strong>
              <p>o modelo precisa se manter financeiramente.</p>
            </div>
            <div className="principle-item">
              <strong>Equidade</strong>
              <p>as oportunidades são distribuídas de forma justa, respeitando diferentes perfis e momentos de aprendizado.</p>
            </div>
          </div>
          
          <h2 className="manifesto-section-title">[ CALL TO ACTION ]</h2>
          
          <p className="manifesto-cta">
            DESENVOLVA FUTUROS
          </p>
        </div>
        
        <button className="manifesto-button">
          ENTRE EM CONTATO
        </button>
      </div>
    </section>
  )
}

export default ManifestoContent




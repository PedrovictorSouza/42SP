import manifestoData from './manifesto.json'

// Utilitário simples para acessar o manifesto
// Em uma aplicação maior, isso poderia usar Contexto ou i18n
export const getManifestoText = (path) => {
  const keys = path.split('.')
  let current = manifestoData
  
  for (const key of keys) {
    if (current === undefined || current === null) return ''
    current = current[key]
  }
  
  return current || ''
}

export default manifestoData


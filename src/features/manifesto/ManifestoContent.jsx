import './ManifestoContent.css'
import { manifestoTable } from './ManifestoContent.data'

function ManifestoContent() {
  const renderContent = (item) => {
    switch (item.kind) {
      case 'title':
        return <h1 className="manifesto-title">{item.content}</h1>
        
      case 'section-title':
        return <h2 className="manifesto-section-title">{item.content}</h2>

      case 'subtitle':
        return <h3 className="manifesto-subtitle">{item.content}</h3>

      case 'subsection':
        return <h4 className="manifesto-subsection">{item.content}</h4>

      case 'paragraph':
        return (
          <p>
            {item.content}
            {item.keywords && item.keywords.length > 0 && (
              <div className="manifesto-keywords">
                {item.keywords.map((keyword, idx) => (
                  <span key={idx} className="manifesto-keyword">{keyword}</span>
                ))}
              </div>
            )}
          </p>
        )

      case 'mission-type':
        return (
          <table className="manifesto-table">
            <thead>
              <tr>
                <th>{item.subtitle}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {item.content}
                  {item.keywords && item.keywords.length > 0 && (
                    <div className="manifesto-keywords">
                      {item.keywords.map((keyword, idx) => (
                        <span key={idx} className="manifesto-keyword">{keyword}</span>
                      ))}
                    </div>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        )

      case 'execution-format':
        return (
          <table className="manifesto-table">
            <thead>
              <tr>
                <th>{item.subtitle}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {item.content}
                  {item.keywords && item.keywords.length > 0 && (
                    <div className="manifesto-keywords">
                      {item.keywords.map((keyword, idx) => (
                        <span key={idx} className="manifesto-keyword">{keyword}</span>
                      ))}
                    </div>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        )

      case 'value-distribution':
        return (
          <p><strong>{item.subtitle}</strong> {item.content}</p>
        )

      case 'governance-item':
        return (
          <div className="governance-item">
            <strong>{item.subtitle}</strong>
          <p>
              {item.content}
              {item.keywords && item.keywords.length > 0 && (
                <div className="manifesto-keywords">
                  {item.keywords.map((keyword, idx) => (
                    <span key={idx} className="manifesto-keyword">{keyword}</span>
                  ))}
                </div>
              )}
            </p>
          </div>
        )

      case 'principle':
        return (
          <div className="principle-item">
            <strong>{item.subtitle}</strong>
            <p>
              {item.content}
              {item.keywords && item.keywords.length > 0 && (
                <div className="manifesto-keywords">
                  {item.keywords.map((keyword, idx) => (
                    <span key={idx} className="manifesto-keyword">{keyword}</span>
                  ))}
                </div>
              )}
            </p>
          </div>
        )

      case 'cta':
        return <p className="manifesto-cta">{item.content}</p>

      case 'button':
        return (
          <button className="manifesto-button">
            {item.content}
          </button>
        )

      default:
        return null
    }
  }

  const renderItems = () => {
    const elements = []
    const contentItems = manifestoTable.filter(item => item.kind !== 'title' && item.kind !== 'button')
    
    let i = 0
    while (i < contentItems.length) {
      const item = contentItems[i]
      
      if (item.kind === 'governance-item') {
        const governanceItems = []
        while (i < contentItems.length && contentItems[i].kind === 'governance-item') {
          governanceItems.push(contentItems[i])
          i++
        }
        elements.push(
          <div key={`governance-group-${governanceItems[0].id}`} className="governance-items">
            {governanceItems.map((govItem) => (
              <div key={govItem.id}>{renderContent(govItem)}</div>
            ))}
          </div>
        )
      } else if (item.kind === 'principle') {
        const principleItems = []
        while (i < contentItems.length && contentItems[i].kind === 'principle') {
          principleItems.push(contentItems[i])
          i++
        }
        elements.push(
          <div key={`principle-group-${principleItems[0].id}`} className="principles">
            {principleItems.map((princItem) => (
              <div key={princItem.id}>{renderContent(princItem)}</div>
            ))}
          </div>
        )
      } else if (item.kind === 'value-distribution') {
        const valueItems = []
        while (i < contentItems.length && contentItems[i].kind === 'value-distribution') {
          valueItems.push(contentItems[i])
          i++
        }
        elements.push(
          <div key={`value-group-${valueItems[0].id}`} className="value-distribution">
            {valueItems.map((valItem) => (
              <div key={valItem.id}>{renderContent(valItem)}</div>
            ))}
          </div>
        )
      } else {
        elements.push(
          <div key={item.id}>
            {renderContent(item)}
          </div>
        )
        i++
      }
    }

    return elements
  }

  const titleItem = manifestoTable.find(item => item.kind === 'title')
  const buttonItem = manifestoTable.find(item => item.kind === 'button')

  return (
    <section className="manifesto-content">
      <div className="manifesto-container">
        {titleItem && renderContent(titleItem)}
        
        <div className="manifesto-text">
          {renderItems()}
        </div>
        
        {buttonItem && renderContent(buttonItem)}
      </div>
    </section>
  )
}

export default ManifestoContent

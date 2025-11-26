function AccordionItem({ title, description, isExpanded, onClick }) {
  return (
    <button
      className={`accordion-item ${isExpanded ? 'expanded' : ''}`}
      onClick={onClick}
      aria-expanded={isExpanded}
    >
      <div className="accordion-title">
        <span className={`accordion-arrow ${isExpanded ? 'expanded' : ''}`}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 5L13 10L7 15" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
        <span className="accordion-title-text">{title}</span>
      </div>
      <p className="accordion-description cascade-text console-style">
        {description}
      </p>
    </button>
  )
}

export default AccordionItem


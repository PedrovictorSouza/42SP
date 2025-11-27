import { useZeladoriaTextStyles } from './useZeladoriaTextStyles'

function ZeladoriaText({ children, className = '', style = {}, as: Component = 'p', ...props }) {
  const zeladoriaStyles = useZeladoriaTextStyles()
  
  const combinedStyle = {
    ...zeladoriaStyles,
    ...style
  }

  return (
    <Component 
      className={className}
      style={combinedStyle}
      {...props}
    >
      {children}
    </Component>
  )
}

export default ZeladoriaText


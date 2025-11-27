import { useRef, useMemo } from 'react'
import { useGridDrag } from '../../../features/home/hooks/useGridDrag'
import './InteractiveGrid.css'

function InteractiveGrid({ itemSize = 320, gap = 32, rows = 6, cols = 8 }) {
  const canvasWrapperRef = useRef(null)

  useGridDrag(canvasWrapperRef, itemSize, gap, rows, cols)

  const gridItems = useMemo(() => {
    const items = []
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
            items.push({
              id: `${row}-${col}`,
              x: col * (itemSize + gap),
              y: row * (itemSize + gap),
              color: 'rgba(5, 178, 193, 0.2)' // Cyan color with 20% opacity
            })
      }
    }
    return items
  }, [rows, cols, itemSize, gap])

  return (
    <div className="canvas-wrapper" ref={canvasWrapperRef}>
      <div className="grid-container">
        {gridItems.map(item => (
          <div
            key={item.id}
            className="grid-item"
            style={{
              left: `${item.x}px`,
              top: `${item.y}px`,
              background: item.color
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default InteractiveGrid


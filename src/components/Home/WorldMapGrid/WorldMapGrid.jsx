import { useMemo } from 'react'
import './WorldMapGrid.css'

function WorldMapGrid() {
  const totalCells = 35 * 55

  const cells = useMemo(() => {
    return Array.from({ length: totalCells }, (_, i) => {
      const randomDelay = Math.random() * 15000
      return { id: i, delay: randomDelay }
    })
  }, [])

  return (
    <div className="world-map-container">
      <div className="world-map-scroll-wrapper">
        <div className="world-map-grid">
          {cells.map((cell) => (
            <div
              key={cell.id}
              className="world-map-cell"
              style={{ '--random-delay': cell.delay }}
            />
          ))}
        </div>
        <div className="world-map-grid world-map-grid-duplicate">
          {cells.map((cell) => (
            <div
              key={`duplicate-${cell.id}`}
              className="world-map-cell"
              style={{ '--random-delay': cell.delay }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default WorldMapGrid


import { useEffect } from 'react'

export function useGridDrag(canvasWrapperRef, itemSize, gap, rows, cols) {
  useEffect(() => {
    const canvasWrapper = canvasWrapperRef.current

    if (!canvasWrapper) return

    const zoom = 0.6

    const totalWidth = cols * (itemSize + gap) - gap
    const totalHeight = rows * (itemSize + gap) - gap

    canvasWrapper.style.width = `${totalWidth}px`
    canvasWrapper.style.height = `${totalHeight}px`
    canvasWrapper.style.transform = `scale(${zoom})`
    canvasWrapper.style.transformOrigin = '0 0'

    const vw = window.innerWidth
    const vh = window.innerHeight
    const scaledWidth = totalWidth * zoom
    const scaledHeight = totalHeight * zoom
    const centerX = (vw - scaledWidth) / 2
    const centerY = (vh - scaledHeight) / 2

    canvasWrapper.style.left = `${centerX}px`
    canvasWrapper.style.top = `${centerY}px`

    let isDragging = false
    let startX = 0
    let startY = 0
    let currentX = centerX
    let currentY = centerY

    const handleMouseDown = (e) => {
      if (e.button === 0) {
        isDragging = true
        startX = e.clientX - currentX
        startY = e.clientY - currentY
        document.body.classList.add('dragging')
      }
    }

    const handleMouseMove = (e) => {
      if (isDragging) {
        currentX = e.clientX - startX
        currentY = e.clientY - startY
        canvasWrapper.style.left = `${currentX}px`
        canvasWrapper.style.top = `${currentY}px`
      }
    }

    const handleMouseUp = () => {
      isDragging = false
      document.body.classList.remove('dragging')
    }

    canvasWrapper.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      canvasWrapper.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [canvasWrapperRef, itemSize, gap, rows, cols])
}


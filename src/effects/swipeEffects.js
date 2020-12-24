export function setUpSwipeLeftRightEvents(elemRef, onGoRight, onGoLeft, getSensitivity) {
  let xInitial = 0
  let multitouch = false

  const sensitivity = typeof getSensitivity === 'function' ? getSensitivity() : getSensitivity

  const swipeIfEnoughMovement = deltaX => {
    if (deltaX > sensitivity) return onGoRight()
    if (deltaX < -sensitivity) return onGoLeft()
  }

  const onMouseDown = e => (xInitial = e.clientX)
  const onMouseUp = e => swipeIfEnoughMovement(xInitial - e.clientX)

  const onTouchStart = e => {
    if (e.touches.length > 1) return (multitouch = true)
    xInitial = e.touches[0].clientX
    multitouch = false
  }

  const onTouchMove = e => {
    if (e.touches.length > 1) return
    const deltaX = xInitial - e.changedTouches[0].clientX
    if (Math.abs(deltaX) > 20 && e.cancelable) {
      e.preventDefault()
    }
  }

  const onTouchEnd = e => {
    if (multitouch) return
    const deltaX = xInitial - e.changedTouches[0].clientX
    swipeIfEnoughMovement(deltaX)
  }

  const element = elemRef.current
  if (!element) return () => {}
  element.addEventListener('mousedown', onMouseDown)
  element.addEventListener('mouseup', onMouseUp)
  element.addEventListener('touchstart', onTouchStart)
  element.addEventListener('touchmove', onTouchMove)
  element.addEventListener('touchend', onTouchEnd)

  return () => {
    element.removeEventListener('mousedown', onMouseDown)
    element.removeEventListener('mouseup', onMouseUp)
    element.removeEventListener('touchstart', onTouchStart)
    element.removeEventListener('touchmove', onTouchMove)
    element.removeEventListener('touchend', onTouchEnd)
  }
}

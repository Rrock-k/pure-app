let initial = true

const handleScrollbarWidth = (marginIsNeeded, delay = 250) => {
  if (marginIsNeeded) {
    const widthBefore = document.body.getBoundingClientRect().width
    document.body.classList.add('overflow-hidden')
    const widthAfter = document.body.getBoundingClientRect().width
    document.body.style.marginRight = `${widthAfter - widthBefore}px`

    return widthAfter - widthBefore
  } else
    setTimeout(() => {
      if (!initial) {
        document.body.classList.remove('overflow-hidden')
        document.body.style.marginRight = null
      }
      initial = false
    }, delay)
}

export default handleScrollbarWidth

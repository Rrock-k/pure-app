let initial = true

const handleScrollbarWidth = (marginIsNeeded, delay = 250) => {
  console.log('inside handleScrollbarWidth: ')
  console.log('marginIsNeeded: ' + marginIsNeeded)

  if (marginIsNeeded) {
    const widthBefore = document.body.getBoundingClientRect().width
    document.body.classList.add('overflow-hidden')
    // document.body.style.overflow = 'hidden'
    const widthAfter = document.body.getBoundingClientRect().width
    document.body.style.marginRight = `${widthAfter - widthBefore}px`

    return widthAfter - widthBefore
  } else
    setTimeout(() => {
      if (!initial) {
        // document.body.removeAttribute('style')
        document.body.classList.remove('overflow-hidden')
        const wrapper = document.getElementById('mobile-menu')
        if (wrapper) wrapper.scrollTo(0, 0)
        console.log('handleScrollbarWidth executed')
      }
      initial = false
    }, delay)
}

export default handleScrollbarWidth

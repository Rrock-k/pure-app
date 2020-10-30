const handleScrollbarWidth = marginIsNeeded => {
  if (marginIsNeeded) {
    const widthBefore = document.body.getBoundingClientRect().width
    document.body.style.overflow = 'hidden'
    const widthAfter = document.body.getBoundingClientRect().width
    document.body.style.marginRight = `${widthAfter - widthBefore}px`

    return widthAfter - widthBefore
  } else
    setTimeout(() => {
      document.body.removeAttribute('style')
      const wrapper = document.getElementById('xnav-wrapper')
      if (wrapper) wrapper.scrollTo(0, 0)
    }, 150)
}

export default handleScrollbarWidth

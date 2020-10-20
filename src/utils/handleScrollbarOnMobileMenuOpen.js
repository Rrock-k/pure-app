import getScrollbarWidth from './getScrollbarWidth'

const handleScrollbarOnMobileMenuOpen = mobileMenuIsOpened => {
  return () => {
    if (mobileMenuIsOpened) {
      const widthBefore = document.body.getBoundingClientRect().width
      document.body.style.overflow = 'hidden'
      const widthAfter = document.body.getBoundingClientRect().width
      document.body.style.marginRight = `${widthAfter - widthBefore}px`
    } else
      setTimeout(() => {
        document.body.removeAttribute('style')
        const wrapper = document.getElementById('xnav-wrapper')
        if (wrapper) wrapper.scrollTo(0, 0)
      }, 150)
  }
}

export default handleScrollbarOnMobileMenuOpen

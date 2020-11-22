import React from 'react'

export default function ScrollToTop({ showButton, button = ArrowButton }) {
  // const { pathname } = useLocation()

  // useEffect(() => {
  //   if (!pathname.split('/').includes('shop')) window.scrollTo(0, 0)
  // }, [pathname])

  const ScrollToTopButton = button

  if (showButton) return <ScrollToTopButton />
  return null
}

function ArrowButton() {
  return (
    <button
      className='scroll-to-top-button'
      onClick={e => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        e.currentTarget.blur()
      }}
    >
      <div></div>
    </button>
  )
}

import React from 'react'
import styles from './ScrollTop.module.css'

export default function ScrollToTop({ show = true, Button = ArrowButton }) {
  // const { pathname } = useLocation()

  // useEffect(() => {
  //   if (!pathname.split('/').includes('shop')) window.scrollTo(0, 0)
  // }, [pathname])

  if (show) return <Button />
  return null
}

function ArrowButton() {
  return (
    <button
      className={styles.button}
      onClick={e => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        e.currentTarget.blur()
      }}
    >
      <div></div>
    </button>
  )
}

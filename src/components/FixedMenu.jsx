import React, { useEffect, useState } from 'react'

import Menu from './Menu'

import getCoords from '../utils/getCoords'

export default function FixedMenu() {
  const [showMenuOnTop, setShowMenuOnTop] = useState(false)

  useEffect(() => {
    const navMenu = document.getElementById('main-menu')

    const handleScroll = () => {
      const { top: menuTop } = getCoords(navMenu)
      const paddingDifference = 16
      if (menuTop + paddingDifference < window.scrollY) setShowMenuOnTop(true)
      else setShowMenuOnTop(false)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return <Menu fixed hidden={!showMenuOnTop} />
}

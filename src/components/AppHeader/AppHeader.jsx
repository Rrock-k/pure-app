import React from 'react'
import { useLocation } from 'react-router-dom'

import Banner from './Banner'
import FixedMenu from './FixedMenu'
import Header from './Header'

import { firstScreen } from './styles/FirstScreen.module.css'

function AppHeader() {
  const { pathname } = useLocation()
  const bannerNeeded = pathname === '/home' ? true : false

  if (bannerNeeded)
    return (
      <header className={firstScreen}>
        <FixedMenu />
        <Header />
        <Banner />
      </header>
    )
  return (
    <header>
      <FixedMenu />
      <Header />
    </header>
  )
}

export default React.memo(AppHeader)

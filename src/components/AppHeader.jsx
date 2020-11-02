import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import Banner from './Banner'
import FixedMenu from './FixedMenu'
import Header from './Header'

export default function AppHeader() {
  const { pathname } = useLocation()
  const bannerNeeded = pathname === '/home' ? true : false

  useEffect(() => {
    console.log('FirstScreen did mount')

    return () => {
      console.log('FirstScreen did unmount')
    }
  })

  if (bannerNeeded)
    return (
      <div className={'first-screen'}>
        <FixedMenu />

        <Header />
        <Banner />
        <div className='first-screen-margin'></div>
      </div>
    )
  return (
    <div>
      <FixedMenu />
      <Header />
    </div>
  )
}

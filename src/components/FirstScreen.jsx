import React from 'react'

import Banner from './Banner'
import Header from './Header'

export default function FirstScreen({ openMobileMenu, bannerNeeded }) {
  if (bannerNeeded)
    return (
      <div className={'first-screen'}>
        <Header openMobileMenu={openMobileMenu} />
        {<Banner />}
        <div className='first-screen-margin'></div>
      </div>
    )
  return (
    <div>
      <Header openMobileMenu={openMobileMenu} />
    </div>
  )
}

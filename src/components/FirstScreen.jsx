import React, { useEffect } from 'react'

import Banner from './Banner'
import Header from './Header'

export default function FirstScreen({ bannerNeeded } = {}) {
  useEffect(() => {
    console.log('FirstScreen did mount')

    return () => {
      console.log('FirstScreen did unmount')
    }
  })

  if (bannerNeeded)
    return (
      <div className={'first-screen'}>
        <Header />
        <Banner />
        <div className='first-screen-margin'></div>
      </div>
    )
  return (
    <div>
      <Header />
    </div>
  )
}

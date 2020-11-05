import React, { useEffect } from 'react'

import MainSlider from '../MainSlider'
import InstagramSection from '../InstagramSlider'
import Sections from './Sections'
import SectionAbout from './SectionAbout'
import SubscriptionBlock from './SubscriptionBlock'

export default function Home() {
  useEffect(() => {
    console.log('Home did mount')

    return () => {
      console.log('Home did unmount')
    }
  })

  return (
    <>
      <MainSlider />
      <Sections />
      <InstagramSection />
      <SectionAbout />
      <SubscriptionBlock />
    </>
  )
}

import React from 'react'

import MainSlider from './MainSlider'
import InstagramSection from './InstagramSlider'
import Sections from './Sections'
import SectionAbout from './SectionAbout'
import SubscriptionBlock from './SubscriptionBlock'

export default function Home() {
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

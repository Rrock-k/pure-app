import React from 'react'
import { t } from '../../pure-common/utils/translation'
import aboutImg from '../../assets/images/sections/about.jpg'

const tPath = 'home.sections.section_about.'
const tThis = path => t(tPath + path)

export default function SectionAbout() {
  return (
    <div className='section-about'>
      <img src={aboutImg} alt='раздел о нас' className='section-about-img' />
      <div className='section-about-text-container'>
        <h1>{tThis('title')}</h1>
        <p>{tThis('p1')}</p>
        <p>{tThis('p2')}</p>
        <p>{tThis('p3')}</p>
        <p>{tThis('p4')}</p>
        <p>{tThis('p5')}</p>
        {tThis('p6') && <p>{tThis('p6')}</p>}
      </div>
    </div>
  )
}

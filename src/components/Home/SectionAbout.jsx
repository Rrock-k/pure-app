import React from 'react'
import { t } from '../../pure-common/utils/translation'
import aboutImg from '../../assets/images/sections/clothes.png'

const tPath = 'home.sections.section_about.'
const tThis = path => t(tPath + path)

export default function SectionAbout() {
  return (
    <div className='about'>
      <img src={aboutImg} alt='раздел о нас' className='section-img' />
      <div className='about-text-container'>
        <h3>{tThis('title')}</h3>

        <p>{tThis('p1')}</p>
        <p>{tThis('p2')}</p>
      </div>
    </div>
  )
}

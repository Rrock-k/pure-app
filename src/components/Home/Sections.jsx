import React from 'react'
import { Link } from 'react-router-dom'

import womenImg from '../../assets/images/sections/women.jpg'
import menImg from '../../assets/images/sections/men.jpg'
import jewwelryImg from '../../assets/images/sections/jewelry.jpg'

import { t } from '../../pure-common/utils/translation'
const tThis = path => t('home.sections.section_names.' + path)

export default function Sections() {
  const btnText = t('home.sections.button_text')
  return (
    <div className='sections'>
      <Section
        to='shop/kimono-women'
        src={womenImg}
        btnText={btnText}
        subTitle={tThis('women_clothes_and_kimono')}
      />
      <Section to='shop/jewelry' src={jewwelryImg} btnText={btnText} subTitle={tThis('jewelry')} />
      <Section
        to='shop/kimono-men'
        src={menImg}
        btnText={btnText}
        subTitle={tThis('mens_kimono')}
      />
    </div>
  )
}

function Section({ to, src, btnText, subTitle }) {
  return (
    <div className='section'>
      <Link to={to} onClick={() => window.scrollTo(0, 0)}>
        <div className='section-photo-container'>
          <div className='section-foreground'>
            <button className='section-btn btn'>{btnText}</button>
          </div>
          <img className='section-img' src={src} alt={subTitle} />
        </div>
        <h4 className='section-subtitle'>{subTitle}</h4>
      </Link>
    </div>
  )
}

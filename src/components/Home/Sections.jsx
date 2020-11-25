import React from 'react'
import { Link } from 'react-router-dom'
// import { t } from '../../pure-common/utils/translation'

import womenImg from '../../assets/images/sections/women.jpg'
import menImg from '../../assets/images/sections/men.jpg'
import jewwelryImg from '../../assets/images/sections/jewelry.jpg'

const btnText = 'посмотреть все модели'

export default function Sections() {
  return (
    <div className='sections'>
      <Section
        to='shop/kimono-women'
        src={womenImg}
        btnText={btnText}
        subTitle='женская одежда и кимоно'
      />
      <Section to='shop/jewelry' src={jewwelryImg} btnText={btnText} subTitle='украшения' />
      <Section to='shop/kimono-men' src={menImg} btnText={btnText} subTitle='мужские кимоно' />
    </div>
  )
}

function Section({ to, imgClassName, src, btnText, subTitle }) {
  return (
    <div className='section'>
      <Link to={to} onClick={() => window.scrollTo(0, 0)}>
        <div className='section-photo-container'>
          <div className='section-foreground'>
            <button className='section-btn btn'>{btnText}</button>
          </div>
          <img className='section-img' src={src} />
        </div>
        <h4 className='section-subtitle'>{subTitle}</h4>
      </Link>
    </div>
  )
}

import React from 'react'
import { Link } from 'react-router-dom'
// import { t } from '../../pure-common/utils/translation'

import womenImg from '../../assets/images/sections/women.jpg'
import menImg from '../../assets/images/sections/men.jpg'
import jewwelryImg from '../../assets/images/sections/jewelry.jpg'

export default function Sections() {
  return (
    <div className='sections'>
      <Section to='shop/kimono-women' src={womenImg} btnText='женская одежда' />
      <Section to='shop/jewelry' src={jewwelryImg} btnText='украшения' />
      <Section to='shop/kimono-men' src={menImg} btnText='мужские кимоно' />
    </div>
  )
}

function Section({ to, imgClassName, src, btnText }) {
  return (
    <div className='section'>
      <Link to={to} onClick={() => window.scrollTo(0, 0)}>
        <img className='section-img' src={src} />
        <button className='section-btn btn'>{btnText}</button>
      </Link>
    </div>
  )
}

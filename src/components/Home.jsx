import React from 'react'

import clothes from '../images/sections/clothes.png'
import jewelry from '../images/sections/jewelry.png'
import aboutImg from '../images/sections/clothes.png'

import MainSlider from './MainSlider'
import InstagramSection from './InstagramSection'

export default function Home() {
  return (
    <>
      <MainSlider />
      <Test />
    </>
  )
}

const Test = props => {
  return (
    <>
      <div className='sections'>
        <div className='section'>
          <img src={clothes} alt='раздел одежда' className='section-img section-clothes' />
          <div className='section-foreground'>
            <div className='section-text-container'>
              <h1>одежда</h1>
              <p>наша одежда изготавливается из натуральных материалов: шелка, льна и хлопка</p>
              <p>все процесы от окраски тканей до финального пошивавыполнены вручную</p>
              <p>1оо% ручная работа наша продукция произаодится на острове бали</p>
              <button>посмотреть все модели</button>
            </div>
          </div>
        </div>
        <div className='section'>
          <img src={jewelry} alt='раздел украшения' className='section-img section-clothes' />
          <div className='section-foreground'>
            <div className='section-text-container'>
              <h1>украшения</h1>
              <p>тоже ченить написать бла бла блаьла ьла ьла</p>
              <p>ьла ьлаь ла ал фщоцаашшщш щоаср лсвгифвзшмв офща ф ффвс </p>
              <p>щлащоаф ырафа еще немного текста</p>
              <button>посмотреть все модели</button>
            </div>
          </div>
        </div>
      </div>

      <InstagramSection />

      <div className='about'>
        <img src={aboutImg} alt='раздел о нас' className='section-img' />
        <div className='about-text-container'>
          <h3>О нас</h3>
          <p>
            ла ла ла все такое все дела и еще всякоемного чего разного и всяческого рзнообразногоё
          </p>
          <p>сяческого рзнообразного вдзз сяческого рзнообразного</p>
        </div>
      </div>

      <div className='subscription-block'>
        <form action=''>
          <label>Подпишись на нашу рассылку</label>
          <input type='email' placeholder='Email' />
          <button>Подписаться</button>
          <span>
            <input type='checkbox' className='checkbox' />
            <p>Даю согласие на обработку персональных данных</p>
          </span>
        </form>
      </div>

      <footer>
        <p>I AM IN PURE</p>
        <p style={{ fontSize: '9px' }}>2020</p>
      </footer>
    </>
  )
}

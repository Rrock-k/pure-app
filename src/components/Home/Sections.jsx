import React from 'react'
import { t } from '../../utils/translation'

import clothes from '../../assets/images/sections/clothes.png'
import jewelry from '../../assets/images/sections/jewelry.png'

export default function Sections() {
  return (
    <div className='sections'>
      <div className='section'>
        <img
          src={clothes}
          alt={t('home.sections.clothes_section.img_alt')}
          className='section-img section-clothes'
        />
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
            <p>тоже ченить написать бла бла блаьла ьла ьла</p>
            <p>ьла ьлаь ла ал фщоцаашшщш щоаср лсвгифвзшмв офща ф ффвс </p>
            <p>щлащоаф ырафа еще немного текста</p>
            <p>какой то текст новый забыл перевести</p>
            <button>посмотреть все модели</button>
          </div>
        </div>
      </div>
    </div>
  )
}

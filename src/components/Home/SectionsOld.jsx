import React from 'react'
import { t } from 'pure-common/utils/translation'

import clothes from 'assets/images/sections/clothes.png'
import jewelry from 'assets/images/sections/jewelry.png'

export default function Sections() {
  return (
    <div className='sections'>
      <div className='section'>
        <img
          src={clothes}
          alt={t('home.sections.section_clothes.img_alt')}
          className='section-img section-clothes'
        />
        <div className='section-foreground'>
          <div className='section-text-container'>
            <h1>{t('home.sections.section_clothes.title')}</h1>
            <p>{t('home.sections.section_clothes.p1')}</p>
            <p>{t('home.sections.section_clothes.p2')}</p>
            <p>{t('home.sections.section_clothes.p3')}</p>
            <button>{t('home.sections.section_clothes.button')}</button>
          </div>
        </div>
      </div>

      <div className='section'>
        <img
          src={jewelry}
          alt={t('home.sections.section_jewelry.img_alt')}
          className='section-img section-jewelry'
        />
        <div className='section-foreground'>
          <div className='section-text-container'>
            <h1>{t('home.sections.section_jewelry.title')}</h1>
            <p>{t('home.sections.section_jewelry.p1')}</p>
            <p>{t('home.sections.section_jewelry.p2')}</p>
            <p>{t('home.sections.section_jewelry.p3')}</p>
            <button>{t('home.sections.section_jewelry.button')}</button>
          </div>
        </div>
      </div>
    </div>
  )
}

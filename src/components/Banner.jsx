import React from 'react'
import { t } from '../utils/translation'

const Banner = props => {
  return (
    <div className='banner-container'>
      <div className='banner-text-container'>
        <h1 className='banner-text'>{t('common.banner.text')}</h1>
        <h1 className='banner-text-small'>{t('common.banner.text-small')}</h1>
      </div>
    </div>
  )
}

export default Banner

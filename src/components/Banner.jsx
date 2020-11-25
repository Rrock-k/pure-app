import React from 'react'
import { Link } from 'react-router-dom'
import { t } from '../pure-common/utils/translation'

const Banner = props => {
  return (
    <div className='banner-container'>
      <div className='banner-text-container'>
        <h1 className='banner-text'>{t('common.banner.text')}</h1>
        <h1 className='banner-text-small'>{t('common.banner.text-small')}</h1>
      </div>
      <Link to='shop/kimono'>
        <button className='btn banner-button'>Смотреть</button>
      </Link>
    </div>
  )
}

export default Banner

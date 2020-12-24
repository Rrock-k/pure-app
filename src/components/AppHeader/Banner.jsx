import React from 'react'
import { Link } from 'react-router-dom'
import { t } from 'pure-common/utils/translation'

import bannerLeft from 'assets/images/banner/banner-left.png'
import bannerMid from 'assets/images/banner/banner-mid.jpg'
import bannerRight from 'assets/images/banner/banner-right.png'

import styles from './styles/Banner.module.css'

const Banner = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imageOuterContainer}>
        <div className={styles.imageInnerContainer}>
          <img src={bannerLeft} alt='' />
          <img className={styles.middleImage} src={bannerMid} alt='' />
          <img src={bannerRight} alt='' />
        </div>
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.text}>{t('common.banner.text')}</h1>
        <h1 className={styles.textSmall}>{t('common.banner.text-small')}</h1>
      </div>
      <Link to='shop/kimono'>
        <button className={'btn ' + styles.button}>{t('common.banner.buttonText')}</button>
      </Link>
    </div>
  )
}

export default Banner

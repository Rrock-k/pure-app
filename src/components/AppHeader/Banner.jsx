import React from 'react'
import { Link } from 'react-router-dom'
import { t } from 'pure-common/utils/translation'

import styles from './styles/Banner.module.css'

const Banner = () => {
  const focusBtn = btn => {
    console.log(btn)
  }

  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h1 className={styles.text}>{t('common.banner.text')}</h1>
        <h1 className={styles.textSmall}>{t('common.banner.text-small')}</h1>
      </div>
      <Link to='shop/kimono'>
        <button ref={focusBtn} className={'btn ' + styles.button}>
          {t('common.banner.buttonText')}
        </button>
      </Link>
    </div>
  )
}

export default Banner

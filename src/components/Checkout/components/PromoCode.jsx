import React from 'react'

import InputBootstrap from '../../../pure-common/common/InputBootstrap'

import styles from '../Checkout.module.css'

import { t } from '../../../pure-common/utils/translation'
const tThis = path => t('checkout.left.' + path)

export default function PromoCode({ onSubmit }) {
  return (
    <form className={styles.promoCodeForm} onSubmit={onSubmit}>
      <div className={styles.promoCodeInputWrapper}>
        <span>{tThis('promo-code')}</span>
        <InputBootstrap />
      </div>
      <button type='submit' className='btn'>
        {tThis('submit-promo-code')}
      </button>
    </form>
  )
}

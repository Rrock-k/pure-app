import React from 'react'

import styles from '../Checkout.module.css'
import CheckoutItem from './CheckoutItem'
import CheckoutInfo from './CheckoutInfo'
import PromoCode from './PromoCode'
import { t } from '../../../pure-common/utils/translation'

const tThis = path => t('checkout.' + path)

export default function CheckoutLeft({ cartItemsMapped = [], checkoutInfo, onPromoSubmit }) {
  return (
    <div className={styles.left}>
      <h2>{tThis('left.title')}</h2>
      {cartItemsMapped.map(item => {
        return <CheckoutItem item={item} />
      })}
      <PromoCode onSubmit={onPromoSubmit} />

      <CheckoutInfo checkoutInfo={checkoutInfo} />
    </div>
  )
}

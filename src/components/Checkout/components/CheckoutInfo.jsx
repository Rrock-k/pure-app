import React from 'react'

import styles from '../Checkout.module.css'

import { t } from '../../../pure-common/utils/translation'
const tThis = path => t('checkout.left.' + path)

export default function CheckoutInfo({
  subtotalPrice = '$100',
  shippingPrice = '$100',
  totalPrice = '$200',
}) {
  return (
    <div className={styles.checkoutInfo}>
      <p>
        <span>{tThis('subtotal-text')}</span>
        <span className={styles.priceSpan}>{subtotalPrice}</span>
      </p>
      <p>
        <span>{tThis('shipping-price-text')}</span>
        <span className={styles.questionIcon}>?</span>
        <span className={styles.priceSpan}>{shippingPrice}</span>
      </p>
      <hr />
      <p className={styles.totalPriceContainer}>
        <span>{tThis('final-total-price-text')}</span>
        <span className={styles.priceSpan}>{totalPrice}</span>
      </p>
    </div>
  )
}

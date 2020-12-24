import React from 'react'
import { Prompt } from 'react-router-dom'

import styles from './Checkout.module.css'
import CheckoutLeft from './components/CheckoutLeft'
import CheckoutRight from './components/CheckoutRight'
import { t } from 'pure-common/utils/translation'

const cartItems = []

export default function CheckoutView() {
  return (
    <div className={styles.container}>
      <Prompt message={t('checkout.prompt_when_quitting')} />
      <CheckoutLeft cartItems={cartItems} />
      <div className={styles.horizontalLine}></div>
      <CheckoutRight />
    </div>
  )
}

import React from 'react'

import styles from './Checkout.module.css'
import CheckoutLeft from './components/CheckoutLeft'
import CheckoutRight from './components/CheckoutRight'

const cartItems = []

export default function CheckoutView() {
  return (
    <div className={styles.container}>
      <CheckoutLeft cartItems={cartItems} />
      <div className={styles.horizontalLine}></div>
      <CheckoutRight />
    </div>
  )
}

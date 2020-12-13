import React from 'react'

import styles from '../Checkout.module.css'

export default function CheckoutItem({ item }) {
  return (
    <div className={styles.checkoutItem}>
      <div className={styles.itemPhotoContainer}>
        <div className={styles.itemQuantityIcon}>{item.quantityInCart}</div>
        <img src={item.photo} alt='' />
      </div>

      <div className={styles.itemInfoContainer}>
        <h5>{item.name}</h5>
        <p>{item.option1name}</p>
        <p>{item.option2name}</p>
      </div>

      <div className={styles.itemTotalPrice}>
        <p>{item.quantityInCart * item.price}</p>
      </div>
    </div>
  )
}

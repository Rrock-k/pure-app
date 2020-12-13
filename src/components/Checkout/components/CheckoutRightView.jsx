import React from 'react'
import { Link } from 'react-router-dom'

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import InputBootstrap from '../../../pure-common/common/InputBootstrap'
import Checkbox from '../../../pure-common/common/Checkbox'

import styles from '../Checkout.module.css'
import urls from '../../../data/urls.json'

import { t } from '../../../pure-common/utils/translation'
const tThis = path => t('checkout.right.' + path)

export default function CheckboxRightView({ getPropsFor, onSubmit }) {
  return (
    <form className={styles.right} onSubmit={onSubmit}>
      <h2>{tThis('title')}</h2>
      <InputBootstrap {...getPropsFor('email')} />
      <Checkbox {...getPropsFor('isBeingSubscribed')} />
      <h5>{tThis('address-of-shipping')}</h5>
      <div className={styles.twoColsFormGroup}>
        <InputBootstrap {...getPropsFor('firstName')} />
        <InputBootstrap {...getPropsFor('lastName')} />
      </div>

      <InputBootstrap {...getPropsFor('address1')} />
      <InputBootstrap {...getPropsFor('address2')} />

      <InputBootstrap {...getPropsFor('city')} />
      <div className={styles.twoColsFormGroup}>
        <InputBootstrap {...getPropsFor('county')} />
        <InputBootstrap {...getPropsFor('postalCode')} />
      </div>

      <InputBootstrap {...getPropsFor('country')} />
      <PhoneInput {...getPropsFor('phone')} />

      <Checkbox {...getPropsFor('isShipSeparately')} />

      <Link to={urls.cart} className={styles.backToCartBtn + ' ' + styles.uppercase}>
        {'< '} {tThis('back_to_cart')}
      </Link>
      <button type='submit' className={styles.goToPaymentBtn + ' btn'}>
        {tThis('proceed_to_payment')}
      </button>
    </form>
  )
}

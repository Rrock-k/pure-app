import React, { useState } from 'react'

import styles from '../Checkout.module.css'

import CheckoutRightView from './CheckoutRightView'

import { t } from '../../../pure-common/utils/translation'
const tThis = path => t('checkout.right.' + path)

export default function CheckoutRight() {
  const [formData, setFormData] = useState({
    email: '',
    isBeingSubscribed: true,
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    county: '',
    postalCode: '',
    country: '',
    phone: '',
    isShipSeparately: false,
  })

  const propsForCheckboxes = {
    isBeingSubscribed: { label: tThis('subscription-prompt') },
    isShipSeparately: { label: '* ' + tThis('shipping-note') },
  }

  function getPropsFor(id) {
    if (id === 'phone') return propsPhoneInput

    let props = propsForCheckboxes[id]

    if (props) {
      props.checked = formData[id]
      props.type = 'checkbox'
    } else {
      const placeholder = tThis('placeholders.' + id)
      const value = formData[id]

      props = { placeholder, value, label: placeholder }
      props.className = styles.textInput
      props.className += ' ' + (value ? styles.textInputFilled : styles.textInputEmpty)
    }

    props.id = 'checkout_' + id
    props.onChange = ({ target }) =>
      setFormData(
        target.type === 'checkbox'
          ? { ...formData, [id]: !formData[id] }
          : { ...formData, [id]: target.value }
      )

    return props
  }

  const propsPhoneInput = {
    country: 'ru',
    value: formData.phoneInput,
    onChange: phone => setFormData(formData => ({ ...formData, phone })),
  }

  function onSubmit(e) {
    e.preventDefault()
  }

  return <CheckoutRightView getPropsFor={getPropsFor} onSubmit={onSubmit} />
}

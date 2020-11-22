import React from 'react'
import { useLanguageContext } from '../components/contexts/LanguageContext'

export default function PriceElement({ priceRub, priceUsd, discountRub = 0, discountUsd = 0 }) {
  let { language } = useLanguageContext()

  let price, discount, currency, priceStr, priceBeforeDicsount

  if (language === 'ru') {
    price = priceRub
    discount = discountRub
    currency = '₽'
    priceStr = `${price - discount} ${currency}`
  } else {
    price = priceUsd
    discount = discountUsd
    currency = '$'
    priceStr = `${currency}${price - discount}`
  }

  let priceClassList = 'price-span'
  if (discount && price) {
    priceClassList += ' discounted-price'
    priceBeforeDicsount = (
      <s>
        <span>{price}</span>
      </s>
    )
  }

  return (
    <div className='price-element'>
      {priceBeforeDicsount} {price && <span className={priceClassList}>{priceStr}</span>}
    </div>
  )
}

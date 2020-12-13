import React from 'react'
import { contexts } from '../../config/setup'
import { t } from '../utils/translation'

const { useLanguageContext } = contexts

export default function PriceElement({
  priceRub,
  priceUsd,
  discountRub = 0,
  discountUsd = 0,
  priceRubVariations,
  priceUsdVariations,
  variations,
}) {
  let { language } = useLanguageContext()

  const pricesVary = variations?.reduce((acc, variation) => acc || variation.pricesVary, false)
  if (pricesVary) {
    var priceRubVariationsFlat = priceRubVariations
      .reduce((acc, row) => [...acc, ...row], [])
      .map(el => parseInt(el) || priceRub)
    var priceUsdVariationsFlat = priceUsdVariations
      .reduce((acc, row) => [...acc, ...row], [])
      .map(el => parseInt(el) || priceUsd)
    var priceRubFrom = Math.min(...priceRubVariationsFlat)
    var priceUsdFrom = Math.min(...priceUsdVariationsFlat)
  }

  let price, discount, currency, priceStr, priceBeforeDicsount

  if (language === 'ru') {
    price = pricesVary ? priceRubFrom : priceRub
    discount = parseInt(discountRub) || 0
    currency = '₽'
    priceStr = `${price - discount} ${currency}`
  } else {
    price = pricesVary ? priceUsdFrom : priceUsd
    discount = parseInt(discountUsd) || 0
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
      {
        <strong>
          <span className='shop-price-from-span'>{pricesVary && t('shop.price.от')}</span>
        </strong>
      }{' '}
      {priceBeforeDicsount} {price && <span className={priceClassList}>{priceStr}</span>}
    </div>
  )
}

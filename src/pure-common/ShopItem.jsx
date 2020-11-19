import React from 'react'
import { Link } from 'react-router-dom'
import { PHOTOS_URL } from './utils/apiQueries'

import { contexts } from '../config/setup'
const {
  useLanguageContext = () => ({
    language: 'ru',
  }),
  useHoverContext,
} = contexts

export function ShopItem({ isAdmin, ...props }) {
  const {
    _id,
    mainPhotoUrl,
    mainPhotoSrc,
    secondPhotoUrl,
    secondPhotoSrc,
    linkName,
    flagNew,
  } = props
  let { name: nameRu, nameEn, priceRub, priceUsd, discountRub = 0, discountUsd = 0 } = props
  let name, price, discount, currency, priceStr, priceBeforeDicsount

  const productUrl = linkName ? '/shop/products/' + linkName : '/shop/products/' + _id

  const hoverOn = useHoverContext()
  let { language } = useLanguageContext()

  if (language === 'ru') {
    name = nameRu
    price = priceRub
    discount = discountRub
    currency = '₽'
    priceStr = `${price - discount} ${currency}`
  } else {
    name = nameEn
    price = priceUsd
    discount = discountUsd
    currency = '$'
    priceStr = `${currency}${price - discount}`
  }

  let priceClassList = 'shop-item-price'
  if (discount && price) {
    priceClassList += ' discounted-price'
    priceBeforeDicsount = (
      <s>
        <span>{price}</span>
      </s>
    )
  }

  return (
    <div className='shop-item'>
      <Link to={{ pathname: isAdmin ? '' : productUrl || '' }}>
        <div className='shop-item-image-div'>
          {secondPhotoUrl && hoverOn && (
            <img
              className='shop-item-image-second'
              src={secondPhotoSrc || PHOTOS_URL + secondPhotoUrl}
              alt={name}
            />
          )}
          <img
            className='shop-item-image-first'
            src={mainPhotoSrc || PHOTOS_URL + mainPhotoUrl}
            alt={name}
          />
          <div className='shop-item-like-button'>.</div>
          {flagNew && <div className='shop-item-flag-new'>предзаказ</div>}
        </div>
      </Link>
      <div className='shop-item-text'>
        <p>{name}</p>
        {priceBeforeDicsount} {price && <span className={priceClassList}>{priceStr}</span>}
      </div>
      <div className='shop-item-link-container'>
        {isAdmin && _id && (
          <Link to={'/product/' + _id} className='btn btn-dark btn-sm'>
            Изменить
          </Link>
        )}
      </div>
    </div>
  )
}

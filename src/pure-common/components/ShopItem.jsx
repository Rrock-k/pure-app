import React from 'react'
import { Link } from 'react-router-dom'
import { PHOTOS_URL } from '../utils/apiQueries'

import { contexts } from '../../config/contexts'
import PriceElement from './PriceElement'
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
    flagPreorder,
    priceRubVariations,
    priceUsdVariations,
    variations,
  } = props
  let { name: nameRu, nameEn, priceRub, priceUsd, discountRub = 0, discountUsd = 0 } = props

  const productUrl = linkName ? '/shop/products/' + linkName : '/shop/products/' + _id

  const hoverOn = useHoverContext()
  let { language } = useLanguageContext()

  let name = language === 'ru' ? nameRu : nameEn

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
          <LikeButton />
          {flagPreorder && <div className='shop-item-flag-new'>предзаказ</div>}
        </div>
      </Link>
      <div className='shop-item-text'>
        <p>{name}</p>
        <PriceElement
          {...{
            priceRub,
            priceUsd,
            discountRub,
            discountUsd,
            priceRubVariations,
            priceUsdVariations,
            variations,
          }}
        />
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

function LikeButton() {
  return null
  // return <div className='shop-item-like-button'>.</div>
}

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { contexts } from '../config/setup'

import { PHOTOS_URL } from './utils/apiQueries'

const {
  useLanguageContext = () => ({
    language: 'ru',
  }),
  useHoverContext,
} = contexts

export default function ShopItems({ isAdmin = false, items }) {
  const [shopItemRows, setShopItemRows] = useState([])

  useEffect(() => {
    if (items.length === 0) return setShopItemRows([])
    let resultArray = []
    items.forEach((item, index) => {
      if (index % 2 === 0) resultArray.push([item])
      else resultArray[Math.floor(index / 2)].push(item)
    })

    const lastItemRow = resultArray[resultArray.length - 1]
    const secondChildIsBlank = !lastItemRow[1]
    if (secondChildIsBlank) lastItemRow.push(null)

    setShopItemRows(resultArray)
  }, [items])

  return (
    <div className='shop-items'>
      {shopItemRows.map(([product1, product2]) => (
        <div className='shop-item-row'>
          <ShopItem {...product1} isAdmin={isAdmin} />
          {product2 ? (
            <ShopItem {...product2} isAdmin={isAdmin} />
          ) : (
            <div className='shop-item'></div>
          )}
        </div>
      ))}

      {Array(shopItemRows.length || 1 - 1) // blank divs to fill space and make flex work properly
        .fill()
        .map(() => (
          <div className='shop-item-row'></div>
        ))}
    </div>
  )
}

function ShopItem({ isAdmin, ...props }) {
  const { _id, mainPhotoUrl, secondPhotoUrl, linkName } = props
  let { name: nameRu, nameEn, priceRub, priceUsd, discountRub = 0, discountUsd = 0 } = props
  let name, price, discount, currency, priceStr, priceBeforeDicsount

  const productUrl = linkName ? '/shop/products/' + linkName : '/shop/products/' + _id

  const hoverOn = useHoverContext()
  let { language } = useLanguageContext()

  if (language === 'ru') {
    name = nameRu
    price = priceRub
    discount = discountRub
    currency = 'руб.'
  } else {
    name = nameEn
    price = priceUsd
    discount = discountUsd
    currency = '$'
  }

  let priceClassList = 'shop-item-price'
  if (discount) {
    priceClassList += ' discounted-price'
    priceBeforeDicsount = (
      <s>
        <p>
          {price} {currency}
        </p>
      </s>
    )
  }
  priceStr = (
    <p className={priceClassList}>
      <span>{`${price - discount} ${currency}`}</span>
    </p>
  )

  return (
    <div className='shop-item'>
      <Link to={{ pathname: productUrl, query: props }}>
        <div className='shop-item-image-div'>
          {secondPhotoUrl && hoverOn && (
            <img className='shop-item-image-second' src={PHOTOS_URL + secondPhotoUrl} alt={name} />
          )}
          <img className='shop-item-image-first' src={PHOTOS_URL + mainPhotoUrl} alt={name} />
        </div>
      </Link>
      <div className='shop-item-text'>
        <p>{name}</p>
        {priceBeforeDicsount}
        {priceStr}
      </div>
      <div className='shop-item-link-container'>
        {isAdmin && (
          <Link to={'/product/' + _id} className='btn btn-dark btn-sm'>
            Изменить
          </Link>
        )}
      </div>
    </div>
  )
}

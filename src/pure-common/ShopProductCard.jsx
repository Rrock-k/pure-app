import React from 'react'
import { PHOTOS_URL } from './utils/apiQueries'

export default function ShopProductCard(props) {
  const { _id, name, mainPhotoUrl } = props

  return (
    <>
      <div className='shop-product-card'>
        <h1>Product: {name || _id || 'NO NAME NOR ID'}</h1>
        <img src={PHOTOS_URL + mainPhotoUrl}></img>
      </div>
    </>
  )
}

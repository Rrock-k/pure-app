import React from 'react'
import { useParams } from 'react-router-dom'

import './styles/ShopProduct.css'

import ShopHeader from './ShopHeader'
import ShopNav from './ShopNav'
import ShopProductCard from './ShopProductCard'

const HEADER_HIDDEN = true

export default function ShopProduct({ isAdmin }) {
  const { name: id } = useParams()

  return (
    <div className='shop-container'>
      {!HEADER_HIDDEN && <ShopHeader />}
      <div className='shop-main-area'>
        <ShopNav isAdmin={isAdmin} />
        <ShopProductCard id={id} />
      </div>
    </div>
  )
}

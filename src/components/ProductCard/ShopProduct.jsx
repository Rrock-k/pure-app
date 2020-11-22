import React from 'react'
import { useParams } from 'react-router-dom'

import './ShopProduct.css'

import ShopHeader from '../../pure-common/ShopHeader'
import ShopNav from '../../pure-common/ShopNav'
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

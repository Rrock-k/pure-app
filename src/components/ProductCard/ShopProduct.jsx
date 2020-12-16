import React from 'react'
import { useParams } from 'react-router-dom'

import './ShopProduct.css'
import 'pure-common/styles/Shop.css'

import ShopHeader from 'pure-common/components/ShopHeader'
import ShopNav from 'pure-common/components/ShopNav'
import ShopProductCard from './ShopProductCard'

const HEADER_HIDDEN = true

export default function ShopProduct({ isAdmin }) {
  const { name: id } = useParams()

  return (
    <div className='shop-container'>
      {!HEADER_HIDDEN && <ShopHeader />}
      <div className='shop-main-area'>
        <ShopNav isAdmin={isAdmin} activeUrl={null} />
        <ShopProductCard id={id} />
      </div>
    </div>
  )
}

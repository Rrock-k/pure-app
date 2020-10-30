import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import ShopHeader from './ShopHeader'
import ShopNav from './ShopNav'
import ShopProductCard from './ShopProductCard'

const HEADER_HIDDEN = true

export default function ShopProduct({ isAdmin }) {
  const { name } = useParams()
  const location = useLocation()

  return (
    <div className='shop-container'>
      {!HEADER_HIDDEN && <ShopHeader />}
      <div className='shop-main-area'>
        <ShopNav isAdmin={isAdmin} />
        <ShopProductCard {...location?.query} />
      </div>
    </div>
  )
}

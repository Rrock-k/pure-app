import React from 'react'
import { useParams } from 'react-router-dom'
import ShopHeader from './ShopHeader'
import ShopNav from './ShopNav'
import ShopItems from './ShopItems'

const HEADER_HIDDEN = true

export default function Shop({ isAdmin }) {
  const { category } = useParams()

  return (
    <div className='shop-container'>
      {!HEADER_HIDDEN && <ShopHeader />}
      <div className='shop-main-area'>
        <ShopNav activeUrl={category} isAdmin={isAdmin} />
        <ShopItems category={category} isAdmin={isAdmin} />
      </div>
    </div>
  )
}
